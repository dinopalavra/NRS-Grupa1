package ba.sportsmanager.modules.teams;

import ba.sportsmanager.common.SportType;

public record TeamResponse(
        Long id,
        String name,
        String city,
        String captainName,
        Long captainUserId,
        Integer membersCount,
        Integer maxMembers,
        TeamStatus status,
        SportType sport
) {
}
