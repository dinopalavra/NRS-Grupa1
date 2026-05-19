package ba.sportsmanager.modules.teams;

import ba.sportsmanager.exception.ResourceNotFoundException;
import ba.sportsmanager.modules.results.MatchEntity;
import ba.sportsmanager.modules.results.MatchRepository;
import ba.sportsmanager.modules.results.MatchStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TeamService {

    private final TeamRepository teamRepository;
    private final MatchRepository matchRepository;

    public TeamService(TeamRepository teamRepository, MatchRepository matchRepository) {
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }

    public List<TeamResponse> getAllTeams() {
        return teamRepository.findAll()
                .stream()
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
        team.setSport(request.sport());

        return toResponse(teamRepository.save(team));
    }

    public TeamEntity getTeamEntity(Long id) {
        return teamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found."));
    }

    public TeamStatsResponse getTeamStats(Long teamId, Long leagueId) {
        TeamEntity team = getTeamEntity(teamId);

        List<MatchEntity> matches = matchRepository
                .findByHomeTeam_IdOrAwayTeam_IdOrderByMatchDateDesc(teamId, teamId)
                .stream()
                .filter(m -> m.getStatus() == MatchStatus.COMPLETED)
                .filter(m -> leagueId == null || m.getLeague().getId().equals(leagueId))
                .toList();

        int played = matches.size();
        int wins = 0, draws = 0, losses = 0, gf = 0, ga = 0, points = 0;
        List<String> last5 = new ArrayList<>();
        String leagueName = null;

        for (MatchEntity m : matches) {
            boolean isHome = m.getHomeTeam().getId().equals(teamId);
            int teamGoals = isHome ? m.getHomeScore() : m.getAwayScore();
            int oppGoals  = isHome ? m.getAwayScore() : m.getHomeScore();

            gf += teamGoals;
            ga += oppGoals;

            String result;
            if (teamGoals > oppGoals) {
                wins++; points += 3; result = "W";
            } else if (teamGoals == oppGoals) {
                draws++; points += 1; result = "D";
            } else {
                losses++; result = "L";
            }

            if (last5.size() < 5) {
                last5.add(result);
            }

            if (leagueName == null && leagueId != null) {
                leagueName = m.getLeague().getLeagueName();
            }
        }

        return new TeamStatsResponse(
                team.getId(),
                team.getName(),
                played,
                wins,
                draws,
                losses,
                gf,
                ga,
                gf - ga,
                points,
                last5,
                leagueId,
                leagueName
        );
    }

    private TeamResponse toResponse(TeamEntity team) {
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