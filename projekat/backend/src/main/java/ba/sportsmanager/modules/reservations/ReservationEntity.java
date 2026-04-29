package ba.sportsmanager.modules.reservations;

import ba.sportsmanager.modules.teams.TeamEntity;
import ba.sportsmanager.modules.timeslots.TimeSlotEntity;
import ba.sportsmanager.modules.users.UserEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "reservations")
public class ReservationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservationid")
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "teamid")
    private TeamEntity team;

    @ManyToOne(optional = false)
    @JoinColumn(name = "slotid")
    private TimeSlotEntity slot;

    @ManyToOne(optional = false)
    @JoinColumn(name = "createdby")
    private UserEntity createdBy;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReservationStatus status = ReservationStatus.PENDING;

    @Column(name = "createdat", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(length = 500)
    private String note;

    public ReservationEntity() {
    }

    public Long getId() {
        return id;
    }

    public TeamEntity getTeam() {
        return team;
    }

    public void setTeam(TeamEntity team) {
        this.team = team;
    }

    public TimeSlotEntity getSlot() {
        return slot;
    }

    public void setSlot(TimeSlotEntity slot) {
        this.slot = slot;
    }

    public UserEntity getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(UserEntity createdBy) {
        this.createdBy = createdBy;
    }

    public ReservationStatus getStatus() {
        return status;
    }

    public void setStatus(ReservationStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}