# Skill Management System

A full-stack Java application for managing employee skills and team building.

## Features

- Employee skill profile management
- Project requirements management
- Team suggestion engine
- Skill gap analysis
- Dashboard with visualizations

## Tech Stack

- Backend:
  - Java 17
  - Spring Boot 3.2.3
  - Spring Security
  - Spring Data JPA
  - H2 Database
  - JWT Authentication

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd skill-management
```

2. Build the project:
```bash
mvn clean install
```

3. Run the application:
```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## API Endpoints

### Team Generation
- POST `/api/teams/generate` - Generate team suggestions for a project

### Skills
- GET `/api/skills` - Get all skills
- POST `/api/skills` - Create a new skill
- PUT `/api/skills/{id}` - Update a skill
- DELETE `/api/skills/{id}` - Delete a skill

### Projects
- GET `/api/projects` - Get all projects
- POST `/api/projects` - Create a new project
- PUT `/api/projects/{id}` - Update a project
- DELETE `/api/projects/{id}` - Delete a project

### Employees
- GET `/api/employees` - Get all employees
- POST `/api/employees` - Create a new employee
- PUT `/api/employees/{id}` - Update an employee
- DELETE `/api/employees/{id}` - Delete an employee

## Database

The application uses H2 in-memory database. You can access the H2 console at:
`http://localhost:8080/h2-console`

## Security

The application uses JWT-based authentication. To access protected endpoints, include the JWT token in the Authorization header:
```
Authorization: Bearer <your-token>
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 