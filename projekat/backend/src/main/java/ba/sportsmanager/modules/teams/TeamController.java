package ba.sportsmanager.modules.teams;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping
    public List<TeamResponse> getTeams() {
        return teamService.getAllTeams();
    }

    @PostMapping
    public TeamResponse createTeam(@Valid @RequestBody CreateTeamRequest request) {
        return teamService.createTeam(request);
    }

    @GetMapping("/{id}/stats")
    public TeamStatsResponse getStats(@PathVariable Long id,
                                      @RequestParam(value = "leagueId", required = false) Long leagueId) {
        return teamService.getTeamStats(id, leagueId);
    }

    /* ── Team members (roster) ──────────────────────────────────────── */

    @GetMapping("/{id}/members")
    public List<TeamMemberResponse> getMembers(@PathVariable Long id) {
        return teamService.getMembers(id);
    }

    @PostMapping("/{id}/members")
    @org.springframework.web.bind.annotation.ResponseStatus(org.springframework.http.HttpStatus.CREATED)
    public TeamMemberResponse addMember(@PathVariable Long id,
                                        @Valid @RequestBody AddTeamMemberRequest request) {
        return teamService.addMember(id, request);
    }

    @DeleteMapping("/{id}/members/{userId}")
    @org.springframework.web.bind.annotation.ResponseStatus(org.springframework.http.HttpStatus.NO_CONTENT)
    public void removeMember(@PathVariable Long id, @PathVariable Long userId) {
        teamService.removeMember(id, userId);
    }

    /**
     * Vraća tim u kojem je odabrani korisnik član (PLAYER ili CAPTAIN).
     * Vraća null ako korisnik nije ni u jednom timu.
     */
    @GetMapping("/by-user/{userId}")
    public TeamMemberResponse getMembershipOfUser(@PathVariable Long userId) {
        return teamService.getMembershipOfUser(userId);
    }
}