// Data Models
let skills = [];
let projects = [];
let employees = [];

// DOM Elements
const skillsList = document.getElementById('skillsList');
const projectsList = document.getElementById('projectsList');
const projectSelect = document.getElementById('projectSelect');
const teamSuggestion = document.getElementById('teamSuggestion');
const skillModal = new bootstrap.Modal(document.getElementById('skillModal'));
const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });

    // Skill Management
    document.getElementById('addSkillBtn').addEventListener('click', () => {
        showSkillModal();
    });

    document.getElementById('saveSkillBtn').addEventListener('click', saveSkill);

    // Project Management
    document.getElementById('addProjectBtn').addEventListener('click', () => {
        showProjectModal();
    });

    document.getElementById('saveProjectBtn').addEventListener('click', saveProject);
    document.getElementById('addSkillRequirement').addEventListener('click', addSkillRequirement);

    // Team Builder
    document.getElementById('generateTeamBtn').addEventListener('click', generateTeam);

    // Initialize the application
    initializeApp();
});

// Initialize Application
function initializeApp() {
    // Load sample data
    loadSampleData();
    
    // Initialize charts
    initializeCharts();
    
    // Show dashboard by default
    showSection('dashboard');
}

// Navigation
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[href="#${sectionId}"]`).classList.add('active');
}

// Skill Management
function showSkillModal(skill = null) {
    const form = document.getElementById('skillForm');
    if (skill) {
        form.skillName.value = skill.name;
        form.skillCategory.value = skill.category;
        form.skillRating.value = skill.rating;
    } else {
        form.reset();
    }
    skillModal.show();
}

function saveSkill() {
    const form = document.getElementById('skillForm');
    const skill = {
        id: Date.now(),
        name: form.skillName.value,
        category: form.skillCategory.value,
        rating: parseInt(form.skillRating.value)
    };

    const existingIndex = skills.findIndex(s => s.id === skill.id);
    if (existingIndex >= 0) {
        skills[existingIndex] = skill;
    } else {
        skills.push(skill);
    }

    skillModal.hide();
    renderSkills();
    updateCharts();
}

function renderSkills() {
    skillsList.innerHTML = skills.map(skill => `
        <div class="skill-item">
            <div class="skill-info">
                <div class="skill-name">${skill.name}</div>
                <div class="skill-category">${skill.category}</div>
            </div>
            <div class="skill-rating">
                <div class="rating-stars">
                    ${'★'.repeat(skill.rating)}${'☆'.repeat(10 - skill.rating)}
                </div>
                <span>${skill.rating}/10</span>
            </div>
        </div>
    `).join('');
}

// Project Management
function showProjectModal(project = null) {
    const form = document.getElementById('projectForm');
    if (project) {
        form.projectName.value = project.name;
        form.projectDescription.value = project.description;
        // TODO: Populate required skills
    } else {
        form.reset();
        document.getElementById('requiredSkills').innerHTML = `
            <h6>Required Skills</h6>
            <div class="skill-requirement mb-2">
                <div class="row">
                    <div class="col">
                        <select class="form-select skill-select"></select>
                    </div>
                    <div class="col">
                        <input type="number" class="form-control" min="1" max="10" placeholder="Min Rating">
                    </div>
                    <div class="col-auto">
                        <button type="button" class="btn btn-danger remove-skill">
                            <i class='bx bx-trash'></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    updateSkillSelects();
    projectModal.show();
}

function addSkillRequirement() {
    const template = document.querySelector('.skill-requirement').cloneNode(true);
    document.getElementById('requiredSkills').appendChild(template);
    updateSkillSelects();
}

function updateSkillSelects() {
    document.querySelectorAll('.skill-select').forEach(select => {
        select.innerHTML = skills.map(skill => 
            `<option value="${skill.id}">${skill.name}</option>`
        ).join('');
    });
}

function saveProject() {
    const form = document.getElementById('projectForm');
    const requiredSkills = Array.from(document.querySelectorAll('.skill-requirement')).map(req => ({
        skillId: req.querySelector('.skill-select').value,
        minRating: parseInt(req.querySelector('input[type="number"]').value)
    }));

    const project = {
        id: Date.now(),
        name: form.projectName.value,
        description: form.projectDescription.value,
        requiredSkills
    };

    const existingIndex = projects.findIndex(p => p.id === project.id);
    if (existingIndex >= 0) {
        projects[existingIndex] = project;
    } else {
        projects.push(project);
    }

    projectModal.hide();
    renderProjects();
    updateProjectSelect();
}

