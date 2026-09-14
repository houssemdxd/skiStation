package org.example.skistation.service;

import org.example.skistation.model.Cours;
import org.example.skistation.model.Support;
import org.example.skistation.model.TypeCours;

import java.util.List;

public interface ICoursService {

    List<Cours> retrieveAllCourses();

    Cours addCours(Cours cours);

    Cours updateCours(Cours cours);

    Cours retrieveCours(Long numCours);

    void removeCours(Long numCours);

    List<Cours> retrieveCoursByType(TypeCours typeCours);

    List<Cours> retrieveCoursBySupport(Support support);
}
