package uz.talim.talim.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uz.talim.talim.model.FullMock;
import uz.talim.talim.model.User;


import java.time.LocalDateTime;

@Repository
public interface FullMockRepository extends JpaRepository<FullMock,Long> {
    Page<FullMock> findByUserIdAndCreatedDateBetween(Long userId, LocalDateTime start,LocalDateTime end,Pageable pageable);

    Page<FullMock> findByCreatedDateBetween(LocalDateTime localDateTimeWithStartOfMonth, LocalDateTime localDateTimeWithEndOfMonth, Pageable pageable);

    Page<FullMock> findByCreatedDateBetweenAndChecked(LocalDateTime localDateTimeWithStartOfMonth, LocalDateTime localDateTimeWithEndOfMonth,boolean checked, Pageable pageable);
    Page<FullMock> findByUserIdAndCreatedDateBetweenAndChecked(Long userId,LocalDateTime localDateTimeWithStartOfMonth, LocalDateTime localDateTimeWithEndOfMonth,boolean checked, Pageable pageable);
}
