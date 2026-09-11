package org.example.skistation.service;

import org.example.skistation.model.Cours;

import java.util.List;

public interface ICoursService {

    List<Cours> retrieveAllCourses();

    Cours addCours(Cours cours);

    Cours updateCours(Cours cours);

    Cours retrieveCours(Long numCours);
}
