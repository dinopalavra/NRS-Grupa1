package ba.sportsmanager.modules.reservations;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record CreateRecurringReservationRequest(
    @NotNull Long teamId,
    @NotNull Long slotId,
    @NotNull Long createdByUserId,
    String note,
    ba.sportsmanager.common.SportType sport,
    @NotNull @Min(1) @Max(2) Integer intervalWeeks,
    @NotNull @Min(1) @Max(12) Integer occurrences
) {}
