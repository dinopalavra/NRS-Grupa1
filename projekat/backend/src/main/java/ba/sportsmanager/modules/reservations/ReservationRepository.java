package ba.sportsmanager.modules.reservations;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collection;
import java.util.List;

public interface ReservationRepository extends JpaRepository<ReservationEntity, Long> {
    boolean existsBySlot_IdAndStatusIn(Long slotId, Collection<ReservationStatus> statuses);
    List<ReservationEntity> findByCreatedBy_Id(Long userId);
    List<ReservationEntity> findByTeam_Id(Long teamId);
    List<ReservationEntity> findBySlot_Id(Long slotId);
    List<ReservationEntity> findByStatus(ReservationStatus status);

    @Query("SELECT COUNT(r) > 0 FROM ReservationEntity r WHERE r.slot.location = :location AND r.slot.resourceName = :resourceName AND r.slot.slotDate = :slotDate AND r.slot.startTime < :endTime AND r.slot.endTime > :startTime AND r.slot.id != :excludeSlotId AND r.status IN :statuses")
    boolean existsOverlappingActiveReservation(
            @Param("location") String location,
            @Param("resourceName") String resourceName,
            @Param("slotDate") LocalDate slotDate,
            @Param("startTime") LocalTime startTime,
            @Param("endTime") LocalTime endTime,
            @Param("excludeSlotId") Long excludeSlotId,
            @Param("statuses") Collection<ReservationStatus> statuses
    );
}