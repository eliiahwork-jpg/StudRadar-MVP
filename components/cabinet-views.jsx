/* === Cabinet views (dashboard, catalog, responses, deals, profile, wallet, notifications, settings) === */
const { useState: useStateV, useMemo: useMemoV } = React;

/* ─────────── Shared bits ─────────── */
function CompletenessCard({ profile, onEdit }) {
  const pct = calcCompleteness(profile);
  const todos = [];
  if (!profile.avatar) todos.push("Загрузить аватар");
  if (!profile.about) todos.push("Написать «о себе»");
  if (profile.tags.length < 3) todos.push("Добавить минимум 3 навыка");
  if (profile.selfEmployedStatus !== "Оформлен" || !profile.innVerified) todos.push("Оформить самозанятость");
  if (profile.portfolio.length < 3) todos.push("Добавить ещё кейсы в портфолио");

  return (
    <div className="cab-widget">
      <div className="cab-widget__head"><span>Заполненность профиля</span><Icon.User /></div>
      <div className="cab-progress">
        <div className="cab-progress__bar"><div className="cab-progress__fill" style={{ width: pct + "%" }} /></div>
        <span className="cab-progress__num">{pct}%</span>
      </div>
      {todos.length > 0 ? (
        <ul className="cab-todo-list">
          {todos.slice(0, 4).map((t) => <li key={t}>{t}</li>)}
        </ul>
      ) : (
        <div className="cab-widget__sub" style={{ color: "#1FB36A" }}>Профиль на 100% — заказчики тебя точно увидят.</div>
      )}
      <button className="cab-btn cab-btn-ghost" onClick={onEdit} style={{ marginTop: "auto" }}>Открыть профиль</button>
    </div>
  );
}

/* ─────────── Dashboard ─────────── */
function ViewDashboard({ profile, go }) {
  const myCats = profile.categories;
  const myTags = profile.tags;
  const matched = TASKS.filter((t) => myCats.includes(t.catId) || t.tags.some((tg) => myTags.includes(tg))).slice(0, 4);
  const fallback = matched.length > 0 ? matched : TASKS.slice(0, 4);
  const activeDeals = DEALS.filter((d) => d.status === "active");
  const monthIncome = WALLET_OPS.filter((o) => o.status === "Выплачено").reduce((s, o) => s + o.amount, 0);

  return (
    <>
      <h1 className="cab-h1">Привет, {profile.firstName || "студент"}!</h1>
      <p className="cab-lede">Сегодня для тебя {fallback.length} новых задач под навыки и {activeDeals.length} активные сделки.</p>

      <div className="cab-widgets">
        <CompletenessCard profile={profile} onEdit={() => go("profile")} />

        <div className="cab-widget">
          <div className="cab-widget__head"><span>Активные сделки</span><CabIcon.Handshake /></div>
          <div className="cab-widget__big">{activeDeals.length}</div>
          {activeDeals[0] && (
            <div className="cab-widget__sub">
              Ближайший дедлайн — <strong>{activeDeals[0].deadline}</strong><br />
              {activeDeals[0].title}
            </div>
          )}
          <button className="cab-btn cab-btn-ghost" onClick={() => go("deals")} style={{ marginTop: "auto" }}>Перейти к сделкам</button>
        </div>

        <div className="cab-widget">
          <div className="cab-widget__head"><span>Доход за месяц</span><CabIcon.Wallet /></div>
          <div className="cab-widget__big">{monthIncome.toLocaleString("ru-RU")} ₽</div>
          <div className="cab-widget__sub">
            <span className="cab-widget__pill">+22%</span>к прошлому месяцу
          </div>
          <button className="cab-btn cab-btn-ghost" onClick={() => go("wallet")} style={{ marginTop: "auto" }}>Открыть кошелёк</button>
        </div>

        <div className="cab-widget">
          <div className="cab-widget__head"><span>Новые задачи под тебя</span><Icon.Bolt /></div>
          <div className="cab-widget__big">{fallback.length}</div>
          <div className="cab-widget__sub">Подобраны по твоим тегам и категориям.</div>
          <button className="cab-btn cab-btn-primary" onClick={() => go("tasks")} style={{ marginTop: "auto" }}>Смотреть каталог</button>
        </div>
      </div>

      <div className="cab-section-head">
        <h2 className="cab-card__title" style={{ fontSize: 18 }}>Подходят под твои навыки</h2>
        <button className="cab-btn cab-btn-link" onClick={() => go("tasks")}>Все задачи →</button>
      </div>
      <TasksGrid tasks={fallback} />

      <div className="cab-section-head" style={{ marginTop: 28 }}>
        <h2 className="cab-card__title" style={{ fontSize: 18 }}>Лента уведомлений</h2>
        <button className="cab-btn cab-btn-link" onClick={() => go("notifications")}>Все →</button>
      </div>
      <div className="cab-list">
        {NOTIFS.slice(0, 3).map((n) => <NotifRow key={n.id} n={n} />)}
      </div>
    </>
  );
}

