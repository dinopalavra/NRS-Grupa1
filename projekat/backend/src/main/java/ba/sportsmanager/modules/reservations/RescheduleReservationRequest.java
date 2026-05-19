package ba.sportsmanager.modules.reservations;

import jakarta.validation.constraints.NotNull;

public record RescheduleReservationRequest(
        @NotNull Long newSlotId,
        String note
) {
}
