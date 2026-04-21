package ba.sportsmanager.modules.users;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class UserController {

    @GetMapping("/api/users")
    public List<Map<String, Object>> getUsers() {
        return List.of(
                Map.of("id", 1, "username", "admin", "role", "ADMIN"),
                Map.of("id", 2, "username", "captain", "role", "CAPTAIN")
        );
    }
}