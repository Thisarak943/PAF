package backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import backend.model.UserModel;

public interface UserRepository extends JpaRepository<UserModel,Long> {
    Optional<UserModel> findByEmail (String email);
}
