package ba.sportsmanager.modules.leagues;

import ba.sportsmanager.common.SportType;

public record LeagueResponse(
        Long id,
        String leagueName,
        String season,
        LeagueStatus status,
        SportType sport
) {
}
