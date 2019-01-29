package blog.straysheep;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
//@EnableJpaAuditing
public class StraySheepApplication {

	public static void main(String[] args) {
		SpringApplication.run(StraySheepApplication.class, args);
	}

}

