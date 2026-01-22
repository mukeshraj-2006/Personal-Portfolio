'use strict';

/* ------------------------------
   Utility: Toggle class safely
-------------------------------- */
const toggleActive = (el) => {
  if (el) el.classList.toggle("active");
};

/* ------------------------------
   Sidebar toggle
-------------------------------- */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
}

/* ------------------------------
   Page navigation (MAIN FIX)
-------------------------------- */
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navLinks.forEach(link => {
  link.addEventListener("click", function () {
    const target = this.dataset.navLink;

    // Toggle active class on pages
    let pageFound = false;
    pages.forEach(page => {
      if (page.dataset.page === target) {
        page.classList.add("active");
        pageFound = true;
      } else {
        page.classList.remove("active");
      }
    });

    if (pageFound) {
      // Toggle active class on nav links
      navLinks.forEach(l => l.classList.remove("active"));
      this.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      console.warn(`Page not found for target: ${target}`);
    }
  });
});

/* ------------------------------
   Portfolio filter (SAFE)
-------------------------------- */
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterProjects = (value) => {
  filterItems.forEach(item => {
    const category = item.dataset.category;
    item.classList.toggle(
      "active",
      value === "all" || value === category
    );
  });
};

if (select) {
  select.addEventListener("click", () => toggleActive(select));
}

selectItems.forEach(item => {
  item.addEventListener("click", () => {
    const value = item.textContent.toLowerCase();
    if (selectValue) selectValue.textContent = item.textContent;
    toggleActive(select);
    filterProjects(value);
  });
});

let lastBtn = filterBtns[0];
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.textContent.toLowerCase();
    if (selectValue) selectValue.textContent = btn.textContent;

    filterProjects(value);

    if (lastBtn) lastBtn.classList.remove("active");
    btn.classList.add("active");
    lastBtn = btn;
  });
});

/* ------------------------------
   Contact form validation (SAFE)
-------------------------------- */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formBtn) {
  formInputs.forEach(input => {
    input.addEventListener("input", () => {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  });
}
