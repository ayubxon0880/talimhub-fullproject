package uz.talim.talim.service;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import uz.talim.talim.dto.request.RegisterRequest;
import uz.talim.talim.dto.user.UserFullDetail;
import uz.talim.talim.dto.user.UserUpdateDTO;

public interface UserService {
    ResponseEntity<?> getCurrentUser();

    ResponseEntity<?> rating();

    ResponseEntity<?> updateUser(UserUpdateDTO userUpdateDTO);

    ResponseEntity<?> getUsersByPagination(Integer page, Integer size, Boolean sorted);

    ResponseEntity<UserFullDetail> getUserSpeakingSummary();

    ResponseEntity<?> getUserById(Long id);

    ResponseEntity<?> getLikes(Integer limit, Integer offset);

    ResponseEntity<?> createTeacher(RegisterRequest request);

    ResponseEntity<?> createUser(RegisterRequest request);

}
