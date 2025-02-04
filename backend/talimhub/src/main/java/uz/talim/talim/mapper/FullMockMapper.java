package uz.talim.talim.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import uz.talim.talim.dto.speaking.FullMockDTO;
import uz.talim.talim.model.FullMock;
import uz.talim.talim.model.SpeakingType;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class FullMockMapper {
    private final TopicMapper topicMapper;

    public FullMockDTO toDto(FullMock fullMock){
        if (fullMock == null) return null;
        FullMockDTO fullMockDTO = FullMockDTO
                .builder()
                .id(fullMock.getId())
                .createdDate(LocalDateTime.now())
                .checked(fullMock.getChecked())
                .partOneAudioUrl(fullMock.getPartOneAudioUrl())
                .partTwoAudioUrl(fullMock.getPartTwoAudioUrl())
                .partThreeAudioUrl(fullMock.getPartThreeAudioUrl())
                .userFullName(fullMock.getUserFullName())
                .userId(fullMock.getId())
                .build();

        fullMock.getTopics().forEach(e -> {
            if (e.getSpeakingType() == SpeakingType.PART_ONE){
                fullMockDTO.setTopic1(topicMapper.toDto(e));
            } else if (e.getSpeakingType() == SpeakingType.PART_TWO){
                fullMockDTO.setTopic2(topicMapper.toDto(e));
            } else if (e.getSpeakingType() == SpeakingType.PART_THREE){
                fullMockDTO.setTopic3(topicMapper.toDto(e));
            }
        });

        return fullMockDTO;
    }

}
