package uz.talim.talim.service.impl;

import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import uz.talim.talim.exceptions.AuthenticationException;
import uz.talim.talim.model.User;
import uz.talim.talim.service.CommonService;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;

@Service
@RequiredArgsConstructor
public class CommonServiceImpl implements CommonService {
    private final LocalDate NOW = LocalDate.now();
    private final LocalDateTime FIRST_DAY_OF_MONTH = YearMonth.of(NOW.getYear(), NOW.getMonth()).atDay(1).atStartOfDay();
    private final LocalDateTime LAST_DAY_OF_MONTH = YearMonth.of(NOW.getYear(), NOW.getMonth()).atEndOfMonth().atTime(LocalTime.MAX);

    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    private static final String SERVICE_ACCOUNT_KEY_PATH_KEY = getPathToGoogleCredentials();

    private static String getPathToGoogleCredentials() {
        String currentDir = System.getProperty("user.dir");
        Path filePath = Paths.get(currentDir, "cred.json");
        return filePath.toString();
    }


    @Override
    public User getCurrentUser() {
        try {
            return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        } catch (Exception e) {
            throw new AuthenticationException("Something is wrong please, login again", HttpStatus.UNAUTHORIZED);
        }
    }

    @Override
    public LocalDateTime getCurrentMonthFirstDay() {
        return FIRST_DAY_OF_MONTH;
    }

    @Override
    public LocalDateTime getCurrentMonthLastDay() {
        return LAST_DAY_OF_MONTH;
    }

    @Override
    public LocalDateTime getLocalDateTimeWithStartOfMonth(int month) {
        try {
            return YearMonth.of(NOW.getYear(), month).atDay(1).atStartOfDay();
        } catch (Exception e){
            return this.getCurrentMonthFirstDay();
        }
    }

    @Override
    public LocalDateTime getLocalDateTimeWithEndOfMonth(int month) {
        try {
            return YearMonth.of(NOW.getYear(), month).atEndOfMonth().atTime(LocalTime.MAX);
        } catch (Exception e){
            return this.getCurrentMonthLastDay();
        }
    }

//    @Override
//    public String uploadFileToGoogleDrive(File file) {
//        try {
//            String folderId = "1fMjymc5bzfxd7BwqcOOyuLUAHlVhoKP7";
//            Drive drive = createDriveService();
//            com.google.api.services.drive.model.File fileMetaData = new com.google.api.services.drive.model.File();
//
//            fileMetaData.setName(file.getName());
//            fileMetaData.setParents(Collections.singletonList(folderId));
//
//            FileContent mediaContent = new FileContent("image/jpeg", file);
//            com.google.api.services.drive.model.File uploadFile = drive.files().create(fileMetaData, mediaContent).setFields("id").execute();
//            String imageUrl = "https://drive.google.com/uc?export=view&id=" + uploadFile.getId();
//            file.delete();
//            return imageUrl;
//        } catch (IOException | GeneralSecurityException e) {
//            throw new CommonException("File is not saved !", HttpStatus.CONFLICT);
//        }
//    }
//
//    private Drive createDriveService() throws IOException, GeneralSecurityException {
//        GoogleCredential credential = GoogleCredential.fromStream(new FileInputStream(SERVICE_ACCOUNT_KEY_PATH_KEY))
//                .createScoped(Collections.singleton(DriveScopes.DRIVE));
//        return new Drive.Builder(
//                GoogleNetHttpTransport.newTrustedTransport(),
//                JSON_FACTORY,
//                credential).build();
//    }
}
