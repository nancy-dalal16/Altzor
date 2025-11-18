// On Scroll Animation Initialization
AOS.init();

(function () {
  /**
   * Should this anchor open the site modal?
   * Strictly skip when:
   *  - anchor (or an ancestor) is a Bootstrap toggle (data-bs-toggle="dropdown", .dropdown-toggle)
   *  - anchor (or an ancestor) is inside a dropdown (.dropdown)
   *  - anchor explicitly opts-out via class "no-popup"
   *  - href is a normal navigation (not '#', '', or null)
   */
  function shouldOpenModal(link) {
    if (!link) return false;

    // If another handler already prevented default, don't hijack it
    // (helps when other libraries already handle this click)
    // — but note: defaultPrevented only tells us it was prevented earlier in capture/bubble,
    // so this is a helpful safeguard.
    // (we check at call site as well)

    // Explicit opt-out
    if (link.classList.contains("no-popup")) return false;

    // If this element or any ancestor is a bootstrap/data toggle or dropdown
    if (
      link.closest("[data-bs-toggle]") || // any bootstrap toggle (dropdown, modal, collapse, etc.)
      link.closest(".dropdown") || // inside a dropdown
      link.classList.contains("dropdown-toggle") || // direct class
      link.getAttribute("data-bs-toggle") === "dropdown"
    ) {
      return false;
    }

    // href check
    const href = link.getAttribute("href");
    return href === "#" || href === "" || href === null;
  }

  document.addEventListener("click", function (e) {
    // Only handle primary (left) button clicks
    if (e.button !== 0) return;

    // If some other handler already prevented the event, don't proceed
    if (e.defaultPrevented) return;

    const link = e.target.closest("a");
    if (!link) return;

    if (shouldOpenModal(link)) {
      e.preventDefault();

      const modalElement = document.getElementById("linkPopup");
      if (!modalElement) return;

      try {
        const modal =
          window.bootstrap &&
          bootstrap.Modal &&
          bootstrap.Modal.getOrCreateInstance
            ? bootstrap.Modal.getOrCreateInstance(modalElement)
            : new bootstrap.Modal(modalElement);
        modal.show();
      } catch (err) {
        console.error("Modal initialization failed:", err);
      }
    }
  });
})();
