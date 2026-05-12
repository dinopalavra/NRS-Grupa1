package ba.sportsmanager.modules.results;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MatchRepository extends JpaRepository<MatchEntity, Long> {
    List<MatchEntity> findByLeague_IdOrderByMatchDateAsc(Long leagueId);
}
