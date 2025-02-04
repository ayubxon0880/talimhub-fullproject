package uz.talim.talim.service;

import org.springframework.http.ResponseEntity;

public interface GradeService {
    ResponseEntity<?> checkedSpeakingPagination(Integer page, Integer size, Boolean sorted);

    ResponseEntity<?> getGradeBySpeakingId(String speakingId);
}
