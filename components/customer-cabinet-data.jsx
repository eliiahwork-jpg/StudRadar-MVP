/* === Customer cabinet: data, demo seeds, helpers === */

/* Тип заказчика — определяет блоки реквизитов и юридический сценарий. */
const CUSTOMER_TYPES = [
  { id: "person",      label: "Физлицо",      hint: "Заказывают лично, оплата с карты — налог 4%." },
  { id: "self",        label: "Самозанятый",  hint: "ИНН + чек. Налог рассчитываете сами в «Мой налог»." },
  { id: "ip",          label: "ИП",           hint: "Реквизиты ИП, закрывающие документы автоматически." },
  { id: "ooo",         label: "ООО / Юрлицо", hint: "Договор, акты, счета-фактуры, оплата с р/с." }
];

/* Сферы бизнеса для подбора студентов. */
const BUSINESS_SECTORS = [
  "Кафе, рестораны, бары",
  "Розничная торговля",
  "Услуги для бизнеса",
  "Образование и курсы",
  "Маркетинг, реклама, SMM",
  "ИТ и разработка",
  "Производство",
  "События и культура",
  "Госсектор и НКО",
  "Другое"
];

/* Размер компании. */
const COMPANY_SIZES = [
  "Я один / самозанятый",
  "До 10 человек",
  "11–50 человек",
  "51–250 человек",
  "Более 250 человек"
];

/* Объём задач — помогает подобрать тариф. */
const TASK_VOLUMES = [
  { id: "rare",   label: "1–2 задачи в месяц",   tier: "Базовый" },
  { id: "regular", label: "3–10 задач в месяц",  tier: "Бизнес" },
  { id: "lot",    label: "Больше 10 задач",      tier: "Бизнес+" }
];

/* Шаблоны задач для быстрого старта (онбординг и кнопка «По шаблону»). */
const TASK_TEMPLATES = [
  { id: "smm",    title: "Вести соцсети 2 недели",  category: "media",  pay: 8000,  tags: ["SMM", "Сторис"] },
  { id: "tilda",  title: "Лендинг на Tilda",         category: "it",     pay: 12000, tags: ["Tilda", "HTML/CSS"] },
  { id: "reels",  title: "Смонтировать 5 Reels",     category: "media",  pay: 6000,  tags: ["Reels-монтаж"] },
  { id: "event",  title: "Промоутеры на форум, 3 дня", category: "events", pay: 15000, tags: ["Промо", "Координация"] },
  { id: "trans",  title: "Перевод инструкции с EN",  category: "lang",   pay: 5000,  tags: ["Английский", "Технический перевод"] },
  { id: "audio",  title: "Расшифровать 3 ч. интервью", category: "assist", pay: 3000,  tags: ["Расшифровка аудио"] }
];

/* Пустой профиль компании — для онбординга с нуля. */
const EMPTY_COMPANY = {
  /* Step 0 — auth (упрощённо, не показываем экран на MVP) */
  email: "",
  phone: "",

  /* Step 1 — тип */
  customerType: "",
  inn: "",
  innVerified: false,

  /* Step 2 — компания */
  companyName: "",
  sector: "",
  companySize: "",
  about: "",
  logo: null,
  website: "",

  /* Step 3 — контактное лицо */
  contactLastName: "",
  contactFirstName: "",
  contactPosition: "",
  contactPhone: "",
  contactEmail: "",

  /* Step 4 — что планирует заказывать */
  taskVolume: "",
  preferredCategories: [],

  /* Step 5 — реквизиты для оплаты */
  paymentMethod: "",
  cardLast4: "",
  bik: "",
  rs: "",

  /* meta */
  onboardingStep: 0,
  onboardingDone: false,
  publishedFirstTask: false
};

