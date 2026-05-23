package ba.sportsmanager.modules.results;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record GoalEntry(
        @NotNull Long playerUserId,
        @NotNull Long teamId,
        @Min(0) Integer minute
) {
}
