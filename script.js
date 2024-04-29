 // Typing effect
 const intro = document.getElementById('intro');
 const text = "My name is Jiri <br><br>I am <span class='highlight'>Full-Stack <br><br>Web Developer</span>";
 let index = 0;
 let isDeleting = false;

 function type() {
   let currentText = text.slice(0, index);

   if (isDeleting) {
     currentText = text.slice(0, index - 1);
     index--;
   } else {
     currentText = text.slice(0, index + 1);
     index++;
   }

   intro.innerHTML = currentText;
   

   // When reaching the end, start deleting
   if (index === text.length + 1) {
     isDeleting = true;
   }

   // When done deleting, reset to typing
   if (index === 0) {
     isDeleting = false;
   }

   // Speed up the typing and deleting
   const typingSpeed = 150;
   const deleteSpeed = 40;
   const delay = isDeleting ? deleteSpeed : typingSpeed;

   setTimeout(type, delay);
 }

// Start typing effect
setTimeout(type, 200);


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




