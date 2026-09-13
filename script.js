document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section");
  const themeToggleBtn = document.getElementById("theme-toggle");
  
  // Safely find the icon inside the button or fallback to the button itself
  const themeIcon = themeToggleBtn ? (themeToggleBtn.querySelector("i") || themeToggleBtn) : null;

  /* ==========================================================================
     1. DARK MODE TOGGLE & LOCAL STORAGE
     ========================================================================== */
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  // Determine initial theme: saved preference > system preference > default to light
  const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

  // Apply initial theme
  document.documentElement.setAttribute("data-theme", initialTheme);
  updateToggleIcon(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateToggleIcon(newTheme);
    });
  }

  function updateToggleIcon(theme) {
    if (!themeIcon) return;
    
    if (theme === "dark") {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    } else {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    }
  }

  /* ==========================================================================
     2. STICKY NAVBAR SHADOW ON SCROLL
     ========================================================================== */
  const handleScrollHeader = () => {
    if (!navbar) return;
    if (window.scrollY > 20) {
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)";
    } else {
      navbar.style.boxShadow = "none";
    }
  };

  /* ==========================================================================
     3. SCROLLSPY (ACTIVE LINK HIGHLIGHTING)
     ========================================================================== */
  const handleScrollSpy = () => {
    let currentSectionId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  };

  /* ==========================================================================
     4. ATTACH SCROLL EVENT LISTENERS
     ========================================================================== */
  window.addEventListener("scroll", () => {
    handleScrollHeader();
    handleScrollSpy();
  });
});