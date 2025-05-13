document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modal = document.getElementById('addProjectModal');
    const addProjectBtn = document.getElementById('addProjectBtn');
    const closeBtn = document.querySelector('.close');

    addProjectBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Filter functionality
    const complexityFilter = document.getElementById('complexityFilter');
    const statusFilter = document.getElementById('statusFilter');
    const skillFilter = document.getElementById('skillFilter');
    const projectCards = document.querySelectorAll('.project-card');

    function filterProjects() {
        const selectedComplexity = complexityFilter.value;
        const selectedStatus = statusFilter.value;
        const selectedSkill = skillFilter.value;

        projectCards.forEach(card => {
            const complexity = card.querySelector('.complexity').textContent.toLowerCase();
            const status = card.querySelector('.project-status').textContent.toLowerCase().replace(' ', '-');
            const skills = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());

            const complexityMatch = selectedComplexity === 'all' || complexity === selectedComplexity;
            const statusMatch = selectedStatus === 'all' || status === selectedStatus;
            const skillMatch = selectedSkill === 'all' || skills.includes(selectedSkill);

            if (complexityMatch && statusMatch && skillMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    complexityFilter.addEventListener('change', filterProjects);
    statusFilter.addEventListener('change', filterProjects);
    skillFilter.addEventListener('change', filterProjects);

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        projectCards.forEach(card => {
            const projectName = card.querySelector('h3').textContent.toLowerCase();
            const projectDescription = card.querySelector('.project-description').textContent.toLowerCase();

            if (projectName.includes(searchTerm) || projectDescription.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Add skill requirement
    const addSkillRequirementBtn = document.getElementById('addSkillRequirement');
    const requiredSkillsContainer = document.getElementById('requiredSkills');

    addSkillRequirementBtn.addEventListener('click', () => {
        const skillRequirement = document.createElement('div');
        skillRequirement.className = 'skill-requirement';
        skillRequirement.innerHTML = `
            <select class="skill-select">
                <option value="javascript">JavaScript</option>
                <option value="react">React</option>
                <option value="node">Node.js</option>
            </select>
            <button type="button" class="btn-danger remove-skill">
                <i class="fas fa-times"></i>
            </button>
        `;

        requiredSkillsContainer.appendChild(skillRequirement);

        // Add remove functionality
        const removeBtn = skillRequirement.querySelector('.remove-skill');
        removeBtn.addEventListener('click', () => {
            skillRequirement.remove();
        });
    });

    // Remove skill requirement
    document.querySelectorAll('.remove-skill').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.skill-requirement').remove();
        });
    });

    // Add project form submission
    const addProjectForm = document.getElementById('addProjectForm');
    addProjectForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const projectName = document.getElementById('projectName').value;
        const projectDescription = document.getElementById('projectDescription').value;
        const projectComplexity = document.getElementById('projectComplexity').value;
        const projectDuration = document.getElementById('projectDuration').value;
        const requiredSkills = Array.from(document.querySelectorAll('.skill-select')).map(select => select.value);

        // Create new project card
        const newProjectCard = createProjectCard(
            projectName,
            projectDescription,
            projectComplexity,
            projectDuration,
            requiredSkills
        );
        document.querySelector('.projects-grid').appendChild(newProjectCard);

        // Close modal and reset form
        modal.style.display = 'none';
        addProjectForm.reset();
        requiredSkillsContainer.innerHTML = `
            <div class="skill-requirement">
                <select class="skill-select">
                    <option value="javascript">JavaScript</option>
                    <option value="react">React</option>
                    <option value="node">Node.js</option>
                </select>
                <button type="button" class="btn-danger remove-skill">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    });

    // Function to create a new project card
    function createProjectCard(name, description, complexity, duration, skills) {
        const card = document.createElement('div');
        card.className = 'project-card';

        card.innerHTML = `
            <div class="project-header">
                <h3>${name}</h3>
                <span class="project-status planning">Planning</span>
            </div>
            <div class="project-body">
                <p class="project-description">${description}</p>
                <div class="project-meta">
                    <span class="complexity ${complexity}">${complexity.charAt(0).toUpperCase() + complexity.slice(1)}</span>
                    <span class="duration"><i class="fas fa-clock"></i> ${duration} months</span>
                </div>
                <div class="required-skills">
                    <h4>Required Skills:</h4>
                    <div class="skill-tags">
                        ${skills.map(skill => `<span class="tag">${skill.charAt(0).toUpperCase() + skill.slice(1)}</span>`).join('')}
                    </div>
                </div>
            </div>
            <div class="project-footer">
                <button class="btn-secondary">
                    <i class="fas fa-users"></i>
                    Build Team
                </button>
                <button class="btn-secondary">
                    <i class="fas fa-edit"></i>
                    Edit
                </button>
            </div>
        `;

        return card;
    }
}); 