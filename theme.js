// Dark mode toggle.
// Loaded in <head> so the saved theme is applied before the page draws (no white flash).
(function () {
  const root = document.documentElement;

  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) { /* storage blocked */ }

  // First visit: follow the visitor's system setting
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = saved || (prefersDark ? "dark" : "light");

  document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("theme-toggle");
    if (!button) return;

    function updateButton() {
      const isDark = root.dataset.theme === "dark";
      button.textContent = isDark ? "☀️ Light mode" : "🌙 Dark mode";
      button.setAttribute("aria-pressed", String(isDark));
    }

    button.addEventListener("click", function () {
      root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
      try { localStorage.setItem("theme", root.dataset.theme); } catch (e) { /* storage blocked */ }
      updateButton();
    });

    updateButton();
  });
})();
