package uz.talim.talim.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import uz.talim.talim.service.SpeakingService;

@RestController
@RequestMapping("/api/v1/speaking")
@RequiredArgsConstructor
@Validated
public class SpeakingController {
    private final SpeakingService speakingService;

    @PostMapping("/save")
    public ResponseEntity<?> saveSpeaking(@RequestParam("topic") Long topic, @RequestParam("part") Integer part, @RequestParam("audio") MultipartFile audio) {
        return speakingService.saveSpeaking(topic, part, audio);
    }

    @PostMapping("/like")
    public ResponseEntity<?> like(@RequestParam("speakingId") String speakingId) {
        return speakingService.like(speakingId);
    }

    @GetMapping("/my-speakings")
    public ResponseEntity<?> mySpeaking(@RequestParam(defaultValue = "userId") Long userId,
                                        @RequestParam(defaultValue = "0") Integer page,
                                        @RequestParam(defaultValue = "10") Integer size,
                                        @RequestParam(defaultValue = "0") Integer month,
                                        @RequestParam(defaultValue = "true") Boolean sorted) {
        return speakingService.speakingPagination(userId,page, size, sorted,month);
    }

//    @GetMapping("/full-mock")
//    public ResponseEntity<?> getFullMock(){
//
//    }
}
