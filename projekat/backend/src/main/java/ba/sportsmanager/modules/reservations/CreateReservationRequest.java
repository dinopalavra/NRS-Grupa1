package ba.sportsmanager.modules.reservations;

import ba.sportsmanager.common.SportType;
import jakarta.validation.constraints.NotNull;

public record CreateReservationRequest(
        @NotNull Long teamId,
        @NotNull Long slotId,
        @NotNull Long createdByUserId,
        String note,
        SportType sport
) {
}