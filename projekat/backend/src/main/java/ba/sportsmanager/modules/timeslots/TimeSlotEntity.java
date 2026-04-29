package ba.sportsmanager.modules.timeslots;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "timeslots")
public class TimeSlotEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "slotid")
    private Long id;

    @Column(name = "slotdate", nullable = false)
    private LocalDate slotDate;

    @Column(name = "starttime", nullable = false)
    private LocalTime startTime;

    @Column(name = "endtime", nullable = false)
    private LocalTime endTime;

    @Column(nullable = false)
    private String location;

    @Column(name = "resourcename", nullable = false)
    private String resourceName;

    @Enumerated(EnumType.STRING)
    @Column(name = "availabilitystatus", nullable = false)
    private SlotAvailabilityStatus availabilityStatus = SlotAvailabilityStatus.AVAILABLE;

    public TimeSlotEntity() {
    }

    public Long getId() {
        return id;
    }

    public LocalDate getSlotDate() {
        return slotDate;
    }

    public void setSlotDate(LocalDate slotDate) {
        this.slotDate = slotDate;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getResourceName() {
        return resourceName;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }

    public SlotAvailabilityStatus getAvailabilityStatus() {
        return availabilityStatus;
    }

    public void setAvailabilityStatus(SlotAvailabilityStatus availabilityStatus) {
        this.availabilityStatus = availabilityStatus;
    }
}