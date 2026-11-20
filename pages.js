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

const services = [
  {
    slug: "injections",
    title: "ინექციები",
    href: "injections.html",
    image: "../assets/Cosmetology by AI.jpg",
    category: "ესთეტიკის ცენტრი",
  },
  {
    slug: "laser",
    title: "ლაზერი",
    href: "laser.html",
    image: "../assets/laser.jpg",
    category: "ესთეტიკის ცენტრი",
  },
  {
    slug: "cosmetology",
    title: "კოსმეტოლოგია",
    href: "cosmetology.html",
    image: "../assets/cosmetic(2).jpg",
    category: "ესთეტიკის ცენტრი",
  },
  {
    slug: "stylist",
    title: "სტილისტი",
    href: "stylist.html",
    image: "../assets/hear stilist.jpg",
    category: "სილამაზის ცენტრი",
  },
  {
    slug: "manicure-pedicure",
    title: "მანიკური და პედიკური",
    href: "manicure-pedicure.html",
    image: "../assets/Nails Inspiratio.jpg",
    category: "სილამაზის ცენტრი",
  },
  {
    slug: "brows-lashes",
    title: "წარბები და წამწამები",
    href: "brows-lashes.html",
    image: "../assets/eye(2).jpg",
    category: "სილამაზის ცენტრი",
  },
  {
    slug: "tattoo-master",
    title: "ტატუს მასტერი",
    href: "tattoo-master.html",
    image: "../assets/tattoo.jpg",
    category: "სილამაზის ცენტრი",
  },
];

const relatedLinks = document.querySelector(".related-links");
if (relatedLinks) {
  const currentService = services.find((service) => document.body.classList.contains(service.slug));
  const relatedServices = services.filter((service) => service !== currentService);

  relatedLinks.replaceChildren(
    ...relatedServices.map((service) => {
      const link = document.createElement("a");
      link.className = "related-card";
      link.href = service.href;

      const image = document.createElement("img");
      image.className = `related-card-image related-card-image--${service.slug}`;
      image.src = service.image;
      image.alt = "";
      image.loading = "lazy";

      const details = document.createElement("span");
      details.className = "related-card-details";

      const category = document.createElement("span");
      category.className = "related-card-category";
      category.textContent = service.category;

      const title = document.createElement("span");
      title.className = "related-card-title";
      title.textContent = service.title;

      const arrow = document.createElement("span");
      arrow.className = "related-card-arrow";
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = "↗";

      details.append(category, title, arrow);
      link.append(image, details);
      return link;
    }),
  );
}

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
