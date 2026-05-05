/* === Customer onboarding (5 steps) === */
const { useState: useStateCo } = React;

const C_ONB_STEPS = [
  { num: 1, label: "Тип" },
  { num: 2, label: "Компания" },
  { num: 3, label: "Контакт" },
  { num: 4, label: "Задачи" },
  { num: 5, label: "Готово" }
];

function COnbHeader({ step, num, title, lede }) {
  return (
    <>
      <div className="cab-onb__steps" aria-label={`Шаг ${step} из 5`}>
        {C_ONB_STEPS.map((s) => (
          <span
            key={s.num}
            className={"cab-onb__step-pill " + (s.num < step ? "is-done" : s.num === step ? "is-current" : "")}
          />
        ))}
      </div>
      <div className="cab-onb__num">// Шаг {num} · {C_ONB_STEPS[step - 1].label}</div>
      <h2 className="cab-onb__title">{title}</h2>
      {lede && <p className="cab-onb__lede">{lede}</p>}
    </>
  );
}

/* ─────────── Step 1 — тип заказчика ─────────── */
function COnbType({ company, update }) {
  const needsInn = company.customerType === "ip" || company.customerType === "ooo" || company.customerType === "self";

  return (
    <>
      <COnbHeader step={1} num="01" title="Кто публикует задачи?" lede="От этого зависит, какие документы и реквизиты понадобятся для оплаты студентов." />

      <div className="cab-tasks-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        {CUSTOMER_TYPES.map((t) => (
          <button
            key={t.id}
            type="button"
            className={"cab-task-card " + (company.customerType === t.id ? "is-on" : "")}
            style={{
              cursor: "pointer",
              borderColor: company.customerType === t.id ? "#0040A0" : "#E5E7EC",
              background: company.customerType === t.id ? "#E0ECFF" : "#fff",
              textAlign: "left"
            }}
            onClick={() => update({ customerType: t.id, innVerified: false })}
          >
            <div className="cab-task-card__top">
              <span className="cab-task-card__cat">{t.label}</span>
              {company.customerType === t.id && <Icon.Check />}
            </div>
            <div className="cab-task-card__meta"><div>{t.hint}</div></div>
          </button>
        ))}
      </div>

      {needsInn && (
        <div className="cab-form-grid" style={{ marginTop: 18 }}>
          <div className="cab-field">
            <label className="cab-field__label">ИНН *</label>
            <input
              className="cab-input"
              maxLength={12}
              placeholder={company.customerType === "ooo" ? "10 цифр" : "12 цифр"}
              value={company.inn}
              onChange={(e) => update({ inn: e.target.value.replace(/\D/g, "").slice(0, 12), innVerified: false })}
            />
          </div>
          <div className="cab-field" style={{ alignSelf: "end" }}>
            <button
              type="button"
              className="cab-btn cab-btn-primary"
              disabled={!(company.customerType === "ooo" ? /^\d{10}$/.test(company.inn) : /^\d{12}$/.test(company.inn))}
              onClick={() => update({ innVerified: true })}
            >
              {company.innVerified ? <><Icon.Check /> ИНН подтверждён</> : "Проверить через ФНС"}
            </button>
          </div>
          {company.innVerified && (
            <div className="cab-field" style={{ gridColumn: "1 / -1" }}>
              <span className="cab-badge cab-badge--ok">{company.customerType === "ooo" ? "ООО подтверждено" : company.customerType === "ip" ? "ИП подтверждено" : "Самозанятый ✓"}</span>
            </div>
          )}
        </div>
      )}
    </>
  );
}

function isCType(c) {
  if (!c.customerType) return false;
  if (c.customerType === "person") return true;
  return c.innVerified;
}

