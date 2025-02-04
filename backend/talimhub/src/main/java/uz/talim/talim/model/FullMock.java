package uz.talim.talim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FullMock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String partOneAudioUrl;
    private String partTwoAudioUrl;
    private String partThreeAudioUrl;
    @ManyToMany
    private List<Topic> topics;
    private Long userId;
    private String userFullName;
    private Boolean checked;
    private LocalDateTime createdDate;
}
