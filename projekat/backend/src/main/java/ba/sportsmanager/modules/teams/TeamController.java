package ba.sportsmanager.modules.teams;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class TeamController {

    @GetMapping("/api/teams")
    public List<Map<String, Object>> getTeams() {
        return List.of(
                Map.of("id", 1, "name", "FK Developeri", "status", "ACTIVE"),
                Map.of("id", 2, "name", "FC Backend", "status", "ACTIVE")
        );
    }
}