package com.skillmanager.util;

import com.skillmanager.model.Project;
import com.skillmanager.model.Skill;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import java.io.*;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

public class FileManager {
    private static final String SKILLS_FILE = "skills.json";
    private static final String PROJECTS_FILE = "projects.json";
    private static final Gson gson = new GsonBuilder().setPrettyPrinting().create();

    public static void saveSkills(List<Skill> skills) {
        try (Writer writer = new FileWriter(SKILLS_FILE)) {
            gson.toJson(skills, writer);
        } catch (IOException e) {
            System.err.println("Error saving skills: " + e.getMessage());
        }
    }

    public static List<Skill> loadSkills() {
        File file = new File(SKILLS_FILE);
        if (!file.exists()) {
            return new ArrayList<>();
        }

        try (Reader reader = new FileReader(file)) {
            Type listType = new TypeToken<ArrayList<Skill>>(){}.getType();
            return gson.fromJson(reader, listType);
        } catch (IOException e) {
            System.err.println("Error loading skills: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    public static void saveProjects(List<Project> projects) {
        try (Writer writer = new FileWriter(PROJECTS_FILE)) {
            gson.toJson(projects, writer);
        } catch (IOException e) {
            System.err.println("Error saving projects: " + e.getMessage());
        }
    }

    public static List<Project> loadProjects() {
        File file = new File(PROJECTS_FILE);
        if (!file.exists()) {
            return new ArrayList<>();
        }

        try (Reader reader = new FileReader(file)) {
            Type listType = new TypeToken<ArrayList<Project>>(){}.getType();
            return gson.fromJson(reader, listType);
        } catch (IOException e) {
            System.err.println("Error loading projects: " + e.getMessage());
            return new ArrayList<>();
        }
    }
} 