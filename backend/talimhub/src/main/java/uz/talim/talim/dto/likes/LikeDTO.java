package uz.talim.talim.dto.likes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LikeDTO {
    private String speakingId;
    private String audioUrl;
    private LocalDateTime speakingCreatedAt;
    private String topic;
    private String userFirstname;
    private String userLastname;
    private LocalDateTime likePressedDate;
}
