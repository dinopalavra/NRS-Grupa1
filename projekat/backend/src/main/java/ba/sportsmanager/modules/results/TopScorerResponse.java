package ba.sportsmanager.modules.results;

public record TopScorerResponse(
        Long playerUserId,
        String playerFullName,
        String playerUsername,
        Long teamId,
        String teamName,
        long goals
) {
}
