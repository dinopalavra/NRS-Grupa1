package ba.sportsmanager.modules.results;

import java.time.LocalDate;

public record MatchResponse(
        Long id,
        Long leagueId,
        String leagueName,
        Long homeTeamId,
        String homeTeamName,
        Long awayTeamId,
        String awayTeamName,
        LocalDate matchDate,
        MatchStatus status,
        Integer homeScore,
        Integer awayScore
) {
}