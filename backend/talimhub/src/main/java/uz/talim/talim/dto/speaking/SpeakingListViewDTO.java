package uz.talim.talim.dto.speaking;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uz.talim.talim.dto.topic.TopicDTO;

import java.time.LocalDateTime;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpeakingListViewDTO {
    private String id;
    private String name;
    private TopicDTO topic;
    private Long likes;
    private boolean liked;
    private boolean checked;
    private Integer speakingType;
    private String audioUrl;
    private UserDTOSpeaking userDTOSpeaking;
    private LocalDateTime createdAt;
}