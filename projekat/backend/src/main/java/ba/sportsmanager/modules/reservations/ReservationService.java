package ba.sportsmanager.modules.reservations;

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

import java.util.List;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final TeamService teamService;
    private final TimeSlotService timeSlotService;
    private final UserRepository userRepository;

    public ReservationService(ReservationRepository reservationRepository,
                              TeamService teamService,
                              TimeSlotService timeSlotService,
                              UserRepository userRepository) {
        this.reservationRepository = reservationRepository;
        this.teamService = teamService;
        this.timeSlotService = timeSlotService;
        this.userRepository = userRepository;
    }

    public List<ReservationResponse> getAll() {
        return reservationRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public List<ReservationResponse> getByUser(Long userId) {
        return reservationRepository.findByCreatedBy_Id(userId).stream()
                .map(this::toResponse)
                .toList();
    }

    public ReservationResponse create(CreateReservationRequest request) {
        TeamEntity team = teamService.getTeamEntity(request.teamId());
        TimeSlotEntity slot = timeSlotService.getEntity(request.slotId());
        UserEntity user = userRepository.findById(request.createdByUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

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
        reservation.setNote(request.note());

        return toResponse(reservationRepository.save(reservation));
    }

    public ReservationResponse approve(Long reservationId) {
        ReservationEntity reservation = getEntity(reservationId);
        reservation.setStatus(ReservationStatus.APPROVED);

        TimeSlotEntity slot = reservation.getSlot();
        slot.setAvailabilityStatus(SlotAvailabilityStatus.RESERVED);
        timeSlotService.save(slot);

        return toResponse(reservationRepository.save(reservation));
    }

    public ReservationResponse reject(Long reservationId) {
        ReservationEntity reservation = getEntity(reservationId);
        reservation.setStatus(ReservationStatus.REJECTED);

        TimeSlotEntity slot = reservation.getSlot();
        slot.setAvailabilityStatus(SlotAvailabilityStatus.AVAILABLE);
        timeSlotService.save(slot);

        return toResponse(reservationRepository.save(reservation));
    }

    public ReservationResponse cancel(Long reservationId) {
        ReservationEntity reservation = getEntity(reservationId);
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