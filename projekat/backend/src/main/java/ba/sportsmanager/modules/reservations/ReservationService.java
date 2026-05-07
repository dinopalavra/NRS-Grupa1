package ba.sportsmanager.modules.reservations;

import ba.sportsmanager.exception.BadRequestException;
import ba.sportsmanager.exception.ConflictException;
import ba.sportsmanager.exception.ResourceNotFoundException;
import ba.sportsmanager.modules.teams.TeamEntity;
import ba.sportsmanager.modules.teams.TeamService;
import ba.sportsmanager.modules.timeslots.SlotAvailabilityStatus;
import ba.sportsmanager.modules.timeslots.TimeSlotEntity;
import ba.sportsmanager.modules.timeslots.TimeSlotService;
import ba.sportsmanager.modules.users.UserEntity;
import ba.sportsmanager.modules.users.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final TeamService teamService;
    private final TimeSlotService timeSlotService;
    private final UserRepository userRepository;

    public ReservationService(
            ReservationRepository reservationRepository,
            TeamService teamService,
            TimeSlotService timeSlotService,
            UserRepository userRepository
    ) {
        this.reservationRepository = reservationRepository;
        this.teamService = teamService;
        this.timeSlotService = timeSlotService;
        this.userRepository = userRepository;
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

        ReservationEntity reservation = new ReservationEntity();
        reservation.setTeam(team);
        reservation.setSlot(slot);
        reservation.setCreatedBy(user);
        reservation.setStatus(ReservationStatus.PENDING);
        reservation.setNote(request.note() == null ? null : request.note().trim());

        return toResponse(reservationRepository.save(reservation));
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

        return toResponse(reservationRepository.save(reservation));
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

        return toResponse(reservationRepository.save(reservation));
    }

    @Transactional
    public ReservationResponse cancel(Long reservationId) {
        ReservationEntity reservation = getEntity(reservationId);

        if (reservation.getStatus() == ReservationStatus.CANCELLED
                || reservation.getStatus() == ReservationStatus.REJECTED) {
            throw new BadRequestException("Reservation is already cancelled or rejected.");
        }

        reservation.setStatus(ReservationStatus.CANCELLED);

        TimeSlotEntity slot = reservation.getSlot();
        slot.setAvailabilityStatus(SlotAvailabilityStatus.AVAILABLE);
        timeSlotService.save(slot);

        return toResponse(reservationRepository.save(reservation));
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
                reservation.getCreatedAt()
        );
    }
}