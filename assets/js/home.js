// On Scroll Animation Intialization
AOS.init();
(function () {
  function shouldOpenModal(link) {
    // Skip explicit opt-outs and dropdown toggles
    if (link.classList.contains("no-popup")) return false;
    if (link.matches('[data-bs-toggle="dropdown"]')) return false;

    const href = link.getAttribute("href");
    return href === "#" || href === "" || href === null;
  }

  document.addEventListener("click", function (e) {
    const link = e.target.closest("a");
    if (!link) return;

    if (shouldOpenModal(link)) {
      e.preventDefault();
      const el = document.getElementById("linkPopup");
      if (!el) return;
      // Safe for any Bootstrap 5.x
      const modal =
        bootstrap.Modal && bootstrap.Modal.getOrCreateInstance
          ? bootstrap.Modal.getOrCreateInstance(el)
          : new bootstrap.Modal(el);
      modal.show();
    }
  });
})();
