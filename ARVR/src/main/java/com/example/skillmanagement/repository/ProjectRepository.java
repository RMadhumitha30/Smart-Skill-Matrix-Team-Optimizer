package com.example.skillmanagement.repository;

import com.example.skillmanagement.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    @Query("SELECT p FROM Project p JOIN p.requiredSkills rs WHERE rs.skill.id = ?1")
    List<Project> findByRequiredSkillId(Long skillId);
    
    List<Project> findByTeamId(Long employeeId);
} 