package uz.talim.talim.repository.extension.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import uz.talim.talim.dto.likes.LikeDTO;
import uz.talim.talim.dto.response.CommonResponse;
import uz.talim.talim.dto.user.UserFullDetail;
import uz.talim.talim.dto.user.UserRating;
import uz.talim.talim.repository.extension.UserRepositoryExtension;
import uz.talim.talim.service.CommonService;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
public class UserRepositoryExtensionImpl implements UserRepositoryExtension {
    private final JdbcTemplate jdbcTemplate;
    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    private final CommonService commonService;


    @Override
    public List<UserRating> rating() {
        String query = " SELECT u.id AS user_id, " +
                " COUNT(l.id) AS like_count, " +
                " u.firstname AS firstname, " +
                " u.lastname AS lastname " +
                " FROM speaking s " +
                " LEFT JOIN likes l ON s.id = l.speaking_id " +
                " INNER JOIN users u ON s.user_id = u.id " +
                " WHERE s.created_at BETWEEN '"+commonService.getCurrentMonthFirstDay()+"' AND '"+commonService.getCurrentMonthLastDay()+"' " +
                " GROUP BY u.id, u.firstname, u.lastname ORDER BY count(l.id) DESC limit 10; ";

        return jdbcTemplate.query(query, (rs, rowNum) -> new UserRating(
                rs.getLong("user_id"),
                rs.getString("firstname") + " " + rs.getString("lastname"),
                rs.getLong("like_count")
        ));
    }

    @Override
    public List<UserFullDetail> findAllUsersFullDetail(Integer limit) {
        String query = "SELECT u.id as id, " +
                " u.firstname as firstname, " +
                " u.lastname as lastname, " +
                " u.phone as phone, " +
                " COUNT(s.id) AS speakingCount, " +
                " COALESCE(SUM(likesCount), 0) AS likes " +
                " FROM users u " +
                " LEFT JOIN speaking s ON u.id = s.user_id " +
                " LEFT JOIN ( " +
                "    SELECT speaking_id, COUNT(*) AS likesCount " +
                "    FROM likes " +
                "    GROUP BY speaking_id " +
                " ) l ON s.id = l.speaking_id " +
                " WHERE s.created_at BETWEEN '"+commonService.getCurrentMonthFirstDay()+"' AND '"+commonService.getCurrentMonthLastDay()+"' " +
                "GROUP BY u.id, u.firstname, u.lastname, u.phone ORDER BY u.created_at LIMIT "+limit+";";

        return jdbcTemplate.query(query, (rs, rowNum) -> new UserFullDetail(
                rs.getLong("id"),
                rs.getString("firstname"),
                rs.getString("lastname"),
                rs.getString("phone"),
                rs.getLong("speakingCount"),
                rs.getLong("likes")
        ));
    }

    @Override
    public CommonResponse<Object> findLikes(Long userId, Integer limit, Integer offset) {
        String query = "SELECT speaking_id, audio_url, s.created_at AS cr_at, t.name AS tname, u.firstname AS firstname, " +
                "u.lastname AS lastname, likes.created_at AS lk_cr_at FROM likes " +
                "LEFT JOIN public.speaking s ON s.id = likes.speaking_id " +
                "LEFT JOIN public.topic t ON t.id = s.topic_id " +
                "LEFT JOIN public.users u ON u.id = likes.user_id " +
                "WHERE u.id = ? " +
                "ORDER BY likes.created_at LIMIT ? OFFSET ?";

        List<LikeDTO> list = jdbcTemplate.query(query, new Object[]{userId, limit, offset}, (rs, rowNum) ->
                new LikeDTO(
                        rs.getString("speaking_id"),
                        rs.getString("audio_url"),
                        rs.getTimestamp("cr_at") != null ? rs.getTimestamp("cr_at").toLocalDateTime() : null,
                        rs.getString("tname"),
                        rs.getString("firstname"),
                        rs.getString("lastname"),
                        rs.getTimestamp("lk_cr_at") != null ? rs.getTimestamp("lk_cr_at").toLocalDateTime() : null
                )
        );

        String countQuery = "SELECT COUNT(*) FROM likes WHERE user_id = ?";
        Long count = jdbcTemplate.queryForObject(countQuery, new Object[]{userId}, Long.class);

        CommonResponse<Object> commonResponse = new CommonResponse<>();
        commonResponse.add("likes", list);
        commonResponse.add("totalLikes", count);

        return commonResponse;
    }

    @Override
    public UserFullDetail findUserSpeakingSummary(Long userId) {
        String sql = "SELECT u.id AS userId, u.firstname AS firstName, u.lastname AS lastName, " +
                "COUNT(DISTINCT s.id) AS speakingCount, COUNT(l.id) AS totalLikes " +
                "FROM users u " +
                "LEFT JOIN speaking s ON u.id = s.user_id " +
                "LEFT JOIN likes l ON s.id = l.speaking_id " +
                "WHERE u.id = :userId and s.created_at BETWEEN '"+commonService.getCurrentMonthFirstDay()+"' AND '"+commonService.getCurrentMonthLastDay()+"' " +
                "GROUP BY u.id, u.firstname, u.lastname";

        MapSqlParameterSource parameters = new MapSqlParameterSource().addValue("userId", userId);

        List<UserFullDetail> results = namedParameterJdbcTemplate.query(sql, parameters, new UserRowMapper());
        return results.isEmpty() ? null : results.get(0);
    }

    private static class UserRowMapper implements RowMapper<UserFullDetail> {
        @Override
        public UserFullDetail mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new UserFullDetail(
                    rs.getLong("userId"),
                    rs.getString("firstName"),
                    rs.getString("lastName"),
                    null,
                    rs.getLong("speakingCount"),
                    rs.getLong("totalLikes")
            );
        }
    }

}
