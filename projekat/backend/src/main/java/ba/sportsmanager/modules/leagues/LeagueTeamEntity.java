package ba.sportsmanager.modules.leagues;

import ba.sportsmanager.modules.teams.TeamEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "league_teams",
       uniqueConstraints = @UniqueConstraint(columnNames = {"leagueid", "teamid"}))
public class LeagueTeamEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "leagueid")
    private LeagueEntity league;

    @ManyToOne(optional = false)
    @JoinColumn(name = "teamid")
    private TeamEntity team;

    public LeagueTeamEntity() {
    }

    public LeagueTeamEntity(LeagueEntity league, TeamEntity team) {
        this.league = league;
        this.team = team;
    }

    public Long getId() { return id; }
    public LeagueEntity getLeague() { return league; }
    public TeamEntity getTeam() { return team; }
}
