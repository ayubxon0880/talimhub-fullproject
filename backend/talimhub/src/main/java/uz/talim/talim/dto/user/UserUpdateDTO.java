package uz.talim.talim.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateDTO {
    @Length(min = 3,max = 50)
    private String firstname;
    @Length(min = 3,max = 50)
    private String lastname;
    private String oldPassword;
    private String password;
}
