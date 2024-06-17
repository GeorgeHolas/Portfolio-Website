 // Typing effect
const intro = document.getElementById('intro');
const text = "My name is Jiri <br><br>I am <span class='highlight'>Full-Stack <br><br>Web Developer</span>";
let index = 0;
let isDeleting = false;

// Constant variables moved outside the function
const typingSpeed = 110;
const deleteSpeed = 20;

function type() {
  let currentText;
  
  // Cache the text length outside the if-else condition
  const textLength = text.length;

  if (isDeleting) {
    currentText = text.slice(0, index - 1);
    index--;
  } else {
    currentText = text.slice(0, index + 1);
    index++;
  }

  intro.innerHTML = currentText;

  // Update the delay based on the current action
  const delay = isDeleting ? deleteSpeed : typingSpeed;

  // When reaching the end or start, toggle isDeleting
  if (index === textLength + 1) {
    isDeleting = true;
  } else if (index === 0) {
    isDeleting = false;
  }

  // Call type function recursively after delay
  setTimeout(type, delay);
}

// Start typing effect
setTimeout(type, 900);

// About Me animation 
let firstScroll = true;
let delayTimeout;

window.addEventListener('scroll', () => {
  if (firstScroll || !delayTimeout) {
    document.querySelector('.AboutMe').classList.remove('hidden');

    // Set flag to not show again
    firstScroll = false; 

    // Set a timeout for re-showing after 5 seconds
    delayTimeout = setTimeout(() => {
      delayTimeout = null;
    }, 5000); 
  }
});

window.addEventListener('load', () => {
  firstScroll = true;
});


// NavBar animations 
// Select navigation links
const navLinks = document.querySelectorAll('.MainBar nav a');

// Add click event to each link 
navLinks.forEach(link => {

  link.addEventListener('click', e => {

    // Prevent default link behavior
    e.preventDefault();

    // Get href attribute and find target element
    const targetId = link.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    // Scroll to target element
    targetElement.scrollIntoView({
      behavior: 'smooth'
    });

  });

});

// Animation of skill icons on scroll
// Function to check if an element is in view
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to add animation class
function animateSkillIcons() {
  const skillIcons = document.querySelectorAll('.SkillIcons img');
  
  skillIcons.forEach(icon => {
    if (isInViewport(icon)) {
      icon.classList.add('skill-icon-appear');
    }
  });
}

// Callback function for Intersection Observer
function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('skill-icon-appear');
      observer.unobserve(entry.target);
    }
  });
}

// Create Intersection Observer
const observer = new IntersectionObserver(handleIntersection, {
  root: null,
  rootMargin: '0px',
  threshold: 1.0
});

// Observe each skill icon
const skillIcons = document.querySelectorAll('.SkillIcons img');
skillIcons.forEach(icon => {
  observer.observe(icon);
});

// Call the initial check when the page loads
animateSkillIcons();

// Listen for scroll events to trigger animation
window.addEventListener('scroll', animateSkillIcons);




