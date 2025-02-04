package uz.talim.talim.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import uz.talim.talim.dto.GradeListViewDTO;
import uz.talim.talim.dto.grade.GradeCreateDTO;
import uz.talim.talim.exceptions.NotFoundException;
import uz.talim.talim.model.*;
import uz.talim.talim.repository.FullMockRepository;
import uz.talim.talim.repository.SpeakingRepository;
import uz.talim.talim.service.CommonService;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GradeMapper {
    private final CommonService commonService;
    private final SpeakingRepository speakingRepository;
    private final FullMockRepository mockRepository;

    public Grade toEntity(GradeCreateDTO gradeCreateDTO, boolean isChecking) {
        if (gradeCreateDTO == null) return null;
        SpeakingDegree degree = switch (gradeCreateDTO.getDegree().toLowerCase()) {
            case "unknown" -> SpeakingDegree.UNKNOWN;
            case "a1" -> SpeakingDegree.A1;
            case "a2" -> SpeakingDegree.A2;
            case "b1" -> SpeakingDegree.B1;
            case "b2" -> SpeakingDegree.B2;
            case "c1" -> SpeakingDegree.C1;
            default -> SpeakingDegree.NONE;
        };

        Optional<Speaking> speaking;
        try {
            speaking = speakingRepository.findById(UUID.fromString(gradeCreateDTO.getSpeakingId()));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        speaking.orElseThrow(() -> new NotFoundException("Speaking not found"));
        Speaking speakingUpdated = speaking.get();
        if (isChecking) {
            speakingUpdated.setChecked(true);
            speakingUpdated = speakingRepository.save(speakingUpdated);
        }
        return Grade.builder()
                .degree(degree)
                .feedback(gradeCreateDTO.getFeedback())
                .supervisor(commonService.getCurrentUser())
                .speaking(speakingUpdated)
                .createdAt(LocalDateTime.now())
                .build();
    }

    public GradeListViewDTO toListViewDto(Grade grade) {
        if (grade == null) return null;
        if (grade.getSpeaking() == null) return null;
        User supervisor = grade.getSupervisor();
        return GradeListViewDTO.builder()
                .id(grade.getId())
                .degree(grade.getDegree())
                .supervisorId(supervisor != null ? supervisor.getId() : -1)
                .supervisorFullName(supervisor != null ? supervisor.getFirstname() + " " + supervisor.getLastname() : "UNKNOWN")
                .userFullName(grade.getSpeaking() != null ? grade.getSpeaking().getUser().getFirstname() + " " + grade.getSpeaking().getUser().getFirstname() : "-1")
                .feedback(grade.getFeedback())
                .audioUrl(grade.getSpeaking() == null ? "null" : grade.getSpeaking().getAudioUrl())
                .checkedAt(grade.getCreatedAt())
                .build();
    }
}
