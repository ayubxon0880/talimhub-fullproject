package uz.talim.talim.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uz.talim.talim.model.Topic;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Topic, Long> {
    Optional<Topic> findByName(String name);
}
