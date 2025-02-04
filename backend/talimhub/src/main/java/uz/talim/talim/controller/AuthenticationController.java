package uz.talim.talim.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import uz.talim.talim.dto.request.AuthenticationRequest;
import uz.talim.talim.dto.request.RegisterRequestTelegram;
import uz.talim.talim.dto.response.ApiResponse;
import uz.talim.talim.dto.response.AuthenticationResponse;
import uz.talim.talim.service.AuthenticationService;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Validated
public class AuthenticationController {
    private final AuthenticationService service;

    @PostMapping("/register-via-telegram")
    public ResponseEntity<ApiResponse> register(
            @Valid @RequestBody RegisterRequestTelegram registerRequestTelegram,
            HttpServletRequest request
    ){
        return service.registerViaTelegram(registerRequestTelegram,request);
    }

    @PostMapping("/reset-password-via-telegram/{telegramId}")
    public ResponseEntity<?> register(@PathVariable("telegramId") String telegramId, HttpServletRequest request){
        return service.resetPasswordViaTelegram(telegramId,request);
    }

    @PostMapping("/login")
    @Validated
    public ResponseEntity<AuthenticationResponse> authenticate(
            @Valid @RequestBody AuthenticationRequest registerRequest
    ) {
        return service.authenticate(registerRequest);
    }
}
