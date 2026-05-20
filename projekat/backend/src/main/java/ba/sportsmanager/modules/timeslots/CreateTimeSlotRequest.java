package ba.sportsmanager.modules.timeslots;

import ba.sportsmanager.common.SportType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

public record CreateTimeSlotRequest(
        @NotNull LocalDate slotDate,
        @NotNull LocalTime startTime,
        @NotNull LocalTime endTime,
        @NotBlank String location,
        @NotBlank String resourceName,
        @NotNull(message = "Sport je obavezan.") SportType sport
) {
}
