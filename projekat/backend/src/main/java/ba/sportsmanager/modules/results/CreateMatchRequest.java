package ba.sportsmanager.modules.results;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

public record CreateMatchRequest(
        @NotNull Long leagueId,
        @NotNull Long homeTeamId,
        @NotNull Long awayTeamId,
        @NotNull LocalDate matchDate,
        String location,
        String resourceName,
        LocalTime startTime,
        LocalTime endTime
) {
}
