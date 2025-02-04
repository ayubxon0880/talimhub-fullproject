package uz.talim.talim.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserFullDetail {
    private Long userId;
    private String firstName;
    private String lastName;
    private String phone;
    private Long totalSpeakingCount;
    private Long totalLikeCount;
}
