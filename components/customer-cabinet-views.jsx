/* === Customer cabinet views === */
const { useState: useStateCv, useMemo: useMemoCv } = React;

/* ─────────── Shared bits ─────────── */
function CCompletenessCard({ company, onEdit }) {
  const pct = calcCompanyCompleteness(company);
  const todos = [];
  if (!company.logo) todos.push("Загрузить логотип");
  if (!company.about) todos.push("Описание компании");
  if (!company.paymentMethod) todos.push("Указать реквизиты для эскроу");
  if ((company.customerType === "ip" || company.customerType === "ooo") && !company.innVerified) todos.push("Подтвердить ИНН");

  return (
    <div className="cab-widget">
      <div className="cab-widget__head"><span>Заполненность профиля</span><Icon.Briefcase /></div>
      <div className="cab-progress">
        <div className="cab-progress__bar"><div className="cab-progress__fill" style={{ width: pct + "%" }} /></div>
        <span className="cab-progress__num">{pct}%</span>
      </div>
      {todos.length > 0 ? (
        <ul className="cab-todo-list">{todos.slice(0, 4).map((t) => <li key={t}>{t}</li>)}</ul>
      ) : (
        <div className="cab-widget__sub" style={{ color: "#1FB36A" }}>Профиль на 100% — отклики идут активнее.</div>
      )}
      <button className="cab-btn cab-btn-ghost" onClick={onEdit} style={{ marginTop: "auto" }}>Открыть профиль</button>
    </div>
  );
}

/* ─────────── Dashboard ─────────── */
function CViewDashboard({ company, go }) {
  const activeTasks = C_TASKS.filter((t) => t.status === "published" || t.status === "inwork" || t.status === "review");
  const newResponses = C_RESPONSES.length;
  const inEscrow = C_DEALS.filter((d) => d.status === "active").reduce((s, d) => s + d.escrow, 0);
  const monthSpent = C_PAYMENTS.filter((p) => p.amount < 0 && p.status === "Выплачено").reduce((s, p) => s - p.amount, 0);

  return (
    <>
      <h1 className="cab-h1">Кабинет, {company.companyName ? company.companyName.replace(/^Студия |«|»/g, "") : "заказчик"}!</h1>
      <p className="cab-lede">Сегодня в работе {activeTasks.length} задач и {newResponses} новых откликов. Заблокировано в эскроу — {inEscrow.toLocaleString("ru-RU")} ₽.</p>

      <div className="cab-widgets">
        <CCompletenessCard company={company} onEdit={() => go("company")} />

        <div className="cab-widget">
          <div className="cab-widget__head"><span>Активные задачи</span><CabIcon.List /></div>
          <div className="cab-widget__big">{activeTasks.length}</div>
          <div className="cab-widget__sub">
            <span className="cab-widget__pill">{C_TASKS.filter((t) => t.status === "published").length} ищут исполнителя</span>
            <span className="cab-widget__pill">{C_TASKS.filter((t) => t.status === "inwork").length} в работе</span>
          </div>
          <button className="cab-btn cab-btn-ghost" onClick={() => go("tasks")} style={{ marginTop: "auto" }}>К задачам</button>
        </div>

        <div className="cab-widget">
          <div className="cab-widget__head"><span>Расход за месяц</span><CabIcon.Wallet /></div>
          <div className="cab-widget__big">{monthSpent.toLocaleString("ru-RU")} ₽</div>
          <div className="cab-widget__sub">В эскроу: <strong>{inEscrow.toLocaleString("ru-RU")} ₽</strong></div>
          <button className="cab-btn cab-btn-ghost" onClick={() => go("payments")} style={{ marginTop: "auto" }}>Открыть платежи</button>
        </div>

        <div className="cab-widget">
          <div className="cab-widget__head"><span>Новые отклики</span><CabIcon.Inbox /></div>
          <div className="cab-widget__big">{newResponses}</div>
          <div className="cab-widget__sub">{C_RESPONSES.filter((r) => r.pro).length} от PRO-исполнителей</div>
          <button className="cab-btn cab-btn-primary" onClick={() => go("responses")} style={{ marginTop: "auto" }}>Смотреть отклики</button>
        </div>
      </div>

      <div className="cab-section-head">
        <h2 className="cab-card__title" style={{ fontSize: 18 }}>Подходящие исполнители</h2>
        <button className="cab-btn cab-btn-link" onClick={() => go("performers")}>Все →</button>
      </div>
      <div className="cab-tasks-grid">
        {C_PERFORMERS.slice(0, 3).map((p) => <PerformerCard key={p.id} p={p} />)}
      </div>

      <div className="cab-section-head" style={{ marginTop: 28 }}>
        <h2 className="cab-card__title" style={{ fontSize: 18 }}>Лента уведомлений</h2>
        <button className="cab-btn cab-btn-link" onClick={() => go("notifications")}>Все →</button>
      </div>
      <div className="cab-list">{C_NOTIFS.slice(0, 3).map((n) => <CNotifRow key={n.id} n={n} />)}</div>
    </>
  );
}