/* Демо-компания: «Студия „Полюс"» — частый заказчик, на нём собран весь демо-кабинет. */
const DEMO_COMPANY = {
  email: "ceo@polus-studio.ru",
  phone: "+7 922 555 12 34",

  customerType: "ooo",
  inn: "8601999777",
  innVerified: true,

  companyName: "Студия «Полюс»",
  sector: "Маркетинг, реклама, SMM",
  companySize: "11–50 человек",
  about: "Маркетинговое агентство в Ханты-Мансийске. Делаем брендинг и сайты для малого бизнеса Югры. Работаем со студентами на разовые и регулярные задачи.",
  logo: null,
  website: "https://polus-studio.ru",

  contactLastName: "Гагарин",
  contactFirstName: "Дмитрий",
  contactPosition: "Арт-директор",
  contactPhone: "+7 922 555 12 34",
  contactEmail: "d.gagarin@polus-studio.ru",

  taskVolume: "regular",
  preferredCategories: ["media", "it", "assist"],

  paymentMethod: "rs",
  cardLast4: "4528",
  bik: "047162812",
  rs: "40702810000000004528",

  onboardingStep: 5,
  onboardingDone: true,
  publishedFirstTask: true
};

/* Статусы задач у заказчика. */
const TASK_STATUSES = {
  draft:     { label: "Черновик",      cls: "cab-status--expired" },
  published: { label: "Опубликована",  cls: "cab-status--review" },
  inwork:    { label: "В работе",      cls: "cab-status--active" },
  review:    { label: "На проверке",   cls: "cab-status--review" },
  done:      { label: "Завершена",     cls: "cab-status--done" },
  closed:    { label: "Снята",         cls: "cab-status--rejected" }
};

/* Мок-задачи заказчика. */
const C_TASKS = [
  { id: "t1", status: "published", title: "Оформление соцсети для сети кофеен",  category: "media",  catLabel: "Медиа",   pay: 7500,  responses: 8,  views: 142, deadline: "До 24 апреля", place: "Удалённо",        published: "20 апр" },
  { id: "t2", status: "inwork",    title: "Доработка лендинга на Tilda",          category: "it",     catLabel: "IT",      pay: 12000, responses: 12, views: 248, deadline: "До 30 апреля", place: "Удалённо",        published: "18 апр", performer: "Анна Петрова" },
  { id: "t3", status: "review",    title: "Reels для салона красоты, 5 шт.",      category: "media",  catLabel: "Контент", pay: 8000,  responses: 5,  views: 87,  deadline: "До 5 мая",     place: "Ханты-Мансийск",  published: "15 апр", performer: "Виктор Сёмин" },
  { id: "t4", status: "done",      title: "SMM на месяц для «Гаража»",            category: "media",  catLabel: "SMM",     pay: 18000, responses: 6,  views: 110, deadline: "Сдана 12 апр", place: "Удалённо",        published: "01 апр", performer: "Анна Петрова" },
  { id: "t5", status: "draft",     title: "Помощь в монтаже стенда «Югра-Экспо»", category: "events", catLabel: "События", pay: 4200,  responses: 0,  views: 0,   deadline: "—",            place: "Югра-Экспо",      published: "—" },
  { id: "t6", status: "published", title: "Расшифровать 3 интервью",              category: "assist", catLabel: "Ассистенс", pay: 3000, responses: 4,  views: 56,  deadline: "До 22 апреля", place: "Удалённо",        published: "20 апр" }
];

