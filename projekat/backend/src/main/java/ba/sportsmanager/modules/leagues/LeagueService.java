package ba.sportsmanager.modules.leagues;

import ba.sportsmanager.exception.BadRequestException;
import ba.sportsmanager.exception.ResourceNotFoundException;
import ba.sportsmanager.modules.teams.TeamEntity;
import ba.sportsmanager.modules.teams.TeamResponse;
import ba.sportsmanager.modules.teams.TeamService;
import ba.sportsmanager.modules.teams.TeamStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeagueService {

    private final LeagueRepository leagueRepository;
    private final LeagueTeamRepository leagueTeamRepository;
    private final TeamService teamService;

    public LeagueService(LeagueRepository leagueRepository,
                         LeagueTeamRepository leagueTeamRepository,
                         TeamService teamService) {
        this.leagueRepository = leagueRepository;
        this.leagueTeamRepository = leagueTeamRepository;
        this.teamService = teamService;
    }

    public List<LeagueResponse> getAll() {
        return leagueRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public LeagueResponse getById(Long id) {
        return toResponse(getEntity(id));
    }

    public LeagueResponse create(CreateLeagueRequest request) {
        LeagueEntity league = new LeagueEntity();
        league.setLeagueName(request.leagueName());
        league.setSeason(request.season());
        league.setStatus(LeagueStatus.ACTIVE);
        league.setSport(request.sport());
        return toResponse(leagueRepository.save(league));
    }

    public LeagueEntity getEntity(Long id) {
        return leagueRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Liga nije pronađena."));
    }

    public List<TeamResponse> getTeamsInLeague(Long leagueId) {
        getEntity(leagueId);
        return leagueTeamRepository.findByLeague_Id(leagueId).stream()
                .map(lt -> toTeamResponse(lt.getTeam()))
                .toList();
    }

    public void addTeamToLeague(Long leagueId, Long teamId) {
        LeagueEntity league = getEntity(leagueId);
        TeamEntity team = teamService.getTeamEntity(teamId);

        if (league.getSport() != null && team.getSport() != null && !league.getSport().equals(team.getSport())) {
            throw new BadRequestException("Tim je drugog sporta od lige.");
        }

        if (leagueTeamRepository.existsByLeague_IdAndTeam_Id(leagueId, teamId)) {
            throw new BadRequestException("Tim je već dodan u ovu ligu.");
        }

        leagueTeamRepository.save(new LeagueTeamEntity(league, team));
    }

    public void removeTeamFromLeague(Long leagueId, Long teamId) {
        LeagueTeamEntity lt = leagueTeamRepository.findByLeague_IdAndTeam_Id(leagueId, teamId)
                .orElseThrow(() -> new ResourceNotFoundException("Tim nije u ovoj ligi."));
        leagueTeamRepository.delete(lt);
    }

    private LeagueResponse toResponse(LeagueEntity league) {
        return new LeagueResponse(
                league.getId(),
                league.getLeagueName(),
                league.getSeason(),
                league.getStatus(),
                league.getSport()
        );
    }

    private TeamResponse toTeamResponse(TeamEntity team) {
        return new TeamResponse(
                team.getId(),
                team.getName(),
                team.getCity(),
                team.getCaptainName(),
                team.getMembersCount(),
                team.getStatus(),
                team.getSport()
        );
    }
}
