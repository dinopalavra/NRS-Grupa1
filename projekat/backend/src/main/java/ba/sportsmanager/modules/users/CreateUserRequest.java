package ba.sportsmanager.modules.users;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
public record CreateUserRequest(
@NotBlank String fullName,
@Email @NotBlank String email,
@NotBlank String username,
@NotBlank String password,
@NotNull UserRole role
) {
}