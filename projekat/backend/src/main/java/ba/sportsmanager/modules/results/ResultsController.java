package ba.sportsmanager.modules.results;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
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

    @GetMapping("/leagues/{leagueId}/matches")
    public List<MatchResponse> getMatchesByLeague(@PathVariable Long leagueId) {
        return resultsService.getMatchesByLeague(leagueId);
    }

    @GetMapping("/leagues/{leagueId}/standings")
    public List<StandingResponse> getStandings(@PathVariable Long leagueId) {
        return resultsService.getStandings(leagueId);
    }

    @PostMapping("/matches")
    @ResponseStatus(HttpStatus.CREATED)
    public MatchResponse createMatch(@Valid @RequestBody CreateMatchRequest request) {
        return resultsService.createMatch(request);
    }

    @PatchMapping("/matches/{matchId}")
    public MatchResponse recordResult(@PathVariable Long matchId,
                                      @Valid @RequestBody RecordResultRequest request) {
        return resultsService.recordResult(matchId, request);
    }

    @GetMapping("/matches/{matchId}/goals")
    public List<GoalResponse> getGoalsForMatch(@PathVariable Long matchId) {
        return resultsService.getGoalsForMatch(matchId);
    }

    @GetMapping("/leagues/{leagueId}/top-scorers")
    public List<TopScorerResponse> getTopScorers(@PathVariable Long leagueId) {
        return resultsService.getTopScorers(leagueId);
    }

    @GetMapping("/leagues/{leagueId}/schedule.csv")
    public void exportScheduleCsv(@PathVariable Long leagueId, HttpServletResponse response) throws Exception {
        response.setContentType("text/csv; charset=UTF-8");
        response.setHeader("Content-Disposition", "attachment; filename=\"raspored.csv\"");
        var matches = resultsService.getMatchesByLeague(leagueId);
        var writer = response.getWriter();
        writer.println("ID,Domacin,Gost,Datum,Lokacija,Status,Rezultat");
        for (var m : matches) {
            String score = m.status().toString().equals("COMPLETED") ? m.homeScore() + ":" + m.awayScore() : "-";
            writer.printf("%d,\"%s\",\"%s\",%s,\"%s\",%s,%s%n",
                m.id(), m.homeTeamName(), m.awayTeamName(), m.matchDate(),
                m.location() != null ? m.location() : "", m.status(), score);
        }
    }

    @GetMapping("/leagues/{leagueId}/standings.csv")
    public void exportStandingsCsv(@PathVariable Long leagueId, HttpServletResponse response) throws Exception {
        response.setContentType("text/csv; charset=UTF-8");
        response.setHeader("Content-Disposition", "attachment; filename=\"tabela.csv\"");
        var standings = resultsService.getStandings(leagueId);
        var writer = response.getWriter();
        writer.println("Tim,Odigrano,Pobjede,Remiji,Porazi,Golovi+,Golovi-,Bodovi");
        int rank = 1;
        for (var s : standings) {
            writer.printf("%d. \"%s\",%d,%d,%d,%d,%d,%d,%d%n",
                rank++, s.teamName(), s.played(), s.wins(), s.draws(), s.losses(),
                s.goalsFor(), s.goalsAgainst(), s.points());
        }
    }
}
