package ba.sportsmanager.modules.users;
import jakarta.persistence.*;
@Entity
@Table(name = "users")
public class UserEntity {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name = "userid")
private Long id;
@Column(name = "fullname", nullable = false)
private String fullName;
@Column(nullable = false, unique = true)
private String email;
@Column(nullable = false, unique = true)
private String username;
@Column(name = "passwordhash", nullable = false)
private String passwordHash;
@Enumerated(EnumType.STRING)
Users modul
Projekat/backend/src/main/java/ba/sportsmanager/modules/users/UserRole.java
Projekat/backend/src/main/java/ba/sportsmanager/modules/users/UserEntity.java
@Column(nullable = false)
private UserRole role;
@Column(nullable = false)
private boolean active = true;
public UserEntity() {
}
public Long getId() {
return id;
}
public String getFullName() {
return fullName;
}
public void setFullName(String fullName) {
this.fullName = fullName;
}
public String getEmail() {
return email;
}
public void setEmail(String email) {
this.email = email;
}
public String getUsername() {
return username;
}
public void setUsername(String username) {
this.username = username;
}
public String getPasswordHash() {
return passwordHash;
}
public void setPasswordHash(String passwordHash) {
this.passwordHash = passwordHash;
}
public UserRole getRole() {
return role;
}
public void setRole(UserRole role) {
this.role = role;
}
public boolean isActive() {
return active;
}
public void setActive(boolean active) {
this.active = active;
}
}