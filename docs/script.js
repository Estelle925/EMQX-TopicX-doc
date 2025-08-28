// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Tab functionality for Quick Start section
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        button.classList.add('active');
        const targetPane = document.getElementById(targetTab);
        if (targetPane) {
            targetPane.classList.add('active');
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.value-card, .feature-card, .arch-section, .demo-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Copy code functionality
function createCopyButton(codeBlock) {
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.innerHTML = '<i class="fas fa-copy"></i>';
    button.title = '复制代码';
    
    button.addEventListener('click', async () => {
        const code = codeBlock.querySelector('code').textContent;
        try {
            await navigator.clipboard.writeText(code);
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.style.color = '#10b981';
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-copy"></i>';
                button.style.color = '';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy code:', err);
        }
    });
    
    return button;
}

// Add copy buttons to code blocks
document.querySelectorAll('.code-block').forEach(codeBlock => {
    const copyButton = createCopyButton(codeBlock);
    codeBlock.style.position = 'relative';
    codeBlock.appendChild(copyButton);
});

// Add CSS for copy button
const style = document.createElement('style');
style.textContent = `
    .copy-button {
        position: absolute;
        top: 12px;
        right: 12px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: #e5e7eb;
        padding: 8px 12px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.875rem;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
    }
    
    .copy-button:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.3);
    }
    
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 20px;
            gap: 16px;
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .nav-links.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style);

// Lazy loading for images (when they are added)
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        }
    });
});

// Observe all images with data-src attribute
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Add loading state for demo images
document.querySelectorAll('.image-placeholder').forEach(placeholder => {
    placeholder.addEventListener('click', () => {
        placeholder.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            <p>图片加载中...</p>
        `;
        
        // Simulate image loading
        setTimeout(() => {
            placeholder.innerHTML = `
                <i class="fas fa-image"></i>
                <p>图片将在此处显示</p>
            `;
        }, 2000);
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll event
const debouncedScrollHandler = debounce(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    }
    
    // Tab navigation for quick start tabs
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const activeTab = document.querySelector('.tab-button.active');
        if (activeTab && document.activeElement === activeTab) {
            e.preventDefault();
            const tabs = Array.from(tabButtons);
            const currentIndex = tabs.indexOf(activeTab);
            let nextIndex;
            
            if (e.key === 'ArrowLeft') {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
            } else {
                nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
            }
            
            tabs[nextIndex].click();
            tabs[nextIndex].focus();
        }
    }
});

// Add focus management for accessibility
tabButtons.forEach(button => {
    button.setAttribute('role', 'tab');
    button.setAttribute('tabindex', '0');
});

tabPanes.forEach(pane => {
    pane.setAttribute('role', 'tabpanel');
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active states
    const firstTab = document.querySelector('.tab-button');
    const firstPane = document.querySelector('.tab-pane');
    
    if (firstTab && firstPane) {
        firstTab.classList.add('active');
        firstPane.classList.add('active');
    }
    
    // Add loading animation to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Add error handling for external resources
window.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        console.warn('Image failed to load:', e.target.src);
    }
});

// Add print styles support
if (window.matchMedia) {
    const mediaQuery = window.matchMedia('print');
    mediaQuery.addListener((mq) => {
        if (mq.matches) {
            // Hide navigation and interactive elements when printing
            document.querySelector('.navbar').style.display = 'none';
            document.querySelectorAll('.copy-button').forEach(btn => {
                btn.style.display = 'none';
            });
        }
    });
}