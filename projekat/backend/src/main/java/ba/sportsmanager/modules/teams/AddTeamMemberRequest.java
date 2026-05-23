package ba.sportsmanager.modules.teams;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AddTeamMemberRequest(
        @NotNull Long userId,
        @Min(value = 0, message = "Broj dresa mora biti pozitivan.") Integer jerseyNumber,
        @Size(max = 50) String position
) {
}
