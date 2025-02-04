package uz.talim.talim.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import uz.talim.talim.exceptions.NotFoundException;
import uz.talim.talim.mapper.RatingMapper;
import uz.talim.talim.model.MonthlyRating;
import uz.talim.talim.repository.MonthlyRatingRepository;
import uz.talim.talim.service.MonthlyRatingService;

import java.time.LocalDate;
import java.time.YearMonth;

@Service
@RequiredArgsConstructor
public class MonthlyRatingServiceImpl implements MonthlyRatingService {
    private final MonthlyRatingRepository monthlyRatingRepository;
    private final RatingMapper ratingMapper;

    @Override
    public ResponseEntity<?> lastMonthRating() {
        LocalDate date = LocalDate.now();
        YearMonth yearMonth = YearMonth.of(date.getYear(), date.getMonth().getValue()-1);
        MonthlyRating monthlyRating = monthlyRatingRepository.findByCreatedDate(yearMonth.atEndOfMonth()).orElseThrow(() -> new NotFoundException("Monthly rating not found"));
        return ResponseEntity.ok(ratingMapper.toDto(monthlyRating));
    }
}