/* Отклики студентов на задачи заказчика. */
const C_RESPONSES = [
  { id: "cr1", taskId: "t1", taskTitle: "Оформление соцсети для сети кофеен", student: "Анна Петрова",   rating: 4.9, deals: 12, badges: ["Самозанятый", "ЮГУ"], pro: true,  bid: 7500,  message: "Сделаю в Figma + анимация обложки. Готова стартовать сегодня.", date: "20 апр" },
  { id: "cr2", taskId: "t1", taskTitle: "Оформление соцсети для сети кофеен", student: "Михаил Орлов",   rating: 4.6, deals: 5,  badges: ["ЮГУ"],                  pro: false, bid: 6800,  message: "Покажу 3 варианта обложки за 2 дня, по правкам — без лимита.", date: "20 апр" },
  { id: "cr3", taskId: "t6", taskTitle: "Расшифровать 3 интервью",            student: "Полина Зайцева", rating: 5.0, deals: 19, badges: ["Самозанятый"],          pro: true,  bid: 3000,  message: "Сдам в Word + тайм-коды. Гарантия по срокам.", date: "21 апр" },
  { id: "cr4", taskId: "t3", taskTitle: "Reels для салона красоты, 5 шт.",    student: "Виктор Сёмин",   rating: 4.7, deals: 8,  badges: ["Самозанятый"],          pro: false, bid: 8000,  message: "Снимаю в Ханты-Мансийске сам, монтаж 1 день на ролик.", date: "16 апр" }
];

/* Активные и закрытые сделки (со стороны заказчика). */
const C_DEALS = [
  { id: "cd1", taskId: "t2", title: "Доработка лендинга на Tilda",  performer: "Анна Петрова",   amount: 12000, escrow: 12000, phase: "В работе",     deadline: "30 апр", status: "active" },
  { id: "cd2", taskId: "t3", title: "Reels для салона красоты, 5 шт.", performer: "Виктор Сёмин", amount: 8000,  escrow: 8000,  phase: "На проверке",  deadline: "05 мая", status: "active" },
  { id: "cd3", taskId: "t4", title: "SMM на месяц для «Гаража»",      performer: "Анна Петрова",   amount: 18000, escrow: 0,     phase: "Завершена",    deadline: "—",      status: "done"   },
  { id: "cd4", taskId: "t6", title: "Лендинг для кафе «Нефть»",       performer: "Анна Петрова",   amount: 14000, escrow: 0,     phase: "Завершена",    deadline: "—",      status: "done"   }
];

/* Платежи (пополнения, эскроу, выплаты, возвраты). */
const C_PAYMENTS = [
  { date: "21 апр", op: "Пополнение баланса",        ref: "Эквайринг ЮКасса",     amount:  +50000, status: "Зачислено" },
  { date: "20 апр", op: "Эскроу: «Доработка Tilda»", ref: "Сделка cd1",            amount:  -12000, status: "Заблокировано" },
  { date: "20 апр", op: "Эскроу: Reels х5",          ref: "Сделка cd2",            amount:   -8000, status: "Заблокировано" },
  { date: "12 апр", op: "Выплата исполнителю",       ref: "Сделка cd3 — А. Петрова", amount: -18000, status: "Выплачено" },
  { date: "01 апр", op: "Выплата исполнителю",       ref: "Сделка cd4 — А. Петрова", amount: -14000, status: "Выплачено" }
];

/* Закрывающие документы для бухгалтерии (генерятся для ИП/ООО). */
const C_DOCS = [
  { date: "12 апр", num: "АВ-2026-014", kind: "Акт выполненных работ",       deal: "SMM на месяц для «Гаража»",  amount: 18000 },
  { date: "12 апр", num: "СФ-2026-014", kind: "Счёт-фактура",                deal: "SMM на месяц для «Гаража»",  amount: 18000 },
  { date: "01 апр", num: "АВ-2026-013", kind: "Акт выполненных работ",       deal: "Лендинг для кафе «Нефть»",   amount: 14000 },
  { date: "01 апр", num: "СФ-2026-013", kind: "Счёт-фактура",                deal: "Лендинг для кафе «Нефть»",   amount: 14000 }
];

