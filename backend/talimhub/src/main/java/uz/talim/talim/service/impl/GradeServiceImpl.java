package uz.talim.talim.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import uz.talim.talim.dto.response.CommonResponse;
import uz.talim.talim.exceptions.NotFoundException;
import uz.talim.talim.mapper.GradeMapper;
import uz.talim.talim.mapper.SpeakingMapper;
import uz.talim.talim.model.Grade;
import uz.talim.talim.model.Speaking;
import uz.talim.talim.repository.GradeRepository;
import uz.talim.talim.repository.SpeakingRepository;
import uz.talim.talim.service.CommonService;
import uz.talim.talim.service.GradeService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GradeServiceImpl implements GradeService {
    private final GradeRepository gradeRepository;
    private final SpeakingRepository speakingRepository;
    private final CommonService commonService;
    private final GradeMapper gradeMapper;
    private final SpeakingMapper speakingMapper;
    private final LocalDate NOW = LocalDate.now();
    private final LocalDateTime FIRST_DAY_OF_MONTH = YearMonth.of(NOW.getYear(), NOW.getMonth()).atDay(1).atStartOfDay();
    private final LocalDateTime LAST_DAY_OF_MONTH = YearMonth.of(NOW.getYear(), NOW.getMonth()).atEndOfMonth().atTime(LocalTime.MAX);


    @Override
    public ResponseEntity<?> checkedSpeakingPagination(Integer page, Integer size, Boolean sorted) {
        if (size < 5 || 20 < size) {
            size = 10;
        }
        Pageable pageable = sorted ? PageRequest.of(page, size, Sort.by("createdAt").descending()) : PageRequest.of(page, size);
        Page<Grade> grades = gradeRepository.findAllBySupervisorAndCreatedAt(pageable, commonService.getCurrentUser(),FIRST_DAY_OF_MONTH,LAST_DAY_OF_MONTH);

        CommonResponse<Object> commonResponse = new CommonResponse<>();
        commonResponse.add("grades", grades.getContent().stream().map(gradeMapper::toListViewDto).filter(Objects::nonNull).toList());
        commonResponse.add("totalElements", grades.getTotalElements());
        commonResponse.add("totalPages", grades.getTotalPages());

        return ResponseEntity.ok(commonResponse);
    }

    @Override
    public ResponseEntity<?> getGradeBySpeakingId(String speakingId) {
        try {
            System.out.println(speakingId);
            Grade grade = gradeRepository.findBySpeakingId(UUID.fromString(speakingId)).orElse(null);
            Speaking speaking = speakingRepository.findById(UUID.fromString(speakingId)).orElseThrow();
            CommonResponse<Object> commonResponse = new CommonResponse<>();
            commonResponse.add("speaking",speakingMapper.toListViewDto(speaking));
            commonResponse.add("grade",gradeMapper.toListViewDto(grade));
            return ResponseEntity.ok(commonResponse);
        } catch (Exception e) {
            throw new NotFoundException("Speaking not found !");
        }
    }
}
