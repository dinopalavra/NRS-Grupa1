package ba.sportsmanager.modules.teams;

import ba.sportsmanager.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService {

    private final TeamRepository teamRepository;

    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    public List<TeamResponse> getAllTeams() {
        return teamRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public TeamResponse createTeam(CreateTeamRequest request) {
        TeamEntity team = new TeamEntity();
        team.setName(request.name());
        team.setCity(request.city());
        team.setCaptainName(request.captainName());
        team.setMembersCount(request.membersCount());
        team.setStatus(TeamStatus.ACTIVE);

        return toResponse(teamRepository.save(team));
    }

    public TeamEntity getTeamEntity(Long id) {
        return teamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found."));
    }

    private TeamResponse toResponse(TeamEntity team) {
        return new TeamResponse(
                team.getId(),
                team.getName(),
                team.getCity(),
                team.getCaptainName(),
                team.getMembersCount(),
                team.getStatus()
        );
    }
}