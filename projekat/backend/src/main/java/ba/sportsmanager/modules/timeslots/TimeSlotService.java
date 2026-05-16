package ba.sportsmanager.modules.timeslots;

import ba.sportsmanager.exception.BadRequestException;
import ba.sportsmanager.exception.ConflictException;
import ba.sportsmanager.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class TimeSlotService {

    private final TimeSlotRepository timeSlotRepository;

    public TimeSlotService(TimeSlotRepository timeSlotRepository) {
        this.timeSlotRepository = timeSlotRepository;
    }

    public List<TimeSlotResponse> getAll() {
        return timeSlotRepository.findAll().stream()
                .sorted(Comparator
                        .comparing(TimeSlotEntity::getSlotDate)
                        .thenComparing(TimeSlotEntity::getStartTime))
                .map(this::toResponse)
                .toList();
    }

    public List<TimeSlotResponse> getAvailable() {
        return timeSlotRepository.findByAvailabilityStatus(SlotAvailabilityStatus.AVAILABLE).stream()
                .sorted(Comparator
                        .comparing(TimeSlotEntity::getSlotDate)
                        .thenComparing(TimeSlotEntity::getStartTime))
                .map(this::toResponse)
                .toList();
    }

    public TimeSlotResponse create(CreateTimeSlotRequest request) {
        if (request.endTime().isBefore(request.startTime()) || request.endTime().equals(request.startTime())) {
            throw new BadRequestException("End time must be after start time.");
        }

        String location = request.location().trim();
        String resourceName = request.resourceName().trim();

        boolean overlaps = !timeSlotRepository.findOverlapping(
                location, resourceName, request.slotDate(),
                request.startTime(), request.endTime(), -1L
        ).isEmpty();

        if (overlaps) {
            throw new ConflictException(
                    "A time slot on this resource already exists that overlaps with the requested time range.");
        }

        TimeSlotEntity slot = new TimeSlotEntity();
        slot.setSlotDate(request.slotDate());
        slot.setStartTime(request.startTime());
        slot.setEndTime(request.endTime());
        slot.setLocation(location);
        slot.setResourceName(resourceName);
        slot.setAvailabilityStatus(SlotAvailabilityStatus.AVAILABLE);

        return toResponse(timeSlotRepository.save(slot));
    }

    public TimeSlotEntity getEntity(Long id) {
        return timeSlotRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Time slot not found."));
    }

    public void save(TimeSlotEntity slot) {
        timeSlotRepository.save(slot);
    }

    private TimeSlotResponse toResponse(TimeSlotEntity slot) {
        return new TimeSlotResponse(
                slot.getId(),
                slot.getSlotDate(),
                slot.getStartTime(),
                slot.getEndTime(),
                slot.getLocation(),
                slot.getResourceName(),
                slot.getAvailabilityStatus()
        );
    }
}