package uz.talim.talim;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class TalimApplication {

    public static void main(String[] args) {
        SpringApplication.run(TalimApplication.class, args);
    }

    
}
