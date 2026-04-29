package ba.sportsmanager.modules.users;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface UserRepository extends JpaRepository<UserEntity, Long> {
Optional<UserEntity> findByUsername(String username);
boolean existsByEmail(String email);
boolean existsByUsername(String username);
}
