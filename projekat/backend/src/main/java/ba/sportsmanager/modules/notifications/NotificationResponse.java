package ba.sportsmanager.modules.notifications;

import java.time.LocalDateTime;

public record NotificationResponse(
        Long id,
        Long userId,
        String message,
        NotificationType type,
        boolean read,
        LocalDateTime createdAt
) {
}
