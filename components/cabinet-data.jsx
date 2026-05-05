/* === Cabinet shared data, helpers, and extra icons === */

/* Extra icons used only in the cabinet (added without touching components/icons.jsx). */
const CabIcon = {
  Home: () =>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/></svg>,
  List: () =>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>,
  Inbox: () =>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>,
  Handshake: () =>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/></svg>,
  Wallet: () =>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/></svg>,
  Bell: () =>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>,
  Settings: () =>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
  Logout: () =>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>,
  ChevronLeft: () =>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  ChevronRight: () =>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  Upload: () =>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>,
  File: () =>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  Eye: () =>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>,
  Trash: () =>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  Info: () =>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>,
  Filter: () =>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
};

/* Universities (MVP — KhMAO + selected RF top-50). */
const UNIVERSITIES = [
  "ЮГУ — Югорский государственный университет",
  "СурГУ — Сургутский государственный университет",
  "СурГПУ — Сургутский государственный педагогический университет",
  "НВГУ — Нижневартовский государственный университет",
  "ТюмГУ — Тюменский государственный университет",
  "ТИУ — Тюменский индустриальный университет",
  "МГУ им. М. В. Ломоносова",
  "СПбГУ",
  "НИУ ВШЭ",
  "МФТИ",
  "ИТМО",
  "МИФИ",
  "Бауманка (МГТУ им. Баумана)",
  "РАНХиГС",
  "РУДН"
];

const FACULTIES = {
  "ЮГУ — Югорский государственный университет": [
    "Гуманитарный институт",
    "Институт цифровой экономики",
    "Институт нефти и газа",
    "Инженерная школа",
    "Институт природопользования",
    "Юридический институт"
  ],
  "default": [
    "Институт информационных технологий",
    "Институт экономики",
    "Гуманитарный факультет",
    "Юридический факультет",
    "Институт педагогики",
    "Инженерный факультет"
  ]
};

const COURSES = ["1 курс", "2 курс", "3 курс", "4 курс", "Магистратура 1", "Магистратура 2", "Аспирантура"];
const STUDY_FORMS = ["Очная", "Заочная", "Очно-заочная"];
const CITIES = ["Ханты-Мансийск", "Сургут", "Нижневартовск", "Нефтеюганск", "Когалым", "Тюмень", "Москва", "Санкт-Петербург", "Екатеринбург"];

/* Skill categories and tags. */
const SKILL_CATEGORIES = [
  {
    id: "media",
    title: "Медиа и контент",
    icon: "Camera",
    tags: ["Копирайтинг", "SMM", "Reels-монтаж", "Фотосъёмка", "Дизайн в Figma", "Дизайн в Canva", "Photoshop", "Сторис", "TikTok", "Подкасты"]
  },
  {
    id: "it",
    title: "IT и цифровые услуги",
    icon: "Code",
    tags: ["HTML/CSS", "JavaScript", "Python", "Парсинг", "Тестирование", "Tilda", "Чат-боты Telegram", "1С", "WordPress", "SQL", "React"]
  },
  {
    id: "events",
    title: "События и гостеприимство",
    icon: "Bolt",
    tags: ["Регистрация участников", "Координация", "Ведущий", "Переводчик-сопровождение", "Промо", "Фотограф мероприятия", "Хостес"]
  },
  {
    id: "assist",
    title: "Ассистенс и бизнес-задачи",
    icon: "Briefcase",
    tags: ["Расшифровка аудио", "Ведение CRM", "Ввод данных", "Поиск контактов", "Личный ассистент", "Аналитика", "Презентации"]
  },
  {
    id: "edu",
    title: "Образование и репетиторство",
    icon: "User",
    tags: ["Школьная математика", "Физика", "Подготовка к ЕГЭ", "Информатика", "Курсовые работы", "Написание эссе"]
  },
  {
    id: "lang",
    title: "Языки и переводы",
    icon: "Pen",
    tags: ["Английский", "Немецкий", "Китайский", "Технический перевод", "Перевод видео", "Локализация"]
  },
  {
    id: "law",
    title: "Юридические задачи",
    icon: "Shield",
    tags: ["Договоры", "Претензии", "Юридический анализ", "Судебная практика", "Регистрация ИП"],
    requires: "3+ курс юр. направлений"
  }
];

