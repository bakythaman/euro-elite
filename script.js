const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const root = document.documentElement;
let currentLang = localStorage.getItem("euroEliteLang") || "kk";

const localeMap = {
  kk: "kk-KZ",
  ru: "ru-RU",
};

const translations = {
  kk: {
    title: "EURO elite | Брусчатка Шымкент | Тротуар плиткасы",
    description:
      "EURO elite Шымкент: брусчатка, тротуар плиткасы, тротуарная плитка, өлшеу, кеңес беру, жеткізу және аулаға арналған өрнек таңдау.",
    menuOpen: "Мәзірді ашу",
    menuClose: "Мәзірді жабу",
    nav: ["Каталог", "Жобалар", "Калькулятор", "Пікірлер", "Мекенжай", "Байланыс"],
    heroEyebrow: "Шымкенттегі өндіріс",
    heroSeo: "Брусчатка Шымкент | Тротуар плиткасы",
    heroLead:
      "Аулаларға, коммерциялық кіреберістерге, жолдарға және премиум фасад аймақтарына арналған тротуар плиткасы мен брусчатка.",
    heroCalc: "Құнын есептеу",
    heroProjects: "Жобаларды көру",
    rails: ["Өз өндірісіміз", "Өлшеу және өрнек таңдау", "Шымкент бойынша жеткізу"],
    proof: ["күн сайын өтінім қабылдаймыз", "шығыс стилінен еуропалық стильге дейін", "Тленшина және Жібек жолы", "объект бойынша шығынды бірден есептейміз"],
    introEyebrow: "Үйлерге, бизнеске және қалалық нысандарға",
    introTitle: "Сметаға дейін қымбат көрінетін плитка",
    introText:
      "EURO elite жабындыны нысан сәулетіне қарай жинауға көмектеседі: түсі, геометриясы, фактурасы және төсеу өрнегі аула, кіреберіс немесе жол біртұтас көрінуі үшін таңдалады.",
    catalogEyebrow: "Каталог",
    catalogTitle: "Әр міндетке арналған формалар",
    catalogText: "Жеке аулаға арналған тыныш классикадан коммерциялық кеңістікке арналған айқын геометрияға дейін.",
    filters: ["Барлығы", "Үйге", "Бизнеске", "Тұрақ", "Дизайн"],
    cards: [
      ["4 600 тг/м2 бастап", "Триумф", "Заманауи кіреберіс топтарына арналған контраст кірістірулері бар ірі геометрия."],
      ["3 800 тг/м2 бастап", "Классика", "Жолдарға, алаңдарға, тұрақтарға және жинақы аулаларға арналған бірқалыпты ырғақ."],
      ["5 200 тг/м2 бастап", "Рим", "Еуропалық фасад пен демалыс аймағына арналған күрделі жинақ өрнегі."],
      ["4 900 тг/м2 бастап", "Шығыс стилі", "Жылы фасадтармен жақсы үйлесетін сәндік акценттер."],
      ["4 200 тг/м2 бастап", "Тұрақ плиткасы", "Кіру аймағы, тұрақ және белсенді жүктеме үшін күшейтілген визуалды ырғақ."],
      ["5 800 тг/м2 бастап", "Premium Mix", "Әсер маңызды нысандарға арналған контраст кірістірулер мен статус өрнек."],
    ],
    projectsEyebrow: "Дайын шешімдер",
    projectsTitle: "Нысанды бірден өзгертетін жабындар",
    projectCards: [
      ["Премиум аула", "Графит + тас фактурасы"],
      ["Жеке үй", "Контраст жол"],
      ["Коммерциялық нысан", "Триумф коллекциясы"],
      ["Кіреберіс аймағы", "Тыныш классика"],
    ],
    instaEyebrow: "Instagram жобалары",
    instaTitle: "EURO elite профиліндегі фотолар",
    instaText: "Витрина плитканың нақты фасадтарда, жолдарда және коммерциялық кіреберістерде қалай көрінетінін көрсетеді.",
    slideLabels: ["Премиум аула", "Контраст жол", "Коммерциялық нысан", "Классикалық жабын"],
    prevPhoto: "Алдыңғы фото",
    nextPhoto: "Келесі фото",
    showPhoto: "Фотоны көрсету",
    studioEyebrow: "Өрнек таңдау",
    studioTitle: "Аула көңіл-күйін бір минутта жинаңыз",
    studioText:
      "Тапсырыс берушіге бірнеше төсеу нұсқасын бір бетте көрсетіңіз: тыныш, контраст немесе статус. Бұл блок “жай плиткадан” нақты нысан бейнесіне тез өтуге көмектеседі.",
    patternButtons: ["Триумф", "Классика", "Premium"],
    patterns: {
      triumph: ["Триумф", "Заманауи фасадтарға арналған контраст геометрия."],
      classic: ["Классика", "Жолдар, тұрақтар және үлкен алаңдарға арналған тыныш ырғақ."],
      premium: ["Premium", "Статус әсер керек нысандарға арналған акцент кірістірулер."],
    },
    calcEyebrow: "Құн калькуляторы",
    calcTitle: "Бірнеше секундта алдын ала есеп",
    calcText:
      "Ауданды енгізіп, коллекцияны және қосымша позицияларды таңдаңыз. Нәтиже материал, запас, бордюр және жеткізу бойынша бағдар береді.",
    calcLabels: ["Аудан, м2", "Коллекция", "Бордюр, пог. м", "Жеткізу"],
    productOptions: ["Классика - 3 800 тг/м2", "Триумф - 4 600 тг/м2", "Рим - 5 200 тг/м2", "Premium Mix - 5 800 тг/м2"],
    deliveryOptions: ["Өзі алып кету", "Шымкент - 15 000 тг", "Облыс - 30 000 тг"],
    calcChecks: ["5% материал запас қосу", "Төсеу бойынша бағдарды көрсету"],
    calcResultLabels: ["Материал", "Бордюр", "Жеткізу", "Төсеу", "Жалпы бағдар"],
    calcNote:
      "Есеп алдын ала. Соңғы баға негізге, көлемге, таңдалған түске және жеткізу шарттарына байланысты.",
    processEyebrow: "Тапсырыс қалай өтеді",
    processTitle: "Идеядан дайын алаңға дейін түсінікті жол",
    steps: [
      ["Кеңес беру", "Нысанды, ауданды, фасад стилін және жабынға түсетін жүктемені нақтылаймыз."],
      ["Өлшеу", "Көлемді, запасты, бордюрді және логистиканы есептеуге көмектесеміз."],
      ["Өндіріс", "Түс пен форматты таңдап, партияны таңдалған өрнекке дайындаймыз."],
      ["Жеткізу", "Шымкент және облыс бойынша ыңғайлы жеткізуді ұйымдастырамыз."],
    ],
    reviewsEyebrow: "Instagram пікірлері",
    reviewsTitle: "EURO elite жобаларына жылы пікірлер",
    reviewsText: "Жаңа стористерден алынған пікірлер: клиенттер сапаны, уақытылы жеткізуді және қызмет көрсетуді атап өтеді.",
    reviewCards: [
      ["Nurmahan Nursilta...", "“Үй өте әдемі болып қалды, качество просто супер”", "Instagram сторис"],
      ["bejsenovatolhyn22", "“Бағасы да, сапасы да, қызмет көрсету де көңілімнен шықты. Рахмет. Істеріңіз оңға баса берсін.”", "Instagram пікір"],
      ["Багила Калыбек", "“Euro elite ең сапалы мықты брусчаткалар, қол жетімді бағалар өте ұнады.”", "5 жұлдыз"],
      ["Gulsim", "“Жақсы брусчатка, сапасы жақсы. 6 жыл уақыт өтті, сол қалпында тұр.”", "Клиент пікірі"],
    ],
    locationsEyebrow: "2GIS карта",
    locationsTitle: "Шымкентте екі мекенжай",
    locationsText: "Жақын филиалды таңдаңыз: картадан ашып, маршрут құруға немесе бірден қоңырау шалуға болады.",
    branches: [
      ["Филиал 01", "Тленшина көшесі, 18/10", "Өндіріс және негізгі шоурум. 2GIS карточкасы арқылы маршрут ашылады.", "2GIS-те ашу"],
      ["Филиал 02", "Жібек жолы көшесі, 78/11а", "Қала ішіндегі кеңес беру нүктесі. 2GIS іздеуінде мекенжай бірден ашылады.", "2GIS-те ашу"],
    ],
    contactEyebrow: "Өтінім",
    contactTitle: "Нысаныңызға таңдау және есеп алыңыз",
    contactText:
      "Ауданды және нысан түрін жіберіңіз. EURO elite менеджері қолайлы форматты, материал запасын және жеткізу мерзімін айтады.",
    addresses: ["Тленшина көшесі, 18/10", "Жібек жолы көшесі, 78/11а", "09:00 - 19:00"],
    formLabels: ["Атыңыз", "Телефон", "Аудан, м2", "Нысан түрі"],
    placeholders: ["Мысалы, Айдос", "+7 ___ ___ __ __", "120"],
    objectOptions: ["Жеке аула", "Коммерциялық нысан", "Жол / кіреберіс аймағы", "Тұрақ"],
    estimateEmpty: "Ауданды көрсетіңіз, біз бірден запаспен шамамен көлемін көрсетеміз.",
    estimateText: (area, reserve) =>
      `Көлем бағдары: ${area} м2 жабын + 5% запас = ${reserve} м2 материал. Құнын жоғарыдағы калькулятордан нақтылауға болады.`,
    saveLead: "Өтінімді сақтау",
    savedStatus: "Өтінім осы құрылғыда сақталды.",
    savedTitle: "Сақталған өтінімдер",
    downloadCsv: "CSV жүктеу",
    csvHeaders: ["Күні", "Аты", "Телефон", "Нысан", "Аудан"],
    noName: "Аты жоқ",
    noPhone: "Телефон көрсетілмеген",
    noArea: "көрсетілмеген",
    footer: "Тротуар плиткасы және брусчатка. Шымкент.",
    waText: "Сәлеметсіз бе, EURO elite брусчаткасы бойынша есеп алғым келеді.",
  },
  ru: {
    title: "EURO elite | Брусчатка Шымкент | Тротуарная плитка",
    description:
      "EURO elite в Шымкенте: брусчатка, тротуарная плитка, производство, замер, консультация, доставка и подбор рисунка под объект.",
    menuOpen: "Открыть меню",
    menuClose: "Закрыть меню",
    nav: ["Каталог", "Проекты", "Калькулятор", "Отзывы", "Адреса", "Контакты"],
    heroEyebrow: "Производство в Шымкенте",
    heroSeo: "Брусчатка Шымкент | Тротуарная плитка",
    heroLead:
      "Тротуарная плитка и брусчатка для дворов, коммерческих входных групп, дорожек и премиальных фасадных зон.",
    heroCalc: "Рассчитать стоимость",
    heroProjects: "Смотреть проекты",
    rails: ["Собственное производство", "Замер и подбор рисунка", "Доставка по Шымкенту"],
    proof: ["принимаем заявки каждый день", "от восточного до европейского стиля", "Тленшина и Жибек жолы", "сразу считаем расход под объект"],
    introEyebrow: "Для домов, бизнеса и городских объектов",
    introTitle: "Плитка, которая выглядит дорого еще до сметы",
    introText:
      "EURO elite помогает собрать покрытие под архитектуру объекта: цвет, геометрию, фактуру и рисунок укладки подбирают так, чтобы двор, входная группа или дорожка выглядели цельно.",
    catalogEyebrow: "Каталог",
    catalogTitle: "Формы под разные задачи",
    catalogText: "От спокойной классики для частного двора до выразительной геометрии для коммерческого пространства.",
    filters: ["Все", "Для дома", "Для бизнеса", "Парковка", "Дизайн"],
    cards: [
      ["от 4 600 тг/м2", "Триумф", "Крупная геометрия с контрастными вставками для современных входных групп."],
      ["от 3 800 тг/м2", "Классика", "Ровный ритм для дорожек, площадок, парковок и аккуратных дворов."],
      ["от 5 200 тг/м2", "Рим", "Сложный наборный рисунок для европейского фасада и зоны отдыха."],
      ["от 4 900 тг/м2", "Восточный стиль", "Декоративные акценты, которые хорошо работают с теплыми фасадами."],
      ["от 4 200 тг/м2", "Парковочная", "Усиленный визуальный ритм для зон въезда, парковки и активной нагрузки."],
      ["от 5 800 тг/м2", "Premium Mix", "Контрастные вставки и статусный рисунок для объектов, где важен эффект."],
    ],
    projectsEyebrow: "Готовые решения",
    projectsTitle: "Покрытия, которые сразу меняют объект",
    projectCards: [
      ["Премиальный двор", "Графит + каменная фактура"],
      ["Частный дом", "Контрастная дорожка"],
      ["Коммерческий объект", "Коллекция Триумф"],
      ["Входная зона", "Спокойная классика"],
    ],
    instaEyebrow: "Instagram проекты",
    instaTitle: "Фотографии из профиля EURO elite",
    instaText: "Витрина показывает, как плитка смотрится на реальных фасадах, дорожках и коммерческих входных группах.",
    slideLabels: ["Премиальный двор", "Контрастная дорожка", "Коммерческий объект", "Классическое покрытие"],
    prevPhoto: "Предыдущее фото",
    nextPhoto: "Следующее фото",
    showPhoto: "Показать фото",
    studioEyebrow: "Подбор рисунка",
    studioTitle: "Соберите настроение двора за минуту",
    studioText:
      "Покажите заказчику несколько вариантов укладки на одной странице: спокойный, контрастный или статусный. Такой блок помогает быстро перейти от “просто плитки” к конкретному образу объекта.",
    patternButtons: ["Триумф", "Классика", "Premium"],
    patterns: {
      triumph: ["Триумф", "Контрастная геометрия для современных фасадов."],
      classic: ["Классика", "Спокойный ритм для дорожек, парковок и больших площадей."],
      premium: ["Premium", "Акцентные вставки для объектов, где нужен статусный эффект."],
    },
    calcEyebrow: "Калькулятор стоимости",
    calcTitle: "Черновой расчет за несколько секунд",
    calcText:
      "Введите площадь, выберите коллекцию и дополнительные позиции. Итог показывает ориентир по материалу, запасу, бордюру и доставке.",
    calcLabels: ["Площадь, м2", "Коллекция", "Бордюр, пог. м", "Доставка"],
    productOptions: ["Классика - 3 800 тг/м2", "Триумф - 4 600 тг/м2", "Рим - 5 200 тг/м2", "Premium Mix - 5 800 тг/м2"],
    deliveryOptions: ["Самовывоз", "Шымкент - 15 000 тг", "Область - 30 000 тг"],
    calcChecks: ["Добавить 5% запас материала", "Показать ориентир по укладке"],
    calcResultLabels: ["Материал", "Бордюр", "Доставка", "Укладка", "Итого ориентир"],
    calcNote:
      "Расчет предварительный. Финальная цена зависит от основания, объема, выбранного цвета и условий доставки.",
    processEyebrow: "Как проходит заказ",
    processTitle: "Понятный путь от идеи до готовой площадки",
    steps: [
      ["Консультация", "Уточняем объект, площадь, стиль фасада и нагрузку на покрытие."],
      ["Замер", "Помогаем посчитать объем, запас, бордюр и логистику."],
      ["Производство", "Подбираем цвет и формат, готовим партию под выбранный рисунок."],
      ["Доставка", "Организуем удобную отгрузку по Шымкенту и области."],
    ],
    reviewsEyebrow: "Отзывы из Instagram",
    reviewsTitle: "Теплые отзывы о проектах EURO elite",
    reviewsText: "Отзывы из новых сторис: клиенты отмечают качество, своевременную доставку и сервис.",
    reviewCards: [
      ["Nurmahan Nursilta...", "“Дом получился очень красивым, качество просто супер.”", "Instagram stories"],
      ["bejsenovatolhyn22", "“Цена, качество и обслуживание полностью устроили. Спасибо, пусть дела идут только вперед.”", "Instagram комментарий"],
      ["Багила Калыбек", "“У EURO elite качественная крепкая брусчатка, очень понравились доступные цены.”", "5 звезд"],
      ["Gulsim", "“Хорошая брусчатка, качество хорошее. Прошло 6 лет, стоит как раньше.”", "Отзыв клиента"],
    ],
    locationsEyebrow: "2GIS карта",
    locationsTitle: "Два адреса в Шымкенте",
    locationsText: "Выберите ближайший филиал: можно открыть карту, построить маршрут или сразу позвонить.",
    branches: [
      ["Филиал 01", "улица Тленшина, 18/10", "Производство и основной шоурум. Маршрут открывается через карточку 2GIS.", "Открыть в 2GIS"],
      ["Филиал 02", "улица Жибек жолы, 78/11а", "Городская точка консультации. Адрес сразу открывается в поиске 2GIS.", "Открыть в 2GIS"],
    ],
    contactEyebrow: "Заявка",
    contactTitle: "Получите подбор и расчет под ваш объект",
    contactText:
      "Отправьте площадь и тип объекта. Менеджер EURO elite подскажет подходящий формат, запас материала и ближайший срок доставки.",
    addresses: ["улица Тленшина, 18/10", "улица Жибек жолы, 78/11а", "09:00 - 19:00"],
    formLabels: ["Ваше имя", "Телефон", "Площадь, м2", "Тип объекта"],
    placeholders: ["Например, Айдос", "+7 ___ ___ __ __", "120"],
    objectOptions: ["Частный двор", "Коммерческий объект", "Дорожка / входная зона", "Парковка"],
    estimateEmpty: "Укажите площадь, и мы сразу покажем ориентировочный объем с запасом.",
    estimateText: (area, reserve) =>
      `Ориентир по объему: ${area} м2 покрытия + 5% запас = ${reserve} м2 материала. Стоимость можно уточнить в калькуляторе выше.`,
    saveLead: "Сохранить заявку",
    savedStatus: "Заявка сохранена на этом устройстве.",
    savedTitle: "Сохраненные заявки",
    downloadCsv: "Скачать CSV",
    csvHeaders: ["Дата", "Имя", "Телефон", "Объект", "Площадь"],
    noName: "Без имени",
    noPhone: "Телефон не указан",
    noArea: "не указана",
    footer: "Тротуарная плитка и брусчатка. Шымкент.",
    waText: "Здравствуйте, хочу расчет по брусчатке EURO elite.",
  },
};

