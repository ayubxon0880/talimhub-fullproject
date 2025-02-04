package uz.talim.talim.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import uz.talim.talim.model.Speaking;

import java.time.LocalDateTime;
import java.util.UUID;

@Repository
public interface SpeakingRepository extends JpaRepository<Speaking, UUID> {
    Page<Speaking> findAllByUserIdAndCreatedAtBetween(Pageable pageable, Long id, LocalDateTime firstDayOfMonth, LocalDateTime lastDayOfMonth);
    Page<Speaking> findAllByCreatedAtBetween(Pageable pageable, LocalDateTime start, LocalDateTime end);
    Page<Speaking> findAllByCheckedAndCreatedAtBetween(Pageable pageable, boolean b, LocalDateTime FIRST_DAY_OF_MONTH, LocalDateTime LAST_DAY_OF_MONTH);
    @Query("SELECT CASE WHEN COUNT(s) > 0 THEN true ELSE false END FROM Speaking s WHERE s.id = :id AND EXTRACT(MONTH FROM s.createdAt) = :month AND EXTRACT(YEAR FROM s.createdAt) = :year")
    boolean existsByIdAndCreatedAtCurrentMonth(@Param("id") UUID id, @Param("month") int month, @Param("year") int year);
}