/* Default profile state for fresh student. */
const EMPTY_PROFILE = {
  /* Step 0 — auth */
  authMethod: "email",
  email: "",
  phone: "",
  password: "",
  agreeTerms: false,
  agreePd: false,

  /* Step 1 — study */
  university: "",
  faculty: "",
  direction: "",
  course: "",
  studyForm: "",
  graduationYear: "",

  /* Step 2 — skills */
  categories: [],
  tags: [],

  /* Step 3 — profile */
  lastName: "",
  firstName: "",
  middleName: "",
  birthDate: "",
  city: "Ханты-Мансийск",
  avatar: null,
  about: "",
  telegram: "",
  vk: "",

  /* Step 4 — self-employed */
  selfEmployedStatus: "",
  inn: "",
  innVerified: false,

  /* Step 5 — portfolio */
  portfolio: [],

  /* meta */
  onboardingStep: 0,
  onboardingDone: false
};

/* Demo profile with most fields filled — used as default seed in the cabinet
   so every screen has something to render even before the user types. */
const DEMO_PROFILE = {
  authMethod: "email",
  email: "anna.petrova@ugrasu.ru",
  phone: "+7 912 345 67 89",
  password: "demo-password",
  agreeTerms: true,
  agreePd: true,

  university: "ЮГУ — Югорский государственный университет",
  faculty: "Институт цифровой экономики",
  direction: "Прикладная информатика",
  course: "3 курс",
  studyForm: "Очная",
  graduationYear: "2027",

  categories: ["media", "it"],
  tags: ["Дизайн в Figma", "SMM", "HTML/CSS", "JavaScript", "Tilda"],

  lastName: "Петрова",
  firstName: "Анна",
  middleName: "Сергеевна",
  birthDate: "2004-08-12",
  city: "Ханты-Мансийск",
  avatar: null,
  about: "Учусь на 3 курсе ИЦЭ ЮГУ. Делаю лендинги на Tilda и веду соцсети малому бизнесу. Спокойно беру задачи на выходные и вечера.",
  telegram: "@anna_designs",
  vk: "anna.petrova",

  selfEmployedStatus: "Оформлен",
  inn: "860100123456",
  innVerified: true,

  portfolio: [
    {
      id: "p1",
      title: "Лендинг для кафе «Нефть»",
      category: "it",
      description: "Сделала одностраничник на Tilda с интеграцией формы брони. Конверсия 12%.",
      link: "https://kafe-neft.ru",
      year: "2025"
    },
    {
      id: "p2",
      title: "SMM для арт-пространства «Гараж»",
      category: "media",
      description: "Вела Instagram + ВК 3 месяца, +1.2k подписчиков, цена подписчика 18 ₽.",
      link: "https://vk.com/garage_hm",
      year: "2024"
    }
  ],

  onboardingStep: 6,
  onboardingDone: true
};

/* Mock task feed for catalog/dashboard. */
const TASKS = [
  { id: 1, category: "Дизайн", catId: "media", title: "Оформление соцсети для сети кофеен", pay: 7500, place: "Удалённо", deadline: "До 24 апреля", tags: ["Дизайн в Figma", "SMM"] },
  { id: 2, category: "Ивент", catId: "events", title: "Сопровождение гостей форума «Югра-Экспо»", pay: 4200, place: "Югра-Экспо", deadline: "26 апреля", tags: ["Координация", "Хостес"] },
  { id: 3, category: "IT", catId: "it", title: "Доработка лендинга на Tilda", pay: 12000, place: "Удалённо", deadline: "До 30 апреля", tags: ["Tilda", "HTML/CSS"] },
  { id: 4, category: "Контент", catId: "media", title: "Reels для салона красоты, 5 шт.", pay: 8000, place: "Ханты-Мансийск", deadline: "До 5 мая", tags: ["Reels-монтаж", "SMM"] },
  { id: 5, category: "Ассистенс", catId: "assist", title: "Расшифровка интервью, 3 часа", pay: 3000, place: "Удалённо", deadline: "До 22 апреля", tags: ["Расшифровка аудио"] },
  { id: 6, category: "Перевод", catId: "lang", title: "Перевод инструкции с английского, 12 стр.", pay: 5400, place: "Удалённо", deadline: "До 28 апреля", tags: ["Английский", "Технический перевод"] }
];

