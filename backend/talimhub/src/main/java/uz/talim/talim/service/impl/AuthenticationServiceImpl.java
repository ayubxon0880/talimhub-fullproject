package uz.talim.talim.service.impl;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uz.talim.talim.config.JwtService;
import uz.talim.talim.dto.request.AuthenticationRequest;
import uz.talim.talim.dto.request.RegisterRequestTelegram;
import uz.talim.talim.dto.response.ApiResponse;
import uz.talim.talim.dto.response.AuthenticationResponse;
import uz.talim.talim.exceptions.AlreadyExists;
import uz.talim.talim.exceptions.AuthenticationException;
import uz.talim.talim.exceptions.NotFoundException;
import uz.talim.talim.mapper.UserMapper;
import uz.talim.talim.model.Role;
import uz.talim.talim.model.User;
import uz.talim.talim.repository.RoleRepository;
import uz.talim.talim.repository.UserRepository;
import uz.talim.talim.service.AuthenticationService;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final String KEY = "CBEE7DAA1413D16287574521F64D5";

    @Override
    public ResponseEntity<ApiResponse> registerViaTelegram(RegisterRequestTelegram registerRequestTelegram, HttpServletRequest request) {
        String header = request.getHeader("telegram-key");
        if (KEY.equals(header)) {
            Optional<User> phone = userRepository.findByPhone(registerRequestTelegram.getPhone());
            if (phone.isPresent()) {
                if (!(phone.get().isEnabled() || phone.get().isAccountNonLocked())) {
                    userRepository.delete(phone.get());
                } else {
                    throw new AlreadyExists("Email already exists");
                }
            }
            Optional<Role> roleUser = roleRepository.findByName("ROLE_USER");
            Role role = roleUser.orElseGet(() -> roleRepository.save(new Role(null, "ROLE_USER")));
            if (registerRequestTelegram.getPhone().equals("998903623445")) {
                Optional<Role> roleAdmin = roleRepository.findByName("ROLE_ADMIN");
                role = roleAdmin.orElseGet(() -> roleRepository.save(new Role(null, "ROLE_ADMIN")));
            }
            Random random = new Random();
            int code = 10000 + random.nextInt(89999);

            var user = User
                    .builder()
                    .createdAt(LocalDateTime.now())
                    .firstname(registerRequestTelegram.getFirstname())
                    .lastname(registerRequestTelegram.getLastname())
                    .phone(registerRequestTelegram.getPhone())
                    .password(passwordEncoder.encode(code + ""))
                    .telegramId(registerRequestTelegram.getTelegramId())
                    .telegramFullName(registerRequestTelegram.getTelegramFullName())
                    .telegramUsername(registerRequestTelegram.getTelegramUsername())
                    .role(role)
                    .locked(true)
                    .enabled(true)
                    .build();
            userRepository.save(user);

            return ResponseEntity.ok(ApiResponse
                    .builder()
                    .isSuccess(true)
                    .message("Parolingiz : " + code)
                    .status(200)
                    .build());
        } else {
            throw new AuthenticationException("Something is wrong",HttpStatus.UNAUTHORIZED);
        }
    }

    @Override
    public ResponseEntity<?> resetPasswordViaTelegram(String telegramId, HttpServletRequest request) {
        String header = request.getHeader("telegram-key");
        if (KEY.equals(header)) {
            User user = userRepository.findByTelegramId(telegramId).orElseThrow(() -> new NotFoundException("User not found"));
            Random random = new Random();
            int code = 10000 + random.nextInt(89999);
            user.setPassword(passwordEncoder.encode(String.valueOf(code)));
            userRepository.save(user);
            return ResponseEntity.ok(code);
        } else {
            throw new AuthenticationException("Something is wrong",HttpStatus.UNAUTHORIZED);
        }
    }

    @Override
    public ResponseEntity<AuthenticationResponse> authenticate(AuthenticationRequest registerRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        registerRequest.getPhone(),
                        registerRequest.getPassword()
                )
        );
        User user = userRepository.findByPhone(registerRequest.getPhone())
                .orElseThrow();
        if (!(user.isLocked() || user.isEnabled())) {
            throw new AuthenticationException("You can enter the site after being approved by the admin", HttpStatus.UNAUTHORIZED);
        }
        user.setPassword(null);
        var jwtToken = jwtService.generateToken(user);
        return ResponseEntity.ok(AuthenticationResponse
                .builder()
                .token(jwtToken)
                .user(userMapper.toDto(user))
                .build());
    }

}