/* ─────────── Tasks catalog ─────────── */
function TasksGrid({ tasks }) {
  if (!tasks.length) {
    return (
      <div className="cab-empty">
        <div className="cab-empty__icon"><Icon.Search /></div>
        <div>Под выбранные фильтры задач пока нет — попробуй расширить навыки.</div>
      </div>
    );
  }
  return (
    <div className="cab-tasks-grid">
      {tasks.map((t) => (
        <article key={t.id} className="cab-task-card">
          <div className="cab-task-card__top">
            <span className="cab-task-card__cat">{t.category}</span>
            <Icon.Heart />
          </div>
          <div className="cab-task-card__pay">{t.pay.toLocaleString("ru-RU")} ₽<sub>за задание</sub></div>
          <h3 className="cab-task-card__title">{t.title}</h3>
          <div className="cab-task-card__meta">
            <div><Icon.Pin /> {t.place}</div>
            <div><Icon.Calendar /> {t.deadline}</div>
          </div>
          <div className="cab-task-card__actions">
            <button className="cab-btn cab-btn-accent" style={{ flex: 1 }} onClick={() => window.openRespondModal && window.openRespondModal({ cat: t.category, title: t.title, pay: t.pay.toLocaleString("ru-RU") + " ₽", per: " / задание", place: t.place, date: t.deadline })}>Откликнуться</button>
            <button className="cab-btn cab-btn-ghost">Подробнее</button>
          </div>
        </article>
      ))}
    </div>
  );
}

function ViewTasks({ profile }) {
  const [onlyMine, setOnlyMine] = useStateV(true);
  const [q, setQ] = useStateV("");

  const filtered = useMemoV(() => {
    return TASKS.filter((t) => {
      if (onlyMine && !(profile.categories.includes(t.catId) || t.tags.some((x) => profile.tags.includes(x)))) return false;
      if (q && !(t.title.toLowerCase().includes(q.toLowerCase()) || t.category.toLowerCase().includes(q.toLowerCase()))) return false;
      return true;
    });
  }, [onlyMine, q, profile]);

  return (
    <>
      <div className="cab-section-head">
        <div>
          <h1 className="cab-h1">Каталог задач</h1>
          <p className="cab-lede">Сегодня в ленте {TASKS.length} задач. Лимит откликов на бесплатном тарифе — 5 в день.</p>
        </div>
        <button className="cab-btn cab-btn-outline">+ PRO без лимитов</button>
      </div>

      <div className="cab-filters">
        <button className={"cab-radio " + (onlyMine ? "is-on" : "")} onClick={() => setOnlyMine(!onlyMine)}>Только под мои навыки</button>
        <input className="cab-input" placeholder="Поиск по названию…" value={q} onChange={(e) => setQ(e.target.value)} style={{ minWidth: 240 }} />
        <button className="cab-btn cab-btn-ghost"><CabIcon.Filter /> Фильтры</button>
      </div>

      <TasksGrid tasks={filtered} />
    </>
  );
}

