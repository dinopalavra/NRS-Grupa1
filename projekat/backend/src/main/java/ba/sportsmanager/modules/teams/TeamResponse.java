package ba.sportsmanager.modules.teams;

public record TeamResponse(
        Long id,
        String name,
        String city,
        String captainName,
        Integer membersCount,
        TeamStatus status
) {
}