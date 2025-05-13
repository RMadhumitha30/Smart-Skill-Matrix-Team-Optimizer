import java.util.*;

public class SkillManager {
    private static List<Skill> skills = new ArrayList<>();
    private static Scanner scanner = new Scanner(System.in);

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
            return String.format("Name: %s, Rating: %s, Certification: %s", 
                name, rating, certification);
        }
    }

    public static void main(String[] args) {
        // Add some sample skills
        skills.add(new Skill("Java", "EXPERT", "Oracle Certified Professional"));
        skills.add(new Skill("Python", "INTERMEDIATE", "Python Institute Certification"));
        skills.add(new Skill("JavaScript", "BEGINNER", ""));

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
                case 0:
                    System.out.println("Thank you for using Skill Manager!");
                    return;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }
    }

    private static void displayMenu() {
        System.out.println("\n=== Skill Manager ===");
        System.out.println("1. Add Skill");
        System.out.println("2. View All Skills");
        System.out.println("3. Filter Skills by Rating");
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
 