const contactLinks = {
  facebook: "https://www.facebook.com/profile.php?id=61591787280473",
  instagram: "https://www.instagram.com/tatunashvili_mako/",
  tiktok: "https://www.tiktok.com/",
  whatsAppNumber: "+995577779952",
  googleMaps: "https://maps.app.goo.gl/arwboGLar9Eo3XF78",
  googleMapsEmbed:
    "https://maps.google.com/maps?q=41.8994893,44.6951196&z=17&output=embed",
};

const whatsAppNumber = contactLinks.whatsAppNumber.replace(/\D/g, "");
const bookingStatus = document.querySelector(".form-status");

const buildBookingWhatsAppUrl = (formData) => {
  const name = (formData.get("name") || "").trim();
  const phone = (formData.get("phone") || "").trim();
  const service = (formData.get("service") || "").trim();
  const message = (formData.get("message") || "").trim();

  const details = [
    `სახელი: ${name || "არ არის მოწოდებული"}`,
    `ტელეფონი: ${phone || "არ არის მოწოდებული"}`,
    `სერვისი: ${service || "არ არის მოწოდებული"}`,
    message ? `შეტყობინება: ${message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const encodedText = encodeURIComponent(
    `მოგესალმებით! მჭირდება კონსულტაციის დაჯავშნა.\n\n${details}`,
  );

  return `https://wa.me/${whatsAppNumber}?text=${encodedText}`;
};

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

const scrollProgress = document.querySelector(".scroll-progress span");
const parallaxImages = [
  ...document.querySelectorAll(".doctor-photo > img, .results-photo > img"),
];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealTargets = [
  [".intro-grid > *", ""],
  [".procedure-heading", ""],
  [".procedure-card", ""],
  [".doctor-photo", "left"],
  [".doctor-copy", "right"],
  [".results-photo", "left"],
  [".results-copy", "right"],
  [".feature-heading", ""],
  [".feature-story", ""],
  [".approach-head > *", ""],
  [".step", ""],
];

revealTargets.forEach(([selector, direction]) => {
  document.querySelectorAll(selector).forEach((element, index) => {
    element.setAttribute("data-reveal", direction);
    element.setAttribute(
      "data-reveal-delay",
      String(Math.min(index % 3 + 1, 3)),
    );
  });
});

if (!reduceMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -45px" },
  );

  document.querySelectorAll("[data-reveal]").forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  document.querySelectorAll("[data-reveal]").forEach((element) => {
    element.classList.add("is-visible");
  });
}

let scrollFrame;
const updateScrollEffects = () => {
  const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
  const progress =
    scrollMax > 0 ? Math.min(window.scrollY / scrollMax, 1) : 0;
  if (scrollProgress) {
    scrollProgress.style.transform = `scaleX(${progress})`;
  }

  if (!reduceMotion) {
    parallaxImages.forEach((image) => {
      const rect = image.parentElement.getBoundingClientRect();
      const viewportProgress =
        (window.innerHeight - rect.top) /
        (window.innerHeight + rect.height);
      const offset = Math.max(-18, Math.min(18, (viewportProgress - 0.5) * 36));
      image.style.transform = `scale(1.08) translateY(${offset}px)`;
    });
  }

  scrollFrame = undefined;
};

window.addEventListener(
  "scroll",
  () => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(updateScrollEffects);
  },
  { passive: true },
);
updateScrollEffects();

document.querySelectorAll(".brand, .hero-logo-link").forEach((brandLink) => {
  brandLink.addEventListener("click", (event) => {
    event.preventDefault();
    closeProceduresMenu();
    navigation.classList.remove("open");
    siteHeader.classList.remove("mobile-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "მენიუს გახსნა");
    menuButton.textContent = "☰";
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

const closeProceduresMenu = () => {
  siteHeader.classList.remove("menu-open");
  navTrigger.setAttribute("aria-expanded", "false");
  proceduresMenu.setAttribute("aria-hidden", "true");
};

const closeMobileMenu = () => {
  navigation.classList.remove("open");
  siteHeader.classList.remove("mobile-open");
  closeProceduresMenu();
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "მენიუს გახსნა");
  menuButton.textContent = "☰";
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
  if (!siteHeader.contains(event.target)) {
    closeProceduresMenu();
    if (window.matchMedia("(max-width: 800px)").matches) {
      closeMobileMenu();
    }
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeProceduresMenu();
});

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector(".booking-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);
  const whatsappUrl = buildBookingWhatsAppUrl(formData);

  bookingStatus.textContent = "ვინახავთ თქვენს მოთხოვნას WhatsApp-ზე…";

  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  form.reset();
});
