package ba.sportsmanager.modules.notifications;

import ba.sportsmanager.exception.ResourceNotFoundException;
import ba.sportsmanager.modules.users.UserEntity;
import ba.sportsmanager.modules.users.UserRepository;
import ba.sportsmanager.modules.users.UserRole;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public NotificationService(NotificationRepository notificationRepository,
                               UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    public List<NotificationResponse> getForUser(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public long countUnread(Long userId) {
        return notificationRepository.countByUserIdAndReadFalse(userId);
    }

    @Transactional
    public NotificationResponse markRead(Long id) {
        NotificationEntity n = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found."));
        n.setRead(true);
        return toResponse(notificationRepository.save(n));
    }

    @Transactional
    public void markAllReadForUser(Long userId) {
        List<NotificationEntity> all = notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
        for (NotificationEntity n : all) {
            if (!n.isRead()) {
                n.setRead(true);
            }
        }
        notificationRepository.saveAll(all);
    }

    @Transactional
    public void createForUser(Long userId, String message, NotificationType type) {
        if (userId == null) return;
        notificationRepository.save(new NotificationEntity(userId, message, type));
    }

    @Transactional
    public void createForRole(UserRole role, String message, NotificationType type) {
        List<UserEntity> recipients = userRepository.findAll()
                .stream()
                .filter(u -> u.isActive() && u.getRole() == role)
                .toList();
        for (UserEntity u : recipients) {
            notificationRepository.save(new NotificationEntity(u.getId(), message, type));
        }
    }

    private NotificationResponse toResponse(NotificationEntity n) {
        return new NotificationResponse(
                n.getId(),
                n.getUserId(),
                n.getMessage(),
                n.getType(),
                n.isRead(),
                n.getCreatedAt()
        );
    }
}
