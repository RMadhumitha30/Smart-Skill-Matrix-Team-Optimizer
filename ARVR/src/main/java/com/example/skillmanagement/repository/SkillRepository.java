package com.example.skillmanagement.repository;

import com.example.skillmanagement.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findByCategory(Skill.SkillCategory category);
    List<Skill> findByNameContainingIgnoreCase(String name);
} 