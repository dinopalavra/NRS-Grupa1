package ba.sportsmanager.modules.users;

import ba.sportsmanager.common.SportType;

public record UserResponse(
        Long id,
        String fullName,
        String email,
        String username,
        UserRole role,
        boolean active,
        SportType sport
) {
}
