// Theme — the initial theme is set by the inline script in <head>
// (saved preference, otherwise the system setting).
const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");

function getSavedTheme() {
  try {
    return localStorage.getItem("theme");
  } catch (e) {
    return null;
  }
}

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
  }
}

applyTheme(root.getAttribute("data-theme") || "light");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const newTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(newTheme);
    try {
      localStorage.setItem("theme", newTheme);
    } catch (e) {}
  });
}

// Follow the system setting until the user picks a theme explicitly
if (window.matchMedia) {
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystemChange = (e) => {
    if (!getSavedTheme()) applyTheme(e.matches ? "dark" : "light");
  };
  if (systemDark.addEventListener) {
    systemDark.addEventListener("change", onSystemChange);
  } else if (systemDark.addListener) {
    systemDark.addListener(onSystemChange);
  }
}

// Mobile menu
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

function setMenuOpen(open) {
  if (!mobileMenuBtn || !navLinks) return;
  navLinks.classList.toggle("active", open);
  mobileMenuBtn.setAttribute("aria-expanded", String(open));
  mobileMenuBtn.setAttribute("aria-label", open ? "Close menu" : "Menu");
}

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener("click", () => {
    setMenuOpen(!navLinks.classList.contains("active"));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("active")) {
      setMenuOpen(false);
      mobileMenuBtn.focus();
    }
  });

  document.addEventListener("click", (e) => {
    if (
      navLinks.classList.contains("active") &&
      !navLinks.contains(e.target) &&
      !mobileMenuBtn.contains(e.target)
    ) {
      setMenuOpen(false);
    }
  });
}

// Smooth scrolling for in-page links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const id = this.getAttribute("href");
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", id);
    }
  });
});

// Elevate the floating navigation once the page is scrolled
const nav = document.querySelector(".nav");
if (nav) {
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// Reveal elements on scroll
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("animate-in"));
}

// FAQ accordion (faq page) — one answer open at a time
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question button");
  if (!button) return;
  button.addEventListener("click", () => {
    const isActive = item.classList.contains("active");
    faqItems.forEach((other) => {
      other.classList.remove("active");
      const otherButton = other.querySelector(".faq-question button");
      if (otherButton) otherButton.setAttribute("aria-expanded", "false");
    });
    if (!isActive) {
      item.classList.add("active");
      button.setAttribute("aria-expanded", "true");
    }
  });
});
