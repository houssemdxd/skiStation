package org.example.skistation.repository;

import org.example.skistation.model.Inscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InscriptionRepository extends JpaRepository<Inscription,Long> {

Long countByCoursNumCours(Long numCourse);
 Inscription findByCoursNumCours(Long numCourse);

}
