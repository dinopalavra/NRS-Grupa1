package ba.sportsmanager.modules.users;
public record AuthResponse(
String token,
Long userId,
String fullName,
String username,
UserRole role
) {
}
