package ba.sportsmanager.modules.users;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/users")
public class UserController {
private final UserService userService;
public UserController(UserService userService) {
this.userService = userService;
}
@GetMapping
public List<UserResponse> getUsers() {
return userService.getAllUsers();
}
@PostMapping
public UserResponse createUser(@Valid @RequestBody CreateUserRequest request) {
return userService.createUser(request);
}
}