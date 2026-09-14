package org.example.skistation.repository;

import org.example.skistation.model.Cours;
import org.example.skistation.model.Support;
import org.example.skistation.model.TypeCours;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CoursRepository extends JpaRepository<Cours, Long> {

    List<Cours> findByTypeCours(TypeCours typeCours);

    List<Cours> findBySupport(Support support);
}
