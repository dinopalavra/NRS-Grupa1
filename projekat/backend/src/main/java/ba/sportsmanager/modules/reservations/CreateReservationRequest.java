package ba.sportsmanager.modules.reservations;

import jakarta.validation.constraints.NotNull;

public record CreateReservationRequest(
        @NotNull Long teamId,
        @NotNull Long slotId,
        @NotNull Long createdByUserId,
        String note
) {
}