package uz.talim.talim.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uz.talim.talim.model.User;
import uz.talim.talim.repository.extension.UserRepositoryExtension;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long>, UserRepositoryExtension {
    Optional<User> findByPhone(String username);
    Optional<User> findByTelegramId(String id);

}
