package ba.sportsmanager.modules.users;

import ba.sportsmanager.common.SportType;
import ba.sportsmanager.config.JwtService;
import ba.sportsmanager.exception.BadRequestException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock private UserRepository userRepository;
    @Mock private PasswordEncoder passwordEncoder;
    @Mock private JwtService jwtService;

    @InjectMocks private UserService userService;

    // ─────────────────────────────────────────────────────────────────────────
    // Sprint 9: Sport obavezan za non-admin korisnike (US9-3)
    // ─────────────────────────────────────────────────────────────────────────

    @Test
    void createUser_PlayerWithSport_SuccessfullySaves() {
        CreateUserRequest req = new CreateUserRequest(
                "Edin Dzeko", "edin@test.com", "edin", "test123",
                UserRole.PLAYER, SportType.FOOTBALL);

        when(userRepository.existsByEmail("edin@test.com")).thenReturn(false);
        when(userRepository.existsByUsername("edin")).thenReturn(false);
        when(passwordEncoder.encode("test123")).thenReturn("hashed");
        when(userRepository.save(any(UserEntity.class))).thenAnswer(inv -> {
            UserEntity u = inv.getArgument(0);
            ReflectionTestUtils.setField(u, "id", 1L);
            return u;
        });

        UserResponse resp = userService.createUser(req);

        assertNotNull(resp);
        assertEquals(UserRole.PLAYER, resp.role());
        assertEquals(SportType.FOOTBALL, resp.sport());
    }

    @Test
    void createUser_CaptainWithSport_SuccessfullySaves() {
        CreateUserRequest req = new CreateUserRequest(
                "Kapiten K", "kap@test.com", "kap", "test123",
                UserRole.CAPTAIN, SportType.BASKETBALL);

        when(userRepository.existsByEmail("kap@test.com")).thenReturn(false);
        when(userRepository.existsByUsername("kap")).thenReturn(false);
        when(passwordEncoder.encode("test123")).thenReturn("hashed");
        when(userRepository.save(any(UserEntity.class))).thenAnswer(inv -> inv.getArgument(0));

        UserResponse resp = userService.createUser(req);

        assertEquals(SportType.BASKETBALL, resp.sport());
    }

    @Test
    void createUser_RefereeWithSport_SuccessfullySaves() {
        CreateUserRequest req = new CreateUserRequest(
                "Sudija S", "sud@test.com", "sud", "test123",
                UserRole.REFEREE_SCOREKEEPER, SportType.HANDBALL);

        when(userRepository.existsByEmail("sud@test.com")).thenReturn(false);
        when(userRepository.existsByUsername("sud")).thenReturn(false);
        when(passwordEncoder.encode("test123")).thenReturn("hashed");
        when(userRepository.save(any(UserEntity.class))).thenAnswer(inv -> inv.getArgument(0));

        UserResponse resp = userService.createUser(req);

        assertEquals(SportType.HANDBALL, resp.sport());
    }

    @Test
    void createUser_AdminWithoutSport_SuccessfullySaves() {
        CreateUserRequest req = new CreateUserRequest(
                "Admin A", "adm@test.com", "adm", "test123",
                UserRole.ADMIN, null);

        when(userRepository.existsByEmail("adm@test.com")).thenReturn(false);
        when(userRepository.existsByUsername("adm")).thenReturn(false);
        when(passwordEncoder.encode("test123")).thenReturn("hashed");
        when(userRepository.save(any(UserEntity.class))).thenAnswer(inv -> inv.getArgument(0));

        UserResponse resp = userService.createUser(req);

        assertEquals(UserRole.ADMIN, resp.role());
        assertNull(resp.sport());
    }

    @Test
    void createUser_AdminWithSport_ThrowsBadRequest() {
        CreateUserRequest req = new CreateUserRequest(
                "Admin A", "adm@test.com", "adm", "test123",
                UserRole.ADMIN, SportType.FOOTBALL);

        when(userRepository.existsByEmail("adm@test.com")).thenReturn(false);
        when(userRepository.existsByUsername("adm")).thenReturn(false);

        BadRequestException ex = assertThrows(BadRequestException.class,
                () -> userService.createUser(req));
        assertTrue(ex.getMessage().toLowerCase().contains("admin"));
        verify(userRepository, never()).save(any());
    }

    @Test
    void createUser_PlayerWithoutSport_ThrowsBadRequest() {
        CreateUserRequest req = new CreateUserRequest(
                "Igrac", "igr@test.com", "igr", "test123",
                UserRole.PLAYER, null);

        when(userRepository.existsByEmail("igr@test.com")).thenReturn(false);
        when(userRepository.existsByUsername("igr")).thenReturn(false);

        BadRequestException ex = assertThrows(BadRequestException.class,
                () -> userService.createUser(req));
        assertTrue(ex.getMessage().toLowerCase().contains("sport"));
        verify(userRepository, never()).save(any());
    }

    @Test
    void createUser_CaptainWithoutSport_ThrowsBadRequest() {
        CreateUserRequest req = new CreateUserRequest(
                "Kapiten", "kap@test.com", "kap", "test123",
                UserRole.CAPTAIN, null);

        when(userRepository.existsByEmail("kap@test.com")).thenReturn(false);
        when(userRepository.existsByUsername("kap")).thenReturn(false);

        assertThrows(BadRequestException.class, () -> userService.createUser(req));
        verify(userRepository, never()).save(any());
    }

    @Test
    void createUser_RefereeWithoutSport_ThrowsBadRequest() {
        CreateUserRequest req = new CreateUserRequest(
                "Sudija", "sud@test.com", "sud", "test123",
                UserRole.REFEREE_SCOREKEEPER, null);

        when(userRepository.existsByEmail("sud@test.com")).thenReturn(false);
        when(userRepository.existsByUsername("sud")).thenReturn(false);

        assertThrows(BadRequestException.class, () -> userService.createUser(req));
        verify(userRepository, never()).save(any());
    }

    @Test
    void createUser_DuplicateEmail_ThrowsBadRequest() {
        CreateUserRequest req = new CreateUserRequest(
                "Edin", "edin@test.com", "edin", "test123",
                UserRole.PLAYER, SportType.FOOTBALL);

        when(userRepository.existsByEmail("edin@test.com")).thenReturn(true);

        assertThrows(BadRequestException.class, () -> userService.createUser(req));
        verify(userRepository, never()).save(any());
    }

    @Test
    void createUser_DuplicateUsername_ThrowsBadRequest() {
        CreateUserRequest req = new CreateUserRequest(
                "Edin", "edin@test.com", "edin", "test123",
                UserRole.PLAYER, SportType.FOOTBALL);

        when(userRepository.existsByEmail("edin@test.com")).thenReturn(false);
        when(userRepository.existsByUsername("edin")).thenReturn(true);

        assertThrows(BadRequestException.class, () -> userService.createUser(req));
        verify(userRepository, never()).save(any());
    }
}
