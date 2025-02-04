package uz.talim.talim.service.impl;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import uz.talim.talim.dto.grade.GradeCreateDTO;
import uz.talim.talim.dto.response.ApiResponse;
import uz.talim.talim.dto.response.CommonResponse;
import uz.talim.talim.dto.speaking.FullMockSaveDTO;
import uz.talim.talim.exceptions.CommonException;
import uz.talim.talim.exceptions.NotFoundException;
import uz.talim.talim.mapper.GradeMapper;
import uz.talim.talim.mapper.SpeakingMapper;
import uz.talim.talim.mapper.UserMapper;
import uz.talim.talim.model.*;
import uz.talim.talim.repository.*;
import uz.talim.talim.service.CommonService;
import uz.talim.talim.service.SpeakingService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SpeakingServiceImpl implements SpeakingService {
    private static final Logger logger = LoggerFactory.getLogger(SpeakingServiceImpl.class);
    private final String UPLOAD_DIR = System.getProperty("user.dir") + "/audios/";
    private final SpeakingRepository speakingRepository;
    private final TopicRepository topicRepository;
    private final CommonService commonService;
    private final SpeakingMapper speakingMapper;
    private final LikeRepository likeRepository;
    private final GradeRepository gradeRepository;
    private final GradeMapper gradeMapper;

    @Override
    public ResponseEntity<?> saveSpeaking(Long topic, Integer part, MultipartFile audio) {
        if (audio.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid file type or empty file.");
        }
        try {
            String audioName = UUID.randomUUID() + ".mp3";
            String path = UPLOAD_DIR + audioName;
            Path filePath = Paths.get(path);
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, audio.getBytes());
            Speaking speaking = new Speaking();
            speaking.setSpeakingType(speakingType(part));
            speaking.setTopic(topicRepository.findById(topic).orElseThrow(() -> new NotFoundException("Topic not found")));
            speaking.setAudioUrl(audioName);
            speaking.setUser(commonService.getCurrentUser());
            speaking.setCreatedAt(LocalDateTime.now());
            speaking.setChecked(false);
            Speaking save = speakingRepository.save(speaking);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("id", save.getId()));
        } catch (IOException e) {
            logger.error("File upload failed", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed: " + e.getMessage());
        }
    }

    private SpeakingType speakingType(Integer part) {
        if (part == 1) return SpeakingType.PART_ONE;
        if (part == 2) return SpeakingType.PART_TWO;
        if (part == 3) return SpeakingType.PART_THREE;
        return SpeakingType.UNKNOWN;
    }

    @Override
    public ResponseEntity<?> speakingPagination(Long userId, Integer page, Integer size, Boolean sorted, Integer month) {
        if (size < 5 || 20 < size) {
            size = 10;
        }

        Pageable pageable = sorted ? PageRequest.of(page, size, Sort.by("createdAt").descending()) : PageRequest.of(page, size);
        Page<Speaking> data = speakingRepository.findAllByUserIdAndCreatedAtBetween(pageable, userId, commonService.getLocalDateTimeWithStartOfMonth(month), commonService.getLocalDateTimeWithEndOfMonth(month));
        CommonResponse<Object> commonResponse = new CommonResponse<>();

        commonResponse.add("speakings", data.getContent().stream().map(speakingMapper::toListViewDto).toList());
        commonResponse.add("pageNumber", data.getPageable().getPageNumber());
        commonResponse.add("pageSize", data.getPageable().getPageSize());
        commonResponse.add("totalElements", data.getTotalElements());
        commonResponse.add("totalPages", data.getTotalPages());
        return ResponseEntity.ok(commonResponse);
    }

    @Override
    public ResponseEntity<?> publicSpeakingPagination(Integer page, Integer size, Boolean sorted, Integer month) {
        if (size < 5 || 20 < size) {
            size = 10;
        }
        Pageable pageable = sorted ? PageRequest.of(page, size, Sort.by("createdAt").descending()) : PageRequest.of(page, size);
        Page<Speaking> data = speakingRepository.findAllByCreatedAtBetween(pageable, commonService.getLocalDateTimeWithStartOfMonth(month), commonService.getLocalDateTimeWithEndOfMonth(month));
        CommonResponse<Object> commonResponse = new CommonResponse<>();

        commonResponse.add("speakings", data.getContent().stream().map(speakingMapper::toListViewDto).toList());
        commonResponse.add("pageNumber", data.getPageable().getPageNumber());
        commonResponse.add("pageSize", data.getPageable().getPageSize());
        commonResponse.add("totalElements", data.getTotalElements());
        commonResponse.add("totalPages", data.getTotalPages());
        return ResponseEntity.ok(commonResponse);
    }

    @Override
    public ResponseEntity<?> like(String speakingId) {
        UUID uuid;
        try {
            uuid = UUID.fromString(speakingId);
        } catch (Exception e) {
            throw new CommonException("Something is wrong, please try again.", HttpStatus.CONFLICT);
        }
        if (speakingRepository.existsById(uuid)) {
            if (!likeRepository.isCurrentUserLikeThisSpeaking(uuid, commonService.getCurrentUser().getId())) {
                LocalDateTime currentMonth = commonService.getCurrentMonthFirstDay();
                if (speakingRepository.existsByIdAndCreatedAtCurrentMonth(uuid, currentMonth.getMonthValue(), currentMonth.getYear())) {
                    likeRepository.save(new Like(null, commonService.getCurrentUser().getId(), uuid, LocalDateTime.now()));
                    return ResponseEntity.ok("created");
                } else {
                    throw new CommonException("Expired", HttpStatus.CONFLICT);
                }
            }
            throw new CommonException("You already add like to this speaking", HttpStatus.CONFLICT);
        }
        throw new NotFoundException("Speaking not found !");
    }

    @Override
    public ResponseEntity<?> deleteSpeaking(String id) {
        try {
            speakingRepository.deleteById(UUID.fromString(id));
            return ResponseEntity.ok(ApiResponse.builder().status(204).message("Speaking successfully deleted"));
        } catch (Exception e) {
            throw new CommonException("Something is wrong, please try again", HttpStatus.CONFLICT);
        }
    }

    @Override
    public ResponseEntity<?> getById(String id) {
        try {
            Speaking speaking = speakingRepository.findById(UUID.fromString(id)).orElseThrow(() -> new NotFoundException("Speaking not found"));
            return ResponseEntity.ok(speakingMapper.toListViewDto(speaking));
        } catch (Exception e) {
            throw new CommonException("Something is wrong", HttpStatus.CONFLICT);
        }
    }

    @Override
    public ResponseEntity<?> checkSpeaking(GradeCreateDTO grade) {
        Grade entity = gradeMapper.toEntity(grade, true);
        gradeRepository.save(entity);
        return ResponseEntity.ok("Successfully checked !");
    }

    @Override
    public ResponseEntity<?> uncheckedSpeakingPagination(Integer page, Integer size, Boolean sorted, Integer month) {
        if (size < 5 || 20 < size) {
            size = 10;
        }
        Pageable pageable = sorted ? PageRequest.of(page, size, Sort.by("createdAt").descending()) : PageRequest.of(page, size);

        Page<Speaking> data = speakingRepository.findAllByCheckedAndCreatedAtBetween(pageable, false, commonService.getLocalDateTimeWithStartOfMonth(month), commonService.getLocalDateTimeWithEndOfMonth(month));
        CommonResponse<Object> commonResponse = new CommonResponse<>();

        commonResponse.add("speakings", data.getContent().stream().map(speakingMapper::toListViewDto).toList());
        commonResponse.add("pageNumber", data.getPageable().getPageNumber());
        commonResponse.add("totalElements", data.getTotalElements());
        return ResponseEntity.ok(commonResponse);
    }

}
