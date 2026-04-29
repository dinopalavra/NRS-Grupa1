package ba.sportsmanager.modules.teams;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<TeamEntity, Long> {
}