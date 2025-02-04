package uz.talim.talim.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import uz.talim.talim.dto.grade.MockCheckDTO;
import uz.talim.talim.dto.speaking.FullMockSaveDTO;
import uz.talim.talim.service.CommonService;
import uz.talim.talim.service.MockService;

@RestController
@RequestMapping("/api/v1/mock")
@RequiredArgsConstructor
public class MockController {
    private final MockService mockService;
    private final CommonService commonService;

    @PostMapping("/save/full-mock")
    public ResponseEntity<?> saveFullMock(@RequestParam("audioOne") MultipartFile audioOne,
                                          @RequestParam("audioTwo") MultipartFile audioTwo,
                                          @RequestParam("audioThree") MultipartFile audioThree,
                                          @RequestParam("topicOne") Long topicOne,
                                          @RequestParam("topicTwo") Long topicTwo,
                                          @RequestParam("topicThree") Long topicThree) {
        FullMockSaveDTO fullMockSaveDTO = new FullMockSaveDTO(topicOne,topicTwo,topicThree,audioOne,audioTwo,audioThree);
        return mockService.saveFullMock(fullMockSaveDTO);
    }

    @PostMapping("/check")
    public ResponseEntity<?> checkMock(@Valid @RequestBody MockCheckDTO mockCheckDTO){
        return mockService.checkMock(mockCheckDTO);
    }

    @GetMapping("/my-mocks")
    public ResponseEntity<?> getMocksByUser(@RequestParam(defaultValue = "0") Integer page,
                                            @RequestParam(defaultValue = "3") Integer size,
                                            @RequestParam(defaultValue = "0") Integer month,
                                            @RequestParam(defaultValue = "-1") Long userId,
                                            @RequestParam(defaultValue = "true") Boolean sorted){
        if (userId == -1L) {
            userId = commonService.getCurrentUser().getId();
        }
        return mockService.getMocksByUserId(userId,page,size,month,sorted);
    }

    @GetMapping("/mocks-for-teacher")
//    @PreAuthorize("")
    public ResponseEntity<?> getMocksForTeacher(@RequestParam(defaultValue = "0") Integer page,
                                            @RequestParam(defaultValue = "3") Integer size,
                                            @RequestParam(defaultValue = "false") boolean checked,
                                            @RequestParam(defaultValue = "0") Integer month){
        return mockService.getMocksForTeacher(page,size,month,checked);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMocksById(@PathVariable Long id){
        return mockService.getMocksById(id);
    }


}