/* ─────────── Responses ─────────── */
const RESPONSE_STATUSES = {
  review: { label: "В рассмотрении", cls: "cab-status--review" },
  accepted: { label: "Принят", cls: "cab-status--accepted" },
  rejected: { label: "Отклонён", cls: "cab-status--rejected" },
  expired: { label: "Истёк", cls: "cab-status--expired" }
};

function ViewResponses() {
  const [filter, setFilter] = useStateV("all");
  const [tick, setTick] = useStateV(0);

  /* подгружаем «живые» отклики из localStorage и реагируем на их обновления */
  React.useEffect(() => {
    const onUpd = () => setTick((t) => t + 1);
    window.addEventListener("studradar:responses-updated", onUpd);
    return () => window.removeEventListener("studradar:responses-updated", onUpd);
  }, []);

  const liveRaw = (typeof window.studradarLoadResponses === "function" ? window.studradarLoadResponses() : []);
  const live = liveRaw.map((r) => ({
    id: "live-" + r.id,
    status: r.status || "review",
    date: new Date(r.createdAt).toLocaleDateString("ru-RU", { day:"2-digit", month:"long" }),
    title: r.task?.title || "Задача",
    customer: r.task?.cat || "Заказчик",
    isLive: true,
    comment: r.comment,
    bid: r.priceMode === "negotiate" ? r.bidPrice : null,
  }));

  const merged = [...live, ...RESPONSES];
  const list = filter === "all" ? merged : merged.filter((r) => r.status === filter);

  return (
    <>
      <h1 className="cab-h1">Мои отклики</h1>
      <p className="cab-lede">Всего откликов: {merged.length}. Принято: {merged.filter((r) => r.status === "accepted").length}.</p>

      <div className="cab-filters">
        <button className={"cab-radio " + (filter === "all" ? "is-on" : "")} onClick={() => setFilter("all")}>Все</button>
        {Object.keys(RESPONSE_STATUSES).map((k) => (
          <button key={k} className={"cab-radio " + (filter === k ? "is-on" : "")} onClick={() => setFilter(k)}>
            {RESPONSE_STATUSES[k].label}
          </button>
        ))}
      </div>

      <div className="cab-list">
        {list.map((r) => (
          <div key={r.id} className="cab-list__row">
            <div>
              <div className="cab-list__title">
                {r.title} {r.isLive && <span className="cab-badge cab-badge--info" style={{ marginLeft: 8 }}>Только что</span>}
              </div>
              <div className="cab-list__sub">
                {r.customer} · отклик {r.date}
                {r.bid && <> · ваше предложение <strong>{r.bid} ₽</strong></>}
              </div>
              {r.comment && <div className="cab-list__sub" style={{ marginTop: 6, fontStyle: "italic" }}>«{r.comment.length > 140 ? r.comment.slice(0, 140) + "…" : r.comment}»</div>}
            </div>
            <span className={"cab-status " + RESPONSE_STATUSES[r.status].cls}>{RESPONSE_STATUSES[r.status].label}</span>
            <button className="cab-btn cab-btn-ghost" disabled={r.status !== "accepted"}>Связаться</button>
          </div>
        ))}
        {list.length === 0 && (
          <div className="cab-empty">
            <div className="cab-empty__icon"><CabIcon.Inbox /></div>
            <div>В этой категории откликов пока нет.</div>
          </div>
        )}
      </div>
    </>
  );
}

