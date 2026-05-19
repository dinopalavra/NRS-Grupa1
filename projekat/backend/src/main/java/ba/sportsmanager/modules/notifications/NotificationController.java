package ba.sportsmanager.modules.notifications;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/user/{userId}")
    public List<NotificationResponse> getForUser(@PathVariable Long userId) {
        return notificationService.getForUser(userId);
    }

    @GetMapping("/user/{userId}/unread-count")
    public Map<String, Long> getUnreadCount(@PathVariable Long userId) {
        return Map.of("unread", notificationService.countUnread(userId));
    }

    @PatchMapping("/{id}/read")
    public NotificationResponse markRead(@PathVariable Long id) {
        return notificationService.markRead(id);
    }

    @PatchMapping("/user/{userId}/read-all")
    public Map<String, String> markAllRead(@PathVariable Long userId) {
        notificationService.markAllReadForUser(userId);
        return Map.of("status", "ok");
    }
}
