package uz.talim.talim.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import uz.talim.talim.model.Like;

import java.util.UUID;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    @Query(nativeQuery = true,value = "SELECT COUNT(*) FROM likes WHERE speaking_id = :speakingId")
    Long findLikesCountByUserId(@Param("speakingId") UUID speakingId);

    @Query(nativeQuery = true,value = "SELECT EXISTS(SELECT 1 FROM likes WHERE speaking_id = :speakingId and user_id = :user)")
    boolean isCurrentUserLikeThisSpeaking(@Param("speakingId") UUID speakingId,@Param("user") Long id);

}
