package ba.sportsmanager.modules.teams;

import ba.sportsmanager.common.SportType;
import ba.sportsmanager.exception.ResourceNotFoundException;
import ba.sportsmanager.modules.leagues.LeagueEntity;
import ba.sportsmanager.modules.results.MatchEntity;
import ba.sportsmanager.modules.results.MatchRepository;
import ba.sportsmanager.modules.results.MatchStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TeamServiceTest {

    @Mock private TeamRepository teamRepository;
    @Mock private MatchRepository matchRepository;

    @InjectMocks private TeamService teamService;

    private TeamEntity teamA;
    private TeamEntity teamB;
    private LeagueEntity league;

    @BeforeEach
    void setUp() {
        teamA = new TeamEntity();
        ReflectionTestUtils.setField(teamA, "id", 1L);
        teamA.setName("Tim A");
        teamA.setSport(SportType.FOOTBALL);

        teamB = new TeamEntity();
        ReflectionTestUtils.setField(teamB, "id", 2L);
        teamB.setName("Tim B");
        teamB.setSport(SportType.FOOTBALL);

        league = new LeagueEntity();
        ReflectionTestUtils.setField(league, "id", 100L);
        league.setLeagueName("Liga 1");
        league.setSport(SportType.FOOTBALL);
    }

    private MatchEntity completedMatch(long id, TeamEntity home, TeamEntity away,
                                       int hScore, int aScore, LocalDate date) {
        MatchEntity m = new MatchEntity();
        ReflectionTestUtils.setField(m, "id", id);
        m.setLeague(league);
        m.setHomeTeam(home);
        m.setAwayTeam(away);
        m.setMatchDate(date);
        m.setStatus(MatchStatus.COMPLETED);
        m.setHomeScore(hScore);
        m.setAwayScore(aScore);
        return m;
    }

    @Test
    void getTeamStats_NoMatches_ReturnsZeroes() {
        when(teamRepository.findById(1L)).thenReturn(Optional.of(teamA));
        when(matchRepository.findByHomeTeam_IdOrAwayTeam_IdOrderByMatchDateDesc(1L, 1L))
                .thenReturn(List.of());

        TeamStatsResponse stats = teamService.getTeamStats(1L, null);

        assertEquals(0, stats.matchesPlayed());
        assertEquals(0, stats.wins());
        assertEquals(0, stats.draws());
        assertEquals(0, stats.losses());
        assertEquals(0, stats.points());
        assertTrue(stats.last5Form().isEmpty());
    }

    @Test
    void getTeamStats_ComputesWinsDrawsLossesAndPoints() {
        // Tim A: 2 pobjede, 1 remi, 1 poraz = 2*3 + 1*1 = 7 bodova
        // Dato: 5+1+0+0 = 6, Primljeno: 1+1+2+3 = 7
        MatchEntity m1 = completedMatch(1L, teamA, teamB, 3, 1, LocalDate.of(2026, 5, 1));   // W
        MatchEntity m2 = completedMatch(2L, teamB, teamA, 1, 2, LocalDate.of(2026, 5, 5));   // W (Tim A away)
        MatchEntity m3 = completedMatch(3L, teamA, teamB, 1, 1, LocalDate.of(2026, 5, 8));   // D
        MatchEntity m4 = completedMatch(4L, teamA, teamB, 0, 3, LocalDate.of(2026, 5, 12));  // L
        // Repo vraća redoslijed desc po datumu
        when(teamRepository.findById(1L)).thenReturn(Optional.of(teamA));
        when(matchRepository.findByHomeTeam_IdOrAwayTeam_IdOrderByMatchDateDesc(1L, 1L))
                .thenReturn(List.of(m4, m3, m2, m1));

        TeamStatsResponse stats = teamService.getTeamStats(1L, null);

        assertEquals(4, stats.matchesPlayed());
        assertEquals(2, stats.wins());
        assertEquals(1, stats.draws());
        assertEquals(1, stats.losses());
        assertEquals(6, stats.goalsFor());
        assertEquals(6, stats.goalsAgainst());
        assertEquals(0, stats.goalDifference());
        assertEquals(7, stats.points());

        // Forma — prvi je najnoviji (poraz), drugi remi, treci pobjeda, cetvrti pobjeda
        assertEquals(List.of("L", "D", "W", "W"), stats.last5Form());
    }

    @Test
    void getTeamStats_FiltersByLeague_WhenLeagueIdProvided() {
        LeagueEntity otherLeague = new LeagueEntity();
        ReflectionTestUtils.setField(otherLeague, "id", 200L);
        otherLeague.setLeagueName("Druga liga");

        MatchEntity inLeague = completedMatch(1L, teamA, teamB, 3, 0, LocalDate.of(2026, 5, 1));
        MatchEntity otherLeagueMatch = completedMatch(2L, teamA, teamB, 0, 5, LocalDate.of(2026, 5, 2));
        otherLeagueMatch.setLeague(otherLeague);

        when(teamRepository.findById(1L)).thenReturn(Optional.of(teamA));
        when(matchRepository.findByHomeTeam_IdOrAwayTeam_IdOrderByMatchDateDesc(1L, 1L))
                .thenReturn(List.of(otherLeagueMatch, inLeague));

        TeamStatsResponse stats = teamService.getTeamStats(1L, 100L);

        // Samo utakmica iz lige 100L bi trebala biti uračunata
        assertEquals(1, stats.matchesPlayed());
        assertEquals(1, stats.wins());
        assertEquals(3, stats.points());
        assertEquals(100L, stats.leagueId());
        assertEquals("Liga 1", stats.leagueName());
    }

    @Test
    void getTeamStats_IgnoresScheduledMatches() {
        MatchEntity scheduled = completedMatch(1L, teamA, teamB, 0, 0, LocalDate.of(2026, 5, 1));
        scheduled.setStatus(MatchStatus.SCHEDULED);
        scheduled.setHomeScore(null);
        scheduled.setAwayScore(null);

        when(teamRepository.findById(1L)).thenReturn(Optional.of(teamA));
        when(matchRepository.findByHomeTeam_IdOrAwayTeam_IdOrderByMatchDateDesc(1L, 1L))
                .thenReturn(List.of(scheduled));

        TeamStatsResponse stats = teamService.getTeamStats(1L, null);

        assertEquals(0, stats.matchesPlayed());
    }

    @Test
    void getTeamStats_Last5Form_LimitedToFive() {
        // 6 utakmica - forma treba imati samo prvih 5
        when(teamRepository.findById(1L)).thenReturn(Optional.of(teamA));
        when(matchRepository.findByHomeTeam_IdOrAwayTeam_IdOrderByMatchDateDesc(1L, 1L))
                .thenReturn(List.of(
                        completedMatch(1L, teamA, teamB, 1, 0, LocalDate.of(2026, 5, 6)),
                        completedMatch(2L, teamA, teamB, 1, 0, LocalDate.of(2026, 5, 5)),
                        completedMatch(3L, teamA, teamB, 1, 0, LocalDate.of(2026, 5, 4)),
                        completedMatch(4L, teamA, teamB, 1, 0, LocalDate.of(2026, 5, 3)),
                        completedMatch(5L, teamA, teamB, 1, 0, LocalDate.of(2026, 5, 2)),
                        completedMatch(6L, teamA, teamB, 1, 0, LocalDate.of(2026, 5, 1))
                ));

        TeamStatsResponse stats = teamService.getTeamStats(1L, null);

        assertEquals(6, stats.matchesPlayed());
        assertEquals(5, stats.last5Form().size());
    }

    @Test
    void getTeamStats_WhenTeamNotFound_ThrowsResourceNotFoundException() {
        when(teamRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class,
                () -> teamService.getTeamStats(99L, null));
    }
}
