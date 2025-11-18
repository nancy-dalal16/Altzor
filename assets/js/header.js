/**
 * assets/js/header.js
 * -------------------------------------------------
 * 1. Mobile menu toggle
 * 2. Dropdown menus (click-to-toggle) – event delegation
 * 3. Close on outside click / Escape key
 * -------------------------------------------------
 * Works with header.html loaded via <div include="header.html"></div>
 */

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const navbar = document.querySelector(".navbar");
  const mobileBtn = document.querySelector(".mobile-navbar-btn");

  /* ----------------------------------------
   * 1. MOBILE MENU TOGGLE
   * ---------------------------------------- */
  if (mobileBtn && header && navbar) {
    mobileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isActive = header.classList.toggle("active");
      navbar.classList.toggle("active");
      mobileBtn.classList.toggle("active");
      document.body.style.overflow = isActive ? "hidden" : "";
    });
  }
  /* ------------------------------------------------------------------ */
  /* 2. DROPDOWN – CLICK TO TOGGLE (delegated)                         */
  /* ------------------------------------------------------------------ */
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest(".navbar-list .dropdown > a.navbar-link");
    if (!trigger) return;

    e.preventDefault(); // stop navigation
    const dropdown = trigger.closest(".dropdown");
    const menu = dropdown.querySelector(".dropdown-menu");
    if (!menu) return;

    const isOpen = menu.classList.contains("show");

    // Close every open dropdown
    document
      .querySelectorAll(".dropdown-menu.show")
      .forEach((m) => m.classList.remove("show"));

    // Re-open the clicked one (unless it was already open)
    if (!isOpen) menu.classList.add("show");
  });

  /* ------------------------------------------------------------------ */
  /* 3. CLOSE WHEN CLICKING OUTSIDE                                    */
  /* ------------------------------------------------------------------ */
  document.addEventListener("click", (e) => {
    if (e.target.closest(".dropdown")) return;
    document
      .querySelectorAll(".dropdown-menu.show")
      .forEach((m) => m.classList.remove("show"));
  });

  /* ------------------------------------------------------------------ */
  /* 4. OPTIONAL: CLOSE WITH ESC KEY                                   */
  /* ------------------------------------------------------------------ */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document
        .querySelectorAll(".dropdown-menu.show")
        .forEach((m) => m.classList.remove("show"));
    }
  });
});
