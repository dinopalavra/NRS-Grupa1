package ba.sportsmanager.modules.results;

import ba.sportsmanager.exception.BadRequestException;
import ba.sportsmanager.exception.ConflictException;
import ba.sportsmanager.exception.ResourceNotFoundException;
import ba.sportsmanager.modules.leagues.LeagueEntity;
import ba.sportsmanager.modules.leagues.LeagueService;
import ba.sportsmanager.modules.notifications.NotificationService;
import ba.sportsmanager.modules.notifications.NotificationType;
import ba.sportsmanager.modules.teams.TeamEntity;
import ba.sportsmanager.modules.teams.TeamService;
import ba.sportsmanager.modules.timeslots.SlotAvailabilityStatus;
import ba.sportsmanager.modules.timeslots.TimeSlotEntity;
import ba.sportsmanager.modules.timeslots.TimeSlotRepository;
import ba.sportsmanager.modules.users.UserRole;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class ResultsService {

    private final MatchRepository matchRepository;
    private final StandingRepository standingRepository;
    private final LeagueService leagueService;
    private final TeamService teamService;
    private final TimeSlotRepository timeSlotRepository;
    private final NotificationService notificationService;

    public ResultsService(MatchRepository matchRepository,
                          StandingRepository standingRepository,
                          LeagueService leagueService,
                          TeamService teamService,
                          TimeSlotRepository timeSlotRepository,
                          NotificationService notificationService) {
        this.matchRepository = matchRepository;
        this.standingRepository = standingRepository;
        this.leagueService = leagueService;
        this.teamService = teamService;
        this.timeSlotRepository = timeSlotRepository;
        this.notificationService = notificationService;
    }

    public List<MatchResponse> getMatches() {
        return matchRepository.findAll().stream()
                .map(this::toMatchResponse)
                .toList();
    }

    public List<MatchResponse> getMatchesByLeague(Long leagueId) {
        leagueService.getEntity(leagueId);
        return matchRepository.findByLeague_IdOrderByMatchDateAsc(leagueId).stream()
                .map(this::toMatchResponse)
                .toList();
    }

    public List<StandingResponse> getStandings(Long leagueId) {
        return standingRepository.findByLeague_IdOrderByPointsDescGoalsForDescGoalsAgainstAsc(leagueId).stream()
                .map(this::toStandingResponse)
                .toList();
    }

    @Transactional
    public MatchResponse createMatch(CreateMatchRequest request) {
        if (request.homeTeamId().equals(request.awayTeamId())) {
            throw new BadRequestException("Domaći i gostujući tim ne mogu biti isti.");
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

        // Auto-reserve timeslot if venue+time provided
        boolean hasVenue = request.location() != null && !request.location().isBlank()
                && request.resourceName() != null && !request.resourceName().isBlank()
                && request.startTime() != null && request.matchDate() != null;

        TimeSlotEntity slotToLink = null;
        if (hasVenue) {
            String loc = request.location().trim();
            String res = request.resourceName().trim();
            LocalTime end = request.endTime() != null ? request.endTime() : request.startTime().plusHours(2);

            Optional<TimeSlotEntity> existingSlot = timeSlotRepository
                    .findByLocationAndResourceNameAndSlotDateAndStartTime(loc, res, request.matchDate(), request.startTime());

            TimeSlotEntity slot;
            if (existingSlot.isPresent()) {
                slot = existingSlot.get();
                if (slot.getAvailabilityStatus() != SlotAvailabilityStatus.AVAILABLE) {
                    throw new ConflictException("Ovaj termin nije slobodan.");
                }
            } else {
                slot = new TimeSlotEntity();
                slot.setLocation(loc);
                slot.setResourceName(res);
                slot.setSlotDate(request.matchDate());
                slot.setStartTime(request.startTime());
                slot.setEndTime(end);
                slot.setAvailabilityStatus(SlotAvailabilityStatus.AVAILABLE);
            }
            slot.setAvailabilityStatus(SlotAvailabilityStatus.RESERVED);
            slotToLink = timeSlotRepository.save(slot);

            match.setLocation(loc);
            match.setResourceName(res);
            match.setStartTime(request.startTime());
            match.setEndTime(end);
        }

        MatchEntity savedMatch = matchRepository.save(match);

        if (slotToLink != null) {
            slotToLink.setLeagueMatchId(savedMatch.getId());
            timeSlotRepository.save(slotToLink);
            savedMatch.setLinkedSlotId(slotToLink.getId());
            savedMatch = matchRepository.save(savedMatch);
        }

        String msg = "Zakazana utakmica: " + homeTeam.getName() + " vs " + awayTeam.getName()
                + " (" + savedMatch.getMatchDate() + ") u ligi " + league.getLeagueName() + ".";
        notificationService.createForRole(UserRole.ADMIN, msg, NotificationType.MATCH_SCHEDULED);
        notificationService.createForRole(UserRole.CAPTAIN, msg, NotificationType.MATCH_SCHEDULED);

        return toMatchResponse(savedMatch);
    }

    @Transactional
    public MatchResponse recordResult(Long matchId, RecordResultRequest request) {
        MatchEntity match = matchRepository.findById(matchId)
                .orElseThrow(() -> new ResourceNotFoundException("Utakmica nije pronađena."));

        if (match.getStatus() == MatchStatus.COMPLETED) {
            undoStats(match);
        }

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

        String msg = "Rezultat unesen: " + match.getHomeTeam().getName() + " "
                + request.homeScore() + " - " + request.awayScore() + " "
                + match.getAwayTeam().getName() + " (" + match.getLeague().getLeagueName() + ").";
        notificationService.createForRole(UserRole.ADMIN, msg, NotificationType.MATCH_RESULT_RECORDED);
        notificationService.createForRole(UserRole.CAPTAIN, msg, NotificationType.MATCH_RESULT_RECORDED);

        return toMatchResponse(match);
    }

    private void undoStats(MatchEntity match) {
        standingRepository.findByLeague_IdAndTeam_Id(match.getLeague().getId(), match.getHomeTeam().getId())
                .ifPresent(s -> {
                    removeStats(s, match.getHomeScore(), match.getAwayScore());
                    standingRepository.save(s);
                });
        standingRepository.findByLeague_IdAndTeam_Id(match.getLeague().getId(), match.getAwayTeam().getId())
                .ifPresent(s -> {
                    removeStats(s, match.getAwayScore(), match.getHomeScore());
                    standingRepository.save(s);
                });
    }

    private void removeStats(StandingEntity standing, int goalsFor, int goalsAgainst) {
        standing.setPlayed(Math.max(0, standing.getPlayed() - 1));
        standing.setGoalsFor(Math.max(0, standing.getGoalsFor() - goalsFor));
        standing.setGoalsAgainst(Math.max(0, standing.getGoalsAgainst() - goalsAgainst));
        if (goalsFor > goalsAgainst) {
            standing.setWins(Math.max(0, standing.getWins() - 1));
            standing.setPoints(Math.max(0, standing.getPoints() - 3));
        } else if (goalsFor == goalsAgainst) {
            standing.setDraws(Math.max(0, standing.getDraws() - 1));
            standing.setPoints(Math.max(0, standing.getPoints() - 1));
        } else {
            standing.setLosses(Math.max(0, standing.getLosses() - 1));
        }
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
                match.getAwayScore(),
                match.getLocation(),
                match.getResourceName(),
                match.getStartTime(),
                match.getEndTime(),
                match.getLinkedSlotId()
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
