// Initialize Chart.js
document.addEventListener('DOMContentLoaded', function() {
    // Skill Distribution Chart
    const ctx = document.getElementById('skillChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Beginner', 'Intermediate', 'Expert'],
            datasets: [{
                data: [30, 45, 25],
                backgroundColor: [
                    '#4a90e2',
                    '#2ecc71',
                    '#e74c3c'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Modal Functionality
    const modal = document.getElementById('addSkillModal');
    const addSkillBtn = document.querySelector('.action-btn:first-child');
    const closeBtn = document.querySelector('.close');

    addSkillBtn.addEventListener('click', () => {
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

    // Form Submission
    const addSkillForm = document.getElementById('addSkillForm');
    addSkillForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const skillName = document.getElementById('skillName').value;
        const skillLevel = document.getElementById('skillLevel').value;
        const skillDescription = document.getElementById('skillDescription').value;

        // Here you would typically send this data to your backend
        console.log('New Skill:', {
            name: skillName,
            level: skillLevel,
            description: skillDescription
        });

        // Close modal and reset form
        modal.style.display = 'none';
        addSkillForm.reset();
    });

    // Search Functionality
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        // Here you would typically filter your content based on the search term
        console.log('Searching for:', searchTerm);
    });

    // Smooth Page Transitions
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            
            // Add fade-out animation to current page
            document.body.style.opacity = '0';
            
            // Navigate to new page after animation
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });

    // Add fade-in animation when page loads
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add hover effects to cards
document.querySelectorAll('.stat-card, .performer-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    });
}); 