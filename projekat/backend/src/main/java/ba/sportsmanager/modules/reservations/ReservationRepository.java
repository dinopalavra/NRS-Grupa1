package ba.sportsmanager.modules.reservations;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface ReservationRepository extends JpaRepository<ReservationEntity, Long> {
    boolean existsBySlot_IdAndStatusIn(Long slotId, Collection<ReservationStatus> statuses);
    List<ReservationEntity> findByCreatedBy_Id(Long userId);
}