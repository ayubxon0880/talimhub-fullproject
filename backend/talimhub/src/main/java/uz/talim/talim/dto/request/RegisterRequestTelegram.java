package uz.talim.talim.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequestTelegram {
    @NotNull
    private String firstname;
    @NotNull
    private String lastname;
    @Pattern(regexp = "^(\\+998|998|8)[1-9][0-9]\\d{7}$", message = "Invalid Uzbekistan phone number")
    private String phone;
    @NotNull
    private String telegramId;
    private String telegramFullName;
    private String telegramUsername;
}