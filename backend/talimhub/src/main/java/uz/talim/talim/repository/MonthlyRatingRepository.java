package uz.talim.talim.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uz.talim.talim.model.MonthlyRating;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface MonthlyRatingRepository extends JpaRepository<MonthlyRating,Long> {
    Optional<MonthlyRating> findByCreatedDate(LocalDate localDate);
}