/* ─────────── Step 2 — про компанию ─────────── */
function COnbCompany({ company, update }) {
  const onLogo = (e) => {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader(); r.onload = () => update({ logo: r.result }); r.readAsDataURL(f);
  };
  const initials = (company.companyName || "К").split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();

  return (
    <>
      <COnbHeader step={2} num="02" title="Расскажите про компанию" lede="Студенты увидят это в карточке задачи. Краткое и человечное описание собирает сильные отклики." />

      <div className="cab-avatar-up" style={{ marginBottom: 18 }}>
        <div className="cab-avatar-up__preview" style={{ borderRadius: 18 }}>
          {company.logo ? <img src={company.logo} alt="" /> : initials}
        </div>
        <div>
          <label className="cab-btn cab-btn-ghost" style={{ cursor: "pointer" }}>
            <CabIcon.Upload /> <span>Загрузить логотип</span>
            <input type="file" accept="image/*" hidden onChange={onLogo} />
          </label>
          <div className="cab-field__hint" style={{ marginTop: 6 }}>До 5 МБ, jpg или png. Квадратная аватарка.</div>
        </div>
      </div>

      <div className="cab-form-grid">
        <div className="cab-field" style={{ gridColumn: "1 / -1" }}>
          <label className="cab-field__label">Название компании *</label>
          <input className="cab-input" placeholder="Напр., Студия «Полюс»" value={company.companyName} onChange={(e) => update({ companyName: e.target.value })} />
        </div>
        <div className="cab-field">
          <label className="cab-field__label">Сфера *</label>
          <select className="cab-select" value={company.sector} onChange={(e) => update({ sector: e.target.value })}>
            <option value="">— Выберите сферу —</option>
            {BUSINESS_SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="cab-field">
          <label className="cab-field__label">Размер</label>
          <select className="cab-select" value={company.companySize} onChange={(e) => update({ companySize: e.target.value })}>
            <option value="">— Выберите размер —</option>
            {COMPANY_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="cab-field">
          <label className="cab-field__label">Сайт</label>
          <input className="cab-input" type="url" placeholder="https://" value={company.website} onChange={(e) => update({ website: e.target.value })} />
        </div>
      </div>

      <div className="cab-field" style={{ marginTop: 14 }}>
        <label className="cab-field__label">О компании</label>
        <textarea
          className="cab-textarea"
          maxLength={400}
          placeholder="Например: маркетинговое агентство в ХМ. Делаем брендинг и сайты для малого бизнеса Югры."
          value={company.about}
          onChange={(e) => update({ about: e.target.value })}
        />
        <span className="cab-field__hint">{(company.about || "").length} / 400</span>
      </div>
    </>
  );
}
function isCCompany(c) { return !!(c.companyName && c.sector); }

/* ─────────── Step 3 — контактное лицо ─────────── */
function COnbContact({ company, update }) {
  return (
    <>
      <COnbHeader step={3} num="03" title="С кем студенту общаться" lede="Контакт раскрывается студенту только после принятия отклика. Пока отклик в работе — переписка идёт в чате сделки." />

      <div className="cab-form-grid">
        <div className="cab-field">
          <label className="cab-field__label">Фамилия *</label>
          <input className="cab-input" value={company.contactLastName} onChange={(e) => update({ contactLastName: e.target.value })} />
        </div>
        <div className="cab-field">
          <label className="cab-field__label">Имя *</label>
          <input className="cab-input" value={company.contactFirstName} onChange={(e) => update({ contactFirstName: e.target.value })} />
        </div>
        <div className="cab-field">
          <label className="cab-field__label">Должность</label>
          <input className="cab-input" placeholder="Напр., Арт-директор" value={company.contactPosition} onChange={(e) => update({ contactPosition: e.target.value })} />
        </div>
        <div className="cab-field">
          <label className="cab-field__label">Телефон *</label>
          <input className="cab-input" type="tel" placeholder="+7" value={company.contactPhone} onChange={(e) => update({ contactPhone: e.target.value })} />
        </div>
        <div className="cab-field" style={{ gridColumn: "1 / -1" }}>
          <label className="cab-field__label">Email *</label>
          <input className="cab-input" type="email" placeholder="hello@company.ru" value={company.contactEmail} onChange={(e) => update({ contactEmail: e.target.value })} />
          <span className="cab-field__hint">На него приходят отклики, статусы сделок и закрывающие.</span>
        </div>
      </div>
    </>
  );
}
function isCContact(c) { return !!(c.contactFirstName && c.contactLastName && c.contactPhone && c.contactEmail); }

/* ─────────── Step 4 — что планируете заказывать ─────────── */
function COnbVolume({ company, update }) {
  const toggleCat = (id) => {
    if (company.preferredCategories.includes(id))
      update({ preferredCategories: company.preferredCategories.filter((c) => c !== id) });
    else
      update({ preferredCategories: [...company.preferredCategories, id] });
  };

  return (
    <>
      <COnbHeader step={4} num="04" title="Какие задачи планируете давать" lede="Поможем подобрать тариф и подсветить релевантных студентов уже на старте." />

      <div className="cab-field" style={{ marginBottom: 18 }}>
        <label className="cab-field__label">Объём задач *</label>
        <div className="cab-radio-group">
          {TASK_VOLUMES.map((v) => (
            <button
              key={v.id}
              type="button"
              className={"cab-radio " + (company.taskVolume === v.id ? "is-on" : "")}
              onClick={() => update({ taskVolume: v.id })}
            >{v.label}</button>
          ))}
        </div>
        {company.taskVolume && (
          <div className="cab-field__hint" style={{ marginTop: 8 }}>
            Рекомендуем тариф <strong>{TASK_VOLUMES.find((v) => v.id === company.taskVolume).tier}</strong>.
          </div>
        )}
      </div>

      <div className="cab-field">
        <label className="cab-field__label">Категории, которые будете заказывать</label>
        <div className="cab-tags">
          {SKILL_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              className={"cab-tag " + (company.preferredCategories.includes(c.id) ? "is-on" : "")}
              onClick={() => toggleCat(c.id)}
            >{c.title}</button>
          ))}
        </div>
        <span className="cab-field__hint" style={{ marginTop: 8 }}>Можно поменять в любой момент в настройках.</span>
      </div>
    </>
  );
}
function isCVolume(c) { return !!c.taskVolume; }

