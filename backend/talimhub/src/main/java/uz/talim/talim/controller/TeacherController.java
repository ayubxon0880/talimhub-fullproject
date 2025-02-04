package uz.talim.talim.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import uz.talim.talim.dto.grade.GradeCreateDTO;
import uz.talim.talim.service.GradeService;
import uz.talim.talim.service.SpeakingService;

@RestController
@RequestMapping("/api/v1/teacher")
@RequiredArgsConstructor
@Validated
public class TeacherController {
    private final SpeakingService speakingService;
    private final GradeService gradeService;

    @PostMapping("/speaking/check")
    public ResponseEntity<?> checkSpeaking(@Valid @RequestBody GradeCreateDTO grade){
        return speakingService.checkSpeaking(grade);
    }

    @GetMapping("/unchecked-speakings")
    public ResponseEntity<?> mySpeaking(@RequestParam(defaultValue = "0") Integer page,
                                        @RequestParam(defaultValue = "10") Integer size,
                                        @RequestParam(defaultValue = "0") Integer month,
                                        @RequestParam(defaultValue = "true") Boolean sorted) {
        return speakingService.uncheckedSpeakingPagination(page, size, sorted, month);
    }

    @GetMapping("/checked-speakings")
    public ResponseEntity<?> checkedSpeakings(@RequestParam(defaultValue = "0") Integer page,
                                        @RequestParam(defaultValue = "10") Integer size,
                                        @RequestParam(defaultValue = "true") Boolean sorted) {
        return gradeService.checkedSpeakingPagination(page, size, sorted);
    }
}
