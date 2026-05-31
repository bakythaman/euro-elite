const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const root = document.documentElement;
const money = new Intl.NumberFormat("ru-RU", {
  maximumFractionDigits: 0,
  style: "currency",
  currency: "KZT",
});
const compact = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 1 });

const syncChrome = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progressValue = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  root.style.setProperty("--scroll-progress", `${progressValue}%`);
  header.classList.toggle("is-scrolled", window.scrollY > 16);
};

syncChrome();
window.addEventListener("scroll", syncChrome, { passive: true });

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  document.body.classList.toggle("menu-open", isOpen);
  header.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
});

nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    header.classList.remove("menu-open");
    menuToggle.setAttribute("aria-label", "Открыть меню");
  }
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const catalogButtons = document.querySelectorAll("[data-filter]");
const catalogCards = document.querySelectorAll("[data-category]");

catalogButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    catalogButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    catalogCards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      card.classList.toggle("is-hidden", filter !== "all" && !categories.includes(filter));
    });
  });
});

const slider = document.querySelector("[data-slider]");

if (slider) {
  const slides = slider.querySelectorAll("[data-slide]");
  const prev = slider.querySelector("[data-slider-prev]");
  const next = slider.querySelector("[data-slider-next]");
  const dots = slider.querySelector("[data-slider-dots]");
  let activeSlide = 0;

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Показать фото ${index + 1}`);
    dot.addEventListener("click", () => setSlide(index));
    dots.append(dot);
  });

  const dotButtons = dots.querySelectorAll("button");

  const setSlide = (index) => {
    activeSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeSlide);
    });
    dotButtons.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeSlide);
    });
  };

  prev.addEventListener("click", () => setSlide(activeSlide - 1));
  next.addEventListener("click", () => setSlide(activeSlide + 1));
  setSlide(0);
}

const patternData = {
  triumph: {
    title: "Триумф",
    text: "Контрастная геометрия для современных фасадов.",
  },
  classic: {
    title: "Классика",
    text: "Спокойный ритм для дорожек, парковок и больших площадей.",
  },
  premium: {
    title: "Premium",
    text: "Акцентные вставки для объектов, где нужен статусный эффект.",
  },
};

const studioPreview = document.querySelector("[data-studio-preview]");
const patternName = document.querySelector("[data-pattern-name]");
const patternCopy = document.querySelector("[data-pattern-copy]");
const patternButtons = document.querySelectorAll("[data-pattern]");

patternButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.pattern;
    const selected = patternData[key];

    studioPreview.className = `studio-preview pattern-mode-${key}`;
    patternName.textContent = selected.title;
    patternCopy.textContent = selected.text;

    patternButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
  });
});

const calculator = document.querySelector("[data-price-calculator]");

if (calculator) {
  const area = calculator.querySelector("[data-calc-area]");
  const product = calculator.querySelector("[data-calc-product]");
  const border = calculator.querySelector("[data-calc-border]");
  const delivery = calculator.querySelector("[data-calc-delivery]");
  const reserve = calculator.querySelector("[data-calc-reserve]");
  const install = calculator.querySelector("[data-calc-install]");
  const materialTotal = calculator.querySelector("[data-calc-material]");
  const borderTotal = calculator.querySelector("[data-calc-border-total]");
  const deliveryTotal = calculator.querySelector("[data-calc-delivery-total]");
  const installTotal = calculator.querySelector("[data-calc-install-total]");
  const finalTotal = calculator.querySelector("[data-calc-total]");

  const updateCalculator = () => {
    const areaValue = Math.max(Number(area.value) || 0, 0);
    const productPrice = Number(product.selectedOptions[0].dataset.price) || 0;
    const borderValue = Math.max(Number(border.value) || 0, 0);
    const deliveryValue = Number(delivery.value) || 0;
    const reserveMultiplier = reserve.checked ? 1.05 : 1;
    const calculatedMaterial = areaValue * reserveMultiplier * productPrice;
    const calculatedBorder = borderValue * 1200;
    const calculatedInstall = install.checked ? areaValue * 2500 : 0;
    const total = calculatedMaterial + calculatedBorder + deliveryValue + calculatedInstall;

    materialTotal.textContent = money.format(calculatedMaterial);
    borderTotal.textContent = money.format(calculatedBorder);
    deliveryTotal.textContent = money.format(deliveryValue);
    installTotal.textContent = money.format(calculatedInstall);
    finalTotal.textContent = money.format(total);
  };

  calculator.addEventListener("input", updateCalculator);
  calculator.addEventListener("change", updateCalculator);
  updateCalculator();
}

const form = document.querySelector("[data-lead-form]");
const areaInput = document.querySelector("[data-area-input]");
const estimate = document.querySelector("[data-estimate]");
const status = document.querySelector("[data-form-status]");
const savedLeads = document.querySelector("[data-saved-leads]");
const leadList = document.querySelector("[data-lead-list]");
const downloadLeads = document.querySelector("[data-download-leads]");
const storageKey = "euroEliteLeads";

const getLeads = () => JSON.parse(localStorage.getItem(storageKey) || "[]");

const saveLeads = (leads) => {
  localStorage.setItem(storageKey, JSON.stringify(leads));
};

const renderLeads = () => {
  const leads = getLeads();
  savedLeads.hidden = leads.length === 0;
  leadList.innerHTML = "";

  leads.slice(-4).reverse().forEach((lead) => {
    const item = document.createElement("div");
    item.className = "saved-lead";
    item.innerHTML = `<strong>${lead.name}</strong> · ${lead.phone}<br>${lead.objectType}, ${lead.area} м2 · ${lead.createdAt}`;
    leadList.append(item);
  });
};

const updateEstimate = () => {
  const area = Number(areaInput.value);

  if (!area || area < 1) {
    estimate.textContent = "Укажите площадь, и мы сразу покажем ориентировочный объем с запасом.";
    return;
  }

  const reserve = area * 1.05;
  estimate.textContent = `Ориентир по объему: ${compact.format(area)} м2 покрытия + 5% запас = ${compact.format(
    reserve,
  )} м2 материала. Стоимость можно уточнить в калькуляторе выше.`;
};

areaInput.addEventListener("input", updateEstimate);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const lead = {
    id: window.crypto?.randomUUID ? window.crypto.randomUUID() : String(Date.now()),
    name: String(data.get("name") || "Без имени").trim(),
    phone: String(data.get("phone") || "Телефон не указан").trim(),
    area: String(data.get("area") || "не указана").trim(),
    objectType: String(data.get("object") || "объект").trim(),
    createdAt: new Date().toLocaleString("ru-RU"),
  };
  const leads = getLeads();

  leads.push(lead);
  saveLeads(leads);
  renderLeads();
  status.textContent = "Заявка сохранена на этом устройстве.";
  form.reset();
  updateEstimate();
});

downloadLeads.addEventListener("click", () => {
  const leads = getLeads();
  const rows = [
    ["Дата", "Имя", "Телефон", "Объект", "Площадь"],
    ...leads.map((lead) => [lead.createdAt, lead.name, lead.phone, lead.objectType, `${lead.area} м2`]),
  ];
  const csv = rows
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(";"))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = "euro-elite-leads.csv";
  link.click();
  URL.revokeObjectURL(link.href);
});

renderLeads();
updateEstimate();
