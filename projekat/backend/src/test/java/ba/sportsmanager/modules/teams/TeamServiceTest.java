package ba.sportsmanager.modules.teams;

import ba.sportsmanager.common.SportType;
import ba.sportsmanager.exception.BadRequestException;
import ba.sportsmanager.exception.ResourceNotFoundException;
import ba.sportsmanager.modules.leagues.LeagueEntity;
import ba.sportsmanager.modules.results.MatchEntity;
import ba.sportsmanager.modules.results.MatchRepository;
import ba.sportsmanager.modules.results.MatchStatus;
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
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TeamServiceTest {

    @Mock private TeamRepository teamRepository;
    @Mock private MatchRepository matchRepository;
    @Mock private TeamMemberRepository teamMemberRepository;
    @Mock private UserRepository userRepository;

    @InjectMocks private TeamService teamService;

    private TeamEntity teamA;
    private TeamEntity teamB;
    private LeagueEntity league;
    private UserEntity captain;
    private UserEntity playerA;

    @BeforeEach
    void setUp() {
        teamA = new TeamEntity();
        ReflectionTestUtils.setField(teamA, "id", 1L);
        teamA.setName("Tim A");
        teamA.setSport(SportType.FOOTBALL);
        teamA.setMaxMembers(11);

        teamB = new TeamEntity();
        ReflectionTestUtils.setField(teamB, "id", 2L);
        teamB.setName("Tim B");
        teamB.setSport(SportType.FOOTBALL);
        teamB.setMaxMembers(11);

        league = new LeagueEntity();
        ReflectionTestUtils.setField(league, "id", 100L);
        league.setLeagueName("Liga 1");
        league.setSport(SportType.FOOTBALL);

        captain = new UserEntity();
        ReflectionTestUtils.setField(captain, "id", 50L);
        captain.setFullName("Kapiten Kapitenovic");
        captain.setUsername("captain1");
        captain.setRole(UserRole.CAPTAIN);
        captain.setSport(SportType.FOOTBALL);

        playerA = new UserEntity();
        ReflectionTestUtils.setField(playerA, "id", 60L);
        playerA.setFullName("Igrac A");
        playerA.setUsername("playerA");
        playerA.setRole(UserRole.PLAYER);
        playerA.setSport(SportType.FOOTBALL);
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

    // ── Postojeci team-stats testovi (Sprint 8) ─────────────────────────────

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
        MatchEntity m1 = completedMatch(1L, teamA, teamB, 3, 1, LocalDate.of(2026, 5, 1));
        MatchEntity m2 = completedMatch(2L, teamB, teamA, 1, 2, LocalDate.of(2026, 5, 5));
        MatchEntity m3 = completedMatch(3L, teamA, teamB, 1, 1, LocalDate.of(2026, 5, 8));
        MatchEntity m4 = completedMatch(4L, teamA, teamB, 0, 3, LocalDate.of(2026, 5, 12));
        when(teamRepository.findById(1L)).thenReturn(Optional.of(teamA));
        when(matchRepository.findByHomeTeam_IdOrAwayTeam_IdOrderByMatchDateDesc(1L, 1L))
                .thenReturn(List.of(m4, m3, m2, m1));

        TeamStatsResponse stats = teamService.getTeamStats(1L, null);

        assertEquals(4, stats.matchesPlayed());
        assertEquals(2, stats.wins());
        assertEquals(1, stats.draws());
        assertEquals(1, stats.losses());
        assertEquals(7, stats.points());
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

        assertEquals(1, stats.matchesPlayed());
        assertEquals(1, stats.wins());
        assertEquals(3, stats.points());
        assertEquals(100L, stats.leagueId());
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

    // ── Sprint 9: createTeam validacije (US9-4) ─────────────────────────────

    @Test
    void createTeam_Successful_SavesTeamWithCaptain() {
        CreateTeamRequest req = new CreateTeamRequest(
                "Novi Tim", "Sarajevo", 50L, 15, SportType.FOOTBALL);

        when(userRepository.findById(50L)).thenReturn(Optional.of(captain));
        when(teamRepository.existsByCaptain_Id(50L)).thenReturn(false);
        when(teamRepository.save(any(TeamEntity.class))).thenAnswer(inv -> {
            TeamEntity t = inv.getArgument(0);
            ReflectionTestUtils.setField(t, "id", 99L);
            return t;
        });

        TeamResponse resp = teamService.createTeam(req);

        assertNotNull(resp);
        assertEquals("Novi Tim", resp.name());
        assertEquals(50L, resp.captainUserId());
        assertEquals(0, resp.membersCount());
        assertEquals(15, resp.maxMembers());
        assertEquals(SportType.FOOTBALL, resp.sport());
    }

    @Test
    void createTeam_WhenCaptainUserNotFound_ThrowsResourceNotFound() {
        CreateTeamRequest req = new CreateTeamRequest(
                "Novi Tim", "Sarajevo", 999L, 15, SportType.FOOTBALL);
        when(userRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> teamService.createTeam(req));
        verify(teamRepository, never()).save(any());
    }

    @Test
    void createTeam_WhenUserIsNotCaptainRole_ThrowsBadRequest() {
        UserEntity player = new UserEntity();
        ReflectionTestUtils.setField(player, "id", 70L);
        player.setRole(UserRole.PLAYER);
        player.setSport(SportType.FOOTBALL);

        CreateTeamRequest req = new CreateTeamRequest(
                "Novi Tim", "Sarajevo", 70L, 15, SportType.FOOTBALL);
        when(userRepository.findById(70L)).thenReturn(Optional.of(player));

        assertThrows(BadRequestException.class, () -> teamService.createTeam(req));
        verify(teamRepository, never()).save(any());
    }

    @Test
    void createTeam_WhenCaptainSportMismatch_ThrowsBadRequest() {
        captain.setSport(SportType.BASKETBALL);
        CreateTeamRequest req = new CreateTeamRequest(
                "Novi Tim", "Sarajevo", 50L, 15, SportType.FOOTBALL);
        when(userRepository.findById(50L)).thenReturn(Optional.of(captain));

        assertThrows(BadRequestException.class, () -> teamService.createTeam(req));
        verify(teamRepository, never()).save(any());
    }

    @Test
    void createTeam_WhenCaptainAlreadyOwnsAnotherTeam_ThrowsBadRequest() {
        CreateTeamRequest req = new CreateTeamRequest(
                "Drugi Tim", "Sarajevo", 50L, 15, SportType.FOOTBALL);
        when(userRepository.findById(50L)).thenReturn(Optional.of(captain));
        when(teamRepository.existsByCaptain_Id(50L)).thenReturn(true);

        assertThrows(BadRequestException.class, () -> teamService.createTeam(req));
        verify(teamRepository, never()).save(any());
    }

    // ── Sprint 9: addMember validacije (US9-1, US9-5, US9-6, US9-7) ─────────

    @Test
    void addMember_Successful_SavesAndUpdatesCount() {
        AddTeamMemberRequest req = new AddTeamMemberRequest(60L, 10, "Napadač");

        when(teamRepository.findById(1L)).thenReturn(Optional.of(teamA));
        when(userRepository.findById(60L)).thenReturn(Optional.of(playerA));
        when(teamMemberRepository.findByUser_Id(60L)).thenReturn(Optional.empty());
        when(teamMemberRepository.countByTeam_Id(1L)).thenReturn(0L).thenReturn(1L);
        when(teamMemberRepository.existsByTeam_IdAndJerseyNumber(1L, 10)).thenReturn(false);
        when(teamMemberRepository.save(any(TeamMemberEntity.class))).thenAnswer(inv -> {
            TeamMemberEntity m = inv.getArgument(0);
            ReflectionTestUtils.setField(m, "id", 500L);
            return m;
        });

        TeamMemberResponse resp = teamService.addMember(1L, req);

        assertNotNull(resp);
        assertEquals(60L, resp.userId());
        assertEquals(10, resp.jerseyNumber());
        assertEquals("Napadač", resp.position());
        verify(teamRepository).save(teamA);
        assertEquals(1, teamA.getMembersCount());
    }

    @Test
    void addMember_WhenUserAlreadyInAnotherTeam_ThrowsBadRequest() {
        AddTeamMemberRequest req = new AddTeamMemberRequest(60L, 10, "Napadač");

        TeamMemberEntity existing = new TeamMemberEntity(teamB, playerA, 7, "Vezni");
        ReflectionTestUtils.setField(existing, "id", 200L);

        when(teamRepository.findById(1L)).thenReturn(Optional.of(teamA));
        when(userRepository.findById(60L)).thenReturn(Optional.of(playerA));
        when(teamMemberRepository.findByUser_Id(60L)).thenReturn(Optional.of(existing));

        BadRequestException ex = assertThrows(BadRequestException.class,
                () -> teamService.addMember(1L, req));
        assertTrue(ex.getMessage().contains("Tim B"));
        verify(teamMemberRepository, never()).save(any());
    }

    @Test
    void addMember_WhenUserAlreadyInSameTeam_ThrowsBadRequest() {
        AddTeamMemberRequest req = new AddTeamMemberRequest(60L, 10, "Napadač");

        TeamMemberEntity existing = new TeamMemberEntity(teamA, playerA, 7, "Vezni");
        ReflectionTestUtils.setField(existing, "id", 200L);

        when(teamRepository.findById(1L)).thenReturn(Optional.of(teamA));
        when(userRepository.findById(60L)).thenReturn(Optional.of(playerA));
        when(teamMemberRepository.findByUser_Id(60L)).thenReturn(Optional.of(existing));

        assertThrows(BadRequestException.class, () -> teamService.addMember(1L, req));
        verify(teamMemberRepository, never()).save(any());
    }

    @Test
    void addMember_WhenSportMismatch_ThrowsBadRequest() {
        playerA.setSport(SportType.BASKETBALL);
        AddTeamMemberRequest req = new AddTeamMemberRequest(60L, 10, null);

        when(teamRepository.findById(1L)).thenReturn(Optional.of(teamA));
        when(userRepository.findById(60L)).thenReturn(Optional.of(playerA));
        when(teamMemberRepository.findByUser_Id(60L)).thenReturn(Optional.empty());

        BadRequestException ex = assertThrows(BadRequestException.class,
                () -> teamService.addMember(1L, req));
        assertTrue(ex.getMessage().toLowerCase().contains("sport"));
        verify(teamMemberRepository, never()).save(any());
    }

    @Test
    void addMember_WhenTeamIsFull_ThrowsBadRequest() {
        teamA.setMaxMembers(3);
        AddTeamMemberRequest req = new AddTeamMemberRequest(60L, 10, null);

        when(teamRepository.findById(1L)).thenReturn(Optional.of(teamA));
        when(userRepository.findById(60L)).thenReturn(Optional.of(playerA));
        when(teamMemberRepository.findByUser_Id(60L)).thenReturn(Optional.empty());
        when(teamMemberRepository.countByTeam_Id(1L)).thenReturn(3L);

        BadRequestException ex = assertThrows(BadRequestException.class,
                () -> teamService.addMember(1L, req));
        assertTrue(ex.getMessage().contains("popunjen"));
        verify(teamMemberRepository, never()).save(any());
    }

    @Test
    void addMember_WhenJerseyNumberTaken_ThrowsBadRequest() {
        AddTeamMemberRequest req = new AddTeamMemberRequest(60L, 10, null);

        when(teamRepository.findById(1L)).thenReturn(Optional.of(teamA));
        when(userRepository.findById(60L)).thenReturn(Optional.of(playerA));
        when(teamMemberRepository.findByUser_Id(60L)).thenReturn(Optional.empty());
        when(teamMemberRepository.countByTeam_Id(1L)).thenReturn(0L);
        when(teamMemberRepository.existsByTeam_IdAndJerseyNumber(1L, 10)).thenReturn(true);

        BadRequestException ex = assertThrows(BadRequestException.class,
                () -> teamService.addMember(1L, req));
        assertTrue(ex.getMessage().contains("dresa"));
        verify(teamMemberRepository, never()).save(any());
    }

    // ── Sprint 9: removeMember ──────────────────────────────────────────────

    @Test
    void removeMember_Successful_DeletesAndUpdatesCount() {
        TeamMemberEntity member = new TeamMemberEntity(teamA, playerA, 10, "Napadač");
        ReflectionTestUtils.setField(member, "id", 500L);
        teamA.setMembersCount(1);

        when(teamRepository.findById(1L)).thenReturn(Optional.of(teamA));
        when(teamMemberRepository.findByTeam_IdAndUser_Id(1L, 60L)).thenReturn(Optional.of(member));
        when(teamMemberRepository.countByTeam_Id(1L)).thenReturn(0L);

        teamService.removeMember(1L, 60L);

        verify(teamMemberRepository).delete(member);
        verify(teamRepository).save(teamA);
        assertEquals(0, teamA.getMembersCount());
    }

    @Test
    void removeMember_WhenNotMember_ThrowsResourceNotFound() {
        when(teamRepository.findById(1L)).thenReturn(Optional.of(teamA));
        when(teamMemberRepository.findByTeam_IdAndUser_Id(1L, 60L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class,
                () -> teamService.removeMember(1L, 60L));
        verify(teamMemberRepository, never()).delete(any());
    }

    // ── Sprint 9: getMembershipOfUser (US9-8) ───────────────────────────────

    @Test
    void getMembershipOfUser_WhenInTeam_ReturnsMembership() {
        TeamMemberEntity member = new TeamMemberEntity(teamA, playerA, 10, "Napadač");
        ReflectionTestUtils.setField(member, "id", 500L);
        when(teamMemberRepository.findByUser_Id(60L)).thenReturn(Optional.of(member));

        TeamMemberResponse resp = teamService.getMembershipOfUser(60L);

        assertNotNull(resp);
        assertEquals(60L, resp.userId());
        assertEquals(1L, resp.teamId());
        assertEquals("Tim A", resp.teamName());
        assertEquals(10, resp.jerseyNumber());
    }

    @Test
    void getMembershipOfUser_WhenNotInAnyTeam_ReturnsNull() {
        when(teamMemberRepository.findByUser_Id(99L)).thenReturn(Optional.empty());

        TeamMemberResponse resp = teamService.getMembershipOfUser(99L);

        assertNull(resp);
    }

    // ── Sprint 9: getMembers (list roster) ──────────────────────────────────

    @Test
    void getMembers_ReturnsList() {
        TeamMemberEntity m1 = new TeamMemberEntity(teamA, playerA, 10, "Napadač");
        ReflectionTestUtils.setField(m1, "id", 500L);

        when(teamRepository.findById(1L)).thenReturn(Optional.of(teamA));
        when(teamMemberRepository.findByTeam_IdOrderByJerseyNumberAscIdAsc(1L))
                .thenReturn(List.of(m1));

        List<TeamMemberResponse> result = teamService.getMembers(1L);

        assertEquals(1, result.size());
        assertEquals(60L, result.get(0).userId());
    }

    @Test
    void getMembers_WhenTeamNotFound_ThrowsResourceNotFound() {
        when(teamRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> teamService.getMembers(99L));
    }
}
