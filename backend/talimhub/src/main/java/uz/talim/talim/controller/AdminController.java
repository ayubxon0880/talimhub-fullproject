package uz.talim.talim.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import uz.talim.talim.dto.request.RegisterRequest;
import uz.talim.talim.service.SpeakingService;
import uz.talim.talim.service.UserService;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@Validated
public class AdminController {
    private final SpeakingService speakingService;
    private final UserService userService;

    @PostMapping("/teacher/create")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> createTeacher(@Valid @RequestBody RegisterRequest request){
        return userService.createTeacher(request);
    }

    @PostMapping("/user/create")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> createUser(@Valid @RequestBody RegisterRequest request){
        return userService.createUser(request);
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getSpeakingsPagination(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size,
            @RequestParam(defaultValue = "0") Integer month,
            @RequestParam(defaultValue = "true") Boolean sorted
    ){
        return speakingService.publicSpeakingPagination(page,size,sorted,month);
    }

    @DeleteMapping("/speaking/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteSpeaking(@PathVariable String id){
        return speakingService.deleteSpeaking(id);
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getUsersPagination(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size,
            @RequestParam(defaultValue = "true") Boolean sorted
    ){
        return userService.getUsersByPagination(page,size,sorted);
    }

}
