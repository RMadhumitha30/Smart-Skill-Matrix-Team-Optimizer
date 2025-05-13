package com.example.skillmanagement.service;

import com.example.skillmanagement.model.Employee;
import com.example.skillmanagement.model.Project;
import com.example.skillmanagement.model.ProjectSkill;
import com.example.skillmanagement.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
@RequiredArgsConstructor
public class TeamGenerationService {
    private final EmployeeRepository employeeRepository;

    public Map<String, Object> generateTeam(Project project) {
        Map<String, Object> result = new HashMap<>();
        List<Employee> suggestedTeam = new ArrayList<>();
        List<Map<String, Object>> skillGaps = new ArrayList<>();

        for (ProjectSkill requiredSkill : project.getRequiredSkills()) {
            List<Employee> matchingEmployees = employeeRepository.findBySkillsId(requiredSkill.getSkill().getId());
            
            if (!matchingEmployees.isEmpty()) {
                // Find the best match based on skill rating
                Employee bestMatch = matchingEmployees.stream()
                    .max(Comparator.comparing(emp -> 
                        emp.getSkills().stream()
                            .filter(skill -> skill.getId().equals(requiredSkill.getSkill().getId()))
                            .findFirst()
                            .map(skill -> skill.getRating())
                            .orElse(0)
                    ))
                    .orElse(null);

                if (bestMatch != null && !suggestedTeam.contains(bestMatch)) {
                    suggestedTeam.add(bestMatch);
                }
            } else {
                // Record skill gap
                Map<String, Object> gap = new HashMap<>();
                gap.put("skill", requiredSkill.getSkill().getName());
                gap.put("minRating", requiredSkill.getMinRating());
                skillGaps.add(gap);
            }
        }

        result.put("team", suggestedTeam);
        result.put("skillGaps", skillGaps);
        return result;
    }
} 