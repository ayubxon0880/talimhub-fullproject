package uz.talim.talim.service;


import org.springframework.http.ResponseEntity;

public interface MonthlyRatingService {
    ResponseEntity<?> lastMonthRating();

}
