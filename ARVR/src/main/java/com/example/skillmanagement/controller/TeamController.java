package com.example.skillmanagement.controller;

import com.example.skillmanagement.model.Project;
import com.example.skillmanagement.service.TeamGenerationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/teams")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TeamController {
    private final TeamGenerationService teamGenerationService;

    @PostMapping("/generate")
    public ResponseEntity<?> generateTeam(@RequestBody Project project) {
        return ResponseEntity.ok(teamGenerationService.generateTeam(project));
    }
} 