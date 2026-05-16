package ba.sportsmanager.modules.results;

import java.time.LocalDate;
import java.time.LocalTime;

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
        Integer awayScore,
        String location,
        String resourceName,
        LocalTime startTime,
        LocalTime endTime,
        Long linkedSlotId
) {
}
