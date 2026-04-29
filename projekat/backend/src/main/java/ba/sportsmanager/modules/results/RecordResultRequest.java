package ba.sportsmanager.modules.results;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record RecordResultRequest(
        @NotNull @Min(0) Integer homeScore,
        @NotNull @Min(0) Integer awayScore
) {
}