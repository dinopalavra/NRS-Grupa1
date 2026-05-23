package ba.sportsmanager.modules.results;

import ba.sportsmanager.modules.teams.TeamEntity;
import ba.sportsmanager.modules.users.UserEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "goals")
public class GoalEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "goalid")
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "matchid")
    private MatchEntity match;

    @ManyToOne(optional = false)
    @JoinColumn(name = "playerid")
    private UserEntity player;

    @ManyToOne(optional = false)
    @JoinColumn(name = "teamid")
    private TeamEntity team;

    /**
     * Minuta u kojoj je gol postignut. DB kolona je nazvana "goalminute"
     * jer je "minute" rezervisana riječ u H2/standardnom SQL-u.
     */
    @Column(name = "goalminute")
    private Integer minute;

    public GoalEntity() {
    }

    public GoalEntity(MatchEntity match, UserEntity player, TeamEntity team, Integer minute) {
        this.match = match;
        this.player = player;
        this.team = team;
        this.minute = minute;
    }

    public Long getId() { return id; }
    public MatchEntity getMatch() { return match; }
    public void setMatch(MatchEntity match) { this.match = match; }
    public UserEntity getPlayer() { return player; }
    public void setPlayer(UserEntity player) { this.player = player; }
    public TeamEntity getTeam() { return team; }
    public void setTeam(TeamEntity team) { this.team = team; }
    public Integer getMinute() { return minute; }
    public void setMinute(Integer minute) { this.minute = minute; }
}
