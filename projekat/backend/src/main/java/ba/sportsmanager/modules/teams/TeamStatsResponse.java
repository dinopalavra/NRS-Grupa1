package ba.sportsmanager.modules.teams;

import java.util.List;

public record TeamStatsResponse(
        Long teamId,
        String teamName,
        int matchesPlayed,
        int wins,
        int draws,
        int losses,
        int goalsFor,
        int goalsAgainst,
        int goalDifference,
        int points,
        List<String> last5Form,
        Long leagueId,
        String leagueName
) {
}
