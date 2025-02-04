package uz.talim.talim.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uz.talim.talim.service.GradeService;

@RestController
@RequestMapping("/api/v1/grade")
@RequiredArgsConstructor
public class GradeController {
    private final GradeService gradeService;

    @GetMapping("/{speakingId}")
    public ResponseEntity<?> getGradeById(@PathVariable String speakingId) {
        return gradeService.getGradeBySpeakingId(speakingId);
    }
}
