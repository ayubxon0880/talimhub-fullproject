package uz.talim.talim.config;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import uz.talim.talim.dto.user.UserRating;
import uz.talim.talim.model.MonthlyRating;
import uz.talim.talim.repository.MonthlyRatingRepository;
import uz.talim.talim.repository.UserRepository;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ScheduledTasks {
    private final UserRepository userRepository;
    private final MonthlyRatingRepository monthlyRatingRepository;

    @Scheduled(cron = "0 0 0 L * ?")
    public void executeMonthlyTask() {
        List<UserRating> rating = userRepository.rating();
        UserRating userRating1 = rating.get(0);
        MonthlyRating monthlyRating = new MonthlyRating();
        monthlyRating.setCreatedDate(LocalDate.now());
        monthlyRating.setLikeCount(userRating1.getAllLikes().intValue());
        monthlyRating.setSpeakingCount(0);

        monthlyRatingRepository.save(monthlyRating);
    }
}
