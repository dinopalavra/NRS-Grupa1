package ba.sportsmanager.modules.timeslots;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/timeslots")
public class TimeSlotController {

    private final TimeSlotService timeSlotService;

    public TimeSlotController(TimeSlotService timeSlotService) {
        this.timeSlotService = timeSlotService;
    }

    @GetMapping
    public List<TimeSlotResponse> getAll() {
        return timeSlotService.getAll();
    }

    @GetMapping("/available")
    public List<TimeSlotResponse> getAvailable() {
        return timeSlotService.getAvailable();
    }

    @PostMapping
    public TimeSlotResponse create(@Valid @RequestBody CreateTimeSlotRequest request) {
        return timeSlotService.create(request);
    }
}