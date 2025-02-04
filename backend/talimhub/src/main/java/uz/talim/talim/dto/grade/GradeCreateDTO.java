package uz.talim.talim.dto.grade;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GradeCreateDTO {
    @NotNull
    private String speakingId;
    @NotNull
    private String degree;
    @NotNull
    private String feedback;
}