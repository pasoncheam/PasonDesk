// Dark mode toggle functionality
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    html.classList.add('dark');
    updateThemeIcon(true);
} else {
    html.classList.remove('dark');
    updateThemeIcon(false);
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    const isDark = !html.classList.contains('dark');
    html.classList.toggle('dark');
    
    // Save preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
});

// Update theme icon
function updateThemeIcon(isDark) {
    themeToggle.innerHTML = isDark ? 
        `<svg class="w-5 h-5 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>` :
        `<svg class="w-5 h-5 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
        </svg>`;
}

// Mobile menu functionality
const navLinks = document.querySelector('.flex.items-center.space-x-4');
const menuButton = document.createElement('button');
menuButton.className = 'md:hidden p-2 rounded-lg bg-gray-200 dark:bg-gray-700';
menuButton.innerHTML = `
    <svg class="w-6 h-6 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
`;

// Insert menu button before nav links
navLinks.parentNode.insertBefore(menuButton, navLinks);

// Toggle mobile menu
menuButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuButton.contains(e.target)) {
        navLinks.classList.remove('active');
    }
}); 