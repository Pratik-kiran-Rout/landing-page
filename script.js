// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the navbar element
    const navbar = document.getElementById('navbar');
    
    // Get the hamburger menu and nav links
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Get all navigation links
    const navItems = document.querySelectorAll('.nav-links ul li a');
    
    // Add initial class if page is already scrolled on load
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }
    
    // Function to handle scroll events
    function handleScroll() {
        // Add 'scrolled' class to navbar when page is scrolled
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Highlight the current section in the navigation
        updateActiveNavLink();
    }
    
    // Function to toggle mobile menu
    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
    }
    
    // Function to update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('.section');
        
        // Get current scroll position
        let scrollPosition = window.scrollY + 200; // Adding offset for better UX
        
        // Loop through all sections to find the one in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navItems.forEach(item => {
                    item.classList.remove('active');
                });
                
                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-links ul li a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Function to handle smooth scrolling for navigation links
    function smoothScroll(e) {
        e.preventDefault();
        
        // Get the target section id from the href attribute
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Scroll to the target section
        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    }
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Add click event to each navigation link
    navItems.forEach(item => {
        item.addEventListener('click', smoothScroll);
    });
    
    // Call handleScroll on page load to set initial state
    handleScroll();
});