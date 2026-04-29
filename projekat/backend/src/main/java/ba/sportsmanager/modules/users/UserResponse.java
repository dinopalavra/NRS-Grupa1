package ba.sportsmanager.modules.users;
public record UserResponse(
Long id,
String fullName,
String email,
String username,
UserRole role,
boolean active
) {
}
