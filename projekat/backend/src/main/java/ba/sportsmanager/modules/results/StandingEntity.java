package ba.sportsmanager.modules.results;

import ba.sportsmanager.modules.leagues.LeagueEntity;
import ba.sportsmanager.modules.teams.TeamEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "standings",
       uniqueConstraints = @UniqueConstraint(columnNames = {"leagueid", "teamid"}))
public class StandingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "standingid")
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "leagueid")
    private LeagueEntity league;

    @ManyToOne(optional = false)
    @JoinColumn(name = "teamid")
    private TeamEntity team;

    @Column(nullable = false)
    private Integer played = 0;

    @Column(nullable = false)
    private Integer wins = 0;

    @Column(nullable = false)
    private Integer draws = 0;

    @Column(nullable = false)
    private Integer losses = 0;

    @Column(name = "goalsfor", nullable = false)
    private Integer goalsFor = 0;

    @Column(name = "goalsagainst", nullable = false)
    private Integer goalsAgainst = 0;

    @Column(nullable = false)
    private Integer points = 0;

    public StandingEntity() {
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

    public TeamEntity getTeam() {
        return team;
    }

    public void setTeam(TeamEntity team) {
        this.team = team;
    }

    public Integer getPlayed() {
        return played;
    }

    public void setPlayed(Integer played) {
        this.played = played;
    }

    public Integer getWins() {
        return wins;
    }

    public void setWins(Integer wins) {
        this.wins = wins;
    }

    public Integer getDraws() {
        return draws;
    }

    public void setDraws(Integer draws) {
        this.draws = draws;
    }

    public Integer getLosses() {
        return losses;
    }

    public void setLosses(Integer losses) {
        this.losses = losses;
    }

    public Integer getGoalsFor() {
        return goalsFor;
    }

    public void setGoalsFor(Integer goalsFor) {
        this.goalsFor = goalsFor;
    }

    public Integer getGoalsAgainst() {
        return goalsAgainst;
    }

    public void setGoalsAgainst(Integer goalsAgainst) {
        this.goalsAgainst = goalsAgainst;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }
}