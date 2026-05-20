package ba.sportsmanager.modules.leagues;

import ba.sportsmanager.common.SportType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateLeagueRequest(
        @NotBlank String leagueName,
        @NotBlank String season,
        @NotNull(message = "Sport je obavezan.") SportType sport
) {
}
