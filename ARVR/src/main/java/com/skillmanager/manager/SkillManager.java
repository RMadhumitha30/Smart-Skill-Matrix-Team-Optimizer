package com.skillmanager.manager;

import com.skillmanager.model.Skill;
import com.skillmanager.util.FileManager;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class SkillManager {
    private List<Skill> skills;

    public SkillManager() {
        this.skills = FileManager.loadSkills();
    }

    public void addSkill(String name, Skill.SkillRating rating, String certification, String teamMember) {
        Skill skill = new Skill(name, rating, certification, teamMember);
        skills.add(skill);
        FileManager.saveSkills(skills);
    }

    public List<Skill> getAllSkills() {
        return new ArrayList<>(skills);
    }

    public List<Skill> getSkillsByRating(Skill.SkillRating rating) {
        return skills.stream()
                .filter(skill -> skill.getRating() == rating)
                .collect(Collectors.toList());
    }

    public List<Skill> getSkillsByTeamMember(String teamMember) {
        return skills.stream()
                .filter(skill -> skill.getTeamMember().equals(teamMember))
                .collect(Collectors.toList());
    }

    public List<String> getTeamMembersWithSkill(String skillName) {
        return skills.stream()
                .filter(skill -> skill.getName().equalsIgnoreCase(skillName))
                .map(Skill::getTeamMember)
                .distinct()
                .collect(Collectors.toList());
    }

    public void updateSkill(String name, Skill.SkillRating newRating, String newCertification) {
        skills.stream()
                .filter(skill -> skill.getName().equals(name))
                .findFirst()
                .ifPresent(skill -> {
                    skill.setRating(newRating);
                    skill.setCertification(newCertification);
                    FileManager.saveSkills(skills);
                });
    }

    public void deleteSkill(String name) {
        skills.removeIf(skill -> skill.getName().equals(name));
        FileManager.saveSkills(skills);
    }
} 