function renderProjects() {
    projectsList.innerHTML = projects.map(project => `
        <div class="project-item">
            <div class="project-header">
                <h5 class="project-title">${project.name}</h5>
            </div>
            <div class="project-description">${project.description}</div>
            <div class="required-skills">
                ${project.requiredSkills.map(req => {
                    const skill = skills.find(s => s.id === parseInt(req.skillId));
                    return `
                        <span class="skill-tag">
                            ${skill ? skill.name : 'Unknown'} (${req.minRating}+)
                        </span>
                    `;
                }).join('')}
            </div>
        </div>
    `).join('');
}

// Team Builder
function updateProjectSelect() {
    projectSelect.innerHTML = projects.map(project => 
        `<option value="${project.id}">${project.name}</option>`
    ).join('');
}

function generateTeam() {
    const projectId = projectSelect.value;
    const project = projects.find(p => p.id === parseInt(projectId));
    
    if (!project) {
        teamSuggestion.innerHTML = '<div class="alert alert-warning">Please select a project first.</div>';
        return;
    }

    // Simple team generation algorithm
    const team = [];
    const skillGaps = [];

    project.requiredSkills.forEach(req => {
        const matchingEmployees = employees.filter(emp => {
            const skill = emp.skills.find(s => s.id === parseInt(req.skillId));
            return skill && skill.rating >= req.minRating;
        });

        if (matchingEmployees.length > 0) {
            // Find the best match
            const bestMatch = matchingEmployees.reduce((best, current) => {
                const currentSkill = current.skills.find(s => s.id === parseInt(req.skillId));
                const bestSkill = best.skills.find(s => s.id === parseInt(req.skillId));
                return currentSkill.rating > bestSkill.rating ? current : best;
            });
            team.push(bestMatch);
        } else {
            skillGaps.push(req);
        }
    });

    // Render team suggestion
    teamSuggestion.innerHTML = `
        <h5>Suggested Team</h5>
        ${team.map(member => `
            <div class="team-member">
                <div class="member-info">
                    <div class="member-name">${member.name}</div>
                    <div class="member-skills">
                        ${member.skills.map(s => {
                            const skill = skills.find(sk => sk.id === s.id);
                            return skill ? `${skill.name} (${s.rating})` : '';
                        }).join(', ')}
                    </div>
                </div>
            </div>
        `).join('')}
        ${skillGaps.length > 0 ? `
            <div class="skill-gap">
                <strong>Skill Gaps:</strong>
                ${skillGaps.map(gap => {
                    const skill = skills.find(s => s.id === parseInt(gap.skillId));
                    return skill ? `${skill.name} (${gap.minRating}+)` : '';
                }).join(', ')}
            </div>
        ` : ''}
    `;
}

// Charts
function initializeCharts() {
    const ctx = document.getElementById('skillDistributionChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Skill Distribution',
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10
                }
            }
        }
    });
}

function updateCharts() {
    // Update skill distribution chart
    const categories = [...new Set(skills.map(s => s.category))];
    const data = categories.map(category => {
        const categorySkills = skills.filter(s => s.category === category);
        return categorySkills.reduce((sum, skill) => sum + skill.rating, 0) / categorySkills.length;
    });

    const chart = Chart.getChart('skillDistributionChart');
    chart.data.labels = categories;
    chart.data.datasets[0].data = data;
    chart.update();
}

// Sample Data
function loadSampleData() {
    // Sample skills
    skills = [
        { id: 1, name: 'Java', category: 'technical', rating: 8 },
        { id: 2, name: 'Spring Framework', category: 'technical', rating: 7 },
        { id: 3, name: 'Hibernate', category: 'technical', rating: 6 },
        { id: 4, name: 'Maven', category: 'devops', rating: 7 },
        { id: 5, name: 'JUnit', category: 'technical', rating: 8 },
        { id: 6, name: 'Communication', category: 'soft', rating: 9 },
        { id: 7, name: 'Docker', category: 'devops', rating: 6 }
    ];

    // Sample employees
    employees = [
        {
            id: 1,
            name: 'John Doe',
            skills: [
                { id: 1, rating: 8 },
                { id: 2, rating: 7 },
                { id: 6, rating: 9 }
            ]
        },
        {
            id: 2,
            name: 'Jane Smith',
            skills: [
                { id: 1, rating: 9 },
                { id: 3, rating: 8 },
                { id: 5, rating: 8 }
            ]
        }
    ];

    // Sample projects
    projects = [
        {
            id: 1,
            name: 'Java Web Application',
            description: 'Enterprise web application using Spring Boot and Hibernate',
            requiredSkills: [
                { skillId: 1, minRating: 7 },
                { skillId: 2, minRating: 6 },
                { skillId: 3, minRating: 5 }
            ]
        }
    ];

    // Initial render
    renderSkills();
    renderProjects();
    updateProjectSelect();
    updateCharts();
} 