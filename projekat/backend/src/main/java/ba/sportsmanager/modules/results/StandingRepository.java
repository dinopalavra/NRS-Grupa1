package ba.sportsmanager.modules.results;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StandingRepository extends JpaRepository<StandingEntity, Long> {
    Optional<StandingEntity> findByLeague_IdAndTeam_Id(Long leagueId, Long teamId);
    List<StandingEntity> findByLeague_IdOrderByPointsDescGoalsForDescGoalsAgainstAsc(Long leagueId);
}