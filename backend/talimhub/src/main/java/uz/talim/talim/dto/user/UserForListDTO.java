package uz.talim.talim.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserForListDTO {
    private Long id;
    private String firstname;
    private String lastname;
    private String phone;
    private LocalDateTime createdAt;
}
