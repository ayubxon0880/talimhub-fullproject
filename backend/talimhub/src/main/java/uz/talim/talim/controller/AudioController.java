package uz.talim.talim.controller;

import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;

@RestController
@RequestMapping("/api/v1/audio")
public class AudioController {
    private static final String AUDIO_FOLDER = System.getProperty("user.dir")+"/audios/";
    private static final String MOCK_FOLDER = System.getProperty("user.dir")+"/mock/";

    @GetMapping("/{filename}")
    public ResponseEntity<FileSystemResource> getAudio(@PathVariable String filename) {
        File audioFile = new File(AUDIO_FOLDER + File.separator + filename);

        if (audioFile.exists()) {
            FileSystemResource resource = new FileSystemResource(audioFile);
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"");
            headers.add(HttpHeaders.CONTENT_TYPE, "audio/mpeg");

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(resource);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/test/{filename}")
    public ResponseEntity<FileSystemResource> getMockAudios(@PathVariable String filename) {
        File audioFile = new File(MOCK_FOLDER + File.separator + filename);

        if (audioFile.exists()) {
            FileSystemResource resource = new FileSystemResource(audioFile);
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"");
            headers.add(HttpHeaders.CONTENT_TYPE, "audio/mpeg");

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(resource);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
