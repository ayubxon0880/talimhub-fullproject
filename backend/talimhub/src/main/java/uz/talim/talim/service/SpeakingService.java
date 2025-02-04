package uz.talim.talim.service;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import uz.talim.talim.dto.grade.GradeCreateDTO;
import uz.talim.talim.dto.speaking.FullMockSaveDTO;

import java.util.List;

public interface SpeakingService {
    ResponseEntity<?> saveSpeaking(Long topic, Integer part, MultipartFile audio);

    ResponseEntity<?> speakingPagination(Long userId, Integer page, Integer size, Boolean sorted, Integer month);

    ResponseEntity<?> publicSpeakingPagination(Integer page, Integer size, Boolean sorted, Integer month);

    ResponseEntity<?> like(String speakingId);

    ResponseEntity<?> deleteSpeaking(String id);

    ResponseEntity<?> getById(String id);

    ResponseEntity<?> checkSpeaking(GradeCreateDTO grade);

    ResponseEntity<?> uncheckedSpeakingPagination(Integer page, Integer size, Boolean sorted, Integer month);
}
