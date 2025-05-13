package com.skillmanager;

import java.util.*;

public class SkillManagementSystem {
    private static Scanner scanner = new Scanner(System.in);
    private static List<Skill> skills = new ArrayList<>();
    private static List<Project> projects = new ArrayList<>();
    private static List<TeamMember> teamMembers = new ArrayList<>();

    static class Skill {
        String name;
        String rating;
        String certification;

        Skill(String name, String rating, String certification) {
            this.name = name;
            this.rating = rating;
            this.certification = certification;
        }

        @Override
        public String toString() {
            return String.format("Name: %s, Rating: %s, Certification: %s", name, rating, certification);
        }
    }

    static class Project {
        String name;
        String status;
        List<String> requiredSkills;

        Project(String name, String status, List<String> requiredSkills) {
            this.name = name;
            this.status = status;
            this.requiredSkills = requiredSkills;
        }

        @Override
        public String toString() {
            return String.format("Name: %s, Status: %s, Required Skills: %s", 
                name, status, String.join(", ", requiredSkills));
        }
    }

    static class TeamMember {
        String name;
        List<String> skills;

        TeamMember(String name, List<String> skills) {
            this.name = name;
            this.skills = skills;
        }
    }

    public static void main(String[] args) {
        // Add some sample data
        addSampleData();
        
        while (true) {
            displayMenu();
            int choice = getIntInput("Enter your choice: ");
            
            switch (choice) {
                case 1:
                    addSkill();
                    break;
                case 2:
                    viewAllSkills();
                    break;
                case 3:
                    filterSkills();
                    break;
                case 4:
                    addProject();
                    break;
                case 5:
                    viewAllProjects();
                    break;
                case 6:
                    filterProjects();
                    break;
                case 7:
                    suggestTeam();
                    break;
                case 0:
                    System.out.println("Thank you for using Skill Management System!");
                    return;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }
    }

    private static void addSampleData() {
        // Add sample skills
        skills.add(new Skill("Java", "EXPERT", "Oracle Certified Professional"));
        skills.add(new Skill("Python", "INTERMEDIATE", "Python Institute Certification"));
        skills.add(new Skill("JavaScript", "BEGINNER", ""));

        // Add sample projects
        projects.add(new Project("Web Application", "IN_PROGRESS", 
            Arrays.asList("Java", "JavaScript")));
        projects.add(new Project("Data Analysis", "NOT_STARTED", 
            Arrays.asList("Python")));

        // Add sample team members
        teamMembers.add(new TeamMember("John", Arrays.asList("Java", "JavaScript")));
        teamMembers.add(new TeamMember("Alice", Arrays.asList("Python", "Java")));
    }

    private static void displayMenu() {
        System.out.println("\n=== Skill Management System ===");
        System.out.println("1. Add Skill");
        System.out.println("2. View All Skills");
        System.out.println("3. Filter Skills by Rating");
        System.out.println("4. Add Project");
        System.out.println("5. View All Projects");
        System.out.println("6. Filter Projects by Status");
        System.out.println("7. Suggest Team for Project");
        System.out.println("0. Exit");
    }

    private static void addSkill() {
        System.out.println("\n=== Add New Skill ===");
        String name = getStringInput("Enter skill name: ");
        String rating = getStringInput("Enter rating (BEGINNER/INTERMEDIATE/EXPERT): ").toUpperCase();
        String certification = getStringInput("Enter certification (if any): ");

        skills.add(new Skill(name, rating, certification));
        System.out.println("Skill added successfully!");
    }

    private static void viewAllSkills() {
        System.out.println("\n=== All Skills ===");
        if (skills.isEmpty()) {
            System.out.println("No skills found.");
            return;
        }
        skills.forEach(System.out::println);
    }

    private static void filterSkills() {
        System.out.println("\n=== Filter Skills by Rating ===");
        String rating = getStringInput("Enter rating to filter (BEGINNER/INTERMEDIATE/EXPERT): ").toUpperCase();
        
        boolean found = false;
        for (Skill skill : skills) {
            if (skill.rating.equals(rating)) {
                System.out.println(skill);
                found = true;
            }
        }
        if (!found) {
            System.out.println("No skills found with rating: " + rating);
        }
    }

    private static void addProject() {
        System.out.println("\n=== Add New Project ===");
        String name = getStringInput("Enter project name: ");
        String status = getStringInput("Enter status (NOT_STARTED/IN_PROGRESS/COMPLETED/ON_HOLD): ").toUpperCase();
        String skillsInput = getStringInput("Enter required skills (comma-separated): ");
        List<String> requiredSkills = Arrays.asList(skillsInput.split(","));

        projects.add(new Project(name, status, requiredSkills));
        System.out.println("Project added successfully!");
    }

    private static void viewAllProjects() {
        System.out.println("\n=== All Projects ===");
        if (projects.isEmpty()) {
            System.out.println("No projects found.");
            return;
        }
        projects.forEach(System.out::println);
    }

    private static void filterProjects() {
        System.out.println("\n=== Filter Projects by Status ===");
        String status = getStringInput("Enter status to filter (NOT_STARTED/IN_PROGRESS/COMPLETED/ON_HOLD): ").toUpperCase();
        
        boolean found = false;
        for (Project project : projects) {
            if (project.status.equals(status)) {
                System.out.println(project);
                found = true;
            }
        }
        if (!found) {
            System.out.println("No projects found with status: " + status);
        }
    }

    private static void suggestTeam() {
        System.out.println("\n=== Suggest Team for Project ===");
        String projectName = getStringInput("Enter project name: ");
        
        Project selectedProject = null;
        for (Project project : projects) {
            if (project.name.equals(projectName)) {
                selectedProject = project;
                break;
            }
        }
        
        if (selectedProject == null) {
            System.out.println("Project not found!");
            return;
        }

        System.out.println("\nSuggested Team Members:");
        boolean found = false;
        for (TeamMember member : teamMembers) {
            Set<String> matchingSkills = new HashSet<>(member.skills);
            matchingSkills.retainAll(selectedProject.requiredSkills);
            
            if (!matchingSkills.isEmpty()) {
                System.out.printf("%s - Matches: %s%n", 
                    member.name, String.join(", ", matchingSkills));
                found = true;
            }
        }
        if (!found) {
            System.out.println("No team members found with matching skills.");
        }
    }

    private static String getStringInput(String prompt) {
        System.out.print(prompt);
        return scanner.nextLine().trim();
    }

    private static int getIntInput(String prompt) {
        while (true) {
            try {
                System.out.print(prompt);
                return Integer.parseInt(scanner.nextLine().trim());
            } catch (NumberFormatException e) {
                System.out.println("Please enter a valid number.");
            }
        }
    }
} 