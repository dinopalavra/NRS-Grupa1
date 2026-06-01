package ba.sportsmanager.modules.reservations;

import java.time.LocalDateTime;

public record ReservationCommentResponse(
    Long id, Long reservationId, Long authorId,
    String authorName, String authorUsername,
    String content, LocalDateTime createdAt
) {}
