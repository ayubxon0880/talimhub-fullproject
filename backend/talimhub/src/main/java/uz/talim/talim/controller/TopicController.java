package uz.talim.talim.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import uz.talim.talim.dto.topic.TopicCreateDTO;
import uz.talim.talim.dto.topic.TopicCreateV2DTO;
import uz.talim.talim.dto.topic.TopicDTO;
import uz.talim.talim.service.TopicService;

@RestController
@RequestMapping("/api/v1/topic")
@RequiredArgsConstructor
@Validated
public class TopicController {
    private final TopicService topicService;

    @PostMapping("/save")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<TopicDTO> saveTopic(@RequestBody TopicCreateDTO topicCreateDTO){
        return topicService.saveTopic(topicCreateDTO);
    }

    @PostMapping("/save-v2")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<TopicDTO> saveTopic(@RequestBody TopicCreateV2DTO topicCreateDTO){
        return topicService.saveTopicV2(topicCreateDTO);
    }

    @PostMapping("/save/image")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> saveImages(@RequestParam("image1") MultipartFile image1,@RequestParam(value = "image2",required = false) MultipartFile image2,@RequestParam("topicId") Long topicId){
        return topicService.saveImages(image1,image2,topicId);
    }
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteTopic(@PathVariable Long id){
        return topicService.delete(id);
    }

    @GetMapping("/random")
    public ResponseEntity<TopicDTO> getRandomTopic(@RequestParam("part") Integer part){
        return topicService.getRandomTopic(part);
    }

    @GetMapping("/random/full-mock")
    public ResponseEntity<?> getRandomTopicsForMock(){
        return topicService.getRandomTopicsForMock();
    }
}
