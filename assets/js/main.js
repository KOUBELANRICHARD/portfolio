// Attendre que le DOM soit complètement chargé
document.addEventListener("DOMContentLoaded", () => {
  // Animation de la navigation lors du défilement
  const navbar = document.querySelector(".navbar");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    // Ajouter/Retirer la classe sticky pour la navigation
    if (currentScroll > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  });

  // Animation d'apparition des sections au défilement
  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Sélectionner toutes les sections pour l'animation
  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });

  // Animation fluide pour la navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Animation des compétences
  const skillBars = document.querySelectorAll(".skill-category");
  skillBars.forEach((skill) => {
    skill.addEventListener("mouseenter", () => {
      skill.classList.add("active");
    });
  });

  // Typage automatique pour le texte d'introduction
  const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = "";
    const timer = setInterval(() => {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  };

  // Animation du texte d'introduction
  const heroDescription = document.querySelector(".hero-description");
  if (heroDescription) {
    typeWriter(
      heroDescription,
      "Passionné par les infrastructures IT et le cloud computing"
    );
  }

  // Gestion du formulaire de contact (si ajouté plus tard)
  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Logique de soumission du formulaire à ajouter
    });
  }

  // Animation des projets au survol
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("hover");
    });
    card.addEventListener("mouseleave", () => {
      card.classList.remove("hover");
    });
  });

  // Bouton retour en haut
  const createScrollTopButton = () => {
    const scrollTopBtn = document.createElement("button");
    scrollTopBtn.id = "scrollTopBtn";
    scrollTopBtn.innerHTML = "↑";
    document.body.appendChild(scrollTopBtn);

    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add("show");
      } else {
        scrollTopBtn.classList.remove("show");
      }
    });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  };

  createScrollTopButton();
});

// Ajouter des styles CSS supplémentaires pour les nouvelles animations
const addStyles = () => {
  const style = document.createElement("style");
  style.textContent = `  
      .scrolled {  
          background: rgba(255, 255, 255, 0.95);  
          backdrop-filter: blur(5px);  
      }  

      section {  
          opacity: 0;  
          transform: translateY(20px);  
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;  
      }  

      section.visible {  
          opacity: 1;  
          transform: translateY(0);  
      }  

      .skill-category {  
          transition: transform 0.3s ease, box-shadow 0.3s ease;  
      }  

      .skill-category.active {  
          transform: translateY(-5px);  
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);  
      }  

      #scrollTopBtn {  
          position: fixed;  
          bottom: 20px;  
          right: 20px;  
          background: var(--secondary-color);  
          color: white;  
          border: none;  
          border-radius: 50%;  
          width: 40px;  
          height: 40px;  
          cursor: pointer;  
          opacity: 0;  
          transition: opacity 0.3s, transform 0.3s;  
          z-index: 1000;  
      }  

      #scrollTopBtn.show {  
          opacity: 1;  
      }  

      #scrollTopBtn:hover {  
          transform: translateY(-3px);  
      }  
  `;
  document.head.appendChild(style);
};

addStyles();
