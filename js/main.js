// Theme toggling functionality
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");

// Check for saved theme preference or default to light
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);
updateThemeIcon(savedTheme);
updateThemeImages(savedTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
  updateThemeImages(newTheme);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
}

function updateThemeImages(theme) {
  const heroImage = document.getElementById("hero-image");
  const benefitImage = document.getElementById("benefit-image");

  if (heroImage) {
    heroImage.src =
      theme === "light"
        ? "images/iphone isometric.png"
        : "images/iphone isometric_dark.png";
  }

  if (benefitImage) {
    benefitImage.src =
      theme === "light"
        ? "images/iphone front_bar charts.png"
        : "images/iphone front_bar charts_dark.png";
  }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add shadow to navigation on scroll
const nav = document.querySelector(".nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    nav.style.boxShadow = "var(--shadow-sm)";
  } else {
    nav.style.boxShadow = "none";
  }
});

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".reveal").forEach((el) => {
  observer.observe(el);
});

// Mobile Menu
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const icon = mobileMenuBtn.querySelector("i");
    if (navLinks.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });
}

// Close menu when clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      const icon = mobileMenuBtn.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });
});
