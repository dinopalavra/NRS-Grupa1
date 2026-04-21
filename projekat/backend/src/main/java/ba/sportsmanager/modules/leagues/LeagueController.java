package ba.sportsmanager.modules.leagues;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class LeagueController {

    @GetMapping("/api/leagues")
    public List<Map<String, Object>> getLeagues() {
        return List.of(
                Map.of("id", 1, "name", "Sarajevo Rekreativna Liga", "season", "2026"),
                Map.of("id", 2, "name", "Studentska Liga", "season", "2026")
        );
    }
}