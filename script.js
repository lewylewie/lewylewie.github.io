// Apply a saved theme early so the page keeps the visitor's preference.
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light" || savedTheme === "dark") {
  document.documentElement.dataset.theme = savedTheme;
}

// Toggle between the CSS light and dark theme variables.
const themeToggle = document.querySelector(".theme-toggle");

function updateThemeButton() {
  const isLight = document.documentElement.dataset.theme === "light";
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
  themeToggle.setAttribute("aria-pressed", String(isLight));
}

updateThemeButton();

themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem("portfolio-theme", nextTheme);
  updateThemeButton();
});

// Filter project cards by category; new cards only need the matching data-category value.
const projectFilters = document.querySelectorAll(".project-filter");
const projectCards = document.querySelectorAll(".project-card[data-category]");
const projectResults = document.querySelector(".project-results");

function showProjects(category, categoryLabel) {
  let visibleCount = 0;

  projectCards.forEach((card) => {
    const isVisible = category === "all" || card.dataset.category === category;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  projectResults.textContent = category === "all"
    ? `Showing all ${visibleCount} projects.`
    : `Showing ${visibleCount} ${categoryLabel} projects.`;
}

projectFilters.forEach((filter) => {
  filter.addEventListener("click", () => {
    projectFilters.forEach((button) => {
      const isActive = button === filter;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    showProjects(filter.dataset.filter, filter.textContent.trim());
  });
});

showProjects("all", "all");

// Keep the footer year current without requiring an annual edit.
document.querySelector("#current-year").textContent = String(new Date().getFullYear());
