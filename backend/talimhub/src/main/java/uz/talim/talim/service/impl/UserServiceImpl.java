package uz.talim.talim.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uz.talim.talim.config.JwtService;
import uz.talim.talim.dto.likes.LikeDTO;
import uz.talim.talim.dto.request.RegisterRequest;
import uz.talim.talim.dto.response.ApiResponse;
import uz.talim.talim.dto.response.AuthenticationResponse;
import uz.talim.talim.dto.response.CommonResponse;
import uz.talim.talim.dto.user.UserFullDetail;
import uz.talim.talim.dto.user.UserRating;
import uz.talim.talim.dto.user.UserUpdateDTO;
import uz.talim.talim.exceptions.AlreadyExists;
import uz.talim.talim.exceptions.NotFoundException;
import uz.talim.talim.mapper.UserMapper;
import uz.talim.talim.model.Role;
import uz.talim.talim.model.Speaking;
import uz.talim.talim.model.User;
import uz.talim.talim.repository.RoleRepository;
import uz.talim.talim.repository.UserRepository;
import uz.talim.talim.service.CommonService;
import uz.talim.talim.service.UserService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final CommonService commonService;
    private final UserMapper userMapper;
    private final PasswordEncoder encoder;

    @Override
    public ResponseEntity<?> updateUser(UserUpdateDTO userUpdateDTO) {
        User currentUser = commonService.getCurrentUser();
        boolean upPass = false;
        if (
                userUpdateDTO.getOldPassword() != null && userUpdateDTO.getOldPassword().length() >= 4 &&
                        userUpdateDTO.getPassword() != null && userUpdateDTO.getPassword().length() >= 4 &&
                        encoder.matches(userUpdateDTO.getOldPassword(), currentUser.getPassword())
        ) {
            currentUser.setPassword(encoder.encode(userUpdateDTO.getPassword()));
            upPass = true;
        }
        currentUser.setFirstname(userUpdateDTO.getFirstname());
        currentUser.setLastname(userUpdateDTO.getLastname());

        User user = userRepository.save(currentUser);
        var jwtToken = jwtService.generateToken(user);
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        authenticationResponse.setToken(jwtToken);
        authenticationResponse.setUser(userMapper.toDto(user));
        return ResponseEntity.status(upPass ? 201 : 200).body(authenticationResponse);
    }

    @Override
    public ResponseEntity<?> getUsersByPagination(Integer page, Integer size, Boolean sorted) {
        try {
            Pageable pageable = sorted
                    ? PageRequest.of(page, size, Sort.by("lastName").ascending())
                    : PageRequest.of(page, size);

            Page<User> userPage = userRepository.findAll(pageable);

            return ResponseEntity.ok().body(Map.of(
                    "users", userPage.getContent(),
                    "totalPages", userPage.getTotalPages(),
                    "currentPage", userPage.getNumber(),
                    "totalUsers", userPage.getTotalElements()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "error", "An error occurred while fetching users",
                    "details", e.getMessage()
            ));
        }
    }

    @Override
    public ResponseEntity<UserFullDetail> getUserSpeakingSummary() {
        UserFullDetail fullDetail = userRepository.findUserSpeakingSummary(commonService.getCurrentUser().getId());
        return ResponseEntity.ok(fullDetail);
    }

    @Override
    public ResponseEntity<?> getCurrentUser() {
        User currentUser = commonService.getCurrentUser();
        return ResponseEntity.ok(userMapper.toDto(currentUser));
    }

    @Override
    public ResponseEntity<?> getUserById(Long id) {
        UserFullDetail fullDetail = userRepository.findUserSpeakingSummary(id);
        fullDetail.setPhone(null);
        return ResponseEntity.ok(fullDetail);
    }

    @Override
    public ResponseEntity<?> getLikes(Integer limit, Integer offset) {
        CommonResponse<Object> response = userRepository.findLikes(commonService.getCurrentUser().getId(), limit, offset);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<?> createTeacher(RegisterRequest request) {
        Optional<User> phone = userRepository.findByPhone(request.getPhone());
        if (phone.isPresent()) throw new AlreadyExists("Phone already exists");
        Optional<Role> roleUser = roleRepository.findByName("ROLE_TEACHER");
        Role role = roleUser.orElseGet(() -> roleRepository.save(new Role(null, "ROLE_TEACHER")));
        var user = User
                .builder()
                .createdAt(LocalDateTime.now())
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .phone(request.getPhone())
                .password(encoder.encode(request.getPassword()))
                .role(role)
                .locked(true)
                .enabled(true)
                .build();
        userRepository.save(user);

        return ResponseEntity.ok(ApiResponse
                .builder()
                .isSuccess(true)
                .message("Teacher successfully created")
                .status(201)
                .build());
    }

    @Override
    public ResponseEntity<?> createUser(RegisterRequest request) {
        Optional<User> phone = userRepository.findByPhone(request.getPhone());
        if (phone.isPresent()) throw new AlreadyExists("Phone already exists");
        Optional<Role> roleUser = roleRepository.findByName("ROLE_USER");
        Role role = roleUser.orElseGet(() -> roleRepository.save(new Role(null, "ROLE_USER")));
        var user = User
                .builder()
                .createdAt(LocalDateTime.now())
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .phone(request.getPhone().replace("+",""))
                .password(encoder.encode(request.getPassword()))
                .role(role)
                .locked(true)
                .enabled(true)
                .build();
        userRepository.save(user);

        return ResponseEntity.ok(ApiResponse
                .builder()
                .isSuccess(true)
                .message("Student successfully created")
                .status(201)
                .build());
    }

    @Override
    public ResponseEntity<?> rating() {
        List<UserRating> ratings = userRepository.rating();
        return ResponseEntity.ok(ratings);
    }
}
