package uz.talim.talim.repository.extension;

import uz.talim.talim.dto.response.CommonResponse;
import uz.talim.talim.dto.user.UserFullDetail;
import uz.talim.talim.dto.user.UserRating;

import java.util.List;

public interface UserRepositoryExtension {
    List<UserRating> rating();

    List<UserFullDetail> findAllUsersFullDetail(Integer limit);

    UserFullDetail findUserSpeakingSummary(Long id);

    CommonResponse<Object> findLikes(Long userId, Integer limit, Integer offset);
}
