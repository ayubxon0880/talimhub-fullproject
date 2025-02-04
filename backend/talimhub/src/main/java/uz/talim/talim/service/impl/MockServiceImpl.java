package uz.talim.talim.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import uz.talim.talim.dto.grade.MockCheckDTO;
import uz.talim.talim.dto.response.CommonResponse;
import uz.talim.talim.dto.speaking.FullMockSaveDTO;
import uz.talim.talim.exceptions.NotFoundException;
import uz.talim.talim.mapper.FullMockMapper;
import uz.talim.talim.mapper.UserMapper;
import uz.talim.talim.model.*;
import uz.talim.talim.repository.FullMockRepository;
import uz.talim.talim.repository.MockCheckRepository;
import uz.talim.talim.repository.TopicRepository;
import uz.talim.talim.repository.UserRepository;
import uz.talim.talim.service.MockService;
import uz.talim.talim.service.CommonService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class MockServiceImpl implements MockService {
    private final FullMockRepository fullMockRepository;
    private final UserRepository userRepository;
    private final CommonService commonService;
    private final FullMockMapper fullMockMapper;
    private final UserMapper userMapper;
    private final MockCheckRepository mockCheckRepository;
    private final TopicRepository topicRepository;
    private final String UPLOAD_DIR = System.getProperty("user.dir") + "/audios/";


    @Override
    public ResponseEntity<?> getMocksForTeacher(Integer page, Integer size, Integer month,boolean checked) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());

        Page<FullMock> data = checked ? fullMockRepository.findByUserIdAndCreatedDateBetweenAndChecked(
                commonService.getCurrentUser().getId(),
                commonService.getLocalDateTimeWithStartOfMonth(month),
                commonService.getLocalDateTimeWithEndOfMonth(month),
                true,
                pageable) : fullMockRepository.findByCreatedDateBetweenAndChecked(
                commonService.getLocalDateTimeWithStartOfMonth(month),
                commonService.getLocalDateTimeWithEndOfMonth(month),
                false,
                pageable);

        CommonResponse<Object> commonResponse = new CommonResponse<>();
        commonResponse.add("mocks", data.getContent().stream().map(fullMockMapper::toDto).toList());
        commonResponse.add("totalPages", data.getTotalPages());
        return ResponseEntity.ok(commonResponse);
    }


    @Override
    public ResponseEntity<?> saveFullMock(FullMockSaveDTO mockSaveDTO) {
        if (mockSaveDTO.getAudioOne().isEmpty() || mockSaveDTO.getAudioTwo().isEmpty() || mockSaveDTO.getAudioThree().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid file type or empty file.");
        }

        Topic topic1 = topicRepository.findById(mockSaveDTO.getTopicOne()).orElseThrow(() -> new NotFoundException("Topic not found"));
        Topic topic2 = topicRepository.findById(mockSaveDTO.getTopicTwo()).orElseThrow(() -> new NotFoundException("Topic not found"));
        Topic topic3 = topicRepository.findById(mockSaveDTO.getTopicThree()).orElseThrow(() -> new NotFoundException("Topic not found"));

        try {
            String audioName1 = saveAudio(mockSaveDTO.getAudioOne());
            String audioName2 = saveAudio(mockSaveDTO.getAudioTwo());
            String audioName3 = saveAudio(mockSaveDTO.getAudioThree());
            User user = commonService.getCurrentUser();
            FullMock fullMock = FullMock
                    .builder()
                    .checked(false)
                    .createdDate(LocalDateTime.now())
                    .userFullName(user.getFirstname() + " " + user.getLastname())
                    .userId(user.getId())
                    .partOneAudioUrl(audioName1)
                    .partTwoAudioUrl(audioName2)
                    .partThreeAudioUrl(audioName3)
                    .topics(List.of(topic1,topic2,topic3))
                    .build();
            FullMock save = fullMockRepository.save(fullMock);
            return ResponseEntity.ok(save);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<?> checkMock(MockCheckDTO mockCheckDTO) {
        MockCheck mockCheck = mockCheckRepository.save(MockCheck
                .builder()
                .mock(fullMockRepository.findById(mockCheckDTO.getMockId()).orElseThrow(() -> new NotFoundException("Mock not found")))
                .createdAt(LocalDateTime.now())
                .degree(switch (mockCheckDTO.getDegree().toLowerCase()) {
                    case "unknown" -> SpeakingDegree.UNKNOWN;
                    case "a1" -> SpeakingDegree.A1;
                    case "a2" -> SpeakingDegree.A2;
                    case "b1" -> SpeakingDegree.B1;
                    case "b2" -> SpeakingDegree.B2;
                    case "c1" -> SpeakingDegree.C1;
                    default -> SpeakingDegree.NONE;
                })
                .feedback(mockCheckDTO.getFeedback())
                .supervisor(commonService.getCurrentUser())
                .build()
        );
        return ResponseEntity.ok(mockCheck.getId());
    }

    private String saveAudio(MultipartFile audio) throws IOException {
        String audioName = UUID.randomUUID() + ".mp3";
        String path = UPLOAD_DIR + audioName;
        Path filePath = Paths.get(path);
        Files.createDirectories(filePath.getParent());
        Files.write(filePath, audio.getBytes());
        return audioName;
    }


    @Override
    public ResponseEntity<?> getMocksByUserId(Long userId, Integer page, Integer size, Integer month, boolean sorted) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User not found"));
        Pageable pageable = sorted ? PageRequest.of(page, size, Sort.by("createdDate").descending()) : PageRequest.of(page, size);

        Page<FullMock> data = fullMockRepository.findByUserIdAndCreatedDateBetween(
                user.getId(),
                commonService.getLocalDateTimeWithStartOfMonth(month),
                commonService.getLocalDateTimeWithEndOfMonth(month),
                pageable);

        CommonResponse<Object> commonResponse = new CommonResponse<>();

        commonResponse.add("mocks", data.getContent().stream().map(fullMockMapper::toDto).toList());
        commonResponse.add("totalPages", data.getTotalPages());

        return ResponseEntity.ok(commonResponse);
    }

    @Override
    public ResponseEntity<?> getMocksById(Long mockId) {
        FullMock fullMock = fullMockRepository.findById(mockId).orElseThrow(() -> new NotFoundException("Mock not found"));
        MockCheck mock = mockCheckRepository.findByMockId(fullMock.getId()).orElseThrow(() -> new NotFoundException("Mock not found"));
        CommonResponse<Object> commonResponse = new CommonResponse<>();

        commonResponse.add("mock", fullMockMapper.toDto(fullMock));
        commonResponse.add("grade", MockCheckDTO
                .builder()
                        .mockId(fullMock.getId())
                        .createdAt(mock.getCreatedAt())
                        .degree(mock.getDegree().name())
                        .supervisor(userMapper.toDtoSpeaking(mock.getSupervisor()))
                        .feedback(mock.getFeedback())
                .build());
        return ResponseEntity.ok(commonResponse);
    }
}