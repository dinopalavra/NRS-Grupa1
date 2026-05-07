package ba.sportsmanager.modules.users;

import ba.sportsmanager.config.JwtService;
import ba.sportsmanager.exception.BadRequestException;
import ba.sportsmanager.exception.ResourceNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
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

        UserEntity user = new UserEntity();
        user.setFullName(request.fullName());
        user.setEmail(request.email());
        user.setUsername(request.username());
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setRole(request.role() == null ? UserRole.PLAYER : request.role());
        user.setActive(true);

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

    private UserResponse toResponse(UserEntity user) {
        return new UserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getUsername(),
                user.getRole(),
                user.isActive()
        );
    }
}