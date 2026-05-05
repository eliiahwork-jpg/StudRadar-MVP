/* === Customer cabinet shell === */
const { useState: useStateCs, useEffect: useEffectCs } = React;

const C_NAV_ITEMS = [
  { key: "dashboard",     label: "Главная",         icon: "Home" },
  { key: "tasks",         label: "Мои задачи",      icon: "List" },
  { key: "newTask",       label: "Новая задача",    icon: "Plus", emphasize: true },
  { key: "responses",     label: "Отклики",         icon: "Inbox",     badge: () => C_RESPONSES.length },
  { key: "deals",         label: "Сделки",          icon: "Handshake", badge: () => C_DEALS.filter((d) => d.status === "active").length },
  { key: "performers",    label: "Исполнители",     icon: "User" },
  { key: "payments",      label: "Платежи",         icon: "Wallet" },
  { key: "company",       label: "Профиль компании", icon: "Briefcase" },
  { key: "notifications", label: "Уведомления",     icon: "Bell",      badge: () => C_NOTIFS.filter((n) => n.unread).length },
  { key: "settings",      label: "Настройки",       icon: "Settings" }
];

function CSidebar({ active, go, company }) {
  const initials = (company.companyName || "К").split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
  return (
    <aside className="cab-sidebar">
      <a className="cab-logo" href="index.html">
        <span className="cab-logo__mark" style={{ background: "#0040A0" }}>СР</span>
        <span className="cab-logo__name">СТУДРАДАР</span>
      </a>

      <nav className="cab-nav">
        <div className="cab-nav__group">// Заказы</div>
        {C_NAV_ITEMS.slice(0, 5).map((it) => {
          const Ic = CabIcon[it.icon] || Icon[it.icon];
          const badge = it.badge ? it.badge() : null;
          return (
            <button
              key={it.key}
              className={"cab-nav__item " + (active === it.key ? "is-active" : "")}
              style={it.emphasize ? { color: "#FF8E66", fontWeight: 600 } : undefined}
              onClick={() => go(it.key)}
            >
              <Ic /> <span>{it.label}</span>
              {badge ? <span className="cab-nav__badge">{badge}</span> : null}
            </button>
          );
        })}

        <div className="cab-nav__group">// Управление</div>
        {C_NAV_ITEMS.slice(5).map((it) => {
          const Ic = CabIcon[it.icon] || Icon[it.icon];
          const badge = it.badge ? it.badge() : null;
          return (
            <button key={it.key} className={"cab-nav__item " + (active === it.key ? "is-active" : "")} onClick={() => go(it.key)}>
              <Ic /> <span>{it.label}</span>
              {badge ? <span className="cab-nav__badge">{badge}</span> : null}
            </button>
          );
        })}
      </nav>

      <div className="cab-side-foot">
        <div className="cab-side-foot__avatar">
          {company.logo ? <img src={company.logo} alt="" /> : initials}
        </div>
        <div style={{ minWidth: 0 }}>
          <div className="cab-side-foot__name" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{company.companyName || "Заказчик"}</div>
          <div className="cab-side-foot__sub">{calcCompanyCompleteness(company)}% профиль</div>
        </div>
      </div>
    </aside>
  );
}

function CTopbar({ go }) {
  const unread = C_NOTIFS.filter((n) => n.unread).length;
  return (
    <div className="cab-topbar">
      <div className="cab-search">
        <Icon.Search />
        <input placeholder="Поиск задач, исполнителей, документов…" />
      </div>
      <div className="cab-topbar__icons">
        <button className="cab-btn cab-btn-accent" onClick={() => go("newTask")}><Icon.Plus /> Новая задача</button>
        <button className="cab-icon-btn" aria-label="Уведомления" onClick={() => go("notifications")}>
          <CabIcon.Bell />
          {unread > 0 && <span className="cab-icon-btn__dot" />}
        </button>
        <button className="cab-icon-btn" aria-label="Настройки" onClick={() => go("settings")}><CabIcon.Settings /></button>
        <a className="cab-icon-btn" href="index.html" aria-label="Выход"><CabIcon.Logout /></a>
      </div>
    </div>
  );
}

function CustomerApp() {
  const stored = loadCompany();
  const [company, setCompany] = useStateCs(stored || DEMO_COMPANY);
  const [page, setPage] = useStateCs("dashboard");
  const [taskPrefill, setTaskPrefill] = useStateCs(null);

  useEffectCs(() => { saveCompany(company); }, [company]);

  const update = (patch) => setCompany((c) => ({ ...c, ...patch }));
  const reset = () => {
    clearCompany();
    setCompany({ ...EMPTY_COMPANY, onboardingStep: 1 });
    setPage("dashboard");
  };

  const goto = (k, prefill) => {
    if (k === "newTask") setTaskPrefill(prefill || null);
    setPage(k);
  };

  if (!company.onboardingDone) {
    return (
      <CustomerOnboarding
        company={company}
        update={update}
        finish={(target, prefill) => {
          setCompany((c) => ({ ...c, onboardingDone: true }));
          if (target === "newTask") goto("newTask", prefill);
          else setPage("dashboard");
        }}
      />
    );
  }

  const V = CustomerViews;
  return (
    <div className="cab-shell">
      <CSidebar active={page} go={goto} company={company} />
      <div className="cab-main">
        <CTopbar go={goto} />
        <div className="cab-content">
          {page === "dashboard"     && <V.Dashboard     company={company} go={goto} />}
          {page === "tasks"         && <V.Tasks         company={company} go={goto} />}
          {page === "newTask"       && <V.NewTask       company={company} go={goto} prefill={taskPrefill} />}
          {page === "responses"     && <V.Responses     />}
          {page === "deals"         && <V.Deals         />}
          {page === "performers"    && <V.Performers    />}
          {page === "payments"      && <V.Payments      company={company} />}
          {page === "company"       && <V.Company       company={company} update={update} />}
          {page === "notifications" && <V.Notifications />}
          {page === "settings"      && <V.Settings      company={company} update={update} reset={reset} />}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("cabinet-root")).render(<CustomerApp />);
