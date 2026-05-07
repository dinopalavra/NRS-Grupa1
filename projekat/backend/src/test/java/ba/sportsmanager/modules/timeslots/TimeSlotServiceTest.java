package ba.sportsmanager.modules.timeslots;

import ba.sportsmanager.exception.BadRequestException;
import ba.sportsmanager.exception.ConflictException;
import ba.sportsmanager.exception.ResourceNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TimeSlotServiceTest {

    @Mock
    private TimeSlotRepository timeSlotRepository;

    @InjectMocks
    private TimeSlotService timeSlotService;

    @Test
    void create_Successful_ReturnsResponse() {
        CreateTimeSlotRequest request = new CreateTimeSlotRequest(
                LocalDate.of(2026, 5, 11),
                LocalTime.of(18, 0),
                LocalTime.of(19, 30),
                "Dvorana 1",
                "Teren A"
        );

        when(timeSlotRepository.findOverlapping(anyString(), anyString(), any(), any(), any(), anyLong()))
                .thenReturn(Collections.emptyList());
        when(timeSlotRepository.save(any(TimeSlotEntity.class))).thenAnswer(invocation -> {
            TimeSlotEntity entity = invocation.getArgument(0);
            ReflectionTestUtils.setField(entity, "id", 10L);
            return entity;
        });

        TimeSlotResponse response = timeSlotService.create(request);

        assertNotNull(response);
        assertEquals(10L, response.id());
        assertEquals(SlotAvailabilityStatus.AVAILABLE, response.availabilityStatus());
        verify(timeSlotRepository).save(any(TimeSlotEntity.class));
    }

    @Test
    void create_InvalidTimeRange_ThrowsBadRequestException() {
        CreateTimeSlotRequest request = new CreateTimeSlotRequest(
                LocalDate.of(2026, 5, 11),
                LocalTime.of(19, 0),
                LocalTime.of(18, 0),
                "Dvorana 1",
                "Teren A"
        );

        assertThrows(BadRequestException.class, () -> timeSlotService.create(request));
        verify(timeSlotRepository, never()).save(any());
    }

    @Test
    void create_WhenOverlappingSlotExists_ThrowsConflictException() {
        CreateTimeSlotRequest request = new CreateTimeSlotRequest(
                LocalDate.of(2026, 5, 11),
                LocalTime.of(11, 0),
                LocalTime.of(12, 30),
                "Skenderija",
                "Teren 1"
        );

        TimeSlotEntity overlapping = new TimeSlotEntity();
        ReflectionTestUtils.setField(overlapping, "id", 3L);
        overlapping.setStartTime(LocalTime.of(10, 0));
        overlapping.setEndTime(LocalTime.of(11, 30));

        when(timeSlotRepository.findOverlapping(anyString(), anyString(), any(), any(), any(), anyLong()))
                .thenReturn(List.of(overlapping));

        assertThrows(ConflictException.class, () -> timeSlotService.create(request));
        verify(timeSlotRepository, never()).save(any());
    }

    @Test
    void getAvailable_ReturnsOnlyAvailableSlots() {
        TimeSlotEntity available = new TimeSlotEntity();
        ReflectionTestUtils.setField(available, "id", 1L);
        available.setSlotDate(LocalDate.of(2026, 5, 11));
        available.setStartTime(LocalTime.of(18, 0));
        available.setEndTime(LocalTime.of(19, 0));
        available.setLocation("Dvorana 1");
        available.setResourceName("Teren A");
        available.setAvailabilityStatus(SlotAvailabilityStatus.AVAILABLE);

        when(timeSlotRepository.findByAvailabilityStatus(SlotAvailabilityStatus.AVAILABLE))
                .thenReturn(List.of(available));

        List<TimeSlotResponse> result = timeSlotService.getAvailable();

        assertEquals(1, result.size());
        assertEquals(1L, result.get(0).id());
        assertEquals(SlotAvailabilityStatus.AVAILABLE, result.get(0).availabilityStatus());
    }

    @Test
    void getEntity_NotFound_ThrowsResourceNotFoundException() {
        when(timeSlotRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> timeSlotService.getEntity(99L));
    }
}