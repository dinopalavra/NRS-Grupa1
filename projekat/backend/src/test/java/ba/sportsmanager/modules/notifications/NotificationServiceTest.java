package ba.sportsmanager.modules.notifications;

import ba.sportsmanager.exception.ResourceNotFoundException;
import ba.sportsmanager.modules.users.UserEntity;
import ba.sportsmanager.modules.users.UserRepository;
import ba.sportsmanager.modules.users.UserRole;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class NotificationServiceTest {

    @Mock private NotificationRepository notificationRepository;
    @Mock private UserRepository userRepository;

    @InjectMocks private NotificationService notificationService;

    @Test
    void createForUser_SavesNotification() {
        notificationService.createForUser(5L, "Test poruka", NotificationType.INFO);

        ArgumentCaptor<NotificationEntity> captor = ArgumentCaptor.forClass(NotificationEntity.class);
        verify(notificationRepository).save(captor.capture());
        NotificationEntity saved = captor.getValue();
        assertEquals(5L, saved.getUserId());
        assertEquals("Test poruka", saved.getMessage());
        assertEquals(NotificationType.INFO, saved.getType());
        assertFalse(saved.isRead());
    }

    @Test
    void createForUser_WhenUserIdNull_DoesNothing() {
        notificationService.createForUser(null, "Test", NotificationType.INFO);
        verify(notificationRepository, never()).save(any());
    }

    @Test
    void createForRole_SavesOneNotificationPerActiveUserOfThatRole() {
        UserEntity admin1 = new UserEntity();
        ReflectionTestUtils.setField(admin1, "id", 1L);
        admin1.setRole(UserRole.ADMIN);
        admin1.setActive(true);

        UserEntity admin2 = new UserEntity();
        ReflectionTestUtils.setField(admin2, "id", 2L);
        admin2.setRole(UserRole.ADMIN);
        admin2.setActive(true);

        UserEntity inactiveAdmin = new UserEntity();
        ReflectionTestUtils.setField(inactiveAdmin, "id", 3L);
        inactiveAdmin.setRole(UserRole.ADMIN);
        inactiveAdmin.setActive(false);

        UserEntity player = new UserEntity();
        ReflectionTestUtils.setField(player, "id", 4L);
        player.setRole(UserRole.PLAYER);
        player.setActive(true);

        when(userRepository.findAll()).thenReturn(List.of(admin1, admin2, inactiveAdmin, player));

        notificationService.createForRole(UserRole.ADMIN, "Hej admine", NotificationType.RESERVATION_CREATED);

        verify(notificationRepository, times(2)).save(any(NotificationEntity.class));
    }

    @Test
    void markRead_SetsReadTrue() {
        NotificationEntity n = new NotificationEntity(1L, "msg", NotificationType.INFO);
        ReflectionTestUtils.setField(n, "id", 10L);

        when(notificationRepository.findById(10L)).thenReturn(Optional.of(n));
        when(notificationRepository.save(any())).thenAnswer(i -> i.getArgument(0));

        NotificationResponse r = notificationService.markRead(10L);

        assertTrue(r.read());
        assertTrue(n.isRead());
    }

    @Test
    void markRead_WhenNotFound_ThrowsResourceNotFound() {
        when(notificationRepository.findById(99L)).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class, () -> notificationService.markRead(99L));
    }

    @Test
    void markAllReadForUser_SetsAllUnreadToRead() {
        NotificationEntity unread1 = new NotificationEntity(1L, "a", NotificationType.INFO);
        NotificationEntity unread2 = new NotificationEntity(1L, "b", NotificationType.INFO);
        NotificationEntity alreadyRead = new NotificationEntity(1L, "c", NotificationType.INFO);
        alreadyRead.setRead(true);

        when(notificationRepository.findByUserIdOrderByCreatedAtDesc(1L))
                .thenReturn(List.of(unread1, unread2, alreadyRead));

        notificationService.markAllReadForUser(1L);

        assertTrue(unread1.isRead());
        assertTrue(unread2.isRead());
        assertTrue(alreadyRead.isRead());
        verify(notificationRepository).saveAll(anyList());
    }

    @Test
    void countUnread_ReturnsCount() {
        when(notificationRepository.countByUserIdAndReadFalse(1L)).thenReturn(5L);
        assertEquals(5L, notificationService.countUnread(1L));
    }

    @Test
    void getForUser_ReturnsList() {
        NotificationEntity n = new NotificationEntity(1L, "msg", NotificationType.INFO);
        ReflectionTestUtils.setField(n, "id", 7L);
        when(notificationRepository.findByUserIdOrderByCreatedAtDesc(1L)).thenReturn(List.of(n));

        List<NotificationResponse> result = notificationService.getForUser(1L);

        assertEquals(1, result.size());
        assertEquals(7L, result.get(0).id());
        assertEquals("msg", result.get(0).message());
    }
}
