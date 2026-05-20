package ba.sportsmanager.modules.leagues;

import ba.sportsmanager.exception.BadRequestException;
import ba.sportsmanager.exception.ResourceNotFoundException;
import ba.sportsmanager.modules.results.MatchEntity;
import ba.sportsmanager.modules.results.MatchRepository;
import ba.sportsmanager.modules.results.StandingRepository;
import ba.sportsmanager.modules.teams.TeamEntity;
import ba.sportsmanager.modules.teams.TeamResponse;
import ba.sportsmanager.modules.teams.TeamService;
import ba.sportsmanager.modules.teams.TeamStatus;
import ba.sportsmanager.modules.timeslots.SlotAvailabilityStatus;
import ba.sportsmanager.modules.timeslots.TimeSlotEntity;
import ba.sportsmanager.modules.timeslots.TimeSlotRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class LeagueService {

    private final LeagueRepository leagueRepository;
    private final LeagueTeamRepository leagueTeamRepository;
    private final TeamService teamService;
    private final MatchRepository matchRepository;
    private final StandingRepository standingRepository;
    private final TimeSlotRepository timeSlotRepository;

    public LeagueService(LeagueRepository leagueRepository,
                         LeagueTeamRepository leagueTeamRepository,
                         TeamService teamService,
                         MatchRepository matchRepository,
                         StandingRepository standingRepository,
                         TimeSlotRepository timeSlotRepository) {
        this.leagueRepository = leagueRepository;
        this.leagueTeamRepository = leagueTeamRepository;
        this.teamService = teamService;
        this.matchRepository = matchRepository;
        this.standingRepository = standingRepository;
        this.timeSlotRepository = timeSlotRepository;
    }

    public List<LeagueResponse> getAll() {
        return leagueRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public LeagueResponse getById(Long id) {
        return toResponse(getEntity(id));
    }

    public LeagueResponse create(CreateLeagueRequest request) {
        LeagueEntity league = new LeagueEntity();
        league.setLeagueName(request.leagueName());
        league.setSeason(request.season());
        league.setStatus(LeagueStatus.ACTIVE);
        league.setSport(request.sport());
        return toResponse(leagueRepository.save(league));
    }

    public LeagueEntity getEntity(Long id) {
        return leagueRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Liga nije pronađena."));
    }

    public List<TeamResponse> getTeamsInLeague(Long leagueId) {
        getEntity(leagueId);
        return leagueTeamRepository.findByLeague_Id(leagueId).stream()
                .map(lt -> toTeamResponse(lt.getTeam()))
                .toList();
    }

    public void addTeamToLeague(Long leagueId, Long teamId) {
        LeagueEntity league = getEntity(leagueId);
        TeamEntity team = teamService.getTeamEntity(teamId);

        if (league.getSport() != null && team.getSport() != null && !league.getSport().equals(team.getSport())) {
            throw new BadRequestException("Tim je drugog sporta od lige.");
        }

        if (leagueTeamRepository.existsByLeague_IdAndTeam_Id(leagueId, teamId)) {
            throw new BadRequestException("Tim je već dodan u ovu ligu.");
        }

        leagueTeamRepository.save(new LeagueTeamEntity(league, team));
    }

    public void removeTeamFromLeague(Long leagueId, Long teamId) {
        LeagueTeamEntity lt = leagueTeamRepository.findByLeague_IdAndTeam_Id(leagueId, teamId)
                .orElseThrow(() -> new ResourceNotFoundException("Tim nije u ovoj ligi."));
        leagueTeamRepository.delete(lt);
    }

    @Transactional
    public void deleteLeague(Long leagueId) {
        LeagueEntity league = getEntity(leagueId);

        // 1. Oslobodi sve termine vezane za utakmice ove lige
        List<MatchEntity> matches = matchRepository.findByLeague_IdOrderByMatchDateAsc(leagueId);
        if (!matches.isEmpty()) {
            List<Long> matchIds = matches.stream().map(MatchEntity::getId).toList();
            List<TimeSlotEntity> linkedSlots = timeSlotRepository.findByLeagueMatchIdIn(matchIds);
            for (TimeSlotEntity slot : linkedSlots) {
                slot.setLeagueMatchId(null);
                slot.setAvailabilityStatus(SlotAvailabilityStatus.AVAILABLE);
                timeSlotRepository.save(slot);
            }
        }

        // 2. Obriši sve utakmice
        matchRepository.deleteAll(matches);

        // 3. Obriši sve standings
        List<ba.sportsmanager.modules.results.StandingEntity> standings =
                standingRepository.findByLeague_IdOrderByPointsDescGoalsForDescGoalsAgainstAsc(leagueId);
        standingRepository.deleteAll(standings);

        // 4. Obriši sve league-team veze
        List<LeagueTeamEntity> leagueTeams = leagueTeamRepository.findByLeague_Id(leagueId);
        leagueTeamRepository.deleteAll(leagueTeams);

        // 5. Obriši ligu
        leagueRepository.delete(league);
    }

    private LeagueResponse toResponse(LeagueEntity league) {
        return new LeagueResponse(
                league.getId(),
                league.getLeagueName(),
                league.getSeason(),
                league.getStatus(),
                league.getSport()
        );
    }

    private TeamResponse toTeamResponse(TeamEntity team) {
        return new TeamResponse(
                team.getId(),
                team.getName(),
                team.getCity(),
                team.getCaptainName(),
                team.getMembersCount(),
                team.getStatus(),
                team.getSport()
        );
    }
}
