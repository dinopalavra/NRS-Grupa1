package ba.sportsmanager.modules.timeslots;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TimeSlotRepository extends JpaRepository<TimeSlotEntity, Long> {
    List<TimeSlotEntity> findByAvailabilityStatus(SlotAvailabilityStatus availabilityStatus);
}