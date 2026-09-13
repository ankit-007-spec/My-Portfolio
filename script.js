document.addEventListener("DOMContentLoaded", () => {
  // Experience dataset
  const expData = {
    gsa: {
      title: "Google Student Ambassador",
      org: "Google Student Ambassadors (India)",
      category: "Campus Leadership",
      desc: "Leading on-campus initiatives to foster a collaborative technical community, providing peer guidance in C++, data fundamentals, and Google developer technologies.",
      highlights: [
        "Organized technical awareness sessions on campus",
        "Mentored peers in algorithm fundamentals and development",
      ],
    },
    "1m1b": {
      title: "Green Skills & Applied AI Intern",
      org: "1M1B (1 Million for 1 Billion)",
      category: "Experiential Learning",
      desc: "Completed 70+ hours of experiential project work designing applied AI models for climate action and environmental monitoring.",
      highlights: [
        "Constructed predictive models for environmental evaluation",
        "Developed actionable sustainability frameworks",
      ],
    },
    trainer: {
      title: "AI Trainer & Coach",
      org: "Technical Training (Uttar Pradesh)",
      category: "Mentorship",
      desc: "Conducted hands-on training sessions introducing foundational machine learning concepts, ethical AI principles, and pythonic implementation.",
      highlights: [
        "Delivered technical presentations on machine learning basics",
        "Guided students on real-world tool application",
      ],
    },
    simulations: {
      title: "Engineering & Analytics Simulations",
      org: "Deloitte & Commonwealth Bank (Forage)",
      category: "Job Simulations",
      desc: "Executed practical forensic data interpretation tasks for Deloitte and built backend microservices utilizing C#/.NET, MongoDB, and Postman for Commonwealth Bank.",
      highlights: [
        "Performed structured data interpretation and analysis",
        "Configured backend API endpoints and testing suites",
      ],
    },
  };

  // Experience Card Switching
  const expCards = document.querySelectorAll(".exp-card");
  const panelTitle = document.getElementById("panel-title");
  const panelOrg = document.getElementById("panel-org");
  const panelCategory = document.getElementById("panel-category");
  const panelDesc = document.getElementById("panel-desc");
  const panelHighlights = document.getElementById("panel-highlights");

  expCards.forEach((card) => {
    card.addEventListener("click", () => {
      expCards.forEach((c) => c.classList.remove("active"));
      card.classList.add("active");

      const key = card.getAttribute("data-exp");
      const data = expData[key];
      if (!data) return;

      panelTitle.textContent = data.title;
      panelOrg.textContent = data.org;
      panelCategory.textContent = data.category;
      panelDesc.textContent = data.desc;

      panelHighlights.innerHTML = "";
      data.highlights.forEach((text) => {
        const item = document.createElement("div");
        item.className = "highlight-item";
        item.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${text}`;
        panelHighlights.appendChild(item);
      });
    });
  });

  // One-Click Email Clipboard Copy with Feedback
  const copyEmailBtn = document.getElementById("copy-email-btn");
  const copyHintPill = document.getElementById("copy-hint-pill");

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", async () => {
      const email = "aggiri5634@gmail.com";
      try {
        await navigator.clipboard.writeText(email);
        copyHintPill.innerHTML =
          '<i class="fa-solid fa-check"></i> Copied to Clipboard!';
        copyHintPill.style.color = "#10b981";
        setTimeout(() => {
          copyHintPill.innerHTML =
            '<i class="fa-regular fa-copy"></i> Click to Copy';
          copyHintPill.style.color = "";
        }, 2500);
      } catch (err) {
        window.location.href = `mailto:${email}`;
      }
    });
  }

  // Active Navbar scroll spy
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-item");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPos = window.pageYOffset + 140;

    sections.forEach((section) => {
      if (
        scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});
