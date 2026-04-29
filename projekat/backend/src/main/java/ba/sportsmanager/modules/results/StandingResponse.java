package ba.sportsmanager.modules.results;

public record StandingResponse(
        Long teamId,
        String teamName,
        Integer played,
        Integer wins,
        Integer draws,
        Integer losses,
        Integer goalsFor,
        Integer goalsAgainst,
        Integer points
) {
}