/* Mock responses (for «Мои отклики»). */
const RESPONSES = [
  { id: "r1", taskId: 1, status: "review", date: "20 апреля", title: "Оформление соцсети для сети кофеен", customer: "Кофейня «Север»" },
  { id: "r2", taskId: 3, status: "accepted", date: "19 апреля", title: "Доработка лендинга на Tilda", customer: "Студия «Полюс»" },
  { id: "r3", taskId: 5, status: "rejected", date: "16 апреля", title: "Расшифровка интервью, 3 часа", customer: "Радио «Югра»" },
  { id: "r4", taskId: 2, status: "expired", date: "9 апреля", title: "Сопровождение гостей форума", customer: "Югра-Экспо" }
];

/* Mock deals. */
const DEALS = [
  { id: "d1", status: "active", phase: "В работе", title: "Доработка лендинга на Tilda", customer: "Студия «Полюс»", amount: 12000, deadline: "30 апреля" },
  { id: "d2", status: "active", phase: "На проверке", title: "Перевод инструкции с английского", customer: "ООО «Северснаб»", amount: 5400, deadline: "28 апреля" },
  { id: "d3", status: "done", phase: "Завершена", title: "Лендинг для кафе «Нефть»", customer: "ИП Гагарин Д. С.", amount: 14000, deadline: "—" },
  { id: "d4", status: "done", phase: "Завершена", title: "SMM на месяц для «Гаража»", customer: "Арт-пространство «Гараж»", amount: 18000, deadline: "—" }
];

/* Mock wallet operations. */
const WALLET_OPS = [
  { date: "20 апр", task: "SMM на месяц", customer: "Гараж", amount: 18000, status: "Выплачено" },
  { date: "12 апр", task: "Лендинг на Tilda", customer: "ИП Гагарин", amount: 14000, status: "Выплачено" },
  { date: "08 апр", task: "Перевод инструкции", customer: "Северснаб", amount: 5400, status: "Заблокировано" },
  { date: "01 апр", task: "Дизайн презентации", customer: "ЮГУ", amount: 6000, status: "Выплачено" }
];

/* Mock notifications. */
const NOTIFS = [
  { id: "n1", type: "deal", icon: "Handshake", title: "Заказчик одобрил сдачу работы", time: "5 минут назад", unread: true },
  { id: "n2", type: "response", icon: "Inbox", title: "Отклик на «Доработка лендинга» принят", time: "Сегодня, 12:04", unread: true },
  { id: "n3", type: "wallet", icon: "Wallet", title: "Зачислено 14 000 ₽ за «Лендинг для кафе»", time: "Вчера, 18:30", unread: false },
  { id: "n4", type: "system", icon: "Info", title: "Профиль заполнен на 80% — добавь третий кейс", time: "12 апр", unread: false }
];

/* Profile completeness — formula from spec section 6.5. */
function calcCompleteness(p) {
  let score = 0;
  if (p.lastName && p.firstName) score += 10;
  if (p.avatar) score += 10;
  if (p.university) score += 15;
  if (p.categories && p.categories.length > 0) score += 15;
  if (p.tags && p.tags.length >= 3) score += 10;
  if (p.about) score += 10;
  if (p.selfEmployedStatus === "Оформлен" && p.innVerified) score += 15;
  if (p.portfolio && p.portfolio.length >= 1) score += 10;
  if (p.portfolio && p.portfolio.length >= 3) score += 5;
  return Math.min(100, score);
}

/* Storage helpers (localStorage; survives reload, no backend required). */
const STORAGE_KEY = "studradar.cabinet.v1";

function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function saveProfile(p) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch (e) {}
}

function clearProfile() {
  try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
}

Object.assign(window, {
  CabIcon,
  UNIVERSITIES, FACULTIES, COURSES, STUDY_FORMS, CITIES,
  SKILL_CATEGORIES,
  EMPTY_PROFILE, DEMO_PROFILE,
  TASKS, RESPONSES, DEALS, WALLET_OPS, NOTIFS,
  calcCompleteness, loadProfile, saveProfile, clearProfile
});
