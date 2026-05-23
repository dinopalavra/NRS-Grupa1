package ba.sportsmanager.modules.teams;

import java.time.LocalDateTime;

public record TeamMemberResponse(
        Long membershipId,
        Long teamId,
        String teamName,
        Long userId,
        String username,
        String fullName,
        String email,
        Integer jerseyNumber,
        String position,
        LocalDateTime joinedAt
) {
}
