package uz.talim.talim.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uz.talim.talim.model.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
}
