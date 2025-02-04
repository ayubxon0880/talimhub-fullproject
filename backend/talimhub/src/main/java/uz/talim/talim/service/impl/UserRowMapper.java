package uz.talim.talim.service.impl;

import org.springframework.jdbc.core.RowMapper;
import uz.talim.talim.dto.user.UserForAdmin;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserRowMapper implements RowMapper<UserForAdmin> {
    @Override
    public UserForAdmin mapRow(ResultSet rs, int rowNum) throws SQLException {
        UserForAdmin user = new UserForAdmin();
        user.setUserId(rs.getLong("userId"));
        user.setFirstName(rs.getString("firstName"));
        user.setLastName(rs.getString("lastName"));
        user.setSpeakingCount(rs.getInt("speakingCount"));
        user.setTotalLikes(rs.getInt("totalLikes"));
        return user;
    }
}
