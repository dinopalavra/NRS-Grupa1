package ba.sportsmanager.modules.leagues;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LeagueRepository extends JpaRepository<LeagueEntity, Long> {
}