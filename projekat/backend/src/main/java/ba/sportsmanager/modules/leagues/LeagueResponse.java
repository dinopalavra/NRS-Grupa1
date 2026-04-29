package ba.sportsmanager.modules.leagues;

public record LeagueResponse(
        Long id,
        String leagueName,
        String season,
        LeagueStatus status
) {
}