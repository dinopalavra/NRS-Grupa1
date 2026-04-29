package ba.sportsmanager.modules.leagues;

import jakarta.validation.constraints.NotBlank;

public record CreateLeagueRequest(
        @NotBlank String leagueName,
        @NotBlank String season
) {
}