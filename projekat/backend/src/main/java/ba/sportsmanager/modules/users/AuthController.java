package ba.sportsmanager.modules.users;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/auth")
public class AuthController {
private final UserService userService;
Projekat/backend/src/main/java/ba/sportsmanager/modules/users/UserController.java
Projekat/backend/src/main/java/ba/sportsmanager/modules/users/AuthController.java
public AuthController(UserService userService) {
this.userService = userService;
}
@PostMapping("/login")
public AuthResponse login(@Valid @RequestBody LoginRequest request) {
return userService.login(request);
}
}