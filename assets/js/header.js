// function toggleButton() {
//   const mobileNavBtn = document.querySelector(".mobile-navbar-btn");
//   const headerNav = document.querySelector(".header");
//   const mobileList = document.querySelector(".mobile-list");

//   const toggleNavbar = () => {
//     const isActive = headerNav.classList.toggle("active");
//     document.body.style.overflow = isActive ? "hidden" : "auto";
//   };

//   mobileNavBtn.addEventListener("click", toggleNavbar);
//   mobileList.addEventListener("click", toggleNavbar);
// }

// function toggleButton() {
//   const navbar = document.querySelector(".navbar");
//   const headerNav = document.querySelector(".header");
//   const mobileBtn = document.querySelector(".mobile-navbar-btn");
//   const isActive = headerNav.classList.toggle("active");
//   document.body.style.overflow = isActive ? "hidden" : "auto";

//   navbar.classList.toggle("active");
//   mobileBtn.classList.toggle("active");
// }

function toggleButton() {
  const navbar = document.querySelector(".navbar");
  const headerNav = document.querySelector(".header");
  const mobileBtn = document.querySelector(".mobile-navbar-btn");

  if (navbar && headerNav && mobileBtn) {
    const isActive = headerNav.classList.toggle("active");
    navbar.classList.toggle("active");
    mobileBtn.classList.toggle("active");
    document.body.style.overflow = isActive ? "hidden" : "auto";
  }
}

function toggleDropdown(event) {
  event.preventDefault(); // Prevent default link behavior
  const dropdown = event.target.closest(".dropdown");
  if (dropdown) {
    const menu = dropdown.querySelector(".dropdown-menu");
    if (menu) {
      menu.classList.toggle("show");
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const mobileBtn = document.querySelector(".mobile-navbar-btn");
  if (mobileBtn) {
    mobileBtn.addEventListener("click", toggleButton);
  }

  // Add event listeners for dropdown toggles
  const dropdownLinks = document.querySelectorAll(
    ".navbar-list .dropdown .navbar-link"
  );
  dropdownLinks.forEach((link) => {
    link.addEventListener("click", toggleDropdown);
  });
});
