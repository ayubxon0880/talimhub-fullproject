package uz.talim.talim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Speaking {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;
    @ManyToOne
    @JoinColumn(name = "topic_id")
    private Topic topic;
    @Enumerated(EnumType.STRING)
    private SpeakingType speakingType;
    private String audioUrl;
    private Boolean checked;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "grade_id")
    private Grade grade;
    private LocalDateTime createdAt;
    private LocalDateTime deletedAt;
}