/* Каталог исполнителей (для раздела «Исполнители»). */
const C_PERFORMERS = [
  { id: "p1", name: "Анна Петрова",   uni: "ЮГУ", course: "3 курс", rating: 4.9, deals: 12, tags: ["SMM", "Дизайн в Figma", "Tilda"], badges: ["Самозанятый", "PRO"], fav: true,  hire: 4 },
  { id: "p2", name: "Виктор Сёмин",   uni: "СурГУ", course: "2 курс", rating: 4.7, deals: 8,  tags: ["Reels-монтаж", "Фотосъёмка"],     badges: ["Самозанятый"],         fav: true,  hire: 1 },
  { id: "p3", name: "Полина Зайцева", uni: "ЮГУ", course: "4 курс", rating: 5.0, deals: 19, tags: ["Расшифровка аудио", "Английский"],badges: ["Самозанятый", "PRO"], fav: false, hire: 0 },
  { id: "p4", name: "Михаил Орлов",   uni: "ЮГУ", course: "3 курс", rating: 4.6, deals: 5,  tags: ["Дизайн в Canva", "Photoshop"],     badges: ["ЮГУ"],                 fav: false, hire: 0 },
  { id: "p5", name: "Елена Краснова", uni: "ТюмГУ", course: "Магистратура 1", rating: 4.8, deals: 11, tags: ["HTML/CSS", "JavaScript", "React"], badges: ["PRO"],          fav: false, hire: 2 }
];

/* Уведомления заказчика. */
const C_NOTIFS = [
  { id: "cn1", type: "response", icon: "Inbox",     title: "Новый отклик на «Оформление соцсети» от Анны Петровой", time: "10 минут назад", unread: true },
  { id: "cn2", type: "deal",     icon: "Handshake", title: "Виктор сдал Reels — нужна проверка",                    time: "Сегодня, 11:20", unread: true },
  { id: "cn3", type: "deal",     icon: "Handshake", title: "Анна отметила «Доработку лендинга» как готовую к ревью", time: "Вчера, 19:40", unread: false },
  { id: "cn4", type: "wallet",   icon: "Wallet",    title: "Баланс пополнен на 50 000 ₽ через ЮКассу",              time: "Вчера, 12:10", unread: false },
  { id: "cn5", type: "system",   icon: "Info",      title: "Заполните реквизиты ООО, чтобы получать закрывающие документы", time: "12 апр", unread: false }
];

/* Заполненность профиля компании — формула адаптирована под заказчика. */
function calcCompanyCompleteness(c) {
  let s = 0;
  if (c.companyName) s += 15;
  if (c.logo) s += 10;
  if (c.sector) s += 10;
  if (c.about) s += 10;
  if (c.contactFirstName && c.contactLastName) s += 10;
  if (c.contactEmail || c.contactPhone) s += 10;
  if (c.customerType) s += 10;
  if ((c.customerType === "ip" || c.customerType === "ooo") ? c.innVerified : c.customerType) s += 10;
  if (c.paymentMethod) s += 10;
  if (c.publishedFirstTask) s += 5;
  return Math.min(100, s);
}

/* localStorage ключ — отдельный, чтобы не конфликтовать со студентом. */
const COMPANY_STORAGE_KEY = "studradar.customer.v1";

function loadCompany() {
  try {
    const raw = localStorage.getItem(COMPANY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}
function saveCompany(c) { try { localStorage.setItem(COMPANY_STORAGE_KEY, JSON.stringify(c)); } catch (e) {} }
function clearCompany() { try { localStorage.removeItem(COMPANY_STORAGE_KEY); } catch (e) {} }

Object.assign(window, {
  CUSTOMER_TYPES, BUSINESS_SECTORS, COMPANY_SIZES, TASK_VOLUMES, TASK_TEMPLATES,
  EMPTY_COMPANY, DEMO_COMPANY,
  TASK_STATUSES,
  C_TASKS, C_RESPONSES, C_DEALS, C_PAYMENTS, C_DOCS, C_PERFORMERS, C_NOTIFS,
  calcCompanyCompleteness, loadCompany, saveCompany, clearCompany
});
