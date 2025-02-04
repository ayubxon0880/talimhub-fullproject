package uz.talim.talim.mapper;

import org.springframework.stereotype.Service;
import uz.talim.talim.dto.topic.TopicDTO;
import uz.talim.talim.model.Topic;

@Service
public class TopicMapper {
    public TopicDTO toDto(Topic topic){
        if (topic == null) return null;
        return new TopicDTO(
                topic.getId(),
                topic.getName(),
                topic.getImage1(),
                topic.getImage2()
        );
    }
}