/* ─────────── Step 5 — готово + первая задача из шаблона ─────────── */
function COnbDone({ company, finish, goNewTask }) {
  const pct = calcCompanyCompleteness(company);
  const matched = TASK_TEMPLATES.filter((t) => company.preferredCategories.length === 0 || company.preferredCategories.includes(t.category)).slice(0, 3);

  return (
    <>
      <COnbHeader step={5} num="05" title="Готово. Опубликуем первую задачу?" lede="Можно стартовать с шаблона или собрать задачу с нуля. Бюджет блокируется в эскроу только при выборе исполнителя." />

      <div className="cab-tasks-grid" style={{ marginBottom: 18 }}>
        {matched.map((t) => (
          <div key={t.id} className="cab-task-card" style={{ cursor: "pointer" }} onClick={() => goNewTask(t)}>
            <div className="cab-task-card__top">
              <span className="cab-task-card__cat">{(SKILL_CATEGORIES.find((c) => c.id === t.category) || {}).title}</span>
              <Icon.Bolt />
            </div>
            <div className="cab-task-card__pay">{t.pay.toLocaleString("ru-RU")} ₽<sub>стартовый бюджет</sub></div>
            <h3 className="cab-task-card__title">{t.title}</h3>
            <div className="cab-task-card__meta"><div>{t.tags.join(" · ")}</div></div>
          </div>
        ))}
      </div>

      <div className="cab-card">
        <div className="cab-card__title" style={{ marginBottom: 8 }}>Заполненность профиля</div>
        <div className="cab-progress">
          <div className="cab-progress__bar"><div className="cab-progress__fill" style={{ width: pct + "%" }} /></div>
          <span className="cab-progress__num">{pct}%</span>
        </div>
        <div className="cab-card__sub" style={{ marginTop: 8 }}>
          Реквизиты можно добавить позже — они нужны только при заключении сделки.
        </div>
      </div>

      <div className="cab-onb__actions">
        <button className="cab-btn cab-btn-ghost" onClick={() => finish("dashboard")}>В кабинет</button>
        <button className="cab-btn cab-btn-accent cab-btn-lg cab-onb__skip" onClick={() => goNewTask(null)}>Создать задачу с нуля →</button>
      </div>
    </>
  );
}

/* ─────────── Onboarding shell ─────────── */
function CustomerOnboarding({ company, update, finish }) {
  const [step, setStep] = useStateCo(Math.max(1, company.onboardingStep || 1));

  const validators = { 1: isCType, 2: isCCompany, 3: isCContact, 4: isCVolume };
  const canNext = step >= 5 ? true : (validators[step] ? validators[step](company) : true);

  const next = () => { const ns = Math.min(5, step + 1); setStep(ns); update({ onboardingStep: ns }); };
  const prev = () => setStep(Math.max(1, step - 1));

  return (
    <div className="cab-onb" role="dialog" aria-modal="true">
      <div className="cab-onb__card">
        {step === 1 && <COnbType    company={company} update={update} />}
        {step === 2 && <COnbCompany company={company} update={update} />}
        {step === 3 && <COnbContact company={company} update={update} />}
        {step === 4 && <COnbVolume  company={company} update={update} />}
        {step === 5 && (
          <COnbDone
            company={company}
            finish={(target) => { update({ onboardingDone: true, onboardingStep: 5 }); finish(target); }}
            goNewTask={(template) => { update({ onboardingDone: true, onboardingStep: 5 }); finish("newTask", template); }}
          />
        )}

        {step < 5 && (
          <div className="cab-onb__actions">
            <button className="cab-btn cab-btn-ghost" onClick={prev} disabled={step === 1}>
              <CabIcon.ChevronLeft /> Назад
            </button>
            <button
              className="cab-btn cab-btn-primary cab-onb__skip"
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

window.CustomerOnboarding = CustomerOnboarding;
