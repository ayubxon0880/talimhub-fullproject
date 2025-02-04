package uz.talim.talim.service;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import uz.talim.talim.dto.request.AuthenticationRequest;
import uz.talim.talim.dto.request.RegisterRequestTelegram;
import uz.talim.talim.dto.response.ApiResponse;
import uz.talim.talim.dto.response.AuthenticationResponse;

public interface AuthenticationService {
    ResponseEntity<AuthenticationResponse> authenticate(AuthenticationRequest registerRequest);
    ResponseEntity<ApiResponse> registerViaTelegram(RegisterRequestTelegram registerRequestTelegram, HttpServletRequest request);

    ResponseEntity<?> resetPasswordViaTelegram(String telegramId, HttpServletRequest request);
}
