package ba.sportsmanager.modules.reservations;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping
    public List<ReservationResponse> getAll() {
        return reservationService.getAll();
    }

    @GetMapping("/user/{userId}")
    public List<ReservationResponse> getByUser(@PathVariable Long userId) {
        return reservationService.getByUser(userId);
    }

    @PostMapping
    public ReservationResponse create(@Valid @RequestBody CreateReservationRequest request) {
        return reservationService.create(request);
    }

    @PatchMapping("/{id}/approve")
    public ReservationResponse approve(@PathVariable Long id) {
        return reservationService.approve(id);
    }

    @PatchMapping("/{id}/reject")
    public ReservationResponse reject(@PathVariable Long id) {
        return reservationService.reject(id);
    }

    @PatchMapping("/{id}/cancel")
    public ReservationResponse cancel(@PathVariable Long id) {
        return reservationService.cancel(id);
    }
}