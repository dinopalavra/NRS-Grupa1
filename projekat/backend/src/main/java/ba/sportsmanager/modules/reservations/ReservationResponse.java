package ba.sportsmanager.modules.reservations;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public record ReservationResponse(
        Long id,
        Long teamId,
        String teamName,
        Long slotId,
        String location,
        String resourceName,
        LocalDate slotDate,
        LocalTime startTime,
        LocalTime endTime,
        Long createdByUserId,
        String createdByUsername,
        ReservationStatus status,
        String note,
        LocalDateTime createdAt
) {
}