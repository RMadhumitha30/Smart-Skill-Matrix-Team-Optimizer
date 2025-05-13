document.addEventListener('DOMContentLoaded', function() {
    // Initialize Technology Usage Chart
    const ctx = document.getElementById('techChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Java', 'Spring', 'React', 'Node.js', 'Vue.js', 'Angular'],
            datasets: [{
                label: 'Number of Projects',
                data: [3, 2, 4, 3, 2, 1],
                backgroundColor: [
                    '#4a90e2',
                    '#2ecc71',
                    '#e74c3c',
                    '#f1c40f',
                    '#9b59b6',
                    '#1abc9c'
                ],
                borderWidth: 0,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });

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

    // Form submission
    const addProjectForm = document.getElementById('addProjectForm');
    addProjectForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const projectName = document.getElementById('projectName').value;
        const projectDescription = document.getElementById('projectDescription').value;
        const projectTechnology = Array.from(document.getElementById('projectTechnology').selectedOptions)
            .map(option => option.value);
        const projectDeadline = document.getElementById('projectDeadline').value;
        const projectAssignee = document.getElementById('projectAssignee').value;

        // Here you would typically send this data to your backend
        console.log('New Project:', {
            name: projectName,
            description: projectDescription,
            technology: projectTechnology,
            deadline: projectDeadline,
            assignee: projectAssignee
        });

        // Close modal and reset form
        modal.style.display = 'none';
        addProjectForm.reset();
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const tableRows = document.querySelectorAll('tbody tr');

        tableRows.forEach(row => {
            const projectName = row.cells[0].textContent.toLowerCase();
            const technology = row.cells[2].textContent.toLowerCase();
            const assignee = row.cells[4].textContent.toLowerCase();

            if (projectName.includes(searchTerm) || 
                technology.includes(searchTerm) || 
                assignee.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    // Add hover effects to summary cards
    document.querySelectorAll('.summary-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        });
    });
}); 