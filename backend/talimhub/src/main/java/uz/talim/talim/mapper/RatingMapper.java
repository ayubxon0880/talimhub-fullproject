package uz.talim.talim.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import uz.talim.talim.dto.rating.MonthlyRatingDTO;
import uz.talim.talim.dto.speaking.UserDTOSpeaking;
import uz.talim.talim.dto.user.UserDTO;
import uz.talim.talim.dto.user.UserForListDTO;
import uz.talim.talim.model.MonthlyRating;
import uz.talim.talim.model.User;

@Service
@RequiredArgsConstructor
public class RatingMapper {
    private final UserMapper userMapper;

    public MonthlyRatingDTO toDto(MonthlyRating monthlyRating){
        if (monthlyRating == null) return null;
        return new MonthlyRatingDTO(
                monthlyRating.getId(),
                monthlyRating.getCreatedDate(),
                userMapper.toDtoSpeaking(monthlyRating.getUser()),
                monthlyRating.getLikeCount(),
                monthlyRating.getSpeakingCount()
        );
    }
}
