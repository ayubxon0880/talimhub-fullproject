package uz.talim.talim.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uz.talim.talim.service.MonthlyRatingService;
import uz.talim.talim.service.SpeakingService;
import uz.talim.talim.service.UserService;

@RestController
@RequestMapping("/api/v1/public")
@RequiredArgsConstructor
public class PublicController {
    private final SpeakingService speakingService;
    private final UserService userService;
    private final MonthlyRatingService monthlyRatingService;

    @GetMapping("/hello")
    public ResponseEntity<?> speakingPagination() {
        return ResponseEntity.ok("helloworld");
    }

    @GetMapping("/speakings")
    public ResponseEntity<?> speakingPagination(@RequestParam(defaultValue = "0") Integer page,
                                                @RequestParam(defaultValue = "10") Integer size,
                                                @RequestParam(defaultValue = "0") Integer month,
                                                @RequestParam(defaultValue = "true") Boolean sorted) {
        return speakingService.publicSpeakingPagination(page,size,sorted,month);
    }


    @GetMapping("/speaking/{id}")
    public ResponseEntity<?> speaking(@PathVariable String id) {
        return speakingService.getById(id);
    }

    @GetMapping("/users-rating")
    public ResponseEntity<?> rating() {
        return userService.rating();
    }

    @GetMapping("/last-month-user-rating")
    public ResponseEntity<?> lastMonthRating() {
        return monthlyRatingService.lastMonthRating();
    }
}
