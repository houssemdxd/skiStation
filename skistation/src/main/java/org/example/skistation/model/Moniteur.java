package org.example.skistation.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.AnyDiscriminatorImplicitValues;
import org.springframework.boot.webmvc.autoconfigure.WebMvcProperties;

import java.time.LocalDate;
import java.util.List;
import java.util.Locale;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Moniteur {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long numMoniteur ;
    private String nomM;
    private String prenomM;
    private LocalDate dateRecus;



@OneToOne(mappedBy = "moniteur")
    private User user ;

@OneToMany(mappedBy = "moniteur")
private List<Cours> cours ;


}
