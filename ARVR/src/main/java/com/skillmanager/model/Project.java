package com.skillmanager.model;

import java.util.ArrayList;
import java.util.List;

public class Project {
    private String name;
    private ProjectStatus status;
    private List<String> requiredSkills;
    private List<String> assignedTeam;
    private String deadline;

    public enum ProjectStatus {
        NOT_STARTED,
        IN_PROGRESS,
        COMPLETED,
        ON_HOLD
    }

    public Project(String name, ProjectStatus status, List<String> requiredSkills, List<String> assignedTeam, String deadline) {
        this.name = name;
        this.status = status;
        this.requiredSkills = new ArrayList<>(requiredSkills);
        this.assignedTeam = new ArrayList<>(assignedTeam);
        this.deadline = deadline;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ProjectStatus getStatus() {
        return status;
    }

    public void setStatus(ProjectStatus status) {
        this.status = status;
    }

    public List<String> getRequiredSkills() {
        return new ArrayList<>(requiredSkills);
    }

    public void setRequiredSkills(List<String> requiredSkills) {
        this.requiredSkills = new ArrayList<>(requiredSkills);
    }

    public List<String> getAssignedTeam() {
        return new ArrayList<>(assignedTeam);
    }

    public void setAssignedTeam(List<String> assignedTeam) {
        this.assignedTeam = new ArrayList<>(assignedTeam);
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }

    @Override
    public String toString() {
        return String.format("Project{name='%s', status=%s, requiredSkills=%s, assignedTeam=%s, deadline='%s'}",
                name, status, requiredSkills, assignedTeam, deadline);
    }
} 