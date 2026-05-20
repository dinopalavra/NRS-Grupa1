package ba.sportsmanager.modules.results;

import ba.sportsmanager.common.SportType;
import ba.sportsmanager.exception.BadRequestException;
import ba.sportsmanager.exception.ConflictException;
import ba.sportsmanager.exception.ResourceNotFoundException;
import ba.sportsmanager.modules.leagues.LeagueEntity;
import ba.sportsmanager.modules.leagues.LeagueService;
import ba.sportsmanager.modules.leagues.LeagueStatus;
import ba.sportsmanager.modules.notifications.NotificationService;
import ba.sportsmanager.modules.teams.TeamEntity;
import ba.sportsmanager.modules.teams.TeamService;
import ba.sportsmanager.modules.timeslots.SlotAvailabilityStatus;
import ba.sportsmanager.modules.timeslots.TimeSlotEntity;
import ba.sportsmanager.modules.timeslots.TimeSlotRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ResultsServiceTest {

    @Mock private MatchRepository matchRepository;
    @Mock private StandingRepository standingRepository;
    @Mock private LeagueService leagueService;
    @Mock private TeamService teamService;
    @Mock private TimeSlotRepository timeSlotRepository;
    @Mock private NotificationService notificationService;

    @InjectMocks private ResultsService resultsService;

    private LeagueEntity mockLeague;
    private TeamEntity homeTeam;
    private TeamEntity awayTeam;
    private MatchEntity mockMatch;

    @BeforeEach
    void setUp() {
        mockLeague = new LeagueEntity();
        ReflectionTestUtils.setField(mockLeague, "id", 1L);
        mockLeague.setLeagueName("Premijer liga");
        mockLeague.setSeason("2025/2026");
        mockLeague.setStatus(LeagueStatus.ACTIVE);
        mockLeague.setSport(SportType.FOOTBALL);

        homeTeam = new TeamEntity();
        ReflectionTestUtils.setField(homeTeam, "id", 1L);
        homeTeam.setName("FK Sarajevo");
        homeTeam.setCity("Sarajevo");
        homeTeam.setCaptainName("Kapiten A");
        homeTeam.setMembersCount(11);

        awayTeam = new TeamEntity();
        ReflectionTestUtils.setField(awayTeam, "id", 2L);
        awayTeam.setName("FK Željezničar");
        awayTeam.setCity("Sarajevo");
        awayTeam.setCaptainName("Kapiten B");
        awayTeam.setMembersCount(11);

        mockMatch = new MatchEntity();
        ReflectionTestUtils.setField(mockMatch, "id", 1L);
        mockMatch.setLeague(mockLeague);
        mockMatch.setHomeTeam(homeTeam);
        mockMatch.setAwayTeam(awayTeam);
        mockMatch.setMatchDate(LocalDate.of(2026, 5, 15));
        mockMatch.setStatus(MatchStatus.SCHEDULED);
    }

    // ── createMatch ──────────────────────────────────────────────────────────

    @Test
    void createMatch_Successful_ReturnsResponse() {
        CreateMatchRequest request = new CreateMatchRequest(
                1L, 1L, 2L, LocalDate.of(2026, 5, 15),
                null, null, null, null, null);
        when(leagueService.getEntity(1L)).thenReturn(mockLeague);
        when(teamService.getTeamEntity(1L)).thenReturn(homeTeam);
        when(teamService.getTeamEntity(2L)).thenReturn(awayTeam);
        when(matchRepository.save(any(MatchEntity.class))).thenAnswer(inv -> {
            MatchEntity m = inv.getArgument(0);
            ReflectionTestUtils.setField(m, "id", 1L);
            return m;
        });

        MatchResponse response = resultsService.createMatch(request);

        assertNotNull(response);
        assertEquals(1L, response.id());
        assertEquals(MatchStatus.SCHEDULED, response.status());
        verify(matchRepository).save(any(MatchEntity.class));
    }

    @Test
    void createMatch_WhenSameTeam_ThrowsBadRequestException() {
        CreateMatchRequest request = new CreateMatchRequest(
                1L, 1L, 1L, LocalDate.of(2026, 5, 15),
                null, null, null, null, null);

        assertThrows(BadRequestException.class, () -> resultsService.createMatch(request));
        verify(matchRepository, never()).save(any());
    }

    // ── createMatch with slotId (US: odabir sale) ─────────────────────────────

    @Test
    void createMatch_WithSlotId_ReservesSlotAndLinksToMatch() {
        TimeSlotEntity slot = new TimeSlotEntity();
        ReflectionTestUtils.setField(slot, "id", 50L);
        slot.setSlotDate(LocalDate.of(2026, 5, 15));
        slot.setStartTime(LocalTime.of(18, 0));
        slot.setEndTime(LocalTime.of(19, 30));
        slot.setLocation("Skenderija");
        slot.setResourceName("Teren 1");
        slot.setSport(SportType.FOOTBALL);
        slot.setAvailabilityStatus(SlotAvailabilityStatus.AVAILABLE);

        CreateMatchRequest request = new CreateMatchRequest(
                1L, 1L, 2L, LocalDate.of(2026, 5, 15),
                null, null, null, null, 50L);

        when(leagueService.getEntity(1L)).thenReturn(mockLeague);
        when(teamService.getTeamEntity(1L)).thenReturn(homeTeam);
        when(teamService.getTeamEntity(2L)).thenReturn(awayTeam);
        when(timeSlotRepository.findById(50L)).thenReturn(Optional.of(slot));
        when(timeSlotRepository.save(any(TimeSlotEntity.class))).thenAnswer(inv -> inv.getArgument(0));
        when(matchRepository.save(any(MatchEntity.class))).thenAnswer(inv -> {
            MatchEntity m = inv.getArgument(0);
            if (m.getId() == null) ReflectionTestUtils.setField(m, "id", 5L);
            return m;
        });

        MatchResponse response = resultsService.createMatch(request);

        assertEquals(SlotAvailabilityStatus.RESERVED, slot.getAvailabilityStatus());
        assertEquals("Skenderija", response.location());
        assertEquals("Teren 1", response.resourceName());
        // Provjera da je slot linkan za utakmicu (slot.leagueMatchId postavljen)
        assertNotNull(slot.getLeagueMatchId());
    }

    @Test
    void createMatch_WithSlotIdForWrongSport_ThrowsBadRequest() {
        TimeSlotEntity slot = new TimeSlotEntity();
        ReflectionTestUtils.setField(slot, "id", 50L);
        slot.setSport(SportType.TENNIS);   // ne odgovara fudbalskoj ligi
        slot.setAvailabilityStatus(SlotAvailabilityStatus.AVAILABLE);

        CreateMatchRequest request = new CreateMatchRequest(
                1L, 1L, 2L, LocalDate.of(2026, 5, 15),
                null, null, null, null, 50L);

        when(leagueService.getEntity(1L)).thenReturn(mockLeague);
        when(teamService.getTeamEntity(1L)).thenReturn(homeTeam);
        when(teamService.getTeamEntity(2L)).thenReturn(awayTeam);
        when(timeSlotRepository.findById(50L)).thenReturn(Optional.of(slot));

        assertThrows(BadRequestException.class, () -> resultsService.createMatch(request));
        verify(matchRepository, never()).save(any());
    }

    @Test
    void createMatch_WithSlotIdNotAvailable_ThrowsConflictException() {
        TimeSlotEntity slot = new TimeSlotEntity();
        ReflectionTestUtils.setField(slot, "id", 50L);
        slot.setSport(SportType.FOOTBALL);
        slot.setAvailabilityStatus(SlotAvailabilityStatus.RESERVED);  // zauzet

        CreateMatchRequest request = new CreateMatchRequest(
                1L, 1L, 2L, LocalDate.of(2026, 5, 15),
                null, null, null, null, 50L);

        when(leagueService.getEntity(1L)).thenReturn(mockLeague);
        when(teamService.getTeamEntity(1L)).thenReturn(homeTeam);
        when(teamService.getTeamEntity(2L)).thenReturn(awayTeam);
        when(timeSlotRepository.findById(50L)).thenReturn(Optional.of(slot));

        assertThrows(ConflictException.class, () -> resultsService.createMatch(request));
    }

    // ── recordResult ──────────────────────────────────────────────────────────

    @Test
    void recordResult_HomeWin_UpdatesStandingsCorrectly() {
        RecordResultRequest request = new RecordResultRequest(3, 1);

        StandingEntity homeStanding = new StandingEntity();
        homeStanding.setLeague(mockLeague);
        homeStanding.setTeam(homeTeam);

        StandingEntity awayStanding = new StandingEntity();
        awayStanding.setLeague(mockLeague);
        awayStanding.setTeam(awayTeam);

        when(matchRepository.findById(1L)).thenReturn(Optional.of(mockMatch));
        when(standingRepository.findByLeague_IdAndTeam_Id(1L, 1L)).thenReturn(Optional.of(homeStanding));
        when(standingRepository.findByLeague_IdAndTeam_Id(1L, 2L)).thenReturn(Optional.of(awayStanding));
        when(matchRepository.save(any())).thenReturn(mockMatch);

        resultsService.recordResult(1L, request);

        assertEquals(1, homeStanding.getWins());
        assertEquals(3, homeStanding.getPoints());
        assertEquals(3, homeStanding.getGoalsFor());
        assertEquals(0, awayStanding.getWins());
        assertEquals(0, awayStanding.getPoints());
        assertEquals(1, awayStanding.getLosses());
    }

    @Test
    void recordResult_Draw_GivesOnePointEach() {
        RecordResultRequest request = new RecordResultRequest(1, 1);

        StandingEntity homeStanding = new StandingEntity();
        homeStanding.setLeague(mockLeague);
        homeStanding.setTeam(homeTeam);

        StandingEntity awayStanding = new StandingEntity();
        awayStanding.setLeague(mockLeague);
        awayStanding.setTeam(awayTeam);

        when(matchRepository.findById(1L)).thenReturn(Optional.of(mockMatch));
        when(standingRepository.findByLeague_IdAndTeam_Id(1L, 1L)).thenReturn(Optional.of(homeStanding));
        when(standingRepository.findByLeague_IdAndTeam_Id(1L, 2L)).thenReturn(Optional.of(awayStanding));
        when(matchRepository.save(any())).thenReturn(mockMatch);

        resultsService.recordResult(1L, request);

        assertEquals(1, homeStanding.getPoints());
        assertEquals(1, homeStanding.getDraws());
        assertEquals(1, awayStanding.getPoints());
        assertEquals(1, awayStanding.getDraws());
    }

    @Test
    void recordResult_AwayWin_UpdatesStandingsCorrectly() {
        RecordResultRequest request = new RecordResultRequest(0, 2);

        StandingEntity homeStanding = new StandingEntity();
        homeStanding.setLeague(mockLeague);
        homeStanding.setTeam(homeTeam);

        StandingEntity awayStanding = new StandingEntity();
        awayStanding.setLeague(mockLeague);
        awayStanding.setTeam(awayTeam);

        when(matchRepository.findById(1L)).thenReturn(Optional.of(mockMatch));
        when(standingRepository.findByLeague_IdAndTeam_Id(1L, 1L)).thenReturn(Optional.of(homeStanding));
        when(standingRepository.findByLeague_IdAndTeam_Id(1L, 2L)).thenReturn(Optional.of(awayStanding));
        when(matchRepository.save(any())).thenReturn(mockMatch);

        resultsService.recordResult(1L, request);

        assertEquals(0, homeStanding.getPoints());
        assertEquals(1, homeStanding.getLosses());
        assertEquals(3, awayStanding.getPoints());
        assertEquals(1, awayStanding.getWins());
    }

    @Test
    void recordResult_WhenMatchAlreadyCompleted_UndoesOldStatsAndAppliesNew() {
        mockMatch.setStatus(MatchStatus.COMPLETED);
        mockMatch.setHomeScore(1);
        mockMatch.setAwayScore(0);

        StandingEntity homeStanding = new StandingEntity();
        homeStanding.setLeague(mockLeague);
        homeStanding.setTeam(homeTeam);
        homeStanding.setPlayed(1);
        homeStanding.setWins(1);
        homeStanding.setPoints(3);
        homeStanding.setGoalsFor(1);
        homeStanding.setGoalsAgainst(0);

        StandingEntity awayStanding = new StandingEntity();
        awayStanding.setLeague(mockLeague);
        awayStanding.setTeam(awayTeam);
        awayStanding.setPlayed(1);
        awayStanding.setLosses(1);
        awayStanding.setGoalsFor(0);
        awayStanding.setGoalsAgainst(1);

        when(matchRepository.findById(1L)).thenReturn(Optional.of(mockMatch));
        when(standingRepository.findByLeague_IdAndTeam_Id(1L, 1L)).thenReturn(Optional.of(homeStanding));
        when(standingRepository.findByLeague_IdAndTeam_Id(1L, 2L)).thenReturn(Optional.of(awayStanding));
        when(matchRepository.save(any())).thenReturn(mockMatch);

        resultsService.recordResult(1L, new RecordResultRequest(2, 2));

        assertEquals(0, homeStanding.getWins());
        assertEquals(1, homeStanding.getDraws());
        assertEquals(1, homeStanding.getPoints());
        assertEquals(0, awayStanding.getLosses());
        assertEquals(1, awayStanding.getDraws());
        assertEquals(1, awayStanding.getPoints());
    }

    @Test
    void recordResult_WhenMatchNotFound_ThrowsResourceNotFoundException() {
        when(matchRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class,
                () -> resultsService.recordResult(99L, new RecordResultRequest(1, 0)));
    }

    @Test
    void getMatchesByLeague_WhenLeagueNotFound_ThrowsResourceNotFoundException() {
        when(leagueService.getEntity(99L)).thenThrow(new ResourceNotFoundException("Liga nije pronađena."));

        assertThrows(ResourceNotFoundException.class, () -> resultsService.getMatchesByLeague(99L));
    }
}
