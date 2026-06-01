package ba.sportsmanager.modules.users;

import ba.sportsmanager.config.JwtService;
import ba.sportsmanager.exception.BadRequestException;
import ba.sportsmanager.exception.ResourceNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final PasswordResetTokenRepository passwordResetTokenRepository;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            PasswordResetTokenRepository passwordResetTokenRepository
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public UserResponse createUser(CreateUserRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new BadRequestException("Email already exists.");
        }

        if (userRepository.existsByUsername(request.username())) {
            throw new BadRequestException("Username already exists.");
        }

        UserRole role = request.role() == null ? UserRole.PLAYER : request.role();

        // Sport validacija: admin NE smije imati sport, ostali MORAJU imati sport
        if (role == UserRole.ADMIN && request.sport() != null) {
            throw new BadRequestException("Administrator ne može imati dodijeljen sport.");
        }
        if (role != UserRole.ADMIN && request.sport() == null) {
            throw new BadRequestException("Sport je obavezan za ulogu " + role + ".");
        }

        UserEntity user = new UserEntity();
        user.setFullName(request.fullName());
        user.setEmail(request.email());
        user.setUsername(request.username());
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setRole(role);
        user.setActive(true);
        user.setSport(request.sport());

        return toResponse(userRepository.save(user));
    }

    public AuthResponse login(LoginRequest request) {
        UserEntity user = userRepository.findByUsername(request.username())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid username or password."));

        if (!user.isActive()) {
            throw new BadRequestException("User account is inactive.");
        }

        boolean matches = user.getPasswordHash().startsWith("$2")
                ? passwordEncoder.matches(request.password(), user.getPasswordHash())
                : user.getPasswordHash().equals(request.password());

        if (!matches) {
            throw new ResourceNotFoundException("Invalid username or password.");
        }

        String token = jwtService.generateToken(
                user.getId(),
                user.getUsername(),
                user.getRole().name()
        );

        return new AuthResponse(
                token,
                user.getId(),
                user.getFullName(),
                user.getUsername(),
                user.getRole()
        );
    }

    public void deleteUser(Long id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + id));
        userRepository.delete(user);
    }

    public UserResponse updateProfile(Long id, UpdateProfileRequest request) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + id));

        String newEmail = request.email().trim();
        if (!newEmail.equalsIgnoreCase(user.getEmail()) && userRepository.existsByEmail(newEmail)) {
            throw new BadRequestException("Email already exists.");
        }

        user.setFullName(request.fullName().trim());
        user.setEmail(newEmail);
        return toResponse(userRepository.save(user));
    }

    public void changePassword(Long id, ChangePasswordRequest request) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + id));

        boolean matches = user.getPasswordHash().startsWith("$2")
                ? passwordEncoder.matches(request.oldPassword(), user.getPasswordHash())
                : user.getPasswordHash().equals(request.oldPassword());

        if (!matches) {
            throw new BadRequestException("Old password is incorrect.");
        }

        user.setPasswordHash(passwordEncoder.encode(request.newPassword()));
        userRepository.save(user);
    }

    @Transactional
    public String generateResetToken(String email) {
        userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("Korisnik s ovim emailom nije pronađen."));
        passwordResetTokenRepository.deleteByEmail(email);
        String token = UUID.randomUUID().toString();
        PasswordResetTokenEntity prt = new PasswordResetTokenEntity();
        prt.setToken(token);
        prt.setEmail(email);
        prt.setExpiresAt(LocalDateTime.now().plusHours(1));
        passwordResetTokenRepository.save(prt);
        return token;
    }

    @Transactional
    public void resetPassword(String token, String newPassword) {
        PasswordResetTokenEntity prt = passwordResetTokenRepository.findByToken(token)
            .orElseThrow(() -> new BadRequestException("Nevažeći ili istekli token."));
        if (prt.isUsed() || prt.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("Token je istekao ili već iskorišten.");
        }
        UserEntity user = userRepository.findByEmail(prt.getEmail())
            .orElseThrow(() -> new ResourceNotFoundException("Korisnik nije pronađen."));
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        prt.setUsed(true);
        passwordResetTokenRepository.save(prt);
    }

    private UserResponse toResponse(UserEntity user) {
        return new UserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getUsername(),
                user.getRole(),
                user.isActive(),
                user.getSport()
        );
    }
}