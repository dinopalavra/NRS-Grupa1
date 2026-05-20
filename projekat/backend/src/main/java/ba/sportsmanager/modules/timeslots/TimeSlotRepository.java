package ba.sportsmanager.modules.timeslots;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface TimeSlotRepository extends JpaRepository<TimeSlotEntity, Long> {
    List<TimeSlotEntity> findByAvailabilityStatus(SlotAvailabilityStatus availabilityStatus);

    Optional<TimeSlotEntity> findByLocationAndResourceNameAndSlotDateAndStartTime(
            String location, String resourceName, LocalDate slotDate, LocalTime startTime);

    List<TimeSlotEntity> findByLeagueMatchIdIn(List<Long> matchIds);

    @Query("SELECT s FROM TimeSlotEntity s WHERE s.location = :location AND s.resourceName = :resourceName AND s.slotDate = :slotDate AND s.startTime < :endTime AND s.endTime > :startTime AND s.id != :excludeId")
    List<TimeSlotEntity> findOverlapping(
            @Param("location") String location,
            @Param("resourceName") String resourceName,
            @Param("slotDate") LocalDate slotDate,
            @Param("startTime") LocalTime startTime,
            @Param("endTime") LocalTime endTime,
            @Param("excludeId") Long excludeId
    );
}