package ba.sportsmanager.modules.leagues;

import jakarta.persistence.*;

@Entity
@Table(name = "leagues")
public class LeagueEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "leagueid")
    private Long id;

    @Column(name = "leaguename", nullable = false)
    private String leagueName;

    @Column(nullable = false)
    private String season;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LeagueStatus status = LeagueStatus.ACTIVE;

    public LeagueEntity() {
    }

    public Long getId() {
        return id;
    }

    public String getLeagueName() {
        return leagueName;
    }

    public void setLeagueName(String leagueName) {
        this.leagueName = leagueName;
    }

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public LeagueStatus getStatus() {
        return status;
    }

    public void setStatus(LeagueStatus status) {
        this.status = status;
    }
}