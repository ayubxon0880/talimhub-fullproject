package uz.talim.talim.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uz.talim.talim.model.*;

import java.util.Optional;


@Repository
public interface MockCheckRepository extends JpaRepository<MockCheck,Long> {
    boolean existsByMock(FullMock fullMock);
    Optional<MockCheck> findByMockId(Long id);
}
