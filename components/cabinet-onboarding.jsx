/* === Cabinet onboarding (6 steps) === */
const { useState: useStateOnb, useMemo: useMemoOnb } = React;

const ONB_STEPS = [
  { num: 1, label: "Учёба" },
  { num: 2, label: "Навыки" },
  { num: 3, label: "Профиль" },
  { num: 4, label: "Самозанятость" },
  { num: 5, label: "Портфолио" },
  { num: 6, label: "Готово" }
];

/* Header — step pills + section heading. */
function OnbHeader({ step, num, title, lede }) {
  return (
    <>
      <div className="cab-onb__steps" aria-label={`Шаг ${step} из 6`}>
        {ONB_STEPS.map((s) => (
          <span
            key={s.num}
            className={
              "cab-onb__step-pill " +
              (s.num < step ? "is-done" : s.num === step ? "is-current" : "")
            }
          />
        ))}
      </div>
      <div className="cab-onb__num">// Шаг {num} · {ONB_STEPS[step - 1].label}</div>
      <h2 className="cab-onb__title">{title}</h2>
      {lede && <p className="cab-onb__lede">{lede}</p>}
    </>
  );
}

/* ─────────── Step 1: Study ─────────── */
function OnbStudy({ profile, update }) {
  const facList = FACULTIES[profile.university] || FACULTIES.default;

  return (
    <>
      <OnbHeader step={1} num="01" title="Где учишься?" lede="Эта информация даёт тебе бейдж студента и помогает заказчикам найти тебя точнее." />
      <div className="cab-form-grid cab-form-grid--1">
        <div className="cab-field">
          <label className="cab-field__label">ВУЗ *</label>
          <select className="cab-select" value={profile.university} onChange={(e) => update({ university: e.target.value, faculty: "" })}>
            <option value="">— Выбери ВУЗ —</option>
            {UNIVERSITIES.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
          <span className="cab-field__hint">Если ВУЗ не нашёлся — напиши нам в поддержку, добавим.</span>
        </div>
      </div>
      <div className="cab-form-grid">
        <div className="cab-field">
          <label className="cab-field__label">Факультет / институт *</label>
          <select className="cab-select" value={profile.faculty} onChange={(e) => update({ faculty: e.target.value })} disabled={!profile.university}>
            <option value="">— Выбери факультет —</option>
            {facList.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div className="cab-field">
          <label className="cab-field__label">Направление подготовки *</label>
          <input className="cab-input" placeholder="Прикладная информатика" value={profile.direction} onChange={(e) => update({ direction: e.target.value })} />
        </div>
        <div className="cab-field">
          <label className="cab-field__label">Курс *</label>
          <select className="cab-select" value={profile.course} onChange={(e) => {
            const course = e.target.value;
            const map = { "1 курс": 4, "2 курс": 3, "3 курс": 2, "4 курс": 1, "Магистратура 1": 2, "Магистратура 2": 1, "Аспирантура": 3 };
            const yr = new Date().getFullYear() + (map[course] ?? 0);
            update({ course, graduationYear: String(yr) });
          }}>
            <option value="">— Выбери курс —</option>
            {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="cab-field">
          <label className="cab-field__label">Форма обучения</label>
          <select className="cab-select" value={profile.studyForm} onChange={(e) => update({ studyForm: e.target.value })}>
            <option value="">— Выбери форму —</option>
            {STUDY_FORMS.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div className="cab-field">
          <label className="cab-field__label">Год выпуска *</label>
          <input className="cab-input" placeholder="2027" value={profile.graduationYear} onChange={(e) => update({ graduationYear: e.target.value })} />
          <span className="cab-field__hint">Подставлен по курсу — поправь, если нужно.</span>
        </div>
      </div>
    </>
  );
}

function isStudyValid(p) {
  return p.university && p.faculty && p.direction && p.course && p.graduationYear;
}

/* ─────────── Step 2: Skills ─────────── */
function OnbSkills({ profile, update }) {
  const toggleCat = (id) => {
    let next = profile.categories.includes(id)
      ? profile.categories.filter((c) => c !== id)
      : profile.categories.length < 3 ? [...profile.categories, id] : profile.categories;
    /* drop tags whose category just disappeared */
    const allowedTags = SKILL_CATEGORIES.filter((c) => next.includes(c.id)).flatMap((c) => c.tags);
    const tags = profile.tags.filter((t) => allowedTags.includes(t));
    update({ categories: next, tags });
  };

  const toggleTag = (t) => {
    if (profile.tags.includes(t)) update({ tags: profile.tags.filter((x) => x !== t) });
    else if (profile.tags.length < 12) update({ tags: [...profile.tags, t] });
  };

  const visibleCats = SKILL_CATEGORIES.filter((c) => profile.categories.includes(c.id));

  return (
    <>
      <OnbHeader step={2} num="02" title="Что умеешь делать?" lede="Сначала выбери до трёх макрокатегорий — потом отметь конкретные навыки. Минимум 3 навыка, максимум 12." />

      <div className="cab-field" style={{ marginBottom: 18 }}>
        <label className="cab-field__label">Макрокатегории · {profile.categories.length}/3</label>
        <div className="cab-tags">
          {SKILL_CATEGORIES.map((c) => {
            const Ic = Icon[c.icon];
            return (
              <button
                key={c.id}
                type="button"
                className={"cab-tag " + (profile.categories.includes(c.id) ? "is-on" : "")}
                onClick={() => toggleCat(c.id)}
              >
                {Ic && <Ic />} <span style={{ marginLeft: 6 }}>{c.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {visibleCats.length === 0 && (
        <div className="cab-empty" style={{ padding: "24px 16px", border: "1px dashed #E5E7EC", borderRadius: 14 }}>
          Выбери хотя бы одну категорию выше, чтобы появились теги.
        </div>
      )}

      {visibleCats.map((c) => (
        <div key={c.id} className="cab-field" style={{ marginBottom: 14 }}>
          <label className="cab-field__label">{c.title}</label>
          <div className="cab-tags">
            {c.tags.map((t) => (
              <button
                key={t}
                type="button"
                className={"cab-tag " + (profile.tags.includes(t) ? "is-on" : "")}
                onClick={() => toggleTag(t)}
              >{t}</button>
            ))}
          </div>
        </div>
      ))}

      <div style={{ fontSize: 13, color: "#5A6478", marginTop: 8 }}>
        Выбрано навыков: <strong>{profile.tags.length}</strong> из 12
      </div>
    </>
  );
}

function isSkillsValid(p) {
  return p.categories.length >= 1 && p.tags.length >= 3;
}

/* ─────────── Step 3: Profile ─────────── */
function OnbProfile({ profile, update }) {
  const initials = ((profile.firstName?.[0] || "") + (profile.lastName?.[0] || "")).toUpperCase() || "?";
  const onAvatar = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => update({ avatar: reader.result });
    reader.readAsDataURL(f);
  };

  return (
    <>
      <OnbHeader step={3} num="03" title="Как тебя представить заказчику" lede="ФИО и дата рождения нужны для договоров и проверки 18+ — публично они не показываются полностью." />

      <div className="cab-avatar-up" style={{ marginBottom: 18 }}>
        <div className="cab-avatar-up__preview">
          {profile.avatar ? <img src={profile.avatar} alt="" /> : initials}
        </div>
        <div>
          <label className="cab-btn cab-btn-ghost" style={{ cursor: "pointer" }}>
            <CabIcon.Upload /> <span>Загрузить аватар</span>
            <input type="file" accept="image/*" hidden onChange={onAvatar} />
          </label>
          <div className="cab-field__hint" style={{ marginTop: 6 }}>До 5 МБ, jpg или png. Обрежется до квадрата.</div>
        </div>
      </div>

      <div className="cab-form-grid">
        <div className="cab-field">
          <label className="cab-field__label">Фамилия *</label>
          <input className="cab-input" value={profile.lastName} onChange={(e) => update({ lastName: e.target.value })} />
        </div>
        <div className="cab-field">
          <label className="cab-field__label">Имя *</label>
          <input className="cab-input" value={profile.firstName} onChange={(e) => update({ firstName: e.target.value })} />
        </div>
        <div className="cab-field">
          <label className="cab-field__label">Отчество</label>
          <input className="cab-input" value={profile.middleName} onChange={(e) => update({ middleName: e.target.value })} />
        </div>
        <div className="cab-field">
          <label className="cab-field__label">Дата рождения *</label>
          <input className="cab-input" type="date" value={profile.birthDate} onChange={(e) => update({ birthDate: e.target.value })} />
          <span className="cab-field__hint">Не показывается публично — нужно для проверки 18+.</span>
        </div>
        <div className="cab-field">
          <label className="cab-field__label">Город *</label>
          <select className="cab-select" value={profile.city} onChange={(e) => update({ city: e.target.value })}>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="cab-field">
          <label className="cab-field__label">Telegram</label>
          <input className="cab-input" placeholder="@username" value={profile.telegram} onChange={(e) => update({ telegram: e.target.value })} />
          <span className="cab-field__hint">Скрыт до сделки. Заказчик увидит после согласования.</span>
        </div>
      </div>

      <div className="cab-field" style={{ marginTop: 14 }}>
        <label className="cab-field__label">О себе</label>
        <textarea
          className="cab-textarea"
          maxLength={300}
          placeholder="Например: учусь на 3 курсе ИЦЭ ЮГУ, делаю лендинги на Tilda и веду соцсети малому бизнесу."
          value={profile.about}
          onChange={(e) => update({ about: e.target.value })}
        />
        <span className="cab-field__hint">{(profile.about || "").length} / 300</span>
      </div>

      <div className="cab-field" style={{ marginTop: 14 }}>
        <button type="button" className="cab-btn cab-btn-ghost" disabled>
          <Icon.Camera /> <span>Видеовизитка · скоро</span>
        </button>
      </div>
    </>
  );
}

function isProfileValid(p) {
  return p.firstName && p.lastName && p.birthDate && p.city;
}

/* ─────────── Step 4: Self-employed ─────────── */
function OnbSelfEmp({ profile, update }) {
  const set = (status) => update({ selfEmployedStatus: status, innVerified: false });

  return (
    <>
      <OnbHeader step={4} num="04" title="Легализация — это просто" lede="Чтобы получать выплаты на карту, нужен статус самозанятого. Откликаться на задачи можно и без него." />

      <div className="cab-radio-group" style={{ marginBottom: 18 }}>
        {["Оформлен", "Не оформлен", "Хочу оформить"].map((s) => (
          <button key={s} type="button" className={"cab-radio " + (profile.selfEmployedStatus === s ? "is-on" : "")} onClick={() => set(s)}>{s}</button>
        ))}
      </div>

      {profile.selfEmployedStatus === "Оформлен" && (
        <div className="cab-form-grid">
          <div className="cab-field">
            <label className="cab-field__label">ИНН *</label>
            <input
              className="cab-input"
              maxLength={12}
              placeholder="12 цифр"
              value={profile.inn}
              onChange={(e) => update({ inn: e.target.value.replace(/\D/g, "").slice(0, 12), innVerified: false })}
            />
          </div>
          <div className="cab-field" style={{ alignSelf: "end" }}>
            <button
              type="button"
              className="cab-btn cab-btn-primary"
              disabled={!/^\d{12}$/.test(profile.inn || "")}
              onClick={() => {
                /* MVP — мокаем проверку через API ФНС */
                update({ innVerified: true });
              }}
            >
              {profile.innVerified ? <><Icon.Check /> ИНН подтверждён</> : "Проверить через ФНС"}
            </button>
          </div>
          {profile.innVerified && (
            <div className="cab-field" style={{ gridColumn: "1 / -1" }}>
              <span className="cab-badge cab-badge--ok">Самозанятый ✓</span>
            </div>
          )}
        </div>
      )}

      {(profile.selfEmployedStatus === "Не оформлен" || profile.selfEmployedStatus === "Хочу оформить") && (
        <>
          <div className="cab-guide">
            <div className="cab-guide__item"><h4>Зачем</h4><p>Чтобы легально получать оплату от заказчиков и автоматически платить налог.</p></div>
            <div className="cab-guide__item"><h4>Кому</h4><p>Любой студент 18+, гражданин РФ, доход до 2.4 млн ₽ в год.</p></div>
            <div className="cab-guide__item"><h4>Как</h4><p>Скачай приложение «Мой налог» — оформление за 5 минут, без визита в ФНС.</p></div>
            <div className="cab-guide__item"><h4>Налог</h4><p>4% при работе с физлицами, 6% — с компаниями. Считается автоматически.</p></div>
          </div>
          <a className="cab-btn cab-btn-primary" href="https://npd.nalog.ru/app/" target="_blank" rel="noreferrer">Открыть «Мой налог»</a>
        </>
      )}

      {!profile.selfEmployedStatus && (
        <div className="cab-empty" style={{ padding: "24px 16px", border: "1px dashed #E5E7EC", borderRadius: 14 }}>
          Выбери свой статус выше — откроется нужный сценарий.
        </div>
      )}

      <div style={{ fontSize: 12.5, color: "#5A6478", marginTop: 14, lineHeight: 1.5 }}>
        Откликаться на задачи можно без самозанятости, но <strong>получить деньги — нет</strong>. Если оформишь позже — на главной появится напоминание.
      </div>
    </>
  );
}

function isSelfEmpValid(p) {
  if (!p.selfEmployedStatus) return false;
  if (p.selfEmployedStatus === "Оформлен") return p.innVerified;
  return true; /* «Не оформлен» / «Хочу оформить» — проходимо */
}

/* ─────────── Step 5: Portfolio ─────────── */
function OnbPortfolio({ profile, update }) {
  const [draft, setDraft] = useStateOnb({ title: "", category: profile.categories[0] || "", description: "", link: "", year: "" });

  const allowedCats = SKILL_CATEGORIES.filter((c) => profile.categories.includes(c.id));

  const addCase = () => {
    if (!draft.title || !draft.category || !draft.description) return;
    update({ portfolio: [...(profile.portfolio || []), { id: "p" + Date.now(), ...draft }] });
    setDraft({ title: "", category: profile.categories[0] || "", description: "", link: "", year: "" });
  };

  const removeCase = (id) => {
    update({ portfolio: profile.portfolio.filter((c) => c.id !== id) });
  };

  return (
    <>
      <OnbHeader step={5} num="05" title="Покажи работы" lede="До трёх кейсов на старте, можно пропустить и добавить позже из кабинета." />

      {profile.portfolio.length > 0 && (
        <div className="cab-list" style={{ marginBottom: 18 }}>
          {profile.portfolio.map((c) => (
            <div key={c.id} className="cab-list__row">
              <div>
                <div className="cab-list__title">{c.title}</div>
                <div className="cab-list__sub">{c.description}</div>
              </div>
              <span className="cab-badge cab-badge--info">{(allowedCats.find((x) => x.id === c.category) || {}).title || c.category}</span>
              <button className="cab-btn cab-btn-ghost" onClick={() => removeCase(c.id)} aria-label="Удалить"><CabIcon.Trash /></button>
            </div>
          ))}
        </div>
      )}

      {profile.portfolio.length < 3 && (
        <div className="cab-card" style={{ marginBottom: 12 }}>
          <div className="cab-card__title" style={{ marginBottom: 10 }}>Добавить кейс</div>
          <div className="cab-form-grid">
            <div className="cab-field">
              <label className="cab-field__label">Название *</label>
              <input className="cab-input" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
            </div>
            <div className="cab-field">
              <label className="cab-field__label">Категория *</label>
              <select className="cab-select" value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })}>
                <option value="">— Выбери категорию —</option>
                {allowedCats.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
            </div>
            <div className="cab-field" style={{ gridColumn: "1 / -1" }}>
              <label className="cab-field__label">Описание *</label>
              <textarea className="cab-textarea" maxLength={500} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
            </div>
            <div className="cab-field">
              <label className="cab-field__label">Ссылка на работу</label>
              <input className="cab-input" type="url" placeholder="https://" value={draft.link} onChange={(e) => setDraft({ ...draft, link: e.target.value })} />
            </div>
            <div className="cab-field">
              <label className="cab-field__label">Год</label>
              <input className="cab-input" placeholder="2025" value={draft.year} onChange={(e) => setDraft({ ...draft, year: e.target.value })} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <button type="button" className="cab-btn cab-btn-primary" onClick={addCase} disabled={!draft.title || !draft.category || !draft.description}>
              <Icon.Plus /> Добавить кейс
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ─────────── Step 6: Done ─────────── */
function OnbDone({ profile, finish, goEdit, goSelfEmp }) {
  const pct = calcCompleteness(profile);
  return (
    <>
      <OnbHeader step={6} num="06" title="Профиль готов. Что дальше?" lede="Можно сразу искать задачи или добраться до 100% и подняться в выдаче." />

      <div className="cab-tasks-grid" style={{ marginBottom: 22 }}>
        <div className="cab-task-card" onClick={() => finish("tasks")} style={{ cursor: "pointer" }}>
          <div className="cab-task-card__top"><span className="cab-task-card__cat">Главное</span><Icon.Bolt /></div>
          <h3 className="cab-task-card__title">Посмотреть задачи →</h3>
          <div className="cab-task-card__meta"><div>Откликнись на первую — это бесплатно.</div></div>
        </div>
        <div className="cab-task-card" onClick={goEdit} style={{ cursor: "pointer" }}>
          <div className="cab-task-card__top"><span className="cab-task-card__cat">Прокачка</span><Icon.Spark /></div>
          <h3 className="cab-task-card__title">Заполнить профиль до 100% →</h3>
          <div className="cab-task-card__meta"><div>Сейчас: {pct}%. Доберёшь — выше в выдаче.</div></div>
        </div>
        {profile.selfEmployedStatus !== "Оформлен" && (
          <div className="cab-task-card" onClick={goSelfEmp} style={{ cursor: "pointer" }}>
            <div className="cab-task-card__top"><span className="cab-task-card__cat">Выплаты</span><Icon.Coin /></div>
            <h3 className="cab-task-card__title">Оформить самозанятость →</h3>
            <div className="cab-task-card__meta"><div>5 минут в «Моём налоге» — и можно получать деньги.</div></div>
          </div>
        )}
      </div>

      <div className="cab-card">
        <div className="cab-card__title" style={{ marginBottom: 8 }}>Заполненность профиля</div>
        <div className="cab-progress">
          <div className="cab-progress__bar"><div className="cab-progress__fill" style={{ width: pct + "%" }} /></div>
          <span className="cab-progress__num">{pct}%</span>
        </div>
      </div>

      <div className="cab-onb__actions">
        <button className="cab-btn cab-btn-accent cab-btn-lg" onClick={() => finish("dashboard")}>В кабинет →</button>
      </div>
    </>
  );
}

/* ─────────── Onboarding shell ─────────── */
function CabinetOnboarding({ profile, update, finish }) {
  const [step, setStep] = useStateOnb(Math.max(1, profile.onboardingStep || 1));

  const validators = { 1: isStudyValid, 2: isSkillsValid, 3: isProfileValid, 4: isSelfEmpValid, 5: () => true };
  const canNext = step >= 6 ? true : (validators[step] ? validators[step](profile) : true);

  const next = () => {
    const ns = Math.min(6, step + 1);
    setStep(ns);
    update({ onboardingStep: ns });
  };
  const prev = () => setStep(Math.max(1, step - 1));

  return (
    <div className="cab-onb" role="dialog" aria-modal="true">
      <div className="cab-onb__card">
        {step === 1 && <OnbStudy profile={profile} update={update} />}
        {step === 2 && <OnbSkills profile={profile} update={update} />}
        {step === 3 && <OnbProfile profile={profile} update={update} />}
        {step === 4 && <OnbSelfEmp profile={profile} update={update} />}
        {step === 5 && <OnbPortfolio profile={profile} update={update} />}
        {step === 6 && (
          <OnbDone
            profile={profile}
            finish={(target) => { update({ onboardingDone: true, onboardingStep: 6 }); finish(target); }}
            goEdit={() => { update({ onboardingDone: true, onboardingStep: 6 }); finish("profile"); }}
            goSelfEmp={() => { update({ onboardingDone: true, onboardingStep: 6 }); setStep(4); }}
          />
        )}

        {step < 6 && (
          <div className="cab-onb__actions">
            <button className="cab-btn cab-btn-ghost" onClick={prev} disabled={step === 1}>
              <CabIcon.ChevronLeft /> Назад
            </button>
            {step === 5 && (
              <button className="cab-btn cab-btn-link cab-onb__skip" onClick={next}>Пропустить</button>
            )}
            <button
              className={"cab-btn cab-btn-primary " + (step === 5 ? "" : "cab-onb__skip")}
              onClick={next}
              disabled={!canNext}
            >
              Дальше <CabIcon.ChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

window.CabinetOnboarding = CabinetOnboarding;
