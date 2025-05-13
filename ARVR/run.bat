@echo off
echo Compiling Skill Management System...
javac src/main/java/com/skillmanager/SkillManagementSystem.java
if errorlevel 1 (
    echo Compilation failed!
    pause
    exit /b 1
)
echo Running Skill Management System...
java -cp src/main/java com.skillmanager.SkillManagementSystem
pause 