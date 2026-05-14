package ba.sportsmanager.modules.results;

import ba.sportsmanager.exception.BadRequestException;
import ba.sportsmanager.exception.ResourceNotFoundException;
import ba.sportsmanager.modules.leagues.LeagueEntity;
import ba.sportsmanager.modules.leagues.LeagueService;
import ba.sportsmanager.modules.leagues.LeagueStatus;
import ba.sportsmanager.modules.teams.TeamEntity;
import ba.sportsmanager.modules.teams.TeamService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDate;
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
        CreateMatchRequest request = new CreateMatchRequest(1L, 1L, 2L, LocalDate.of(2026, 5, 15));
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
        CreateMatchRequest request = new CreateMatchRequest(1L, 1L, 1L, LocalDate.of(2026, 5, 15));

        assertThrows(BadRequestException.class, () -> resultsService.createMatch(request));
        verify(matchRepository, never()).save(any());
    }

    // ── recordResult — win ───────────────────────────────────────────────────

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

    // ── recordResult — ispravka ───────────────────────────────────────────────

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

        // Ispravka: novi rezultat je remi 2:2
        resultsService.recordResult(1L, new RecordResultRequest(2, 2));

        // Stara pobjeda domaćeg je poništena, remi primijenjen
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

    // ── getMatchesByLeague ────────────────────────────────────────────────────

    @Test
    void getMatchesByLeague_WhenLeagueNotFound_ThrowsResourceNotFoundException() {
        when(leagueService.getEntity(99L)).thenThrow(new ResourceNotFoundException("Liga nije pronađena."));

        assertThrows(ResourceNotFoundException.class, () -> resultsService.getMatchesByLeague(99L));
    }
}