/* ─────────── Performer card ─────────── */
function PerformerCard({ p, onHire }) {
  const initials = p.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <article className="cab-task-card">
      <div className="cab-task-card__top">
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div className="cab-side-foot__avatar" style={{ width: 40, height: 40, fontSize: 13 }}>{initials}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div>
            <div style={{ fontSize: 12, color: "#5A6478" }}>{p.uni} · {p.course}</div>
          </div>
        </div>
        <Icon.Heart />
      </div>
      <div className="cab-task-card__pay">{p.rating} ★ <sub>{p.deals} сделок</sub></div>
      <div className="cab-tags">
        {p.tags.slice(0, 3).map((t) => <span key={t} className="cab-tag" style={{ cursor: "default" }}>{t}</span>)}
      </div>
      <div className="cab-badges">
        {p.badges.map((b) => (
          <span key={b} className={"cab-badge " + (b === "PRO" ? "cab-badge--accent" : b === "Самозанятый" ? "cab-badge--ok" : "cab-badge--info")}>{b}</span>
        ))}
      </div>
      <div className="cab-task-card__actions">
        <button className="cab-btn cab-btn-primary" style={{ flex: 1 }} onClick={onHire}>Пригласить</button>
        <button className="cab-btn cab-btn-ghost">Профиль</button>
      </div>
    </article>
  );
}

/* ─────────── My tasks ─────────── */
function CViewTasks({ go }) {
  const [filter, setFilter] = useStateCv("all");
  const list = filter === "all" ? C_TASKS : C_TASKS.filter((t) => t.status === filter);

  return (
    <>
      <div className="cab-section-head">
        <div>
          <h1 className="cab-h1">Мои задачи</h1>
          <p className="cab-lede">Всего: {C_TASKS.length}. В работе: {C_TASKS.filter((t) => t.status === "inwork").length}. Черновиков: {C_TASKS.filter((t) => t.status === "draft").length}.</p>
        </div>
        <button className="cab-btn cab-btn-accent cab-btn-lg" onClick={() => go("newTask")}><Icon.Plus /> Новая задача</button>
      </div>

      <div className="cab-filters">
        <button className={"cab-radio " + (filter === "all" ? "is-on" : "")} onClick={() => setFilter("all")}>Все</button>
        {Object.keys(TASK_STATUSES).map((k) => (
          <button key={k} className={"cab-radio " + (filter === k ? "is-on" : "")} onClick={() => setFilter(k)}>{TASK_STATUSES[k].label}</button>
        ))}
      </div>

      <div className="cab-list">
        {list.map((t) => (
          <div key={t.id} className="cab-list__row" style={{ gridTemplateColumns: "1fr auto auto auto" }}>
            <div>
              <div className="cab-list__title">{t.title}</div>
              <div className="cab-list__sub">
                {t.catLabel} · {t.place} · {t.deadline}
                {t.performer && <> · <strong>исполнитель: {t.performer}</strong></>}
              </div>
            </div>
            <div style={{ fontFamily: "'Tektur', monospace", fontWeight: 700, fontSize: 18 }}>{t.pay.toLocaleString("ru-RU")} ₽</div>
            <div style={{ fontSize: 12.5, color: "#5A6478", textAlign: "right", minWidth: 96 }}>
              {t.status !== "draft" && <>{t.responses} откликов<br />{t.views} просмотров</>}
            </div>
            <span className={"cab-status " + TASK_STATUSES[t.status].cls}>{TASK_STATUSES[t.status].label}</span>
          </div>
        ))}
        {list.length === 0 && (
          <div className="cab-empty">
            <div className="cab-empty__icon"><CabIcon.List /></div>
            <div>В этой категории задач пока нет.</div>
          </div>
        )}
      </div>
    </>
  );
}

