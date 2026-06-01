package ba.sportsmanager.modules.reservations;

import ba.sportsmanager.modules.users.UserEntity;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reservation_comments")
public class ReservationCommentEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "reservationid")
    private ReservationEntity reservation;

    @ManyToOne(optional = false)
    @JoinColumn(name = "userid")
    private UserEntity author;

    @Column(nullable = false, length = 1000)
    private String content;

    @Column(name = "createdat", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public ReservationCommentEntity() {}
    public Long getId() { return id; }
    public ReservationEntity getReservation() { return reservation; }
    public void setReservation(ReservationEntity r) { this.reservation = r; }
    public UserEntity getAuthor() { return author; }
    public void setAuthor(UserEntity u) { this.author = u; }
    public String getContent() { return content; }
    public void setContent(String c) { this.content = c; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
