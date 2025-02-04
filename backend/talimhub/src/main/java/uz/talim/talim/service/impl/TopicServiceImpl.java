package uz.talim.talim.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import uz.talim.talim.dto.response.ApiResponse;
import uz.talim.talim.dto.response.CommonResponse;
import uz.talim.talim.dto.topic.TopicCreateDTO;
import uz.talim.talim.dto.topic.TopicCreateV2DTO;
import uz.talim.talim.dto.topic.TopicDTO;
import uz.talim.talim.exceptions.CommonException;
import uz.talim.talim.exceptions.NotFoundException;
import uz.talim.talim.mapper.TopicMapper;
import uz.talim.talim.model.SpeakingType;
import uz.talim.talim.model.Topic;
import uz.talim.talim.repository.TopicRepository;
import uz.talim.talim.service.TopicService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TopicServiceImpl implements TopicService {
    private final String UPLOAD_DIR = System.getProperty("user.dir") + "/audios/";
    private final TopicRepository topicRepository;
    private final TopicMapper topicMapper;

    @Override
    public ResponseEntity<TopicDTO> getRandomTopic(Integer part) {
        Topic topic = topicRepository.findRandomTopic(part-1);
        return ResponseEntity.ok(topicMapper.toDto(topic));
    }

    @Override
    public ResponseEntity<TopicDTO> saveTopic(TopicCreateDTO topicCreateDTO) {
        SpeakingType type = SpeakingType.UNKNOWN;
        if (topicCreateDTO.getPart() == 1) type = SpeakingType.PART_ONE;
        if (topicCreateDTO.getPart() == 2) type = SpeakingType.PART_TWO;
        if (topicCreateDTO.getPart() == 3) type = SpeakingType.PART_THREE;

        Topic topic = new Topic();
        topic.setSpeakingType(type);
        topic.setName(topicCreateDTO.getTopic());

        System.out.println(topicCreateDTO);

        Topic save = topicRepository.save(topic);
        return ResponseEntity.ok(new TopicDTO(save.getId(),save.getName(),save.getImage1(),save.getImage2()));
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        try {
            topicRepository.delete(topicRepository.findById(id).orElseThrow(() -> new NotFoundException("Topic not found.")));
            return ResponseEntity.ok(ApiResponse.builder().status(200).message("Successfully deleted").isSuccess(true).build());
        } catch (Exception e) {
            throw new CommonException("Something is wrong, try again later", HttpStatus.CONFLICT);
        }
    }

    @Override
    public ResponseEntity<?> getRandomTopicsForMock() {
        Topic randomTopic = topicRepository.findRandomTopic(0);
        Topic randomTopic1 = topicRepository.findRandomTopic(1);
        Topic randomTopic2 = topicRepository.findRandomTopic(2);

        CommonResponse<Object> response = new CommonResponse<>();
        response.add("first",randomTopic);
        response.add("first_first",randomTopic);
        response.add("first_second",randomTopic);
        response.add("first_third",randomTopic);
        response.add("second",randomTopic1);
        response.add("third",randomTopic2);

        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<?> saveImages(MultipartFile image1, MultipartFile image2, Long topicId) {
        try {
            String imageUrl1 = saveImage(image1);
            String imageUrl2 = "";
            if (image2 != null){
                imageUrl2 = saveImage(image2);
            }
            Topic topic = topicRepository.findById(topicId).orElseThrow(() -> new NotFoundException("Image not found"));
            topic.setImage1(imageUrl1);
            topic.setImage2(imageUrl2);

            topicRepository.save(topic);

            return ResponseEntity.ok(ApiResponse
                    .builder()
                            .isSuccess(true)
                            .message("Topic saved")
                            .status(201)
                    .build());
        } catch (IOException e) {
            throw new CommonException("Something wrong with images, please try again.",HttpStatus.CONFLICT);
        }
    }

    @Override
    public ResponseEntity<TopicDTO> saveTopicV2(TopicCreateV2DTO topicCreateDTO) {
        SpeakingType type = SpeakingType.UNKNOWN;
        if (topicCreateDTO.getPart() == 1) type = SpeakingType.PART_ONE;
        if (topicCreateDTO.getPart() == 2) type = SpeakingType.PART_TWO;
        if (topicCreateDTO.getPart() == 3) type = SpeakingType.PART_THREE;

        Topic topic = new Topic();

        topic.setSpeakingType(type);
        topic.setName(topicCreateDTO.getTopic());
        topic.setImage1(topicCreateDTO.getImage1());
        topic.setImage2(topicCreateDTO.getImage2());

        Topic save = topicRepository.save(topic);
        return ResponseEntity.ok(new TopicDTO(save.getId(),save.getName(),save.getImage1(),save.getImage2()));
    }

    private String saveImage(MultipartFile image) throws IOException {
        String audioName = UUID.randomUUID() + ".jpg";
        String path = UPLOAD_DIR + audioName;
        Path filePath = Paths.get(path);
        Files.createDirectories(filePath.getParent());
        Files.write(filePath, image.getBytes());
        return audioName;
    }
}
