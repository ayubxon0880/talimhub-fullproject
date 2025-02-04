package uz.talim.talim.dto.speaking;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpeakingCreateDTO {
    private Long topicId;
    private String speakingType;
}

