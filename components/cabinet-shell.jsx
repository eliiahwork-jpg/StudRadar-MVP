/* === Cabinet shell: sidebar + topbar + router === */
const { useState: useStateS, useEffect: useEffectS, useMemo: useMemoS } = React;

const NAV_ITEMS = [
  { key: "dashboard", label: "Главная", icon: "Home" },
  { key: "tasks", label: "Каталог задач", icon: "List" },
  { key: "responses", label: "Мои отклики", icon: "Inbox", badge: () => RESPONSES.filter(r => r.status === "review").length },
  { key: "deals", label: "Мои сделки", icon: "Handshake", badge: () => DEALS.filter(d => d.status === "active").length },
  { key: "profile", label: "Профиль", icon: "User" },
  { key: "wallet", label: "Кошелёк", icon: "Wallet" },
  { key: "notifications", label: "Уведомления", icon: "Bell", badge: () => NOTIFS.filter(n => n.unread).length },
  { key: "settings", label: "Настройки", icon: "Settings" }
];

function Sidebar({ active, go, profile }) {
  const initials = ((profile.firstName?.[0] || "") + (profile.lastName?.[0] || "")).toUpperCase() || "?";
  const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(" ") || "Студент";

  return (
    <aside className="cab-sidebar">
      <a className="cab-logo" href="index.html">
        <span className="cab-logo__mark">СР</span>
        <span className="cab-logo__name">СТУДРАДАР</span>
      </a>

      <nav className="cab-nav">
        <div className="cab-nav__group">// Кабинет</div>
        {NAV_ITEMS.slice(0, 4).map((it) => {
          const Ic = CabIcon[it.icon] || Icon[it.icon];
          const badge = it.badge ? it.badge() : null;
          return (
            <button key={it.key} className={"cab-nav__item " + (active === it.key ? "is-active" : "")} onClick={() => go(it.key)}>
              <Ic /> <span>{it.label}</span>
              {badge ? <span className="cab-nav__badge">{badge}</span> : null}
            </button>
          );
        })}

        <div className="cab-nav__group">// Аккаунт</div>
        {NAV_ITEMS.slice(4).map((it) => {
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
          {profile.avatar ? <img src={profile.avatar} alt="" /> : initials}
        </div>
        <div style={{ minWidth: 0 }}>
          <div className="cab-side-foot__name" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{fullName}</div>
          <div className="cab-side-foot__sub">{calcCompleteness(profile)}% профиль</div>
        </div>
      </div>
    </aside>
  );
}

function Topbar({ profile, go }) {
  const unread = NOTIFS.filter((n) => n.unread).length;
  return (
    <div className="cab-topbar">
      <div className="cab-search">
        <Icon.Search />
        <input placeholder="Поиск задач, заказчиков, кейсов…" />
      </div>
      <div className="cab-topbar__icons">
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

function CabinetApp() {
  const stored = loadProfile();
  const [profile, setProfile] = useStateS(stored || DEMO_PROFILE);
  const [page, setPage] = useStateS("dashboard");

  useEffectS(() => { saveProfile(profile); }, [profile]);

  const update = (patch) => setProfile((p) => ({ ...p, ...patch }));

  const reset = () => {
    clearProfile();
    setProfile({ ...EMPTY_PROFILE, onboardingStep: 1 });
    setPage("dashboard");
  };

  if (!profile.onboardingDone) {
    return (
      <CabinetOnboarding
        profile={profile}
        update={update}
        finish={(target) => {
          setProfile((p) => ({ ...p, onboardingDone: true }));
          if (target === "tasks") setPage("tasks");
          else if (target === "profile") setPage("profile");
          else setPage("dashboard");
        }}
      />
    );
  }

  const V = CabinetViews;
  const goto = (k) => setPage(k);

  return (
    <div className="cab-shell">
      <Sidebar active={page} go={goto} profile={profile} />
      <div className="cab-main">
        <Topbar profile={profile} go={goto} />
        <div className="cab-content">
          {page === "dashboard" && <V.Dashboard profile={profile} go={goto} />}
          {page === "tasks" && <V.Tasks profile={profile} />}
          {page === "responses" && <V.Responses />}
          {page === "deals" && <V.Deals />}
          {page === "profile" && <V.Profile profile={profile} update={update} />}
          {page === "wallet" && <V.Wallet />}
          {page === "notifications" && <V.Notifications />}
          {page === "settings" && <V.Settings profile={profile} update={update} reset={reset} />}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("cabinet-root")).render(<CabinetApp />);
