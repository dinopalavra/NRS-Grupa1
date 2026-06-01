package ba.sportsmanager.modules.reservations;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReservationCommentRepository extends JpaRepository<ReservationCommentEntity, Long> {
    List<ReservationCommentEntity> findByReservation_IdOrderByCreatedAtAsc(Long reservationId);
}
