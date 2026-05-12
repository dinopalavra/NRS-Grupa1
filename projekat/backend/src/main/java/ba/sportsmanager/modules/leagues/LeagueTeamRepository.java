package ba.sportsmanager.modules.leagues;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LeagueTeamRepository extends JpaRepository<LeagueTeamEntity, Long> {
    List<LeagueTeamEntity> findByLeague_Id(Long leagueId);
    Optional<LeagueTeamEntity> findByLeague_IdAndTeam_Id(Long leagueId, Long teamId);
    boolean existsByLeague_IdAndTeam_Id(Long leagueId, Long teamId);
}