const formatMoney = (value) => `${new Intl.NumberFormat(localeMap[currentLang], { maximumFractionDigits: 0 }).format(value)} тг`;

const formatNumber = (value) => new Intl.NumberFormat(localeMap[currentLang], { maximumFractionDigits: 1 }).format(value);

const setText = (selector, value) => {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
};

const setListText = (selector, values) => {
  document.querySelectorAll(selector).forEach((element, index) => {
    if (values[index] !== undefined) {
      element.textContent = values[index];
    }
  });
};

const setAttribute = (selector, attribute, value) => {
  document.querySelectorAll(selector).forEach((element) => element.setAttribute(attribute, value));
};

let updateCalculator = () => {};
let updateEstimate = () => {};
let renderLeads = () => {};

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
  menuToggle.setAttribute("aria-label", isOpen ? translations[currentLang].menuClose : translations[currentLang].menuOpen);
});

nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    header.classList.remove("menu-open");
    menuToggle.setAttribute("aria-label", translations[currentLang].menuOpen);
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

const studioPreview = document.querySelector("[data-studio-preview]");
const patternName = document.querySelector("[data-pattern-name]");
const patternCopy = document.querySelector("[data-pattern-copy]");
const patternButtons = document.querySelectorAll("[data-pattern]");

const updatePatternCopy = () => {
  const activePattern = document.querySelector("[data-pattern].is-active")?.dataset.pattern || "triumph";
  const selected = translations[currentLang].patterns[activePattern];

  patternName.textContent = selected[0];
  patternCopy.textContent = selected[1];
};

patternButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.pattern;

    studioPreview.className = `studio-preview pattern-mode-${key}`;

    patternButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    updatePatternCopy();
  });
});

const applyLanguage = (lang) => {
  currentLang = lang;
  localStorage.setItem("euroEliteLang", lang);
  const copy = translations[lang];

  document.documentElement.lang = lang;
  document.title = copy.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", copy.description);

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === lang);
  });

  setListText(".site-nav a", copy.nav);
  menuToggle.setAttribute("aria-label", nav.classList.contains("is-open") ? copy.menuClose : copy.menuOpen);
  setText(".hero .eyebrow", copy.heroEyebrow);
  setText(".hero__seo-line", copy.heroSeo);
  setText(".hero__lead", copy.heroLead);
  setText(".hero__actions .button--primary", copy.heroCalc);
  setText(".hero__actions .button--ghost", copy.heroProjects);
  setListText(".hero__rail span", copy.rails);
  setListText(".proof-item span", copy.proof);

  setText(".intro__copy .eyebrow", copy.introEyebrow);
  setText(".intro__copy h2", copy.introTitle);
  setText(".intro__copy p:not(.eyebrow)", copy.introText);

  setText("#catalog .section-head .eyebrow", copy.catalogEyebrow);
  setText("#catalog .section-head h2", copy.catalogTitle);
  setText("#catalog .section-head p:not(.eyebrow)", copy.catalogText);
  setListText("[data-filter]", copy.filters);
  document.querySelectorAll(".collection-card").forEach((card, index) => {
    const cardCopy = copy.cards[index];
    if (!cardCopy) return;
    card.querySelector(".collection-card__tag").textContent = cardCopy[0];
    card.querySelector("h3").textContent = cardCopy[1];
    card.querySelector("p").textContent = cardCopy[2];
  });

  setText("#projects .section-head .eyebrow", copy.projectsEyebrow);
  setText("#projects .section-head h2", copy.projectsTitle);
  document.querySelectorAll(".project-card__caption").forEach((caption, index) => {
    const cardCopy = copy.projectCards[index];
    if (!cardCopy) return;
    caption.querySelector("span").textContent = cardCopy[0];
    caption.querySelector("strong").textContent = cardCopy[1];
  });

  setText(".instagram-slider .section-head .eyebrow", copy.instaEyebrow);
  setText(".instagram-slider .section-head h2", copy.instaTitle);
  setText(".instagram-slider .section-head p:not(.eyebrow)", copy.instaText);
  setListText("[data-slide] .slide__caption strong", copy.slideLabels);
  setAttribute("[data-slider-prev]", "aria-label", copy.prevPhoto);
  setAttribute("[data-slider-next]", "aria-label", copy.nextPhoto);
  document.querySelectorAll("[data-slider-dots] button").forEach((button, index) => {
    button.setAttribute("aria-label", `${copy.showPhoto} ${index + 1}`);
  });

  setText(".studio__copy .eyebrow", copy.studioEyebrow);
  setText(".studio__copy h2", copy.studioTitle);
  setText(".studio__copy p:not(.eyebrow)", copy.studioText);
  setListText("[data-pattern]", copy.patternButtons);
  updatePatternCopy();

  setText(".calculator__copy .eyebrow", copy.calcEyebrow);
  setText(".calculator__copy h2", copy.calcTitle);
  setText(".calculator__copy p:not(.eyebrow)", copy.calcText);
  setListText(".calc-fields label > span", copy.calcLabels);
  setListText("[data-calc-product] option", copy.productOptions);
  setListText("[data-calc-delivery] option", copy.deliveryOptions);
  setListText(".calc-options .check-row span", copy.calcChecks);
  setListText(".calc-result div > span", copy.calcResultLabels);
  setText(".calc-note", copy.calcNote);

  setText(".process .section-head .eyebrow", copy.processEyebrow);
  setText(".process .section-head h2", copy.processTitle);
  document.querySelectorAll(".step").forEach((step, index) => {
    const stepCopy = copy.steps[index];
    if (!stepCopy) return;
    step.querySelector("h3").textContent = stepCopy[0];
    step.querySelector("p").textContent = stepCopy[1];
  });

  setText("#reviews .section-head .eyebrow", copy.reviewsEyebrow);
  setText("#reviews .section-head h2", copy.reviewsTitle);
  setText("#reviews .section-head p:not(.eyebrow)", copy.reviewsText);
  document.querySelectorAll(".review-card").forEach((card, index) => {
    const reviewCopy = copy.reviewCards[index];
    if (!reviewCopy) return;
    card.querySelector("span").textContent = reviewCopy[0];
    card.querySelector("p").textContent = reviewCopy[1];
    card.querySelector("strong").textContent = reviewCopy[2];
  });

  setText(".locations__copy .eyebrow", copy.locationsEyebrow);
  setText(".locations__copy h2", copy.locationsTitle);
  setText(".locations__copy p:not(.eyebrow)", copy.locationsText);
  document.querySelectorAll(".address-card").forEach((card, index) => {
    const branchCopy = copy.branches[index];
    if (!branchCopy) return;
    card.querySelector("span").textContent = branchCopy[0];
    card.querySelector("h3").textContent = branchCopy[1];
    card.querySelector("p").textContent = branchCopy[2];
    card.querySelector("a").textContent = branchCopy[3];
  });

  setText(".contact-copy .eyebrow", copy.contactEyebrow);
  setText(".contact-copy h2", copy.contactTitle);
  setText(".contact-copy p:not(.eyebrow)", copy.contactText);
  const contactItems = document.querySelectorAll(".contact-list span");
  contactItems.forEach((item, index) => {
    if (copy.addresses[index]) item.textContent = copy.addresses[index];
  });
  setListText(".lead-form label > span", copy.formLabels);
  setAttribute('input[name="name"]', "placeholder", copy.placeholders[0]);
  setAttribute('input[name="phone"]', "placeholder", copy.placeholders[1]);
  setAttribute("[data-area-input]", "placeholder", copy.placeholders[2]);
  setListText('select[name="object"] option', copy.objectOptions);
  setText(".lead-form .button--primary", copy.saveLead);
  setText(".saved-leads__head strong", copy.savedTitle);
  setText("[data-download-leads]", copy.downloadCsv);
  setText(".site-footer p", copy.footer);

  const waLink = document.querySelector(".float-cta");
  waLink.href = `https://wa.me/77007277222?text=${encodeURIComponent(copy.waText)}`;
  waLink.setAttribute("aria-label", lang === "kk" ? "WhatsApp арқылы жазу" : "Написать в WhatsApp");

  updateCalculator();
  updateEstimate();
  renderLeads();
};

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
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

  updateCalculator = () => {
    const areaValue = Math.max(Number(area.value) || 0, 0);
    const productPrice = Number(product.selectedOptions[0].dataset.price) || 0;
    const borderValue = Math.max(Number(border.value) || 0, 0);
    const deliveryValue = Number(delivery.value) || 0;
    const reserveMultiplier = reserve.checked ? 1.05 : 1;
    const calculatedMaterial = areaValue * reserveMultiplier * productPrice;
    const calculatedBorder = borderValue * 1200;
    const calculatedInstall = install.checked ? areaValue * 2500 : 0;
    const total = calculatedMaterial + calculatedBorder + deliveryValue + calculatedInstall;

    materialTotal.textContent = formatMoney(calculatedMaterial);
    borderTotal.textContent = formatMoney(calculatedBorder);
    deliveryTotal.textContent = formatMoney(deliveryValue);
    installTotal.textContent = formatMoney(calculatedInstall);
    finalTotal.textContent = formatMoney(total);
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

renderLeads = () => {
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

updateEstimate = () => {
  const area = Number(areaInput.value);

  if (!area || area < 1) {
    estimate.textContent = translations[currentLang].estimateEmpty;
    return;
  }

  const reserve = area * 1.05;
  estimate.textContent = translations[currentLang].estimateText(formatNumber(area), formatNumber(reserve));
};

areaInput.addEventListener("input", updateEstimate);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const objectSelect = form.elements.object;
  const lead = {
    id: window.crypto?.randomUUID ? window.crypto.randomUUID() : String(Date.now()),
    name: String(data.get("name") || translations[currentLang].noName).trim(),
    phone: String(data.get("phone") || translations[currentLang].noPhone).trim(),
    area: String(data.get("area") || translations[currentLang].noArea).trim(),
    objectType: objectSelect.selectedOptions[0].textContent.trim(),
    createdAt: new Date().toLocaleString(localeMap[currentLang]),
  };
  const leads = getLeads();

  leads.push(lead);
  saveLeads(leads);
  renderLeads();
  status.textContent = translations[currentLang].savedStatus;
  form.reset();
  updateEstimate();
});

downloadLeads.addEventListener("click", () => {
  const leads = getLeads();
  const rows = [
    translations[currentLang].csvHeaders,
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
applyLanguage(currentLang);
