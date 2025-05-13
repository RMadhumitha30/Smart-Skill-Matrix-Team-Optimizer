document.addEventListener('DOMContentLoaded', function() {
    // Toggle skill details
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const skillCard = button.closest('.skill-card');
            skillCard.classList.toggle('active');
        });
    });

    // Filter functionality
    const levelFilter = document.getElementById('levelFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const skillCards = document.querySelectorAll('.skill-card');

    function filterSkills() {
        const selectedLevel = levelFilter.value;
        const selectedCategory = categoryFilter.value;

        skillCards.forEach(card => {
            const skillLevel = card.querySelector('.skill-level').textContent.toLowerCase();
            const skillCategory = card.dataset.category;

            const levelMatch = selectedLevel === 'all' || skillLevel === selectedLevel;
            const categoryMatch = selectedCategory === 'all' || skillCategory === selectedCategory;

            if (levelMatch && categoryMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    levelFilter.addEventListener('change', filterSkills);
    categoryFilter.addEventListener('change', filterSkills);

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        skillCards.forEach(card => {
            const skillName = card.querySelector('h3').textContent.toLowerCase();
            const skillDescription = card.querySelector('.skill-description').textContent.toLowerCase();

            if (skillName.includes(searchTerm) || skillDescription.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Add skill form submission
    const addSkillForm = document.getElementById('addSkillForm');
    addSkillForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const skillName = document.getElementById('skillName').value;
        const skillLevel = document.getElementById('skillLevel').value;
        const skillCategory = document.getElementById('skillCategory').value;
        const skillDescription = document.getElementById('skillDescription').value;

        // Create new skill card
        const newSkillCard = createSkillCard(skillName, skillLevel, skillCategory, skillDescription);
        document.querySelector('.skills-grid').appendChild(newSkillCard);

        // Close modal and reset form
        document.getElementById('addSkillModal').style.display = 'none';
        addSkillForm.reset();
    });

    // Function to create a new skill card
    function createSkillCard(name, level, category, description) {
        const card = document.createElement('div');
        card.className = 'skill-card';
        card.dataset.category = category;

        card.innerHTML = `
            <div class="skill-header">
                <div class="skill-title">
                    <h3>${name}</h3>
                    <span class="skill-level ${level}">${level.charAt(0).toUpperCase() + level.slice(1)}</span>
                </div>
                <button class="toggle-btn">
                    <i class="fas fa-chevron-down"></i>
                </button>
            </div>
            <div class="skill-details">
                <div class="skill-progress">
                    <div class="progress-bar">
                        <div class="progress" style="width: ${getProgressWidth(level)}%"></div>
                    </div>
                    <span>${getProgressWidth(level)}%</span>
                </div>
                <p class="skill-description">${description}</p>
                <div class="skill-meta">
                    <span><i class="fas fa-certificate"></i> Not Certified</span>
                    <span><i class="fas fa-clock"></i> New</span>
                </div>
            </div>
        `;

        // Add toggle functionality to the new card
        const toggleBtn = card.querySelector('.toggle-btn');
        toggleBtn.addEventListener('click', () => {
            card.classList.toggle('active');
        });

        return card;
    }

    // Helper function to get progress width based on skill level
    function getProgressWidth(level) {
        switch (level) {
            case 'beginner':
                return 40;
            case 'intermediate':
                return 75;
            case 'expert':
                return 90;
            default:
                return 0;
        }
    }
}); 