package ba.sportsmanager.modules.reservations;

import ba.sportsmanager.exception.ConflictException;
import ba.sportsmanager.exception.ResourceNotFoundException;
import ba.sportsmanager.modules.teams.TeamEntity;
import ba.sportsmanager.modules.teams.TeamService;
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

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
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

        mockSlot = new TimeSlotEntity();
        ReflectionTestUtils.setField(mockSlot, "id", 1L);

        mockUser = new UserEntity();
        ReflectionTestUtils.setField(mockUser, "id", 1L);
    }

    @Test
    void create_Successful_ReturnsResponse() {
        when(teamService.getTeamEntity(1L)).thenReturn(mockTeam);
        when(timeSlotService.getEntity(1L)).thenReturn(mockSlot);
        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
        when(reservationRepository.existsBySlot_IdAndStatusIn(anyLong(), any())).thenReturn(false);
        when(reservationRepository.save(any(ReservationEntity.class))).thenAnswer(i -> i.getArguments()[0]);

        ReservationResponse response = reservationService.create(validRequest);

        assertNotNull(response);
        verify(reservationRepository).save(any(ReservationEntity.class));
    }

    @Test
    void create_SlotAlreadyReserved_ThrowsConflictException() {
        when(teamService.getTeamEntity(1L)).thenReturn(mockTeam);
        when(timeSlotService.getEntity(1L)).thenReturn(mockSlot);
        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
        when(reservationRepository.existsBySlot_IdAndStatusIn(anyLong(), any())).thenReturn(true);

        assertThrows(ConflictException.class, () -> reservationService.create(validRequest));
    }

    @Test
    void approve_Successful_ChangesStatus() {
        ReservationEntity reservation = new ReservationEntity();
        
        // UBRIZGAVAMO SVE POTREBNE RELACIJE DA IZBJEGNEMO NULLPOINTER
        ReflectionTestUtils.setField(reservation, "team", mockTeam);
        ReflectionTestUtils.setField(reservation, "slot", mockSlot);
        ReflectionTestUtils.setField(reservation, "createdBy", mockUser); // OVO JE FALILO
        ReflectionTestUtils.setField(reservation, "status", ReservationStatus.PENDING);

        when(reservationRepository.findById(1L)).thenReturn(Optional.of(reservation));
        when(reservationRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);

        ReservationResponse response = reservationService.approve(1L);

        assertEquals(ReservationStatus.APPROVED, response.status());
        verify(reservationRepository).save(any());
    }

    @Test
    void cancel_NonExistentReservation_ThrowsResourceNotFound() {
        when(reservationRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> reservationService.cancel(99L));
    }
}