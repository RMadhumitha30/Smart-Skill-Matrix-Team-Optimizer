@echo off
echo Compiling Skill Manager...
javac SkillManager.java
if errorlevel 1 (
    echo Compilation failed!
    pause
    exit /b 1
)
echo Running Skill Manager...
java SkillManager
pause 