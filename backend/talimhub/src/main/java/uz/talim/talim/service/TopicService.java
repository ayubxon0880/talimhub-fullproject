package uz.talim.talim.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import uz.talim.talim.dto.topic.TopicCreateDTO;
import uz.talim.talim.dto.topic.TopicCreateV2DTO;
import uz.talim.talim.dto.topic.TopicDTO;

public interface TopicService {
    ResponseEntity<TopicDTO> getRandomTopic(Integer part);

    ResponseEntity<TopicDTO> saveTopic(TopicCreateDTO topicCreateDTO);

    ResponseEntity<?> delete(Long id);

    ResponseEntity<?> getRandomTopicsForMock();

    ResponseEntity<?> saveImages(MultipartFile image1, MultipartFile image2, Long topicId);

    ResponseEntity<TopicDTO> saveTopicV2(TopicCreateV2DTO topicCreateDTO);
}
