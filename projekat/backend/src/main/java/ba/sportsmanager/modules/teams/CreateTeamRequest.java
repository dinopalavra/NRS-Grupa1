package ba.sportsmanager.modules.teams;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateTeamRequest(
        @NotBlank String name,
        @NotBlank String city,
        @NotBlank String captainName,
        @NotNull @Min(1) Integer membersCount
) {
}