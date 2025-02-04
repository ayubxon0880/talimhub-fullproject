package uz.talim.talim.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import uz.talim.talim.model.FullMock;
import uz.talim.talim.model.Grade;
import uz.talim.talim.model.Speaking;
import uz.talim.talim.model.User;
import uz.talim.talim.repository.extension.GradeRepositoryExtension;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;


@Repository
public interface GradeRepository extends JpaRepository<Grade,Long>, GradeRepositoryExtension {
    boolean existsBySpeaking(Speaking speaking);

    @Query("SELECT g FROM Grade g WHERE g.supervisor = :supervisor AND g.createdAt BETWEEN :start AND :end")
    Page<Grade> findAllBySupervisorAndCreatedAt(Pageable pageable, @Param("supervisor") User supervisor, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    Optional<Grade> findBySpeakingId(UUID speakingId);
}
