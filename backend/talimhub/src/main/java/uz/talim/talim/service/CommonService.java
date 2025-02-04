package uz.talim.talim.service;


import uz.talim.talim.model.User;

import java.time.LocalDateTime;


public interface CommonService {
    User getCurrentUser();
    LocalDateTime getCurrentMonthFirstDay();
    LocalDateTime getCurrentMonthLastDay();
    LocalDateTime getLocalDateTimeWithStartOfMonth(int month);
    LocalDateTime getLocalDateTimeWithEndOfMonth(int month);
}
