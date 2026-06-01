package ba.sportsmanager.modules.reservations;

import ba.sportsmanager.exception.BadRequestException;
import ba.sportsmanager.exception.ConflictException;
import ba.sportsmanager.exception.ResourceNotFoundException;
import ba.sportsmanager.modules.notifications.NotificationService;
import ba.sportsmanager.modules.notifications.NotificationType;
import ba.sportsmanager.modules.teams.TeamEntity;
import ba.sportsmanager.modules.teams.TeamMemberEntity;
import ba.sportsmanager.modules.teams.TeamMemberRepository;
import ba.sportsmanager.modules.teams.TeamService;
import ba.sportsmanager.modules.timeslots.SlotAvailabilityStatus;
import ba.sportsmanager.modules.timeslots.TimeSlotEntity;
import ba.sportsmanager.modules.timeslots.TimeSlotRepository;
import ba.sportsmanager.modules.timeslots.TimeSlotService;
import ba.sportsmanager.modules.users.UserEntity;
import ba.sportsmanager.modules.users.UserRepository;
import ba.sportsmanager.modules.users.UserRole;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final TeamService teamService;
    private final TimeSlotService timeSlotService;
    private final TimeSlotRepository timeSlotRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final TeamMemberRepository teamMemberRepository;
    private final ReservationCommentRepository commentRepository;

    public ReservationService(
            ReservationRepository reservationRepository,
            TeamService teamService,
            TimeSlotService timeSlotService,
            TimeSlotRepository timeSlotRepository,
            UserRepository userRepository,
            NotificationService notificationService,
            TeamMemberRepository teamMemberRepository,
            ReservationCommentRepository commentRepository
    ) {
        this.reservationRepository = reservationRepository;
        this.teamService = teamService;
        this.timeSlotService = timeSlotService;
        this.timeSlotRepository = timeSlotRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
        this.teamMemberRepository = teamMemberRepository;
        this.commentRepository = commentRepository;
    }

    /**
     * Šalje notifikaciju svim članovima tima (svim igračima na rosteru).
     * Koristi se za TRAINING rezervacije da svi članovi znaju.
     */
    private void notifyTeamMembers(ReservationEntity reservation, String message, NotificationType type) {
        if (reservation.getTeam() == null) return;
        List<TeamMemberEntity> members = teamMemberRepository
                .findByTeam_IdOrderByJerseyNumberAscIdAsc(reservation.getTeam().getId());
        for (TeamMemberEntity m : members) {
            // Ne dupliraj notifikaciju kreatoru — on već dobija odvojenu poruku
            if (reservation.getCreatedBy() != null
                    && m.getUser().getId().equals(reservation.getCreatedBy().getId())) {
                continue;
            }
            notificationService.createForUser(m.getUser().getId(), message, type);
        }
    }

    public List<ReservationResponse> getAll() {
        return reservationRepository.findAll().stream()
                .sorted(Comparator.comparing(ReservationEntity::getCreatedAt).reversed())
                .map(this::toResponse)
                .toList();
    }

    public List<ReservationResponse> getByUser(Long userId) {
        return reservationRepository.findByCreatedBy_Id(userId).stream()
                .sorted(Comparator.comparing(ReservationEntity::getCreatedAt).reversed())
                .map(this::toResponse)
                .toList();
    }

    public List<ReservationResponse> getByTeam(Long teamId) {
        return reservationRepository.findByTeam_Id(teamId).stream()
                .sorted(Comparator.comparing(ReservationEntity::getCreatedAt).reversed())
                .map(this::toResponse)
                .toList();
    }

    public List<ReservationResponse> getBySlot(Long slotId) {
        return reservationRepository.findBySlot_Id(slotId).stream()
                .sorted(Comparator.comparing(ReservationEntity::getCreatedAt).reversed())
                .map(this::toResponse)
                .toList();
    }

    public List<ReservationResponse> getByStatus(ReservationStatus status) {
        return reservationRepository.findByStatus(status).stream()
                .sorted(Comparator.comparing(ReservationEntity::getCreatedAt).reversed())
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public ReservationResponse create(CreateReservationRequest request) {
        TeamEntity team = teamService.getTeamEntity(request.teamId());
        TimeSlotEntity slot = timeSlotService.getEntity(request.slotId());

        UserEntity user = userRepository.findById(request.createdByUserId())
                .orElseGet(() -> userRepository.findAll().stream()
                        .max(Comparator.comparing(UserEntity::getId))
                        .orElseThrow(() -> new ResourceNotFoundException("User not found.")));

        if (slot.getAvailabilityStatus() != SlotAvailabilityStatus.AVAILABLE) {
            throw new ConflictException("Selected time slot is not available.");
        }

        boolean conflict = reservationRepository.existsBySlot_IdAndStatusIn(
                slot.getId(),
                List.of(ReservationStatus.PENDING, ReservationStatus.APPROVED)
        );

        if (conflict) {
            throw new ConflictException("Selected time slot is already reserved or pending.");
        }

        boolean overlappingReservation = reservationRepository.existsOverlappingActiveReservation(
                slot.getLocation(),
                slot.getResourceName(),
                slot.getSlotDate(),
                slot.getStartTime(),
                slot.getEndTime(),
                slot.getId(),
                List.of(ReservationStatus.PENDING, ReservationStatus.APPROVED)
        );

        if (overlappingReservation) {
            throw new ConflictException(
                    "Another reservation overlaps with this time slot on the same resource.");
        }

        ReservationEntity reservation = new ReservationEntity();
        reservation.setTeam(team);
        reservation.setSlot(slot);
        reservation.setCreatedBy(user);
        reservation.setStatus(ReservationStatus.PENDING);
        reservation.setNote(request.note() == null ? null : request.note().trim());
        reservation.setSport(request.sport());
        reservation.setType(request.type() == null ? ReservationType.REGULAR : request.type());

        ReservationEntity saved = reservationRepository.save(reservation);
        String slotInfo = slot.getResourceName() + " " + slot.getSlotDate();

        // Admini čekaju odobrenje
        notificationService.createForRole(
                UserRole.ADMIN,
                "Nova rezervacija (tim: " + team.getName() + ", termin: " + slotInfo + ") čeka odobrenje.",
                NotificationType.RESERVATION_CREATED);

        // Svi članovi tima da znaju da je rezervacija kreirana
        notifyTeamMembers(saved,
                "Tim " + team.getName() + " ima novu rezervaciju (" + slotInfo + ") — čeka odobrenje.",
                NotificationType.RESERVATION_CREATED);

        return toResponse(saved);
    }

    @Transactional
    public ReservationResponse approve(Long reservationId) {
        ReservationEntity reservation = getEntity(reservationId);

        if (reservation.getStatus() != ReservationStatus.PENDING) {
            throw new BadRequestException("Only PENDING reservations can be approved.");
        }

        reservation.setStatus(ReservationStatus.APPROVED);

        TimeSlotEntity slot = reservation.getSlot();
        slot.setAvailabilityStatus(SlotAvailabilityStatus.RESERVED);
        timeSlotService.save(slot);

        ReservationEntity saved = reservationRepository.save(reservation);
        String slotInfo = slot.getResourceName() + " " + slot.getSlotDate();

        notificationService.createForUser(
                saved.getCreatedBy().getId(),
                "Vaša rezervacija za " + slotInfo + " je odobrena.",
                NotificationType.RESERVATION_APPROVED);

        notifyTeamMembers(saved,
                "Rezervacija tima " + saved.getTeam().getName() + " (" + slotInfo + ") je ODOBRENA.",
                NotificationType.RESERVATION_APPROVED);

        return toResponse(saved);
    }

    @Transactional
    public ReservationResponse reject(Long reservationId) {
        ReservationEntity reservation = getEntity(reservationId);

        if (reservation.getStatus() != ReservationStatus.PENDING) {
            throw new BadRequestException("Only PENDING reservations can be rejected.");
        }

        reservation.setStatus(ReservationStatus.REJECTED);

        TimeSlotEntity slot = reservation.getSlot();
        slot.setAvailabilityStatus(SlotAvailabilityStatus.AVAILABLE);
        timeSlotService.save(slot);

        ReservationEntity saved = reservationRepository.save(reservation);
        String slotInfo = slot.getResourceName() + " " + slot.getSlotDate();

        notificationService.createForUser(
                saved.getCreatedBy().getId(),
                "Vaša rezervacija za " + slotInfo + " je odbijena.",
                NotificationType.RESERVATION_REJECTED);

        notifyTeamMembers(saved,
                "Rezervacija tima " + saved.getTeam().getName() + " (" + slotInfo + ") je ODBIJENA.",
                NotificationType.RESERVATION_REJECTED);

        return toResponse(saved);
    }

    @Transactional
    public ReservationResponse cancel(Long reservationId) {
        ReservationEntity reservation = getEntity(reservationId);

        if (reservation.getStatus() == ReservationStatus.CANCELLED
                || reservation.getStatus() == ReservationStatus.REJECTED) {
            throw new BadRequestException("Reservation is already cancelled or rejected.");
        }

        if (reservation.getSlot().getLeagueMatchId() != null) {
            throw new BadRequestException(
                    "Reservation is linked to a league match and cannot be cancelled directly. "
                            + "Update or remove the match instead.");
        }

        reservation.setStatus(ReservationStatus.CANCELLED);

        TimeSlotEntity slot = reservation.getSlot();
        slot.setAvailabilityStatus(SlotAvailabilityStatus.AVAILABLE);
        timeSlotService.save(slot);

        ReservationEntity saved = reservationRepository.save(reservation);
        String slotInfo = slot.getResourceName() + " " + slot.getSlotDate();

        notificationService.createForUser(
                saved.getCreatedBy().getId(),
                "Vaša rezervacija za " + slotInfo + " je otkazana.",
                NotificationType.RESERVATION_CANCELLED);

        notifyTeamMembers(saved,
                "Rezervacija tima " + saved.getTeam().getName() + " (" + slotInfo + ") je OTKAZANA.",
                NotificationType.RESERVATION_CANCELLED);

        return toResponse(saved);
    }

    @Transactional
    public ReservationResponse reschedule(Long reservationId, RescheduleReservationRequest request) {
        ReservationEntity reservation = getEntity(reservationId);

        if (reservation.getStatus() != ReservationStatus.PENDING
                && reservation.getStatus() != ReservationStatus.APPROVED) {
            throw new BadRequestException(
                    "Only PENDING or APPROVED reservations can be rescheduled.");
        }

        if (reservation.getSlot().getLeagueMatchId() != null) {
            throw new BadRequestException(
                    "Reservation is linked to a league match and cannot be rescheduled directly. "
                            + "Update the match instead.");
        }

        TimeSlotEntity oldSlot = reservation.getSlot();
        TimeSlotEntity newSlot = timeSlotService.getEntity(request.newSlotId());

        if (newSlot.getId().equals(oldSlot.getId())) {
            throw new BadRequestException("New slot must be different from the current slot.");
        }

        if (newSlot.getLeagueMatchId() != null) {
            throw new BadRequestException(
                    "Selected slot is reserved for a league match.");
        }

        if (newSlot.getAvailabilityStatus() != SlotAvailabilityStatus.AVAILABLE) {
            throw new ConflictException("Selected time slot is not available.");
        }

        boolean conflict = reservationRepository.existsBySlot_IdAndStatusIn(
                newSlot.getId(),
                List.of(ReservationStatus.PENDING, ReservationStatus.APPROVED)
        );

        if (conflict) {
            throw new ConflictException("Selected time slot is already reserved or pending.");
        }

        boolean overlap = reservationRepository.existsOverlappingActiveReservation(
                newSlot.getLocation(),
                newSlot.getResourceName(),
                newSlot.getSlotDate(),
                newSlot.getStartTime(),
                newSlot.getEndTime(),
                newSlot.getId(),
                List.of(ReservationStatus.PENDING, ReservationStatus.APPROVED)
        );

        if (overlap) {
            throw new ConflictException(
                    "Another reservation overlaps with this time slot on the same resource.");
        }

        ReservationStatus previousStatus = reservation.getStatus();

        oldSlot.setAvailabilityStatus(SlotAvailabilityStatus.AVAILABLE);
        timeSlotService.save(oldSlot);

        reservation.setSlot(newSlot);
        reservation.setStatus(ReservationStatus.PENDING);

        if (previousStatus == ReservationStatus.APPROVED) {
            newSlot.setAvailabilityStatus(SlotAvailabilityStatus.RESERVED);
            timeSlotService.save(newSlot);
            reservation.setStatus(ReservationStatus.APPROVED);
        }

        if (request.note() != null) {
            reservation.setNote(request.note().trim());
        }

        ReservationEntity saved = reservationRepository.save(reservation);
        String newSlotInfo = newSlot.getResourceName() + " (" + newSlot.getSlotDate() + ")";

        notificationService.createForUser(
                saved.getCreatedBy().getId(),
                "Vaša rezervacija je premještena na " + newSlotInfo + ".",
                NotificationType.RESERVATION_RESCHEDULED);

        notifyTeamMembers(saved,
                "Rezervacija tima " + saved.getTeam().getName()
                        + " je PREMJEŠTENA na " + newSlotInfo + ".",
                NotificationType.RESERVATION_RESCHEDULED);

        return toResponse(saved);
    }

    @Transactional
    public List<ReservationResponse> createRecurring(CreateRecurringReservationRequest req) {
        TimeSlotEntity firstSlot = timeSlotService.getEntity(req.slotId());
        List<ReservationResponse> created = new ArrayList<>();

        CreateReservationRequest first = new CreateReservationRequest(
                req.teamId(), req.slotId(), req.createdByUserId(), req.note(), req.sport(), null);
        created.add(create(first));

        for (int i = 1; i < req.occurrences(); i++) {
            java.time.LocalDate targetDate = firstSlot.getSlotDate().plusWeeks((long) i * req.intervalWeeks());
            timeSlotRepository.findByLocationAndResourceNameAndSlotDateAndStartTime(
                    firstSlot.getLocation(), firstSlot.getResourceName(),
                    targetDate, firstSlot.getStartTime()
            ).ifPresent(slot -> {
                if (slot.getAvailabilityStatus() == SlotAvailabilityStatus.AVAILABLE) {
                    try {
                        CreateReservationRequest r = new CreateReservationRequest(
                                req.teamId(), slot.getId(), req.createdByUserId(), req.note(), req.sport(), null);
                        created.add(create(r));
                    } catch (Exception ignored) {
                        // slot not available, skip
                    }
                }
            });
        }
        return created;
    }

    public List<ReservationCommentResponse> getComments(Long reservationId) {
        return commentRepository.findByReservation_IdOrderByCreatedAtAsc(reservationId)
                .stream().map(this::toCommentResponse).toList();
    }

    @Transactional
    public ReservationCommentResponse addComment(Long reservationId, String content, String username) {
        ReservationEntity res = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new ResourceNotFoundException("Rezervacija nije pronađena."));
        UserEntity author = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Korisnik nije pronađen."));
        ReservationCommentEntity comment = new ReservationCommentEntity();
        comment.setReservation(res);
        comment.setAuthor(author);
        comment.setContent(content);
        return toCommentResponse(commentRepository.save(comment));
    }

    private ReservationCommentResponse toCommentResponse(ReservationCommentEntity c) {
        return new ReservationCommentResponse(
                c.getId(), c.getReservation().getId(),
                c.getAuthor().getId(),
                c.getAuthor().getFullName() != null ? c.getAuthor().getFullName() : c.getAuthor().getUsername(),
                c.getAuthor().getUsername(),
                c.getContent(), c.getCreatedAt()
        );
    }

    private ReservationEntity getEntity(Long id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found."));
    }

    private ReservationResponse toResponse(ReservationEntity reservation) {
        return new ReservationResponse(
                reservation.getId(),
                reservation.getTeam().getId(),
                reservation.getTeam().getName(),
                reservation.getSlot().getId(),
                reservation.getSlot().getLocation(),
                reservation.getSlot().getResourceName(),
                reservation.getSlot().getSlotDate(),
                reservation.getSlot().getStartTime(),
                reservation.getSlot().getEndTime(),
                reservation.getCreatedBy().getId(),
                reservation.getCreatedBy().getUsername(),
                reservation.getStatus(),
                reservation.getNote(),
                reservation.getCreatedAt(),
                reservation.getSport(),
                reservation.getSlot().getLeagueMatchId(),
                reservation.getType()
        );
    }
}