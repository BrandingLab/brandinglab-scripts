// ============================================
// BRANDINGLAB - Two-Step Scaling Navigation
// Source: Osmo Supply
// ============================================

function initTwostepScalingNavigation() {
  const navElement = document.querySelector("[data-twostep-nav]");
  const navStatusEl = document.querySelector("[data-nav-status]");

  if (!navElement || !navStatusEl) return;

  const setNavStatus = (status) => {
    navStatusEl.setAttribute("data-nav-status", status);
  };

  const isActive = () =>
    navStatusEl.getAttribute("data-nav-status") === "active";

  const openNav = () => {
    setNavStatus("active");
    // If you use Lenis, uncomment to pause scroll:
    // lenis?.stop();
  };

  const closeNav = () => {
    setNavStatus("not-active");
    // If you use Lenis, uncomment to resume scroll:
    // lenis?.start();
  };

  const toggleNav = () => (isActive() ? closeNav() : openNav());

  // Toggle buttons
  document.querySelectorAll('[data-nav-toggle="toggle"]').forEach((btn) => {
    btn.addEventListener("click", toggleNav);
  });

  // Close buttons
  document.querySelectorAll('[data-nav-toggle="close"]').forEach((btn) => {
    btn.addEventListener("click", closeNav);
  });

  // ESC closes nav
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isActive()) closeNav();
  });
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initTwostepScalingNavigation();
});
