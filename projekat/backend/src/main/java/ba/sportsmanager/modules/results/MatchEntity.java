package ba.sportsmanager.modules.results;

import ba.sportsmanager.modules.leagues.LeagueEntity;
import ba.sportsmanager.modules.teams.TeamEntity;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "matches")
public class MatchEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "matchid")
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "leagueid")
    private LeagueEntity league;

    @ManyToOne(optional = false)
    @JoinColumn(name = "hometeamid")
    private TeamEntity homeTeam;

    @ManyToOne(optional = false)
    @JoinColumn(name = "awayteamid")
    private TeamEntity awayTeam;

    @Column(name = "matchdate", nullable = false)
    private LocalDate matchDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MatchStatus status = MatchStatus.SCHEDULED;

    @Column(name = "homescore")
    private Integer homeScore;

    @Column(name = "awayscore")
    private Integer awayScore;

    @Column(name = "location")
    private String location;

    @Column(name = "resourcename")
    private String resourceName;

    @Column(name = "starttime")
    private LocalTime startTime;

    @Column(name = "endtime")
    private LocalTime endTime;

    @Column(name = "linkedslotid")
    private Long linkedSlotId;

    public MatchEntity() {
    }

    public Long getId() {
        return id;
    }

    public LeagueEntity getLeague() {
        return league;
    }

    public void setLeague(LeagueEntity league) {
        this.league = league;
    }

    public TeamEntity getHomeTeam() {
        return homeTeam;
    }

    public void setHomeTeam(TeamEntity homeTeam) {
        this.homeTeam = homeTeam;
    }

    public TeamEntity getAwayTeam() {
        return awayTeam;
    }

    public void setAwayTeam(TeamEntity awayTeam) {
        this.awayTeam = awayTeam;
    }

    public LocalDate getMatchDate() {
        return matchDate;
    }

    public void setMatchDate(LocalDate matchDate) {
        this.matchDate = matchDate;
    }

    public MatchStatus getStatus() {
        return status;
    }

    public void setStatus(MatchStatus status) {
        this.status = status;
    }

    public Integer getHomeScore() {
        return homeScore;
    }

    public void setHomeScore(Integer homeScore) {
        this.homeScore = homeScore;
    }

    public Integer getAwayScore() {
        return awayScore;
    }

    public void setAwayScore(Integer awayScore) {
        this.awayScore = awayScore;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getResourceName() {
        return resourceName;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public Long getLinkedSlotId() {
        return linkedSlotId;
    }

    public void setLinkedSlotId(Long linkedSlotId) {
        this.linkedSlotId = linkedSlotId;
    }
}