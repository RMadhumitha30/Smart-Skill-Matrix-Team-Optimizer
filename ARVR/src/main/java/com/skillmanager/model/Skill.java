package com.skillmanager.model;

public class Skill {
    private String name;
    private SkillRating rating;
    private String certification;
    private String teamMember;

    public enum SkillRating {
        BEGINNER,
        INTERMEDIATE,
        EXPERT
    }

    public Skill(String name, SkillRating rating, String certification, String teamMember) {
        this.name = name;
        this.rating = rating;
        this.certification = certification;
        this.teamMember = teamMember;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public SkillRating getRating() {
        return rating;
    }

    public void setRating(SkillRating rating) {
        this.rating = rating;
    }

    public String getCertification() {
        return certification;
    }

    public void setCertification(String certification) {
        this.certification = certification;
    }

    public String getTeamMember() {
        return teamMember;
    }

    public void setTeamMember(String teamMember) {
        this.teamMember = teamMember;
    }

    @Override
    public String toString() {
        return String.format("Skill{name='%s', rating=%s, certification='%s', teamMember='%s'}",
                name, rating, certification, teamMember);
    }
} 