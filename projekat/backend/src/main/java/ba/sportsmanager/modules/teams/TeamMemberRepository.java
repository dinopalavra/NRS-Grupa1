package ba.sportsmanager.modules.teams;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TeamMemberRepository extends JpaRepository<TeamMemberEntity, Long> {
    List<TeamMemberEntity> findByTeam_IdOrderByJerseyNumberAscIdAsc(Long teamId);
    Optional<TeamMemberEntity> findByTeam_IdAndUser_Id(Long teamId, Long userId);
    boolean existsByTeam_IdAndUser_Id(Long teamId, Long userId);
    boolean existsByTeam_IdAndJerseyNumber(Long teamId, Integer jerseyNumber);
    long countByTeam_Id(Long teamId);
    Optional<TeamMemberEntity> findByUser_Id(Long userId);
    boolean existsByUser_Id(Long userId);
}
