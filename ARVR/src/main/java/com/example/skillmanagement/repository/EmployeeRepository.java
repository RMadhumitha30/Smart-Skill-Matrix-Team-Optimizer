package com.example.skillmanagement.repository;

import com.example.skillmanagement.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByEmail(String email);
    List<Employee> findBySkillsId(Long skillId);
    boolean existsByEmail(String email);
} 