/* ─────────── New task — конструктор задачи ─────────── */
function CViewNewTask({ company, prefill, go }) {
  const [t, setT] = useStateCv({
    title: prefill?.title || "",
    category: prefill?.category || (company.preferredCategories[0] || ""),
    tags: prefill?.tags || [],
    description: "",
    payType: "fixed",
    pay: prefill?.pay || "",
    place: "remote",
    address: "",
    deadline: "",
    requireSelf: false,
    requirePro: false
  });

  const cat = SKILL_CATEGORIES.find((c) => c.id === t.category);

  const toggleTag = (tag) => {
    setT(t.tags.includes(tag)
      ? { ...t, tags: t.tags.filter((x) => x !== tag) }
      : { ...t, tags: [...t.tags, tag] });
  };

  const canPublish = t.title && t.category && t.description && t.pay && t.deadline;

  return (
    <>
      <div className="cab-section-head">
        <div>
          <h1 className="cab-h1">Новая задача</h1>
          <p className="cab-lede">Бюджет блокируется в эскроу только в момент назначения исполнителя. Можно сохранить как черновик и опубликовать позже.</p>
        </div>
        <button className="cab-btn cab-btn-ghost" onClick={() => go("tasks")}><CabIcon.ChevronLeft /> К задачам</button>
      </div>

      <div className="cab-form-grid cab-form-grid--1">
        <div className="cab-card">
          <div className="cab-card__title" style={{ marginBottom: 10 }}>// Основное</div>
          <div className="cab-form-grid">
            <div className="cab-field" style={{ gridColumn: "1 / -1" }}>
              <label className="cab-field__label">Название задачи *</label>
              <input className="cab-input" placeholder="Например: «Сделать лендинг на Tilda»" value={t.title} onChange={(e) => setT({ ...t, title: e.target.value })} />
            </div>
            <div className="cab-field">
              <label className="cab-field__label">Категория *</label>
              <select className="cab-select" value={t.category} onChange={(e) => setT({ ...t, category: e.target.value, tags: [] })}>
                <option value="">— Выберите категорию —</option>
                {SKILL_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
            </div>
            <div className="cab-field">
              <label className="cab-field__label">Дедлайн *</label>
              <input className="cab-input" type="date" value={t.deadline} onChange={(e) => setT({ ...t, deadline: e.target.value })} />
            </div>
            <div className="cab-field" style={{ gridColumn: "1 / -1" }}>
              <label className="cab-field__label">Описание задачи *</label>
              <textarea className="cab-textarea" placeholder="Что нужно сделать, чем измеряется результат, ссылки на референсы…" value={t.description} onChange={(e) => setT({ ...t, description: e.target.value })} />
            </div>
            {cat && (
              <div className="cab-field" style={{ gridColumn: "1 / -1" }}>
                <label className="cab-field__label">Нужные навыки</label>
                <div className="cab-tags">
                  {cat.tags.map((tag) => (
                    <button key={tag} type="button" className={"cab-tag " + (t.tags.includes(tag) ? "is-on" : "")} onClick={() => toggleTag(tag)}>{tag}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="cab-card">
          <div className="cab-card__title" style={{ marginBottom: 10 }}>// Бюджет и формат</div>
          <div className="cab-form-grid">
            <div className="cab-field">
              <label className="cab-field__label">Тип бюджета</label>
              <div className="cab-radio-group">
                <button type="button" className={"cab-radio " + (t.payType === "fixed" ? "is-on" : "")} onClick={() => setT({ ...t, payType: "fixed" })}>Фиксированный</button>
                <button type="button" className={"cab-radio " + (t.payType === "negotiable" ? "is-on" : "")} onClick={() => setT({ ...t, payType: "negotiable" })}>Договорной</button>
              </div>
            </div>
            <div className="cab-field">
              <label className="cab-field__label">Бюджет, ₽ *</label>
              <input className="cab-input" type="number" placeholder="7500" value={t.pay} onChange={(e) => setT({ ...t, pay: e.target.value })} />
              <span className="cab-field__hint">Комиссия СтудРадар — 7% от суммы.</span>
            </div>
            <div className="cab-field">
              <label className="cab-field__label">Формат</label>
              <div className="cab-radio-group">
                <button type="button" className={"cab-radio " + (t.place === "remote" ? "is-on" : "")} onClick={() => setT({ ...t, place: "remote" })}>Удалённо</button>
                <button type="button" className={"cab-radio " + (t.place === "onsite" ? "is-on" : "")} onClick={() => setT({ ...t, place: "onsite" })}>На месте</button>
                <button type="button" className={"cab-radio " + (t.place === "hybrid" ? "is-on" : "")} onClick={() => setT({ ...t, place: "hybrid" })}>Гибрид</button>
              </div>
            </div>
            {t.place !== "remote" && (
              <div className="cab-field">
                <label className="cab-field__label">Адрес</label>
                <input className="cab-input" placeholder="Ханты-Мансийск, ул. ..." value={t.address} onChange={(e) => setT({ ...t, address: e.target.value })} />
              </div>
            )}
          </div>
        </div>

        <div className="cab-card">
          <div className="cab-card__title" style={{ marginBottom: 10 }}>// Требования к исполнителю</div>
          <label className="cab-checkbox"><input type="checkbox" checked={t.requireSelf} onChange={(e) => setT({ ...t, requireSelf: e.target.checked })} /> Только самозанятые (нужны для закрывающих документов)</label>
          <label className="cab-checkbox"><input type="checkbox" checked={t.requirePro} onChange={(e) => setT({ ...t, requirePro: e.target.checked })} /> Только PRO-исполнители (рейтинг 4.5+ и опыт 5+ сделок)</label>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
        <button className="cab-btn cab-btn-ghost cab-btn-lg" onClick={() => go("tasks")}>Сохранить как черновик</button>
        <button className="cab-btn cab-btn-accent cab-btn-lg" disabled={!canPublish} onClick={() => { alert("Задача отправлена на модерацию (демо). После проверки появится в каталоге."); go("tasks"); }}>
          Опубликовать задачу
        </button>
      </div>
    </>
  );
}

/* ─────────── Responses (отклики на мои задачи) ─────────── */
function CViewResponses() {
  const [taskFilter, setTaskFilter] = useStateCv("all");
  const list = taskFilter === "all" ? C_RESPONSES : C_RESPONSES.filter((r) => r.taskId === taskFilter);
  const tasksWithResponses = [...new Set(C_RESPONSES.map((r) => r.taskId))];

  return (
    <>
      <h1 className="cab-h1">Отклики</h1>
      <p className="cab-lede">Принимая отклик, бюджет блокируется в эскроу. Если что-то пошло не так — открывайте спор, средства не уйдут до решения.</p>

      <div className="cab-filters">
        <button className={"cab-radio " + (taskFilter === "all" ? "is-on" : "")} onClick={() => setTaskFilter("all")}>Все задачи</button>
        {tasksWithResponses.map((tId) => {
          const t = C_TASKS.find((x) => x.id === tId);
          return <button key={tId} className={"cab-radio " + (taskFilter === tId ? "is-on" : "")} onClick={() => setTaskFilter(tId)}>{t.title.slice(0, 28)}…</button>;
        })}
      </div>

      <div className="cab-list">
        {list.map((r) => {
          const initials = r.student.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
          return (
            <div key={r.id} className="cab-list__row" style={{ gridTemplateColumns: "auto 1fr auto auto" }}>
              <div className="cab-side-foot__avatar" style={{ width: 48, height: 48, fontSize: 14 }}>{initials}</div>
              <div>
                <div className="cab-list__title">{r.student} <span style={{ fontWeight: 500, color: "#5A6478" }}>· {r.rating} ★ · {r.deals} сделок</span></div>
                <div className="cab-list__sub" style={{ marginBottom: 6 }}>На задачу «{r.taskTitle}» · отклик {r.date}</div>
                <div style={{ fontSize: 13, color: "#0E1530", marginBottom: 6 }}>{r.message}</div>
                <div className="cab-badges">
                  {r.badges.map((b) => (
                    <span key={b} className={"cab-badge " + (b === "Самозанятый" ? "cab-badge--ok" : "cab-badge--info")}>{b}</span>
                  ))}
                  {r.pro && <span className="cab-badge cab-badge--accent">PRO</span>}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "'Tektur', monospace", fontWeight: 700, fontSize: 20 }}>{r.bid.toLocaleString("ru-RU")} ₽</div>
                <div style={{ fontSize: 11, color: "#5A6478" }}>предложение</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 140 }}>
                <button className="cab-btn cab-btn-accent">Принять</button>
                <button className="cab-btn cab-btn-ghost">Профиль</button>
                <button className="cab-btn cab-btn-link" style={{ color: "#C04331" }}>Отклонить</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ─────────── Deals ─────────── */
function CViewDeals() {
  const [tab, setTab] = useStateCv("active");
  const list = C_DEALS.filter((d) => d.status === tab);

  return (
    <>
      <h1 className="cab-h1">Сделки</h1>
      <p className="cab-lede">Эскроу разблокируется и уходит студенту, когда вы примете работу. Можно запросить доработку или открыть спор.</p>

      <div className="cab-tabs">
        <button className={"cab-tab " + (tab === "active" ? "is-active" : "")} onClick={() => setTab("active")}>Активные</button>
        <button className={"cab-tab " + (tab === "done" ? "is-active" : "")} onClick={() => setTab("done")}>Завершённые</button>
        <button className={"cab-tab " + (tab === "dispute" ? "is-active" : "")} onClick={() => setTab("dispute")}>Спорные</button>
      </div>

      <div className="cab-list">
        {list.map((d) => (
          <div key={d.id} className="cab-list__row" style={{ gridTemplateColumns: "1fr auto auto auto auto" }}>
            <div>
              <div className="cab-list__title">{d.title}</div>
              <div className="cab-list__sub">Исполнитель: <strong>{d.performer}</strong> · до {d.deadline}</div>
            </div>
            <div style={{ fontFamily: "'Tektur', monospace", fontWeight: 700, fontSize: 18 }}>{d.amount.toLocaleString("ru-RU")} ₽</div>
            <div style={{ fontSize: 12, color: "#5A6478", textAlign: "right" }}>
              {d.escrow > 0 ? <>в эскроу<br />{d.escrow.toLocaleString("ru-RU")} ₽</> : "выплачено"}
            </div>
            <span className={"cab-status " + (d.status === "active" ? "cab-status--active" : "cab-status--done")}>{d.phase}</span>
            <div style={{ display: "flex", gap: 6 }}>
              {d.phase === "На проверке" && <button className="cab-btn cab-btn-accent">Принять</button>}
              {d.phase === "В работе" && <button className="cab-btn cab-btn-ghost">Чат</button>}
              {d.status === "active" && <button className="cab-btn cab-btn-link" style={{ color: "#C04331" }}>Спор</button>}
              {d.status === "done" && <button className="cab-btn cab-btn-ghost">Документы</button>}
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <div className="cab-empty">
            <div className="cab-empty__icon"><CabIcon.Handshake /></div>
            <div>Сделок в этом разделе нет.</div>
          </div>
        )}
      </div>
    </>
  );
}

/* ─────────── Performers (поиск + избранные) ─────────── */
function CViewPerformers() {
  const [tab, setTab] = useStateCv("fav");
  const [q, setQ] = useStateCv("");

  const list = useMemoCv(() => {
    let arr = tab === "fav" ? C_PERFORMERS.filter((p) => p.fav)
            : tab === "history" ? C_PERFORMERS.filter((p) => p.hire > 0)
            : C_PERFORMERS;
    if (q) arr = arr.filter((p) =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(q.toLowerCase()))
    );
    return arr;
  }, [tab, q]);

  return (
    <>
      <h1 className="cab-h1">Исполнители</h1>
      <p className="cab-lede">Сохраняйте студентов, с которыми было удобно работать — приглашайте их на новые задачи в один клик.</p>

      <div className="cab-tabs">
        <button className={"cab-tab " + (tab === "fav" ? "is-active" : "")} onClick={() => setTab("fav")}>Избранные</button>
        <button className={"cab-tab " + (tab === "history" ? "is-active" : "")} onClick={() => setTab("history")}>История</button>
        <button className={"cab-tab " + (tab === "all" ? "is-active" : "")} onClick={() => setTab("all")}>Каталог</button>
      </div>

      <div className="cab-filters">
        <input className="cab-input" placeholder="Поиск по имени или навыку…" value={q} onChange={(e) => setQ(e.target.value)} style={{ minWidth: 260 }} />
      </div>

      <div className="cab-tasks-grid">
        {list.map((p) => <PerformerCard key={p.id} p={p} />)}
        {list.length === 0 && (
          <div className="cab-empty" style={{ gridColumn: "1 / -1" }}>
            <div className="cab-empty__icon"><Icon.User /></div>
            <div>В этом списке исполнителей пока нет.</div>
          </div>
        )}
      </div>
    </>
  );
}

/* ─────────── Payments ─────────── */
function CViewPayments({ company }) {
  const balance = C_PAYMENTS.reduce((s, p) => s + p.amount, 0);
  const inEscrow = C_DEALS.filter((d) => d.status === "active").reduce((s, d) => s + d.escrow, 0);
  const showLegalDocs = company.customerType === "ip" || company.customerType === "ooo";

  return (
    <>
      <h1 className="cab-h1">Платежи</h1>
      <p className="cab-lede">Баланс пополняется один раз — оттуда деньги уходят в эскроу под каждую сделку. Закрывающие документы формируются автоматически.</p>

      <div className="cab-wallet-balance">
        <div>
          <div className="cab-wallet-balance__label">// Баланс на платформе</div>
          <div className="cab-wallet-balance__num">{balance.toLocaleString("ru-RU")} ₽</div>
          <div style={{ fontSize: 13, opacity: 0.7, marginTop: 4 }}>
            В эскроу заблокировано: <strong>{inEscrow.toLocaleString("ru-RU")} ₽</strong>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="cab-btn cab-btn-accent cab-btn-lg">Пополнить</button>
          <button className="cab-btn cab-btn-outline cab-btn-lg" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff" }}>Вывести остаток</button>
        </div>
      </div>

      <div className="cab-card" style={{ padding: 0, overflow: "hidden", marginBottom: 18 }}>
        <table className="cab-wallet-table">
          <thead>
            <tr><th>Дата</th><th>Операция</th><th>Связано с</th><th>Сумма</th><th>Статус</th></tr>
          </thead>
          <tbody>
            {C_PAYMENTS.map((p, i) => (
              <tr key={i}>
                <td>{p.date}</td>
                <td>{p.op}</td>
                <td>{p.ref}</td>
                <td><strong style={{ color: p.amount > 0 ? "#1FB36A" : "#0E1530" }}>{p.amount > 0 ? "+" : ""}{p.amount.toLocaleString("ru-RU")} ₽</strong></td>
                <td>
                  <span className={"cab-status " + (p.status === "Зачислено" || p.status === "Выплачено" ? "cab-status--done" : "cab-status--review")}>{p.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showLegalDocs && (
        <>
          <div className="cab-section-head">
            <h2 className="cab-card__title" style={{ fontSize: 18 }}>Закрывающие документы</h2>
            <button className="cab-btn cab-btn-link">Скачать пакет за месяц →</button>
          </div>
          <div className="cab-card" style={{ padding: 0, overflow: "hidden" }}>
            <table className="cab-wallet-table">
              <thead><tr><th>Дата</th><th>Номер</th><th>Документ</th><th>Сделка</th><th>Сумма</th><th></th></tr></thead>
              <tbody>
                {C_DOCS.map((d, i) => (
                  <tr key={i}>
                    <td>{d.date}</td>
                    <td>{d.num}</td>
                    <td>{d.kind}</td>
                    <td>{d.deal}</td>
                    <td><strong>{d.amount.toLocaleString("ru-RU")} ₽</strong></td>
                    <td><button className="cab-btn cab-btn-ghost"><CabIcon.File /> PDF</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

/* ─────────── Company profile ─────────── */
function CViewCompany({ company, update }) {
  const [tab, setTab] = useStateCv("view");

  return (
    <>
      <div className="cab-section-head">
        <h1 className="cab-h1">Профиль компании</h1>
        <div className="cab-tabs" style={{ borderBottom: "none", marginBottom: 0 }}>
          <button className={"cab-tab " + (tab === "view" ? "is-active" : "")} onClick={() => setTab("view")}><CabIcon.Eye /> Как видит студент</button>
          <button className={"cab-tab " + (tab === "edit" ? "is-active" : "")} onClick={() => setTab("edit")}><Icon.Pen /> Редактирование</button>
        </div>
      </div>

      {tab === "view" ? <CompanyView company={company} /> : <CompanyEdit company={company} update={update} />}
    </>
  );
}

function CompanyView({ company }) {
  const initials = (company.companyName || "К").split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
  const typeLabel = (CUSTOMER_TYPES.find((t) => t.id === company.customerType) || {}).label || "—";

  return (
    <>
      <div className="cab-profile-head">
        <div className="cab-profile-head__avatar" style={{ borderRadius: 24 }}>
          {company.logo ? <img src={company.logo} alt="" /> : initials}
        </div>
        <div>
          <h2 className="cab-profile-head__name">{company.companyName || "—"}</h2>
          <div className="cab-profile-head__sub">{company.sector || "—"} · {company.companySize || "—"}</div>
          <div className="cab-badges">
            <span className="cab-badge cab-badge--info">{typeLabel}</span>
            {company.innVerified && <span className="cab-badge cab-badge--ok">ИНН подтверждён</span>}
            <span className="cab-badge">Постоянный заказчик</span>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "'Tektur', monospace", fontSize: 22, fontWeight: 700 }}>4.8 ★</div>
          <div style={{ fontSize: 12, color: "#5A6478" }}>оценка от студентов · {C_DEALS.filter((d) => d.status === "done").length} закрытых сделок</div>
        </div>
      </div>

      {company.about && (
        <div className="cab-profile-section">
          <h3>// О компании</h3>
          <p style={{ margin: 0, lineHeight: 1.6 }}>{company.about}</p>
          {company.website && <a href={company.website} target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: 10, color: "#0040A0" }}>{company.website}</a>}
        </div>
      )}

      <div className="cab-profile-section">
        <h3>// Контактное лицо</h3>
        <div className="cab-form-grid">
          <div><div style={{ fontSize: 12, color: "#5A6478" }}>ФИО</div><div style={{ fontWeight: 700 }}>{company.contactLastName} {company.contactFirstName}</div></div>
          <div><div style={{ fontSize: 12, color: "#5A6478" }}>Должность</div><div>{company.contactPosition || "—"}</div></div>
          <div><div style={{ fontSize: 12, color: "#5A6478" }}>Телефон</div><div>{company.contactPhone || "—"}</div></div>
          <div><div style={{ fontSize: 12, color: "#5A6478" }}>Email</div><div>{company.contactEmail || "—"}</div></div>
        </div>
        <div className="cab-field__hint" style={{ marginTop: 8 }}>Контакты раскрываются исполнителю только после принятия отклика.</div>
      </div>

      <div className="cab-profile-section">
        <h3>// Категории, по которым вы заказываете</h3>
        <div className="cab-tags">
          {company.preferredCategories.map((id) => {
            const c = SKILL_CATEGORIES.find((x) => x.id === id);
            return c ? <span key={id} className="cab-tag is-on" style={{ cursor: "default" }}>{c.title}</span> : null;
          })}
          {company.preferredCategories.length === 0 && <span style={{ fontSize: 13, color: "#5A6478" }}>Не выбраны.</span>}
        </div>
      </div>
    </>
  );
}

function CompanyEdit({ company, update }) {
  return (
    <>
      <div className="cab-profile-section"><h3>// Тип и реквизиты</h3><COnbType company={company} update={update} /></div>
      <div className="cab-profile-section"><h3>// Компания</h3><COnbCompany company={company} update={update} /></div>
      <div className="cab-profile-section"><h3>// Контактное лицо</h3><COnbContact company={company} update={update} /></div>
      <div className="cab-profile-section"><h3>// Категории</h3><COnbVolume company={company} update={update} /></div>
    </>
  );
}

/* ─────────── Notifications ─────────── */
function CNotifRow({ n }) {
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

function CViewNotifications() {
  const [filter, setFilter] = useStateCv("all");
  const list = filter === "all" ? C_NOTIFS : C_NOTIFS.filter((n) => n.type === filter);

  return (
    <>
      <h1 className="cab-h1">Уведомления</h1>
      <p className="cab-lede">Можно подключить Telegram-бот для команды и интеграцию со Slack — в настройках.</p>

      <div className="cab-filters">
        {[["all","Все"],["response","Отклики"],["deal","Сделки"],["wallet","Платежи"],["system","Системные"]].map(([k,l]) => (
          <button key={k} className={"cab-radio " + (filter === k ? "is-on" : "")} onClick={() => setFilter(k)}>{l}</button>
        ))}
      </div>

      <div className="cab-list">{list.map((n) => <CNotifRow key={n.id} n={n} />)}</div>
    </>
  );
}

/* ─────────── Settings ─────────── */
function CViewSettings({ company, update, reset }) {
  return (
    <>
      <h1 className="cab-h1">Настройки</h1>
      <p className="cab-lede">Аккаунт, сотрудники, интеграции, тариф — всё в одном месте.</p>

      <div className="cab-profile-section">
        <h3>// Аккаунт</h3>
        <div className="cab-form-grid">
          <div className="cab-field"><label className="cab-field__label">Email</label><input className="cab-input" value={company.email} onChange={(e) => update({ email: e.target.value })} /></div>
          <div className="cab-field"><label className="cab-field__label">Телефон</label><input className="cab-input" value={company.phone} onChange={(e) => update({ phone: e.target.value })} /></div>
        </div>
      </div>

      <div className="cab-profile-section">
        <h3>// Сотрудники с доступом</h3>
        <div className="cab-list">
          <div className="cab-list__row">
            <div>
              <div className="cab-list__title">{company.contactLastName} {company.contactFirstName}</div>
              <div className="cab-list__sub">{company.contactEmail} · владелец аккаунта</div>
            </div>
            <span className="cab-badge cab-badge--info">Полный доступ</span>
            <span style={{ width: 12 }} />
          </div>
        </div>
        <button className="cab-btn cab-btn-ghost" style={{ marginTop: 10 }}><Icon.Plus /> Пригласить менеджера</button>
        <div className="cab-field__hint" style={{ marginTop: 8 }}>Менеджеры могут вести задачи, но не видят платежи. Доступно с тарифа Бизнес.</div>
      </div>

      <div className="cab-profile-section">
        <h3>// Интеграции</h3>
        <label className="cab-checkbox"><input type="checkbox" /> Telegram-бот для уведомлений команде</label>
        <label className="cab-checkbox"><input type="checkbox" /> Webhook для AmoCRM / Bitrix24</label>
        <label className="cab-checkbox"><input type="checkbox" /> Авто-выгрузка закрывашек в 1С</label>
      </div>

      <div className="cab-profile-section">
        <h3>// Тариф</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
          <span className="cab-badge">Базовый</span>
          <span style={{ fontSize: 13, color: "#5A6478", flex: 1 }}>До 3 активных задач, комиссия 7%. Бизнес снимает лимиты, добавляет команду и интеграции — 990 ₽/мес.</span>
          <button className="cab-btn cab-btn-accent">Подключить Бизнес</button>
        </div>
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

window.CustomerViews = {
  Dashboard: CViewDashboard,
  Tasks: CViewTasks,
  NewTask: CViewNewTask,
  Responses: CViewResponses,
  Deals: CViewDeals,
  Performers: CViewPerformers,
  Payments: CViewPayments,
  Company: CViewCompany,
  Notifications: CViewNotifications,
  Settings: CViewSettings
};
