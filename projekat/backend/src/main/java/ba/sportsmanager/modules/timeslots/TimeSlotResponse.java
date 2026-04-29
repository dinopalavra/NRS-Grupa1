package ba.sportsmanager.modules.timeslots;

import java.time.LocalDate;
import java.time.LocalTime;

public record TimeSlotResponse(
        Long id,
        LocalDate slotDate,
        LocalTime startTime,
        LocalTime endTime,
        String location,
        String resourceName,
        SlotAvailabilityStatus availabilityStatus
) {
}