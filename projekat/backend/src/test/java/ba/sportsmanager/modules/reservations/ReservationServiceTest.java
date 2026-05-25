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
import ba.sportsmanager.modules.timeslots.TimeSlotService;
import ba.sportsmanager.modules.users.UserEntity;
import ba.sportsmanager.modules.users.UserRepository;
import ba.sportsmanager.modules.users.UserRole;
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
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReservationServiceTest {

    @Mock private ReservationRepository reservationRepository;
    @Mock private TeamService teamService;
    @Mock private TimeSlotService timeSlotService;
    @Mock private UserRepository userRepository;
    @Mock private NotificationService notificationService;
    @Mock private TeamMemberRepository teamMemberRepository;

    @InjectMocks private ReservationService reservationService;

    private CreateReservationRequest validRequest;
    private TeamEntity mockTeam;
    private TimeSlotEntity mockSlot;
    private UserEntity mockUser;

    @BeforeEach
    void setUp() {
        validRequest = new CreateReservationRequest(1L, 1L, 1L, "Note", null, null);

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
    void create_Successful_ReturnsResponseAndNotifiesAdmins() {
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
        // Notifikacija ide administratorima
        verify(notificationService).createForRole(eq(UserRole.ADMIN), anyString(), eq(NotificationType.RESERVATION_CREATED));
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
    void approve_Successful_ChangesStatusAndNotifiesCreator() {
        ReservationEntity reservation = pendingReservation(1L);

        when(reservationRepository.findById(1L)).thenReturn(Optional.of(reservation));
        when(reservationRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);

        ReservationResponse response = reservationService.approve(1L);

        assertEquals(ReservationStatus.APPROVED, response.status());
        assertEquals(SlotAvailabilityStatus.RESERVED, mockSlot.getAvailabilityStatus());
        verify(timeSlotService).save(mockSlot);
        verify(notificationService).createForUser(eq(1L), anyString(), eq(NotificationType.RESERVATION_APPROVED));
    }

    @Test
    void approve_WhenStatusIsNotPending_ThrowsBadRequestException() {
        ReservationEntity reservation = new ReservationEntity();
        ReflectionTestUtils.setField(reservation, "status", ReservationStatus.APPROVED);

        when(reservationRepository.findById(1L)).thenReturn(Optional.of(reservation));

        assertThrows(BadRequestException.class, () -> reservationService.approve(1L));
    }

    @Test
    void reject_Successful_ChangesStatusAndNotifiesCreator() {
        ReservationEntity reservation = pendingReservation(2L);

        when(reservationRepository.findById(2L)).thenReturn(Optional.of(reservation));
        when(reservationRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);

        ReservationResponse response = reservationService.reject(2L);

        assertEquals(ReservationStatus.REJECTED, response.status());
        assertEquals(SlotAvailabilityStatus.AVAILABLE, mockSlot.getAvailabilityStatus());
        verify(timeSlotService).save(mockSlot);
        verify(notificationService).createForUser(eq(1L), anyString(), eq(NotificationType.RESERVATION_REJECTED));
    }

    @Test
    void cancel_NonExistentReservation_ThrowsResourceNotFound() {
        when(reservationRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> reservationService.cancel(99L));
    }

    @Test
    void cancel_Successful_FreesSlotAndNotifiesCreator() {
        ReservationEntity reservation = pendingReservation(3L);

        when(reservationRepository.findById(3L)).thenReturn(Optional.of(reservation));
        when(reservationRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);

        ReservationResponse response = reservationService.cancel(3L);

        assertEquals(ReservationStatus.CANCELLED, response.status());
        assertEquals(SlotAvailabilityStatus.AVAILABLE, mockSlot.getAvailabilityStatus());
        verify(notificationService).createForUser(eq(1L), anyString(), eq(NotificationType.RESERVATION_CANCELLED));
    }

    @Test
    void cancel_WhenSlotLinkedToLeagueMatch_ThrowsBadRequest() {
        ReservationEntity reservation = pendingReservation(4L);
        mockSlot.setLeagueMatchId(77L);

        when(reservationRepository.findById(4L)).thenReturn(Optional.of(reservation));

        assertThrows(BadRequestException.class, () -> reservationService.cancel(4L));
        verify(reservationRepository, never()).save(any());
        verifyNoInteractions(notificationService);
    }

    // ── reschedule ────────────────────────────────────────────────────────────

    @Test
    void reschedule_Successful_MovesReservationToNewSlot() {
        ReservationEntity reservation = pendingReservation(10L);

        TimeSlotEntity newSlot = new TimeSlotEntity();
        ReflectionTestUtils.setField(newSlot, "id", 2L);
        newSlot.setSlotDate(LocalDate.of(2026, 5, 12));
        newSlot.setStartTime(LocalTime.of(19, 0));
        newSlot.setEndTime(LocalTime.of(20, 0));
        newSlot.setLocation("Dvorana 2");
        newSlot.setResourceName("Teren B");
        newSlot.setAvailabilityStatus(SlotAvailabilityStatus.AVAILABLE);

        when(reservationRepository.findById(10L)).thenReturn(Optional.of(reservation));
        when(timeSlotService.getEntity(2L)).thenReturn(newSlot);
        when(reservationRepository.existsBySlot_IdAndStatusIn(eq(2L), any())).thenReturn(false);
        when(reservationRepository.existsOverlappingActiveReservation(
                anyString(), anyString(), any(), any(), any(), anyLong(), anyCollection()))
                .thenReturn(false);
        when(reservationRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);

        ReservationResponse response = reservationService.reschedule(
                10L, new RescheduleReservationRequest(2L, null));

        // Stari slot oslobođen
        assertEquals(SlotAvailabilityStatus.AVAILABLE, mockSlot.getAvailabilityStatus());
        // Reservation pokazuje na novi slot
        assertEquals(2L, response.slotId());
        verify(notificationService).createForUser(eq(1L), anyString(), eq(NotificationType.RESERVATION_RESCHEDULED));
    }

    @Test
    void reschedule_WhenLeagueLinked_ThrowsBadRequest() {
        ReservationEntity reservation = pendingReservation(11L);
        mockSlot.setLeagueMatchId(55L);

        when(reservationRepository.findById(11L)).thenReturn(Optional.of(reservation));

        assertThrows(BadRequestException.class,
                () -> reservationService.reschedule(11L, new RescheduleReservationRequest(2L, null)));
        verifyNoInteractions(notificationService);
    }

    @Test
    void reschedule_WhenStatusIsCancelled_ThrowsBadRequest() {
        ReservationEntity reservation = pendingReservation(12L);
        ReflectionTestUtils.setField(reservation, "status", ReservationStatus.CANCELLED);

        when(reservationRepository.findById(12L)).thenReturn(Optional.of(reservation));

        assertThrows(BadRequestException.class,
                () -> reservationService.reschedule(12L, new RescheduleReservationRequest(2L, null)));
    }

    @Test
    void reschedule_WhenNewSlotSameAsOld_ThrowsBadRequest() {
        ReservationEntity reservation = pendingReservation(13L);

        when(reservationRepository.findById(13L)).thenReturn(Optional.of(reservation));
        when(timeSlotService.getEntity(1L)).thenReturn(mockSlot);

        assertThrows(BadRequestException.class,
                () -> reservationService.reschedule(13L, new RescheduleReservationRequest(1L, null)));
    }

    @Test
    void getBySlot_ReturnsMappedReservations() {
        ReservationEntity reservation = pendingReservation(7L);
        when(reservationRepository.findBySlot_Id(1L)).thenReturn(List.of(reservation));

        List<ReservationResponse> result = reservationService.getBySlot(1L);

        assertEquals(1, result.size());
        assertEquals(7L, result.get(0).id());
        assertEquals(1L, result.get(0).slotId());
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Sprint 9: Notifikacije svim članovima tima (US9-6)
    // ─────────────────────────────────────────────────────────────────────────

    private TeamMemberEntity makeMember(long userId, String username) {
        UserEntity u = new UserEntity();
        ReflectionTestUtils.setField(u, "id", userId);
        u.setUsername(username);
        u.setFullName(username);
        TeamMemberEntity m = new TeamMemberEntity(mockTeam, u, null, null);
        ReflectionTestUtils.setField(m, "id", userId * 10);
        return m;
    }

    @Test
    void create_NotifiesAllTeamMembersExceptCreator() {
        TeamMemberEntity m1 = makeMember(2L, "player2");
        TeamMemberEntity m2 = makeMember(3L, "player3");
        TeamMemberEntity creatorMember = makeMember(1L, "amel");  // == mockUser.id

        when(teamService.getTeamEntity(1L)).thenReturn(mockTeam);
        when(timeSlotService.getEntity(1L)).thenReturn(mockSlot);
        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
        when(reservationRepository.existsBySlot_IdAndStatusIn(eq(1L), any())).thenReturn(false);
        when(reservationRepository.existsOverlappingActiveReservation(
                anyString(), anyString(), any(), any(), any(), anyLong(), anyCollection()))
                .thenReturn(false);
        when(reservationRepository.save(any(ReservationEntity.class))).thenAnswer(i -> {
            ReservationEntity e = i.getArgument(0);
            ReflectionTestUtils.setField(e, "id", 100L);
            return e;
        });
        when(teamMemberRepository.findByTeam_IdOrderByJerseyNumberAscIdAsc(1L))
                .thenReturn(List.of(m1, m2, creatorMember));

        reservationService.create(validRequest);

        // Notifikuje player2 i player3 (NE kreatora user 1)
        verify(notificationService).createForUser(eq(2L), anyString(), eq(NotificationType.RESERVATION_CREATED));
        verify(notificationService).createForUser(eq(3L), anyString(), eq(NotificationType.RESERVATION_CREATED));
        verify(notificationService, never()).createForUser(eq(1L), anyString(), eq(NotificationType.RESERVATION_CREATED));
    }

    @Test
    void approve_NotifiesTeamMembers() {
        ReservationEntity reservation = pendingReservation(50L);
        TeamMemberEntity m1 = makeMember(5L, "player5");

        when(reservationRepository.findById(50L)).thenReturn(Optional.of(reservation));
        when(reservationRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);
        when(teamMemberRepository.findByTeam_IdOrderByJerseyNumberAscIdAsc(1L))
                .thenReturn(List.of(m1));

        reservationService.approve(50L);

        verify(notificationService).createForUser(eq(5L), anyString(), eq(NotificationType.RESERVATION_APPROVED));
    }

    @Test
    void cancel_NotifiesTeamMembers() {
        ReservationEntity reservation = pendingReservation(60L);
        TeamMemberEntity m1 = makeMember(7L, "player7");

        when(reservationRepository.findById(60L)).thenReturn(Optional.of(reservation));
        when(reservationRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);
        when(teamMemberRepository.findByTeam_IdOrderByJerseyNumberAscIdAsc(1L))
                .thenReturn(List.of(m1));

        reservationService.cancel(60L);

        verify(notificationService).createForUser(eq(7L), anyString(), eq(NotificationType.RESERVATION_CANCELLED));
    }

    // helper
    private ReservationEntity pendingReservation(long id) {
        ReservationEntity reservation = new ReservationEntity();
        ReflectionTestUtils.setField(reservation, "id", id);
        ReflectionTestUtils.setField(reservation, "team", mockTeam);
        ReflectionTestUtils.setField(reservation, "slot", mockSlot);
        ReflectionTestUtils.setField(reservation, "createdBy", mockUser);
        ReflectionTestUtils.setField(reservation, "status", ReservationStatus.PENDING);
        return reservation;
    }
}
