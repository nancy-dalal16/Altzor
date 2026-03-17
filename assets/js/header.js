/**
 * assets/js/header.js
 * -------------------------------------------------
 * 1. Mobile menu toggle
 * 2. Mega menu toggle (click to open/close)
 * 3. Small dropdown toggle (Resources)
 * 4. Close on outside click / Escape
 * 5. Active page highlighting
 * -------------------------------------------------
 * NOTE: No JS positioning needed – menus are placed
 * with pure CSS (position:absolute on .headerHolder).
 */

document.addEventListener("DOMContentLoaded", () => {
  const header  = document.querySelector(".header");
  const navbar  = document.querySelector(".navbar");
  const mobileBtn = document.querySelector(".mobile-navbar-btn");

  /* ------------------------------------------------------------------ */
  /* 1. MOBILE MENU TOGGLE                                               */
  /* ------------------------------------------------------------------ */
  if (mobileBtn && header && navbar) {
    mobileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isActive = navbar.classList.toggle("active");
      mobileBtn.classList.toggle("active");
      header.classList.toggle("active");
      document.body.style.overflow = isActive ? "hidden" : "";
    });
  }

  /* ------------------------------------------------------------------ */
  /* 2. MEGA MENU TOGGLE                                                 */
  /* ------------------------------------------------------------------ */
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest(".has-mega > .mega-toggle");
    if (!trigger) return;

    e.preventDefault();
    e.stopPropagation();

    const parentLi = trigger.closest(".has-mega");
    const menu = parentLi.querySelector(":scope > .mega-menu");
    if (!menu) return;

    const isOpen = menu.classList.contains("open");

    closeAllMegaMenus();
    closeAllDropdowns();

    if (!isOpen) {
      menu.classList.add("open");
      trigger.setAttribute("aria-expanded", "true");
      trigger.querySelector(".bx-chevron-down")?.classList.add("open");
    }
  });

  /* ------------------------------------------------------------------ */
  /* 3. SMALL DROPDOWN TOGGLE (Resources)                               */
  /* ------------------------------------------------------------------ */
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest(".navbar-list > .dropdown > a.dropdown-toggle");
    if (!trigger) return;

    e.preventDefault();
    e.stopPropagation();

    const dropdown = trigger.closest(".dropdown");
    const menu = dropdown.querySelector(":scope > .dropdown-menu");
    if (!menu) return;

    const isOpen = menu.classList.contains("show");

    closeAllMegaMenus();
    closeAllDropdowns();

    if (!isOpen) {
      menu.classList.add("show");
      trigger.setAttribute("aria-expanded", "true");
    }
  });

  /* ------------------------------------------------------------------ */
  /* 4. CLOSE ON OUTSIDE CLICK / ESC                                    */
  /* ------------------------------------------------------------------ */
  document.addEventListener("click", (e) => {
    if (e.target.closest(".has-mega") || e.target.closest(".dropdown")) return;
    closeAllMegaMenus();
    closeAllDropdowns();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllMegaMenus();
      closeAllDropdowns();
    }
  });

  /* ------------------------------------------------------------------ */
  /* 5. ACTIVE PAGE HIGHLIGHT                                           */
  /* ------------------------------------------------------------------ */
  (function setActiveNav() {
    let path = window.location.pathname
      .replace(/\/index\.html$/i, "/")
      .replace(/\.html$/i, "")
      .replace(/\/$/, "");
    const page = path.split("/").pop() || "";

    const map = {
      "":                                  "home",
      "index":                             "home",
      "about":                             "about",
      "leadership":                        "lead",
      "why-choose-us":                     "whychoose",
      "product-engineering":               "prodeng",
      "data-engineering":                  "dataeng",
      "platform-based-engineering":        "plateng",
      "technology-offerings":              "techeng",
      "generative-ai-engineering-services":"genai",
      "gcc-as-a-service":                  "gccservice",
      "vc-pe-backed-portfolio-support":    "vcpe",
      "career":                            "career",
    };

    const cls = map[page];
    if (!cls) return;

    const link = document.querySelector(
      `.navbar-list .nav-link.${cls}, .navbar-list .mega-link.${cls}`
    );
    if (!link) return;

    link.classList.add("active");

    const parentMega = link.closest(".has-mega");
    if (parentMega) {
      parentMega.querySelector(":scope > .mega-toggle")?.classList.add("active");
    }
    const parentDrop = link.closest(".nav-item.dropdown");
    if (parentDrop) {
      parentDrop.querySelector(":scope > a.nav-link")?.classList.add("active");
    }
  })();

  /* ------------------------------------------------------------------ */
  /* HELPERS                                                             */
  /* ------------------------------------------------------------------ */
  function closeAllMegaMenus() {
    document.querySelectorAll(".mega-menu.open").forEach((m) => m.classList.remove("open"));
    document.querySelectorAll(".mega-toggle[aria-expanded='true']").forEach((t) => {
      t.setAttribute("aria-expanded", "false");
      t.querySelector(".bx-chevron-down")?.classList.remove("open");
    });
  }

  function closeAllDropdowns() {
    document.querySelectorAll(".dropdown-menu.show").forEach((m) => m.classList.remove("show"));
    document.querySelectorAll(".dropdown-toggle[aria-expanded='true']").forEach((t) =>
      t.setAttribute("aria-expanded", "false")
    );
  }
});
