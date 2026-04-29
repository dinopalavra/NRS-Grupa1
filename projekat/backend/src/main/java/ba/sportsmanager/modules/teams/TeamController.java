package ba.sportsmanager.modules.teams;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping
    public List<TeamResponse> getTeams() {
        return teamService.getAllTeams();
    }

    @PostMapping
    public TeamResponse createTeam(@Valid @RequestBody CreateTeamRequest request) {
        return teamService.createTeam(request);
    }
}