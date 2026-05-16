package ba.sportsmanager.modules.teams;

import ba.sportsmanager.common.SportType;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "teams")
public class TeamEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "teamid")
    private Long id;

    @Column(name = "teamname", nullable = false)
    private String name;

    @Column(nullable = false)
    private String city;

    @Column(name = "captainname", nullable = false)
    private String captainName;

    @Column(name = "memberscount", nullable = false)
    private Integer membersCount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TeamStatus status = TeamStatus.ACTIVE;

    @Column(name = "createdat", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    @Column(name = "sport")
    private SportType sport;

    public TeamEntity() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String teamName) {
        this.name = teamName;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCaptainName() {
        return captainName;
    }

    public void setCaptainName(String captainName) {
        this.captainName = captainName;
    }

    public Integer getMembersCount() {
        return membersCount;
    }

    public void setMembersCount(Integer membersCount) {
        this.membersCount = membersCount;
    }

    public TeamStatus getStatus() {
        return status;
    }

    public void setStatus(TeamStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public SportType getSport() {
        return sport;
    }

    public void setSport(SportType sport) {
        this.sport = sport;
    }
}