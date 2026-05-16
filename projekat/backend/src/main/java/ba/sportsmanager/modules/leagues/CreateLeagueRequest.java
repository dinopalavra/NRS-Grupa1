package ba.sportsmanager.modules.leagues;

import ba.sportsmanager.common.SportType;
import jakarta.validation.constraints.NotBlank;

public record CreateLeagueRequest(
        @NotBlank String leagueName,
        @NotBlank String season,
        SportType sport
) {
}
