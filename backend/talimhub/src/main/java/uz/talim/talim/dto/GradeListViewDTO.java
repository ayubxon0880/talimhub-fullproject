package uz.talim.talim.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import uz.talim.talim.model.SpeakingDegree;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GradeListViewDTO {
    private Long id;
    private String supervisorFullName;
    private String userFullName;
    private Long supervisorId;
    private String feedback;
    private SpeakingDegree degree;
    private String audioUrl;
    private LocalDateTime checkedAt;
}
