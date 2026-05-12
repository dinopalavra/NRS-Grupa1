package ba.sportsmanager.modules.leagues;

import ba.sportsmanager.modules.teams.TeamResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/leagues")
public class LeagueController {

    private final LeagueService leagueService;

    public LeagueController(LeagueService leagueService) {
        this.leagueService = leagueService;
    }

    @GetMapping
    public List<LeagueResponse> getLeagues() {
        return leagueService.getAll();
    }

    @GetMapping("/{id}")
    public LeagueResponse getLeague(@PathVariable Long id) {
        return leagueService.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public LeagueResponse createLeague(@Valid @RequestBody CreateLeagueRequest request) {
        return leagueService.create(request);
    }

    @GetMapping("/{id}/teams")
    public List<TeamResponse> getTeamsInLeague(@PathVariable Long id) {
        return leagueService.getTeamsInLeague(id);
    }

    @PostMapping("/{id}/teams")
    @ResponseStatus(HttpStatus.CREATED)
    public void addTeamToLeague(@PathVariable Long id, @RequestBody Map<String, Long> body) {
        Long teamId = body.get("teamId");
        if (teamId == null) throw new RuntimeException("teamId je obavezan.");
        leagueService.addTeamToLeague(id, teamId);
    }

    @DeleteMapping("/{id}/teams/{teamId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeTeamFromLeague(@PathVariable Long id, @PathVariable Long teamId) {
        leagueService.removeTeamFromLeague(id, teamId);
    }
}
