package ba.sportsmanager.modules.teams;

import ba.sportsmanager.common.SportType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateTeamRequest(
        @NotBlank String name,
        @NotBlank String city,
        @NotNull(message = "Kapiten je obavezan.") Long captainUserId,
        @NotNull(message = "Maksimalni broj članova je obavezan.") @Min(1) Integer maxMembers,
        @NotNull(message = "Sport je obavezan.") SportType sport
) {
}
