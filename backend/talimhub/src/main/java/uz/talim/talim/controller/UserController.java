package uz.talim.talim.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import uz.talim.talim.dto.user.UserFullDetail;
import uz.talim.talim.dto.user.UserUpdateDTO;
import uz.talim.talim.service.UserService;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
@Validated
public class UserController {
    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(){
        return userService.getCurrentUser();
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getUserById(@PathVariable("id") Long id){
        return userService.getUserById(id);
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getUsersPagination(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size,
            @RequestParam(defaultValue = "true") Boolean sorted
    ){
        return userService.getUsersByPagination(page,size,sorted);
    }

    @GetMapping("/details")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<UserFullDetail> getUserSpeakingSummary() {
        return userService.getUserSpeakingSummary();
    }

    @GetMapping("/my-likes")
    public ResponseEntity<?> getLikes(@RequestParam("limit") Integer limit,@RequestParam("offset") Integer offset) {
        return userService.getLikes(limit,offset);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@Valid @RequestBody UserUpdateDTO userUpdateDTO){
        return userService.updateUser(userUpdateDTO);
    }
}
