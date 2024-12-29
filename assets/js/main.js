// Attendre que le DOM soit complètement chargé
document.addEventListener("DOMContentLoaded", () => {
  // Initialisation des différents composants
  initNavigation();
  initSkillsAnimation();
  initProjectFilters();
  initTypingEffect();
  initScrollAnimations();
  initContactForm();
  initThemeToggle();
});

// Navigation et Header
function initNavigation() {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-links a");
  let lastScroll = 0;

  // Gestion du scroll pour la navigation
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    // Ajout/Suppression de la classe scrolled
    if (currentScroll > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Navigation auto-masquante
    if (currentScroll > lastScroll && currentScroll > 500) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }
    lastScroll = currentScroll;
  });

  // Navigation smooth scroll
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Animation des compétences
function initSkillsAnimation() {
  const skillCategories = document.querySelectorAll(".skill-category");
  const progressBars = document.querySelectorAll(".progress-fill");

  const animateSkill = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("skill-category")) {
          entry.target.classList.add("animate");
        } else if (entry.target.classList.contains("progress-fill")) {
          const targetWidth = entry.target.getAttribute("data-width");
          entry.target.style.width = targetWidth + "%";
        }
        observer.unobserve(entry.target);
      }
    });
  };

  const skillObserver = new IntersectionObserver(animateSkill, {
    threshold: 0.2,
  });

  skillCategories.forEach((skill) => skillObserver.observe(skill));
  progressBars.forEach((bar) => skillObserver.observe(bar));
}

// Effet de frappe pour le texte d'introduction
function initTypingEffect() {
  const heroDescription = document.querySelector(".hero-description");
  if (!heroDescription) return;

  const text = heroDescription.textContent;
  heroDescription.textContent = "";
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      heroDescription.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }

  typeWriter();
}

// Animations au scroll
function initScrollAnimations() {
  const sections = document.querySelectorAll("section");

  const fadeInOnScroll = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  };

  const sectionObserver = new IntersectionObserver(fadeInOnScroll, {
    threshold: 0.1,
  });

  sections.forEach((section) => {
    section.classList.add("fade-in");
    sectionObserver.observe(section);
  });
}

// Filtres de projets
function initProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.style.display = "block";
          setTimeout(() => card.classList.add("visible"), 10);
        } else {
          card.classList.remove("visible");
          setTimeout(() => (card.style.display = "none"), 300);
        }
      });
    });
  });
}

// Formulaire de contact
function initContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Envoi en cours...";
    submitBtn.disabled = true;

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        showNotification("Message envoyé avec succès!", "success");
        form.reset();
      } else {
        throw new Error("Erreur lors de l'envoi");
      }
    } catch (error) {
      showNotification("Erreur lors de l'envoi du message.", "error");
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Système de notifications
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Toggle Theme (Clair/Sombre)
function initThemeToggle() {
  const themeToggle = document.querySelector("#theme-toggle");
  if (!themeToggle) return;

  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);

  themeToggle.addEventListener("click", () => {
    const newTheme =
      document.documentElement.getAttribute("data-theme") === "light"
        ? "dark"
        : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    themeToggle.setAttribute(
      "aria-label",
      `Switch to ${newTheme === "light" ? "dark" : "light"} mode`
    );
  });
}

// Gestion des erreurs globales
window.addEventListener("error", (e) => {
  console.error("Une erreur est survenue:", e.error);
  showNotification("Une erreur est survenue.", "error");
});

// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(
      `Performance Metric - ${entry.name}: ${entry.startTime.toFixed(2)}ms`
    );
  }
});

performanceObserver.observe({
  entryTypes: ["paint", "largest-contentful-paint"],
});
