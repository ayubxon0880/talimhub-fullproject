package uz.talim.talim.service;

import org.springframework.http.ResponseEntity;
import uz.talim.talim.dto.grade.MockCheckDTO;
import uz.talim.talim.dto.speaking.FullMockSaveDTO;

public interface MockService {
    ResponseEntity<?> getMocksByUserId(Long userId,Integer page,Integer size,Integer month,boolean sorted);

    ResponseEntity<?> getMocksById(Long mockId);

    ResponseEntity<?> saveFullMock(FullMockSaveDTO fullMockSaveDTO);

    ResponseEntity<?> checkMock(MockCheckDTO mockCheckDTO);

    ResponseEntity<?> getMocksForTeacher(Integer page, Integer size, Integer month, boolean checked);

}
