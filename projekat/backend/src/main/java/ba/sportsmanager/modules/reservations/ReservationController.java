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

    @GetMapping("/team/{teamId}")
    public List<ReservationResponse> getByTeam(@PathVariable Long teamId) {
        return reservationService.getByTeam(teamId);
    }

    @GetMapping("/slot/{slotId}")
    public List<ReservationResponse> getBySlot(@PathVariable Long slotId) {
        return reservationService.getBySlot(slotId);
    }

    @GetMapping("/status/{status}")
    public List<ReservationResponse> getByStatus(@PathVariable ReservationStatus status) {
        return reservationService.getByStatus(status);
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

    @PatchMapping("/{id}/reschedule")
    public ReservationResponse reschedule(
            @PathVariable Long id,
            @Valid @RequestBody RescheduleReservationRequest request
    ) {
        return reservationService.reschedule(id, request);
    }

    @PostMapping("/recurring")
    public java.util.List<ReservationResponse> createRecurring(
            @Valid @RequestBody CreateRecurringReservationRequest request) {
        return reservationService.createRecurring(request);
    }

    @GetMapping("/{id}/comments")
    public List<ReservationCommentResponse> getComments(@PathVariable Long id) {
        return reservationService.getComments(id);
    }

    @PostMapping("/{id}/comments")
    public ReservationCommentResponse addComment(
            @PathVariable Long id,
            @RequestBody java.util.Map<String, String> body,
            @org.springframework.security.core.annotation.AuthenticationPrincipal org.springframework.security.core.userdetails.UserDetails userDetails) {
        return reservationService.addComment(id, body.get("content"), userDetails.getUsername());
    }
}