package com.skillmanager.manager;

import com.skillmanager.model.Project;
import com.skillmanager.util.FileManager;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ProjectManager {
    private List<Project> projects;
    private final SkillManager skillManager;

    public ProjectManager(SkillManager skillManager) {
        this.projects = FileManager.loadProjects();
        this.skillManager = skillManager;
    }

    public void addProject(String name, Project.ProjectStatus status, List<String> requiredSkills,
                         List<String> assignedTeam, String deadline) {
        Project project = new Project(name, status, requiredSkills, assignedTeam, deadline);
        projects.add(project);
        FileManager.saveProjects(projects);
    }

    public List<Project> getAllProjects() {
        return new ArrayList<>(projects);
    }

    public List<Project> getProjectsByStatus(Project.ProjectStatus status) {
        return projects.stream()
                .filter(project -> project.getStatus() == status)
                .collect(Collectors.toList());
    }

    public List<String> suggestTeamMembers(String projectName) {
        return projects.stream()
                .filter(project -> project.getName().equals(projectName))
                .findFirst()
                .map(project -> project.getRequiredSkills().stream()
                        .flatMap(skill -> skillManager.getTeamMembersWithSkill(skill).stream())
                        .distinct()
                        .collect(Collectors.toList()))
                .orElse(new ArrayList<>());
    }

    public void updateProjectStatus(String projectName, Project.ProjectStatus newStatus) {
        projects.stream()
                .filter(project -> project.getName().equals(projectName))
                .findFirst()
                .ifPresent(project -> {
                    project.setStatus(newStatus);
                    FileManager.saveProjects(projects);
                });
    }

    public void updateProjectTeam(String projectName, List<String> newTeam) {
        projects.stream()
                .filter(project -> project.getName().equals(projectName))
                .findFirst()
                .ifPresent(project -> {
                    project.setAssignedTeam(newTeam);
                    FileManager.saveProjects(projects);
                });
    }

    public void deleteProject(String projectName) {
        projects.removeIf(project -> project.getName().equals(projectName));
        FileManager.saveProjects(projects);
    }

    public List<Project> getProjectsBySkill(String skillName) {
        return projects.stream()
                .filter(project -> project.getRequiredSkills().contains(skillName))
                .collect(Collectors.toList());
    }
} 