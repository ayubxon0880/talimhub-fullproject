package uz.talim.talim.dto.speaking;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FullMockSaveDTO {
    private Long topicOne;
    private Long topicTwo;
    private Long topicThree;
    private MultipartFile audioOne;
    private MultipartFile audioTwo;
    private MultipartFile audioThree;
}
