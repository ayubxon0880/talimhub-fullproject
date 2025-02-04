package uz.talim.talim.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserForAdmin {
    private Long userId;
    private String firstName;
    private String lastName;
    private Integer SpeakingCount;
    private Integer totalLikes;
}
