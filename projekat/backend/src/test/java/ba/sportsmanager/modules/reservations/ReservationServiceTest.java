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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyCollection;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReservationServiceTest {

    @Mock private ReservationRepository reservationRepository;
    @Mock private TeamService teamService;
    @Mock private TimeSlotService timeSlotService;
    @Mock private UserRepository userRepository;

    @InjectMocks private ReservationService reservationService;

    private CreateReservationRequest validRequest;
    private TeamEntity mockTeam;
    private TimeSlotEntity mockSlot;
    private UserEntity mockUser;

    @BeforeEach
    void setUp() {
        validRequest = new CreateReservationRequest(1L, 1L, 1L, "Note");

        mockTeam = new TeamEntity();
        ReflectionTestUtils.setField(mockTeam, "id", 1L);
        mockTeam.setName("Tim A");

        mockSlot = new TimeSlotEntity();
        ReflectionTestUtils.setField(mockSlot, "id", 1L);
        mockSlot.setSlotDate(LocalDate.of(2026, 5, 10));
        mockSlot.setStartTime(LocalTime.of(18, 0));
        mockSlot.setEndTime(LocalTime.of(19, 0));
        mockSlot.setLocation("Dvorana 1");
        mockSlot.setResourceName("Teren A");
        mockSlot.setAvailabilityStatus(SlotAvailabilityStatus.AVAILABLE);

        mockUser = new UserEntity();
        ReflectionTestUtils.setField(mockUser, "id", 1L);
        mockUser.setUsername("amel");
    }

    @Test
    void create_Successful_ReturnsResponse() {
        when(teamService.getTeamEntity(1L)).thenReturn(mockTeam);
        when(timeSlotService.getEntity(1L)).thenReturn(mockSlot);
        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
        when(reservationRepository.existsBySlot_IdAndStatusIn(eq(1L), any())).thenReturn(false);
        when(reservationRepository.existsOverlappingActiveReservation(
                anyString(), anyString(), any(), any(), any(), anyLong(), anyCollection()))
                .thenReturn(false);
        when(reservationRepository.save(any(ReservationEntity.class))).thenAnswer(invocation -> {
            ReservationEntity entity = invocation.getArgument(0);
            ReflectionTestUtils.setField(entity, "id", 5L);
            return entity;
        });

        ReservationResponse response = reservationService.create(validRequest);

        assertNotNull(response);
        assertEquals(5L, response.id());
        assertEquals(ReservationStatus.PENDING, response.status());
        assertEquals(1L, response.teamId());
        assertEquals(1L, response.slotId());
        verify(reservationRepository).save(any(ReservationEntity.class));
    }

    @Test
    void create_WhenOverlappingReservationExists_ThrowsConflictException() {
        when(teamService.getTeamEntity(1L)).thenReturn(mockTeam);
        when(timeSlotService.getEntity(1L)).thenReturn(mockSlot);
        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
        when(reservationRepository.existsBySlot_IdAndStatusIn(eq(1L), any())).thenReturn(false);
        when(reservationRepository.existsOverlappingActiveReservation(
                anyString(), anyString(), any(), any(), any(), anyLong(), anyCollection()))
                .thenReturn(true);

        assertThrows(ConflictException.class, () -> reservationService.create(validRequest));
        verify(reservationRepository, never()).save(any());
    }

    @Test
    void create_WhenSlotNotAvailable_ThrowsConflictException() {
        mockSlot.setAvailabilityStatus(SlotAvailabilityStatus.RESERVED);

        when(teamService.getTeamEntity(1L)).thenReturn(mockTeam);
        when(timeSlotService.getEntity(1L)).thenReturn(mockSlot);
        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));

        assertThrows(ConflictException.class, () -> reservationService.create(validRequest));
        verify(reservationRepository, never()).save(any());
    }

    @Test
    void create_WhenSlotAlreadyReservedOrPending_ThrowsConflictException() {
        when(teamService.getTeamEntity(1L)).thenReturn(mockTeam);
        when(timeSlotService.getEntity(1L)).thenReturn(mockSlot);
        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
        when(reservationRepository.existsBySlot_IdAndStatusIn(eq(1L), any())).thenReturn(true);

        assertThrows(ConflictException.class, () -> reservationService.create(validRequest));
        verify(reservationRepository, never()).save(any());
    }

    @Test
    void approve_Successful_ChangesStatusAndSlot() {
        ReservationEntity reservation = new ReservationEntity();
        ReflectionTestUtils.setField(reservation, "id", 1L);
        ReflectionTestUtils.setField(reservation, "team", mockTeam);
        ReflectionTestUtils.setField(reservation, "slot", mockSlot);
        ReflectionTestUtils.setField(reservation, "createdBy", mockUser);
        ReflectionTestUtils.setField(reservation, "status", ReservationStatus.PENDING);

        when(reservationRepository.findById(1L)).thenReturn(Optional.of(reservation));
        when(reservationRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);

        ReservationResponse response = reservationService.approve(1L);

        assertEquals(ReservationStatus.APPROVED, response.status());
        assertEquals(SlotAvailabilityStatus.RESERVED, mockSlot.getAvailabilityStatus());
        verify(timeSlotService).save(mockSlot);
        verify(reservationRepository).save(any());
    }

    @Test
    void approve_WhenStatusIsNotPending_ThrowsBadRequestException() {
        ReservationEntity reservation = new ReservationEntity();
        ReflectionTestUtils.setField(reservation, "status", ReservationStatus.APPROVED);

        when(reservationRepository.findById(1L)).thenReturn(Optional.of(reservation));

        assertThrows(BadRequestException.class, () -> reservationService.approve(1L));
    }

    @Test
    void reject_Successful_ChangesStatusAndSlot() {
        ReservationEntity reservation = new ReservationEntity();
        ReflectionTestUtils.setField(reservation, "id", 2L);
        ReflectionTestUtils.setField(reservation, "team", mockTeam);
        ReflectionTestUtils.setField(reservation, "slot", mockSlot);
        ReflectionTestUtils.setField(reservation, "createdBy", mockUser);
        ReflectionTestUtils.setField(reservation, "status", ReservationStatus.PENDING);

        when(reservationRepository.findById(2L)).thenReturn(Optional.of(reservation));
        when(reservationRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);

        ReservationResponse response = reservationService.reject(2L);

        assertEquals(ReservationStatus.REJECTED, response.status());
        assertEquals(SlotAvailabilityStatus.AVAILABLE, mockSlot.getAvailabilityStatus());
        verify(timeSlotService).save(mockSlot);
    }

    @Test
    void cancel_NonExistentReservation_ThrowsResourceNotFound() {
        when(reservationRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> reservationService.cancel(99L));
    }

    @Test
    void getBySlot_ReturnsMappedReservations() {
        ReservationEntity reservation = new ReservationEntity();
        ReflectionTestUtils.setField(reservation, "id", 7L);
        ReflectionTestUtils.setField(reservation, "team", mockTeam);
        ReflectionTestUtils.setField(reservation, "slot", mockSlot);
        ReflectionTestUtils.setField(reservation, "createdBy", mockUser);
        ReflectionTestUtils.setField(reservation, "status", ReservationStatus.PENDING);

        when(reservationRepository.findBySlot_Id(1L)).thenReturn(List.of(reservation));

        List<ReservationResponse> result = reservationService.getBySlot(1L);

        assertEquals(1, result.size());
        assertEquals(7L, result.get(0).id());
        assertEquals(1L, result.get(0).slotId());
    }
}