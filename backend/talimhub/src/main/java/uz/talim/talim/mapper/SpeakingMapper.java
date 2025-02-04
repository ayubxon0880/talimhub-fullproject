package uz.talim.talim.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import uz.talim.talim.dto.speaking.SpeakingCreateDTO;
import uz.talim.talim.dto.speaking.SpeakingListViewDTO;
import uz.talim.talim.dto.speaking.SpeakingViewDTO;
import uz.talim.talim.model.Speaking;
import uz.talim.talim.model.SpeakingType;
import uz.talim.talim.model.User;
import uz.talim.talim.repository.GradeRepository;
import uz.talim.talim.repository.LikeRepository;
import uz.talim.talim.service.CommonService;

@Service
@RequiredArgsConstructor
public class SpeakingMapper {
    private final TopicMapper topicMapper;
    private final UserMapper userMapper;
    private final LikeRepository likeRepository;
    private final GradeRepository gradeRepository;
    private final CommonService commonService;

    public Speaking toEntity(SpeakingCreateDTO speakingCreateDTO) {
        return null;
    }

    public SpeakingViewDTO toViewDto(Speaking speaking) {
        return null;
    }

    public SpeakingListViewDTO toListViewDto(Speaking speaking) {
        if (speaking == null) return null;
        int speakingType = 1;
        if (speaking.getSpeakingType().equals(SpeakingType.PART_TWO)) speakingType = 2;
        if (speaking.getSpeakingType().equals(SpeakingType.PART_THREE)) speakingType = 3;
        Long count = likeRepository.findLikesCountByUserId(speaking.getId());
        boolean liked = likeRepository.isCurrentUserLikeThisSpeaking(speaking.getId(), commonService.getCurrentUser().getId());
        boolean checked = gradeRepository.existsBySpeaking(speaking);
        return new SpeakingListViewDTO(
                speaking.getId().toString(),
                speaking.getName(),
                topicMapper.toDto(speaking.getTopic()),
                count,
                liked,
                checked,
                speakingType,
                speaking.getAudioUrl(),
                userMapper.toDtoSpeaking(speaking.getUser()),
                speaking.getCreatedAt()
        );
    }
}
