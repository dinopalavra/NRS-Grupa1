package ba.sportsmanager.modules.leagues;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping
    public LeagueResponse createLeague(@Valid @RequestBody CreateLeagueRequest request) {
        return leagueService.create(request);
    }
}