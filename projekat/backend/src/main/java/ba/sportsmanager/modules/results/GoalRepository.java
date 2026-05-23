package ba.sportsmanager.modules.results;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GoalRepository extends JpaRepository<GoalEntity, Long> {
    List<GoalEntity> findByMatch_Id(Long matchId);
    void deleteByMatch_Id(Long matchId);

    /**
     * Aggregira golove po igraču za sve završene utakmice unutar lige.
     * Vraća: [playerId, playerFullName, playerUsername, teamId, teamName, totalGoals]
     */
    @Query("""
            SELECT g.player.id, g.player.fullName, g.player.username,
                   g.team.id, g.team.name, COUNT(g)
            FROM GoalEntity g
            WHERE g.match.league.id = :leagueId
              AND g.match.status = ba.sportsmanager.modules.results.MatchStatus.COMPLETED
            GROUP BY g.player.id, g.player.fullName, g.player.username, g.team.id, g.team.name
            ORDER BY COUNT(g) DESC, g.player.fullName ASC
            """)
    List<Object[]> findTopScorersByLeague(@Param("leagueId") Long leagueId);
}
