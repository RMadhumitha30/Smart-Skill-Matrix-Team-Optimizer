// Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Active link highlighting
    const currentLocation = location.href;
    const menuItems = document.querySelectorAll('.nav-link');
    menuItems.forEach(item => {
        if (item.href === currentLocation) {
            item.classList.add('active');
        }
    });
});

// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Quick view functionality for flowers
document.querySelectorAll('.quick-view-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const card = e.target.closest('.flower-card');
        const image = card.querySelector('.flower-image').src;
        const name = card.querySelector('h3').textContent;
        const price = card.querySelector('.price').textContent;
        
        document.getElementById('modalFlowerImage').src = image;
        document.getElementById('modalFlowerName').textContent = name;
        document.getElementById('modalFlowerPrice').textContent = price;
        
        openModal('quickViewModal');
    });
});

// Form validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !message) {
            showToast('Please fill in all required fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showToast('Message sent successfully!', 'success');
        contactForm.reset();
    });
}

// Toast notifications
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Image lazy loading
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Quantity selector
document.querySelectorAll('.quantity-selector').forEach(selector => {
    const minusBtn = selector.querySelector('.btn-quantity:first-child');
    const plusBtn = selector.querySelector('.btn-quantity:last-child');
    const input = selector.querySelector('input');
    
    minusBtn.addEventListener('click', () => {
        const currentValue = parseInt(input.value);
        if (currentValue > 1) {
            input.value = currentValue - 1;
        }
    });
    
    plusBtn.addEventListener('click', () => {
        const currentValue = parseInt(input.value);
        if (currentValue < 99) {
            input.value = currentValue + 1;
        }
    });
});

// Search functionality
const searchInput = document.querySelector('.search-box input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const items = document.querySelectorAll('.flower-card, .order-row');
        
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });
}

// Filter functionality
document.querySelectorAll('.filter-options select').forEach(select => {
    select.addEventListener('change', () => {
        // Implement filter logic based on selected values
        const category = document.querySelector('select[name="category"]').value;
        const priceRange = document.querySelector('select[name="price-range"]').value;
        const sortBy = document.querySelector('select[name="sort-by"]').value;
        
        // Apply filters to items
        filterItems(category, priceRange, sortBy);
    });
});

function filterItems(category, priceRange, sortBy) {
    const items = document.querySelectorAll('.flower-card, .order-row');
    
    items.forEach(item => {
        // Implement filtering logic
        // This is a placeholder for the actual filtering implementation
        console.log('Filtering items...');
    });
}

// Add to cart functionality
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const card = e.target.closest('.flower-card');
        const name = card.querySelector('h3').textContent;
        const price = card.querySelector('.price').textContent;
        
        // Add to cart logic
        showToast(`${name} added to cart!`, 'success');
    });
});

// Initialize tooltips
document.querySelectorAll('[title]').forEach(element => {
    element.addEventListener('mouseenter', (e) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = e.target.title;
        document.body.appendChild(tooltip);
        
        const rect = e.target.getBoundingClientRect();
        tooltip.style.top = `${rect.bottom + 5}px`;
        tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
    });
    
    element.addEventListener('mouseleave', () => {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
}); 