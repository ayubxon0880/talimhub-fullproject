package uz.talim.talim.dto.rating;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uz.talim.talim.dto.speaking.UserDTOSpeaking;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MonthlyRatingDTO {
    private Long id;
    private LocalDate createdDate;
    private UserDTOSpeaking user;
    private Integer likeCount;
    private Integer speakingCount;
}
