package ba.sportsmanager.modules.teams;

import ba.sportsmanager.modules.users.UserEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "team_members",
        uniqueConstraints = @UniqueConstraint(columnNames = {"teamid", "userid"}))
public class TeamMemberEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "membershipid")
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "teamid")
    private TeamEntity team;

    @ManyToOne(optional = false)
    @JoinColumn(name = "userid")
    private UserEntity user;

    @Column(name = "jerseynumber")
    private Integer jerseyNumber;

    @Column(name = "position", length = 50)
    private String position;

    @Column(name = "joinedat", nullable = false)
    private LocalDateTime joinedAt = LocalDateTime.now();

    public TeamMemberEntity() {
    }

    public TeamMemberEntity(TeamEntity team, UserEntity user, Integer jerseyNumber, String position) {
        this.team = team;
        this.user = user;
        this.jerseyNumber = jerseyNumber;
        this.position = position;
    }

    public Long getId() { return id; }
    public TeamEntity getTeam() { return team; }
    public void setTeam(TeamEntity team) { this.team = team; }
    public UserEntity getUser() { return user; }
    public void setUser(UserEntity user) { this.user = user; }
    public Integer getJerseyNumber() { return jerseyNumber; }
    public void setJerseyNumber(Integer jerseyNumber) { this.jerseyNumber = jerseyNumber; }
    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }
    public LocalDateTime getJoinedAt() { return joinedAt; }
}
