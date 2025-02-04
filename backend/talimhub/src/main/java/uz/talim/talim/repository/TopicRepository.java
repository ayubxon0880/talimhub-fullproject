package uz.talim.talim.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import uz.talim.talim.model.Topic;

@Repository
public interface TopicRepository extends JpaRepository<Topic,Long> {
    @Query(nativeQuery = true, value = "SELECT * FROM topic where speaking_type = :type ORDER BY RANDOM() LIMIT 1;")
    Topic findRandomTopic(@Param("type") Integer type);
}
