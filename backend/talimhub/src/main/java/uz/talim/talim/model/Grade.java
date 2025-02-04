package uz.talim.talim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private SpeakingDegree degree;
    private String feedback;
    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "speaking_id")
    private Speaking speaking;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User supervisor;
    private LocalDateTime createdAt;
}
