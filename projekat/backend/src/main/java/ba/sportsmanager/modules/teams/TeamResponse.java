package ba.sportsmanager.modules.teams;

import ba.sportsmanager.common.SportType;

public record TeamResponse(
        Long id,
        String name,
        String city,
        String captainName,
        Integer membersCount,
        TeamStatus status,
        SportType sport
) {
}