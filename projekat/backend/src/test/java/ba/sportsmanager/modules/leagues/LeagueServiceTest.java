package ba.sportsmanager.modules.leagues;

import ba.sportsmanager.exception.BadRequestException;
import ba.sportsmanager.exception.ResourceNotFoundException;
import ba.sportsmanager.modules.teams.TeamEntity;
import ba.sportsmanager.modules.teams.TeamService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LeagueServiceTest {

    @Mock private LeagueRepository leagueRepository;
    @Mock private LeagueTeamRepository leagueTeamRepository;
    @Mock private TeamService teamService;

    @InjectMocks private LeagueService leagueService;

    private LeagueEntity mockLeague;
    private TeamEntity mockTeam;

    @BeforeEach
    void setUp() {
        mockLeague = new LeagueEntity();
        ReflectionTestUtils.setField(mockLeague, "id", 1L);
        mockLeague.setLeagueName("Premijer liga");
        mockLeague.setSeason("2025/2026");
        mockLeague.setStatus(LeagueStatus.ACTIVE);

        mockTeam = new TeamEntity();
        ReflectionTestUtils.setField(mockTeam, "id", 10L);
        mockTeam.setName("FK Sarajevo");
        mockTeam.setCity("Sarajevo");
        mockTeam.setCaptainName("Haris Kovač");
        mockTeam.setMembersCount(11);
    }

    @Test
    void create_Successful_ReturnsResponse() {
        CreateLeagueRequest request = new CreateLeagueRequest("Premijer liga", "2025/2026");
        when(leagueRepository.save(any(LeagueEntity.class))).thenAnswer(inv -> {
            LeagueEntity e = inv.getArgument(0);
            ReflectionTestUtils.setField(e, "id", 1L);
            return e;
        });

        LeagueResponse response = leagueService.create(request);

        assertNotNull(response);
        assertEquals(1L, response.id());
        assertEquals("Premijer liga", response.leagueName());
        assertEquals("2025/2026", response.season());
        assertEquals(LeagueStatus.ACTIVE, response.status());
        verify(leagueRepository).save(any(LeagueEntity.class));
    }

    @Test
    void getAll_ReturnsAllLeagues() {
        when(leagueRepository.findAll()).thenReturn(List.of(mockLeague));

        List<LeagueResponse> result = leagueService.getAll();

        assertEquals(1, result.size());
        assertEquals("Premijer liga", result.get(0).leagueName());
    }

    @Test
    void getById_WhenExists_ReturnsResponse() {
        when(leagueRepository.findById(1L)).thenReturn(Optional.of(mockLeague));

        LeagueResponse response = leagueService.getById(1L);

        assertEquals(1L, response.id());
        assertEquals("Premijer liga", response.leagueName());
    }

    @Test
    void getById_WhenNotFound_ThrowsResourceNotFoundException() {
        when(leagueRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> leagueService.getById(99L));
    }

    @Test
    void addTeamToLeague_Successful_SavesLeagueTeam() {
        when(leagueRepository.findById(1L)).thenReturn(Optional.of(mockLeague));
        when(teamService.getTeamEntity(10L)).thenReturn(mockTeam);
        when(leagueTeamRepository.existsByLeague_IdAndTeam_Id(1L, 10L)).thenReturn(false);

        leagueService.addTeamToLeague(1L, 10L);

        verify(leagueTeamRepository).save(any(LeagueTeamEntity.class));
    }

    @Test
    void addTeamToLeague_WhenAlreadyInLeague_ThrowsBadRequestException() {
        when(leagueRepository.findById(1L)).thenReturn(Optional.of(mockLeague));
        when(teamService.getTeamEntity(10L)).thenReturn(mockTeam);
        when(leagueTeamRepository.existsByLeague_IdAndTeam_Id(1L, 10L)).thenReturn(true);

        assertThrows(BadRequestException.class, () -> leagueService.addTeamToLeague(1L, 10L));
        verify(leagueTeamRepository, never()).save(any());
    }

    @Test
    void removeTeamFromLeague_Successful_DeletesLeagueTeam() {
        LeagueTeamEntity lt = new LeagueTeamEntity(mockLeague, mockTeam);
        when(leagueTeamRepository.findByLeague_IdAndTeam_Id(1L, 10L)).thenReturn(Optional.of(lt));

        leagueService.removeTeamFromLeague(1L, 10L);

        verify(leagueTeamRepository).delete(lt);
    }

    @Test
    void removeTeamFromLeague_WhenNotInLeague_ThrowsResourceNotFoundException() {
        when(leagueTeamRepository.findByLeague_IdAndTeam_Id(1L, 10L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> leagueService.removeTeamFromLeague(1L, 10L));
        verify(leagueTeamRepository, never()).delete(any());
    }

    @Test
    void getTeamsInLeague_ReturnsTeamList() {
        LeagueTeamEntity lt = new LeagueTeamEntity(mockLeague, mockTeam);
        when(leagueRepository.findById(1L)).thenReturn(Optional.of(mockLeague));
        when(leagueTeamRepository.findByLeague_Id(1L)).thenReturn(List.of(lt));

        var result = leagueService.getTeamsInLeague(1L);

        assertEquals(1, result.size());
        assertEquals("FK Sarajevo", result.get(0).name());
    }

    @Test
    void getTeamsInLeague_WhenLeagueNotFound_ThrowsResourceNotFoundException() {
        when(leagueRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> leagueService.getTeamsInLeague(99L));
    }
}
