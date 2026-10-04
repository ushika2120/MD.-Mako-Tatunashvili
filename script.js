const contactLinks = {
  facebook: "https://www.facebook.com/profile.php?id=61591787280473",
  instagram: "https://www.instagram.com/tatunashvili_mako/",
  tiktok: "https://www.tiktok.com/",
  whatsAppNumber: "+995577779952",
  googleMaps: "https://maps.app.goo.gl/9T3Chng8KaHrdHcV8",
  googleMapsEmbed:
    "https://maps.google.com/maps?q=41.8994893,44.6951196&z=17&output=embed",
};

const whatsAppNumber = contactLinks.whatsAppNumber.replace(/\D/g, "");

document.querySelectorAll("[data-contact-link]").forEach((link) => {
  const linkKey = link.dataset.contactLink;
  const url =
    linkKey === "phone"
      ? whatsAppNumber && `https://wa.me/${whatsAppNumber}`
      : contactLinks[linkKey];
  if (url) {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.removeAttribute("aria-disabled");
  } else if (link.dataset.contactLink === "googleMaps") {
    link.href = "#google-map";
  } else {
    link.removeAttribute("href");
    link.setAttribute("aria-disabled", "true");
  }
});

const mapFrame = document.querySelector(".google-map-frame");
const mapPlaceholder = document.querySelector(".map-placeholder");
if (contactLinks.googleMapsEmbed) {
  mapFrame.src = contactLinks.googleMapsEmbed;
  mapFrame.hidden = false;
  mapPlaceholder.hidden = true;
}

const photoSources = window.photoSources;
document.querySelectorAll("[data-photo]").forEach((image) => {
  const source = photoSources[image.dataset.photo];
  if (source) image.src = source;
});

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");
const siteHeader = document.querySelector(".site-header");
const navTrigger = document.querySelector(".nav-trigger");
const proceduresMenu = document.querySelector(".mega-menu");

const updateHeaderState = () => {
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 24);
};

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

const closeProceduresMenu = () => {
  siteHeader.classList.remove("menu-open");
  navTrigger.setAttribute("aria-expanded", "false");
  proceduresMenu.setAttribute("aria-hidden", "true");
};

navTrigger.addEventListener("click", () => {
  if (window.matchMedia("(max-width: 800px)").matches) {
    window.location.hash = "treatments";
    navigation.classList.remove("open");
    siteHeader.classList.remove("mobile-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "მენიუს გახსნა");
    menuButton.textContent = "☰";
    return;
  }

  const isOpen = siteHeader.classList.toggle("menu-open");
  navTrigger.setAttribute("aria-expanded", String(isOpen));
  proceduresMenu.setAttribute("aria-hidden", String(!isOpen));
});

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  siteHeader.classList.toggle("mobile-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "მენიუს დახურვა" : "მენიუს გახსნა",
  );
  menuButton.textContent = isOpen ? "×" : "☰";
});

navigation.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    closeProceduresMenu();
    siteHeader.classList.remove("mobile-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "მენიუს გახსნა");
    menuButton.textContent = "☰";
  }),
);

proceduresMenu.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", closeProceduresMenu),
);

document.addEventListener("click", (event) => {
  if (!siteHeader.contains(event.target)) closeProceduresMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeProceduresMenu();
});

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector(".booking-form").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector(".form-status").textContent =
    "მოთხოვნა არ გაგზავნილა — ჩაწერისთვის ჯერ საჭიროა ექიმის საკონტაქტო არხის დაკავშირება.";
});
