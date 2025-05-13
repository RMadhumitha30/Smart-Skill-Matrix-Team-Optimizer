package com.example.skillmanagement.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "skills")
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private SkillCategory category;

    @Column(nullable = false)
    private Integer rating;

    public enum SkillCategory {
        JAVA_CORE,
        JAVA_EE,
        SPRING,
        TESTING,
        DEVOPS,
        SOFT_SKILLS,
        OTHER
    }
} 