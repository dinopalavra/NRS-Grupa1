package ba.sportsmanager.modules.results;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
public class ResultsController {

    private final ResultsService resultsService;

    public ResultsController(ResultsService resultsService) {
        this.resultsService = resultsService;
    }

    @GetMapping("/matches")
    public List<MatchResponse> getMatches() {
        return resultsService.getMatches();
    }

    @GetMapping("/leagues/{leagueId}/standings")
    public List<StandingResponse> getStandings(@PathVariable Long leagueId) {
        return resultsService.getStandings(leagueId);
    }

    @PostMapping("/matches")
    public MatchResponse createMatch(@Valid @RequestBody CreateMatchRequest request) {
        return resultsService.createMatch(request);
    }

    @PatchMapping("/matches/{matchId}")
    public MatchResponse recordResult(@PathVariable Long matchId,
                                      @Valid @RequestBody RecordResultRequest request) {
        return resultsService.recordResult(matchId, request);
    }
}