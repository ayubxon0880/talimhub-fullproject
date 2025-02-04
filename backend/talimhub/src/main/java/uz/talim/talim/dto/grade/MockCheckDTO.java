package uz.talim.talim.dto.grade;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import uz.talim.talim.dto.speaking.UserDTOSpeaking;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MockCheckDTO {
    private Long id;
    private String degree;
    private String feedback;
    private Long mockId;
    private UserDTOSpeaking supervisor;
    private LocalDateTime createdAt;
}
