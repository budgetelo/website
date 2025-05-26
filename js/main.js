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

// Animate features on scroll
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

document.querySelectorAll(".feature-card").forEach((card) => {
  observer.observe(card);
});
