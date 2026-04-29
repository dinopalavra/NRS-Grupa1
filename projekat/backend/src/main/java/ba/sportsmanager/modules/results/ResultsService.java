package ba.sportsmanager.modules.results;

import ba.sportsmanager.exception.BadRequestException;
import ba.sportsmanager.exception.ResourceNotFoundException;
import ba.sportsmanager.modules.leagues.LeagueEntity;
import ba.sportsmanager.modules.leagues.LeagueService;
import ba.sportsmanager.modules.teams.TeamEntity;
import ba.sportsmanager.modules.teams.TeamService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ResultsService {

    private final MatchRepository matchRepository;
    private final StandingRepository standingRepository;
    private final LeagueService leagueService;
    private final TeamService teamService;

    public ResultsService(MatchRepository matchRepository,
                          StandingRepository standingRepository,
                          LeagueService leagueService,
                          TeamService teamService) {
        this.matchRepository = matchRepository;
        this.standingRepository = standingRepository;
        this.leagueService = leagueService;
        this.teamService = teamService;
    }

    public List<MatchResponse> getMatches() {
        return matchRepository.findAll().stream()
                .map(this::toMatchResponse)
                .toList();
    }

    public List<StandingResponse> getStandings(Long leagueId) {
        return standingRepository.findByLeague_IdOrderByPointsDescGoalsForDescGoalsAgainstAsc(leagueId).stream()
                .map(this::toStandingResponse)
                .toList();
    }

    public MatchResponse createMatch(CreateMatchRequest request) {
        if (request.homeTeamId().equals(request.awayTeamId())) {
            throw new BadRequestException("Home and away team cannot be the same.");
        }

        LeagueEntity league = leagueService.getEntity(request.leagueId());
        TeamEntity homeTeam = teamService.getTeamEntity(request.homeTeamId());
        TeamEntity awayTeam = teamService.getTeamEntity(request.awayTeamId());

        MatchEntity match = new MatchEntity();
        match.setLeague(league);
        match.setHomeTeam(homeTeam);
        match.setAwayTeam(awayTeam);
        match.setMatchDate(request.matchDate());
        match.setStatus(MatchStatus.SCHEDULED);

        return toMatchResponse(matchRepository.save(match));
    }

    @Transactional
    public MatchResponse recordResult(Long matchId, RecordResultRequest request) {
        MatchEntity match = matchRepository.findById(matchId)
                .orElseThrow(() -> new ResourceNotFoundException("Match not found."));

        match.setHomeScore(request.homeScore());
        match.setAwayScore(request.awayScore());
        match.setStatus(MatchStatus.COMPLETED);
        matchRepository.save(match);

        StandingEntity homeStanding = getOrCreateStanding(match.getLeague(), match.getHomeTeam());
        StandingEntity awayStanding = getOrCreateStanding(match.getLeague(), match.getAwayTeam());

        applyStats(homeStanding, request.homeScore(), request.awayScore());
        applyStats(awayStanding, request.awayScore(), request.homeScore());

        standingRepository.save(homeStanding);
        standingRepository.save(awayStanding);

        return toMatchResponse(match);
    }

    private StandingEntity getOrCreateStanding(LeagueEntity league, TeamEntity team) {
        return standingRepository.findByLeague_IdAndTeam_Id(league.getId(), team.getId())
                .orElseGet(() -> {
                    StandingEntity standing = new StandingEntity();
                    standing.setLeague(league);
                    standing.setTeam(team);
                    return standing;
                });
    }

    private void applyStats(StandingEntity standing, int goalsFor, int goalsAgainst) {
        standing.setPlayed(standing.getPlayed() + 1);
        standing.setGoalsFor(standing.getGoalsFor() + goalsFor);
        standing.setGoalsAgainst(standing.getGoalsAgainst() + goalsAgainst);

        if (goalsFor > goalsAgainst) {
            standing.setWins(standing.getWins() + 1);
            standing.setPoints(standing.getPoints() + 3);
        } else if (goalsFor == goalsAgainst) {
            standing.setDraws(standing.getDraws() + 1);
            standing.setPoints(standing.getPoints() + 1);
        } else {
            standing.setLosses(standing.getLosses() + 1);
        }
    }

    private MatchResponse toMatchResponse(MatchEntity match) {
        return new MatchResponse(
                match.getId(),
                match.getLeague().getId(),
                match.getLeague().getLeagueName(),
                match.getHomeTeam().getId(),
                match.getHomeTeam().getName(),
                match.getAwayTeam().getId(),
                match.getAwayTeam().getName(),
                match.getMatchDate(),
                match.getStatus(),
                match.getHomeScore(),
                match.getAwayScore()
        );
    }

    private StandingResponse toStandingResponse(StandingEntity standing) {
        return new StandingResponse(
                standing.getTeam().getId(),
                standing.getTeam().getName(),
                standing.getPlayed(),
                standing.getWins(),
                standing.getDraws(),
                standing.getLosses(),
                standing.getGoalsFor(),
                standing.getGoalsAgainst(),
                standing.getPoints()
        );
    }
}