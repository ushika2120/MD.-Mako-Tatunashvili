const header = document.querySelector(".sub-header");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");
const navTrigger = document.querySelector(".nav-trigger");
const proceduresMenu = document.querySelector(".mega-menu");

const closeMobileMenu = () => {
  navigation.classList.remove("open");
  header.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "მენიუს გახსნა");
  menuButton.textContent = "☰";
};

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "მენიუს დახურვა" : "მენიუს გახსნა");
  menuButton.textContent = isOpen ? "×" : "☰";
});

navTrigger.addEventListener("click", () => {
  if (window.matchMedia("(max-width: 800px)").matches) {
    const isOpen = header.classList.toggle("menu-open");
    navTrigger.setAttribute("aria-expanded", String(isOpen));
    proceduresMenu.setAttribute("aria-hidden", String(!isOpen));
    return;
  }
  const isOpen = header.classList.toggle("menu-open");
  navTrigger.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a, .mega-menu a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

document.addEventListener("click", (event) => {
  if (!header.contains(event.target)) closeMobileMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMobileMenu();
});

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

document.querySelectorAll(".content-grid > *, .benefit, .page-related").forEach((element) => {
  element.setAttribute("data-page-reveal", "");
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll("[data-page-reveal]").forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll("[data-page-reveal]").forEach((element) => element.classList.add("is-visible"));
}
