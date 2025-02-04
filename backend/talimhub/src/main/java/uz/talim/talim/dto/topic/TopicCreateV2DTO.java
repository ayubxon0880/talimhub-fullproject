package uz.talim.talim.dto.topic;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TopicCreateV2DTO {
    private Integer part;
    private String topic;
    private String image1;
    private String image2;
}
