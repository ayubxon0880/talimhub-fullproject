package uz.talim.talim.mapper;

import org.springframework.stereotype.Service;
import uz.talim.talim.dto.user.UserDTO;
import uz.talim.talim.dto.speaking.UserDTOSpeaking;
import uz.talim.talim.dto.user.UserForListDTO;
import uz.talim.talim.dto.user.UserFullDetail;
import uz.talim.talim.model.User;

@Service
public class UserMapper {

    public UserDTO toDto(User user){
        if (user == null) return null;
        return new UserDTO(
                user.getId(),
                user.getFirstname(),
                user.getLastname(),
                user.getPhone(),
                null,
                user.getRole()
        );
    }

    public UserDTOSpeaking toDtoSpeaking(User user){
        if (user == null) return null;
        return new UserDTOSpeaking(
                user.getId(),
                user.getFirstname()+" "+user.getLastname()
        );
    }

    public UserForListDTO toListViewDto(User user) {
        if (user == null) return null;
        return new UserForListDTO(
                user.getId(),
                user.getFirstname(),
                user.getLastname(),
                user.getPhone(),
                user.getCreatedAt()
        );
    }
}
