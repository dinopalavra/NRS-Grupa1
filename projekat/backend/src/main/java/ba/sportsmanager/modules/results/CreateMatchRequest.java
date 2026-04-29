package ba.sportsmanager.modules.results;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record CreateMatchRequest(
        @NotNull Long leagueId,
        @NotNull Long homeTeamId,
        @NotNull Long awayTeamId,
        @NotNull LocalDate matchDate
) {
}