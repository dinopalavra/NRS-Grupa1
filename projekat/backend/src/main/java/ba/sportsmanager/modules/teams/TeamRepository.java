package ba.sportsmanager.modules.teams;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TeamRepository extends JpaRepository<TeamEntity, Long> {
    Optional<TeamEntity> findByCaptain_Id(Long userId);
    boolean existsByCaptain_Id(Long userId);
}