/* ─────────── Deals ─────────── */
function ViewDeals() {
  const [tab, setTab] = useStateV("active");
  const list = DEALS.filter((d) => d.status === tab);

  return (
    <>
      <h1 className="cab-h1">Мои сделки</h1>
      <p className="cab-lede">Эскроу заблокирован, пока заказчик не примет работу. Если что-то пошло не так — открывай спор.</p>

      <div className="cab-tabs">
        <button className={"cab-tab " + (tab === "active" ? "is-active" : "")} onClick={() => setTab("active")}>Активные</button>
        <button className={"cab-tab " + (tab === "done" ? "is-active" : "")} onClick={() => setTab("done")}>Завершённые</button>
        <button className={"cab-tab " + (tab === "dispute" ? "is-active" : "")} onClick={() => setTab("dispute")}>Спорные</button>
      </div>

      <div className="cab-list">
        {list.map((d) => (
          <div key={d.id} className="cab-list__row" style={{ gridTemplateColumns: "1fr auto auto auto" }}>
            <div>
              <div className="cab-list__title">{d.title}</div>
              <div className="cab-list__sub">{d.customer} · до {d.deadline}</div>
            </div>
            <div style={{ fontFamily: "'Tektur', monospace", fontWeight: 700, fontSize: 18, color: "#0E1530" }}>
              {d.amount.toLocaleString("ru-RU")} ₽
            </div>
            <span className={"cab-status " + (d.status === "active" ? "cab-status--active" : "cab-status--done")}>{d.phase}</span>
            <button className="cab-btn cab-btn-primary">Открыть</button>
          </div>
        ))}
        {list.length === 0 && (
          <div className="cab-empty">
            <div className="cab-empty__icon"><CabIcon.Handshake /></div>
            <div>Сделок в этом разделе пока нет.</div>
          </div>
        )}
      </div>
    </>
  );
}

/* ─────────── Profile ─────────── */
function ViewProfile({ profile, update }) {
  const [tab, setTab] = useStateV("view");
  return (
    <>
      <div className="cab-section-head">
        <h1 className="cab-h1">Профиль</h1>
        <div className="cab-tabs" style={{ borderBottom: "none", marginBottom: 0 }}>
          <button className={"cab-tab " + (tab === "view" ? "is-active" : "")} onClick={() => setTab("view")}><CabIcon.Eye /> Как видит заказчик</button>
          <button className={"cab-tab " + (tab === "edit" ? "is-active" : "")} onClick={() => setTab("edit")}><Icon.Pen /> Редактирование</button>
        </div>
      </div>
      {tab === "view" ? <ProfileView profile={profile} /> : <ProfileEdit profile={profile} update={update} />}
    </>
  );
}

