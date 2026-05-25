package ba.sportsmanager.modules.teams;

import ba.sportsmanager.exception.BadRequestException;
import ba.sportsmanager.exception.ResourceNotFoundException;
import ba.sportsmanager.modules.results.MatchEntity;
import ba.sportsmanager.modules.results.MatchRepository;
import ba.sportsmanager.modules.results.MatchStatus;
import ba.sportsmanager.modules.users.UserEntity;
import ba.sportsmanager.modules.users.UserRepository;
import ba.sportsmanager.modules.users.UserRole;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TeamService {

    private final TeamRepository teamRepository;
    private final MatchRepository matchRepository;
    private final TeamMemberRepository teamMemberRepository;
    private final UserRepository userRepository;

    public TeamService(TeamRepository teamRepository,
                       MatchRepository matchRepository,
                       TeamMemberRepository teamMemberRepository,
                       UserRepository userRepository) {
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
        this.teamMemberRepository = teamMemberRepository;
        this.userRepository = userRepository;
    }

    public List<TeamResponse> getAllTeams() {
        return teamRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public TeamResponse createTeam(CreateTeamRequest request) {
        // 1. Učitaj kapitena
        UserEntity captain = userRepository.findById(request.captainUserId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Korisnik za kapitena nije pronađen: " + request.captainUserId()));

        // 2. Validacija role
        if (captain.getRole() != UserRole.CAPTAIN) {
            throw new BadRequestException("Odabrani korisnik nema ulogu CAPTAIN.");
        }

        // 3. Validacija sporta
        if (captain.getSport() == null || captain.getSport() != request.sport()) {
            throw new BadRequestException(
                    "Sport kapitena se ne podudara sa sportom tima.");
        }

        // 4. Jedan tim po kapitenu
        if (teamRepository.existsByCaptain_Id(captain.getId())) {
            throw new BadRequestException(
                    "Ovaj korisnik je već kapiten drugog tima.");
        }

        TeamEntity team = new TeamEntity();
        team.setName(request.name().trim());
        team.setCity(request.city().trim());
        team.setCaptain(captain);
        team.setCaptainName(captain.getFullName());
        team.setMaxMembers(request.maxMembers());
        team.setMembersCount(0);  // novi tim startuje prazan
        team.setStatus(TeamStatus.ACTIVE);
        team.setSport(request.sport());

        return toResponse(teamRepository.save(team));
    }

    public TeamEntity getTeamEntity(Long id) {
        return teamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found."));
    }

    public TeamStatsResponse getTeamStats(Long teamId, Long leagueId) {
        TeamEntity team = getTeamEntity(teamId);

        List<MatchEntity> matches = matchRepository
                .findByHomeTeam_IdOrAwayTeam_IdOrderByMatchDateDesc(teamId, teamId)
                .stream()
                .filter(m -> m.getStatus() == MatchStatus.COMPLETED)
                .filter(m -> leagueId == null || m.getLeague().getId().equals(leagueId))
                .toList();

        int played = matches.size();
        int wins = 0, draws = 0, losses = 0, gf = 0, ga = 0, points = 0;
        List<String> last5 = new ArrayList<>();
        String leagueName = null;

        for (MatchEntity m : matches) {
            boolean isHome = m.getHomeTeam().getId().equals(teamId);
            int teamGoals = isHome ? m.getHomeScore() : m.getAwayScore();
            int oppGoals  = isHome ? m.getAwayScore() : m.getHomeScore();

            gf += teamGoals;
            ga += oppGoals;

            String result;
            if (teamGoals > oppGoals) {
                wins++; points += 3; result = "W";
            } else if (teamGoals == oppGoals) {
                draws++; points += 1; result = "D";
            } else {
                losses++; result = "L";
            }

            if (last5.size() < 5) {
                last5.add(result);
            }

            if (leagueName == null && leagueId != null) {
                leagueName = m.getLeague().getLeagueName();
            }
        }

        return new TeamStatsResponse(
                team.getId(),
                team.getName(),
                played,
                wins,
                draws,
                losses,
                gf,
                ga,
                gf - ga,
                points,
                last5,
                leagueId,
                leagueName
        );
    }

    private TeamResponse toResponse(TeamEntity team) {
        return new TeamResponse(
                team.getId(),
                team.getName(),
                team.getCity(),
                team.getCaptain() != null ? team.getCaptain().getFullName() : team.getCaptainName(),
                team.getCaptain() != null ? team.getCaptain().getId() : null,
                team.getMembersCount() == null ? 0 : team.getMembersCount(),
                team.getMaxMembers(),
                team.getStatus(),
                team.getSport()
        );
    }

    /* ── Team members (roster) ──────────────────────────────────────── */

    public List<TeamMemberResponse> getMembers(Long teamId) {
        getTeamEntity(teamId);
        return teamMemberRepository.findByTeam_IdOrderByJerseyNumberAscIdAsc(teamId)
                .stream()
                .map(this::toMemberResponse)
                .toList();
    }

    @Transactional
    public TeamMemberResponse addMember(Long teamId, AddTeamMemberRequest request) {
        TeamEntity team = getTeamEntity(teamId);

        UserEntity user = userRepository.findById(request.userId())
                .orElseThrow(() -> new ResourceNotFoundException("Korisnik nije pronađen."));

        // Igrač smije biti samo u jednom timu istovremeno (bilo kojem)
        Optional<TeamMemberEntity> existing = teamMemberRepository.findByUser_Id(request.userId());
        if (existing.isPresent()) {
            TeamMemberEntity other = existing.get();
            if (other.getTeam().getId().equals(teamId)) {
                throw new BadRequestException("Ovaj korisnik je već član tima.");
            }
            throw new BadRequestException(
                    "Korisnik je već u timu \"" + other.getTeam().getName() + "\". "
                            + "Ukloni ga odatle prije nego ga dodaš u novi tim.");
        }

        // Sport korisnika mora odgovarati sportu tima
        if (team.getSport() != null && user.getSport() != null
                && !team.getSport().equals(user.getSport())) {
            throw new BadRequestException(
                    "Sport korisnika (" + user.getSport() + ") se ne podudara sa sportom tima ("
                            + team.getSport() + ").");
        }

        // Maksimalni broj članova
        long currentCount = teamMemberRepository.countByTeam_Id(teamId);
        if (team.getMaxMembers() != null && currentCount >= team.getMaxMembers()) {
            throw new BadRequestException(
                    "Tim je popunjen (" + currentCount + "/" + team.getMaxMembers() + " članova).");
        }

        if (request.jerseyNumber() != null
                && teamMemberRepository.existsByTeam_IdAndJerseyNumber(teamId, request.jerseyNumber())) {
            throw new BadRequestException("Broj dresa " + request.jerseyNumber() + " je već zauzet u ovom timu.");
        }

        TeamMemberEntity member = new TeamMemberEntity(
                team,
                user,
                request.jerseyNumber(),
                request.position() != null ? request.position().trim() : null
        );
        TeamMemberEntity saved = teamMemberRepository.save(member);

        // Osvjezi brojac clanova u timu
        long count = teamMemberRepository.countByTeam_Id(teamId);
        team.setMembersCount((int) count);
        teamRepository.save(team);

        return toMemberResponse(saved);
    }

    /**
     * Vraća membership korisnika (tim u kojem je član) ili null ako nije ni u jednom.
     */
    public TeamMemberResponse getMembershipOfUser(Long userId) {
        return teamMemberRepository.findByUser_Id(userId)
                .map(this::toMemberResponse)
                .orElse(null);
    }

    @Transactional
    public void removeMember(Long teamId, Long userId) {
        TeamEntity team = getTeamEntity(teamId);
        TeamMemberEntity member = teamMemberRepository.findByTeam_IdAndUser_Id(teamId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Korisnik nije član ovog tima."));
        teamMemberRepository.delete(member);

        long count = teamMemberRepository.countByTeam_Id(teamId);
        team.setMembersCount((int) count);
        teamRepository.save(team);
    }

    private TeamMemberResponse toMemberResponse(TeamMemberEntity m) {
        return new TeamMemberResponse(
                m.getId(),
                m.getTeam().getId(),
                m.getTeam().getName(),
                m.getUser().getId(),
                m.getUser().getUsername(),
                m.getUser().getFullName(),
                m.getUser().getEmail(),
                m.getJerseyNumber(),
                m.getPosition(),
                m.getJoinedAt()
        );
    }
}