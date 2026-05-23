package ba.sportsmanager.modules.results;

public record GoalResponse(
        Long id,
        Long matchId,
        Long playerUserId,
        String playerUsername,
        String playerFullName,
        Long teamId,
        String teamName,
        Integer minute
) {
}