function ProfileView({ profile }) {
  const initials = ((profile.firstName?.[0] || "") + (profile.lastName?.[0] || "")).toUpperCase() || "?";
  const fullName = [profile.lastName, profile.firstName, profile.middleName].filter(Boolean).join(" ");
  const cats = SKILL_CATEGORIES.filter((c) => profile.categories.includes(c.id));

  return (
    <>
      <div className="cab-profile-head">
        <div className="cab-profile-head__avatar">{profile.avatar ? <img src={profile.avatar} alt="" /> : initials}</div>
        <div>
          <h2 className="cab-profile-head__name">{fullName || "—"}</h2>
          <div className="cab-profile-head__sub">
            {profile.university ? profile.university.split(" — ")[0] : "—"} · {profile.course || "курс не указан"} · {profile.city}
          </div>
          <div className="cab-badges">
            {profile.university?.startsWith("ЮГУ") && <span className="cab-badge cab-badge--info">Студент ЮГУ</span>}
            {profile.innVerified && <span className="cab-badge cab-badge--ok">Самозанятый ✓</span>}
            <span className="cab-badge">Базовый</span>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "'Tektur', monospace", fontSize: 22, fontWeight: 700 }}>4.9 ★</div>
          <div style={{ fontSize: 12, color: "#5A6478" }}>{profile.portfolio.length} кейсов · 12 сделок</div>
        </div>
      </div>

      {profile.about && (
        <div className="cab-profile-section">
          <h3>// О себе</h3>
          <p style={{ margin: 0, lineHeight: 1.6, color: "#0E1530" }}>{profile.about}</p>
        </div>
      )}

      <div className="cab-profile-section">
        <h3>// Категории и навыки</h3>
        {cats.length === 0 && <div style={{ color: "#5A6478", fontSize: 13 }}>Не выбраны.</div>}
        {cats.map((c) => (
          <div key={c.id} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{c.title}</div>
            <div className="cab-tags">
              {c.tags.filter((t) => profile.tags.includes(t)).map((t) => (
                <span key={t} className="cab-tag is-on" style={{ cursor: "default" }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="cab-profile-section">
        <h3>// Портфолио</h3>
        {profile.portfolio.length === 0 && (
          <div style={{ color: "#5A6478", fontSize: 13 }}>Кейсов пока нет — добавь первый, чтобы заказчики чаще откликались.</div>
        )}
        {profile.portfolio.map((c) => (
          <div key={c.id} style={{ padding: "12px 0", borderBottom: "1px solid #EEF1F5" }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>{c.title}</div>
            <div style={{ fontSize: 13.5, color: "#5A6478", marginBottom: 6 }}>{c.description}</div>
            {c.link && <a href={c.link} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: "#0040A0" }}>{c.link}</a>}
          </div>
        ))}
      </div>
    </>
  );
}

function ProfileEdit({ profile, update }) {
  return (
    <>
      <div className="cab-profile-section">
        <h3>// Учёба</h3>
        <OnbStudy profile={profile} update={update} />
      </div>
      <div className="cab-profile-section">
        <h3>// Профиль</h3>
        <OnbProfile profile={profile} update={update} />
      </div>
      <div className="cab-profile-section">
        <h3>// Навыки</h3>
        <OnbSkills profile={profile} update={update} />
      </div>
      <div className="cab-profile-section">
        <h3>// Самозанятость</h3>
        <OnbSelfEmp profile={profile} update={update} />
      </div>
      <div className="cab-profile-section">
        <h3>// Портфолио</h3>
        <OnbPortfolio profile={profile} update={update} />
      </div>
    </>
  );
}

/* ─────────── Wallet ─────────── */
function ViewWallet() {
  const balance = WALLET_OPS.filter((o) => o.status === "Заблокировано").reduce((s, o) => s + o.amount, 0);
  const month = WALLET_OPS.filter((o) => o.status === "Выплачено").reduce((s, o) => s + o.amount, 0);
  const tax = Math.round(month * 0.06);

  return (
    <>
      <h1 className="cab-h1">Кошелёк</h1>
      <p className="cab-lede">Налог считается автоматически: 4% — с физлиц, 6% — с компаний. Чек формируется одной кнопкой через «Мой налог».</p>

      <div className="cab-wallet-balance">
        <div>
          <div className="cab-wallet-balance__label">// Доступно к выводу</div>
          <div className="cab-wallet-balance__num">{balance.toLocaleString("ru-RU")} ₽</div>
          <div style={{ fontSize: 13, opacity: 0.7, marginTop: 4 }}>
            За месяц получено: {month.toLocaleString("ru-RU")} ₽ · налог ≈ {tax.toLocaleString("ru-RU")} ₽
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="cab-btn cab-btn-accent cab-btn-lg">Вывести</button>
          <button className="cab-btn cab-btn-outline cab-btn-lg" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff" }}>Сформировать чек</button>
        </div>
      </div>

      <div className="cab-card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="cab-wallet-table">
          <thead>
            <tr><th>Дата</th><th>Задача</th><th>Заказчик</th><th>Сумма</th><th>Статус</th></tr>
          </thead>
          <tbody>
            {WALLET_OPS.map((o, i) => (
              <tr key={i}>
                <td>{o.date}</td>
                <td>{o.task}</td>
                <td>{o.customer}</td>
                <td><strong>{o.amount.toLocaleString("ru-RU")} ₽</strong></td>
                <td>
                  <span className={"cab-status " + (o.status === "Выплачено" ? "cab-status--done" : "cab-status--review")}>{o.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ─────────── Notifications ─────────── */
function NotifRow({ n }) {
  const Ic = CabIcon[n.icon] || Icon[n.icon] || CabIcon.Info;
  return (
    <div className={"cab-notif-row " + (n.unread ? "is-unread" : "")}>
      <div className="cab-notif-row__icon"><Ic /></div>
      <div>
        <div className="cab-notif-row__title">{n.title}</div>
        <div className="cab-notif-row__time">{n.time}</div>
      </div>
    </div>
  );
}

function ViewNotifications() {
  const [filter, setFilter] = useStateV("all");
  const list = filter === "all" ? NOTIFS : NOTIFS.filter((n) => n.type === filter);

  return (
    <>
      <h1 className="cab-h1">Уведомления</h1>
      <p className="cab-lede">Настрой каналы доставки в разделе «Настройки» — push, email или Telegram-бот.</p>

      <div className="cab-filters">
        {[
          ["all", "Все"], ["response", "Отклики"], ["deal", "Сделки"],
          ["wallet", "Выплаты"], ["system", "Системные"]
        ].map(([k, l]) => (
          <button key={k} className={"cab-radio " + (filter === k ? "is-on" : "")} onClick={() => setFilter(k)}>{l}</button>
        ))}
      </div>

      <div className="cab-list">
        {list.map((n) => <NotifRow key={n.id} n={n} />)}
      </div>
    </>
  );
}

/* ─────────── Settings ─────────── */
function ViewSettings({ profile, update, reset }) {
  return (
    <>
      <h1 className="cab-h1">Настройки</h1>
      <p className="cab-lede">Аккаунт, приватность, подписка и каналы уведомлений — всё в одном месте.</p>

      <div className="cab-profile-section">
        <h3>// Аккаунт</h3>
        <div className="cab-form-grid">
          <div className="cab-field">
            <label className="cab-field__label">Email</label>
            <input className="cab-input" value={profile.email} onChange={(e) => update({ email: e.target.value })} />
            <span className="cab-field__hint">При смене email потребуется повторное подтверждение.</span>
          </div>
          <div className="cab-field">
            <label className="cab-field__label">Телефон</label>
            <input className="cab-input" value={profile.phone} onChange={(e) => update({ phone: e.target.value })} />
          </div>
          <div className="cab-field">
            <label className="cab-field__label">Новый пароль</label>
            <input className="cab-input" type="password" placeholder="••••••••" />
            <span className="cab-field__hint">Минимум 8 символов, 1 цифра и 1 буква.</span>
          </div>
        </div>
      </div>

      <div className="cab-profile-section">
        <h3>// Приватность</h3>
        <label className="cab-checkbox"><input type="checkbox" defaultChecked /> Скрывать контакты до заключения сделки</label>
        <label className="cab-checkbox"><input type="checkbox" defaultChecked /> Не показывать дату рождения публично</label>
        <label className="cab-checkbox"><input type="checkbox" /> Скрывать профиль от всех, кроме заказчиков</label>
      </div>

      <div className="cab-profile-section">
        <h3>// Подписка PRO</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
          <span className="cab-badge">Базовый тариф</span>
          <span style={{ fontSize: 13, color: "#5A6478", flex: 1 }}>Безлимит откликов, приоритет в выдаче, верифицированный значок — 290 ₽/мес.</span>
          <button className="cab-btn cab-btn-accent">Подключить PRO</button>
        </div>
      </div>

      <div className="cab-profile-section">
        <h3>// Каналы уведомлений</h3>
        <label className="cab-checkbox"><input type="checkbox" defaultChecked /> Email</label>
        <label className="cab-checkbox"><input type="checkbox" defaultChecked /> Push в браузере</label>
        <label className="cab-checkbox"><input type="checkbox" /> Telegram-бот</label>
      </div>

      <div className="cab-profile-section" style={{ borderColor: "#FFE4DE" }}>
        <h3 style={{ color: "#C04331" }}>// Опасная зона</h3>
        <button className="cab-btn cab-btn-ghost" onClick={() => { if (confirm("Сбросить кабинет и пройти онбординг заново?")) reset(); }}>
          Сбросить демо-данные и онбординг
        </button>
        <button className="cab-btn cab-btn-ghost" style={{ marginLeft: 10, color: "#C04331" }}>Удалить аккаунт</button>
      </div>
    </>
  );
}

window.CabinetViews = {
  Dashboard: ViewDashboard,
  Tasks: ViewTasks,
  Responses: ViewResponses,
  Deals: ViewDeals,
  Profile: ViewProfile,
  Wallet: ViewWallet,
  Notifications: ViewNotifications,
  Settings: ViewSettings
};
