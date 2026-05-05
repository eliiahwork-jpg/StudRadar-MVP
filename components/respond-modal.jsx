/* === Respond Modal — единое окно отклика на задачу + успех с анимацией ===
   Используется в каталоге (лендинг) и в личном кабинете.
   Глобальный API: window.openRespondModal({ task })
   task = { cat, title, pay, per, place, date }
*/
(function () {
  const { useState, useEffect, useMemo } = React;

  /* ---------- Утилиты сторэджа ---------- */
  const STORE_KEY = "studradar_responses";
  const loadResponses = () => {
    try { return JSON.parse(localStorage.getItem(STORE_KEY) || "[]"); }
    catch (e) { return []; }
  };
  const saveResponse = (item) => {
    const list = loadResponses();
    list.unshift({ ...item, id: Date.now(), status: "review", createdAt: new Date().toISOString() });
    localStorage.setItem(STORE_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent("studradar:responses-updated"));
  };

  /* ---------- Анимация успеха ---------- */
  function SuccessBurst() {
    return (
      <div className="rm-success">
        <div className="rm-success__ring rm-success__ring--1"/>
        <div className="rm-success__ring rm-success__ring--2"/>
        <div className="rm-success__ring rm-success__ring--3"/>
        <svg className="rm-success__check" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="30" className="rm-success__circle"/>
          <path d="M18 33 L28 43 L46 22" className="rm-success__tick"/>
        </svg>
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="rm-success__confetti"
            style={{
              "--rm-i": i,
              "--rm-x": `${(Math.random() - 0.5) * 320}px`,
              "--rm-y": `${-(Math.random() * 220 + 60)}px`,
              "--rm-r": `${(Math.random() * 720 - 360)}deg`,
              "--rm-c": ["#0040A0","#DD5444","#1FB36A","#F4B400","#5B3FCC"][i % 5],
              animationDelay: `${i * 30}ms`
            }}
          />
        ))}
      </div>
    );
  }

  /* ---------- Шаг 1: форма отклика ---------- */
  function RespondForm({ task, onClose, onSubmit }) {
    const [comment, setComment] = useState("");
    const [start, setStart] = useState("today");
    const [priceMode, setPriceMode] = useState("agree");
    const [bidPrice, setBidPrice] = useState("");
    const [hasExperience, setHasExperience] = useState(false);
    const [available, setAvailable] = useState(true);
    const [portfolioUrl, setPortfolioUrl] = useState("");
    const [error, setError] = useState("");

    const minLen = 50;
    const charLeft = useMemo(() => Math.max(0, minLen - comment.trim().length), [comment]);
    const valid = comment.trim().length >= minLen && (priceMode === "agree" || (priceMode === "negotiate" && bidPrice.trim()));

    const submit = (e) => {
      e.preventDefault();
      if (!valid) {
        setError(charLeft > 0 ? `Нужно ещё ${charLeft} символов в комментарии` : "Укажите свою цену");
        return;
      }
      onSubmit({
        task,
        comment: comment.trim(),
        start,
        priceMode,
        bidPrice: priceMode === "negotiate" ? bidPrice.trim() : null,
        hasExperience,
        available,
        portfolioUrl: portfolioUrl.trim() || null,
      });
    };

    return (
      <form className="rm-form" onSubmit={submit}>
        <header className="rm-head">
          <span className="rm-eyebrow">// отклик на задачу</span>
          <h2 className="rm-title">{task.title}</h2>
          <div className="rm-task-meta">
            <span className="rm-pill">{task.cat}</span>
            <span className="rm-pay">{task.pay}{task.per ? <small>{task.per}</small> : null}</span>
            {task.place && <span className="rm-meta-item">📍 {task.place}</span>}
            {task.date && <span className="rm-meta-item">📅 {task.date}</span>}
          </div>
        </header>

        <div className="rm-field">
          <label className="rm-label">
            Сопроводительное письмо <span className="rm-req">*</span>
          </label>
          <p className="rm-hint">
            Расскажите, почему вы подходите. Что уже делали похожего, какие инструменты используете, что готовы показать заказчику.
          </p>
          <textarea
            className="rm-textarea"
            value={comment}
            onChange={(e) => { setComment(e.target.value); setError(""); }}
            placeholder="Например: «Делал перевод для форума IT Югра — 12 страниц технической документации. Уровень EN — C1, есть сертификат IELTS. Покажу примеры по запросу»"
            maxLength={1500}
            rows={5}
          />
          <div className="rm-counter">
            {comment.trim().length < minLen
              ? <span className="rm-counter--warn">Ещё {charLeft} симв. до минимума</span>
              : <span className="rm-counter--ok">Можно отправлять</span>}
            <span className="rm-counter__total">{comment.length}/1500</span>
          </div>
        </div>

        <div className="rm-field">
          <label className="rm-label">Когда готов начать?</label>
          <div className="rm-radio-row">
            {[
              ["today",   "Сегодня"],
              ["tomorrow","Завтра"],
              ["3days",   "В течение 3 дней"],
              ["week",    "В течение недели"],
            ].map(([k, t]) => (
              <button
                key={k}
                type="button"
                className={`rm-radio ${start === k ? "is-on" : ""}`}
                onClick={() => setStart(k)}
              >{t}</button>
            ))}
          </div>
        </div>

        <div className="rm-field">
          <label className="rm-label">Условия оплаты</label>
          <div className="rm-radio-row">
            <button
              type="button"
              className={`rm-radio ${priceMode === "agree" ? "is-on" : ""}`}
              onClick={() => setPriceMode("agree")}
            >Готов за {task.pay}{task.per || ""}</button>
            <button
              type="button"
              className={`rm-radio ${priceMode === "negotiate" ? "is-on" : ""}`}
              onClick={() => setPriceMode("negotiate")}
            >Хочу обсудить цену</button>
          </div>
          {priceMode === "negotiate" && (
            <input
              className="rm-input rm-input--mt"
              type="text"
              inputMode="numeric"
              placeholder="Ваше предложение, ₽"
              value={bidPrice}
              onChange={(e) => { setBidPrice(e.target.value.replace(/[^\d ]/g, "")); setError(""); }}
            />
          )}
        </div>

        <div className="rm-field">
          <label className="rm-label">Дополнительно</label>
          <label className="rm-check">
            <input type="checkbox" checked={hasExperience} onChange={(e) => setHasExperience(e.target.checked)}/>
            <span>У меня уже есть похожий опыт — приложу примеры в чате</span>
          </label>
          <label className="rm-check">
            <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)}/>
            <span>Свободен в указанные сроки, без накладок с учёбой</span>
          </label>
        </div>

        <div className="rm-field">
          <label className="rm-label">Ссылка на работу или портфолио <span className="rm-opt">— по желанию</span></label>
          <input
            className="rm-input"
            type="url"
            placeholder="https://..."
            value={portfolioUrl}
            onChange={(e) => setPortfolioUrl(e.target.value)}
          />
        </div>

        {error && <div className="rm-error">{error}</div>}

        <footer className="rm-foot">
          <button type="button" className="rm-btn rm-btn--ghost" onClick={onClose}>Отмена</button>
          <button type="submit" className="rm-btn rm-btn--primary" disabled={!valid}>
            Откликнуться
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="M13 5l7 7-7 7"/>
            </svg>
          </button>
        </footer>
      </form>
    );
  }

  /* ---------- Шаг 2: успех ---------- */
  function SuccessScreen({ task, onClose, onContinue }) {
    return (
      <div className="rm-done">
        <SuccessBurst/>
        <h2 className="rm-done__title">Отклик отправлен!</h2>
        <p className="rm-done__lede">
          Заказчик увидит ваш отклик в течение нескольких часов. Когда ответит — придёт уведомление в кабинет и на email.
        </p>
        <div className="rm-done__task">
          <span className="rm-pill">{task.cat}</span>
          <span className="rm-done__task-title">{task.title}</span>
        </div>
        <div className="rm-done__actions">
          <a className="rm-btn rm-btn--primary" href="cabinet.html#responses">
            Перейти в кабинет
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="M13 5l7 7-7 7"/>
            </svg>
          </a>
          <button className="rm-btn rm-btn--ghost" onClick={onContinue}>
            Продолжить откликаться
          </button>
        </div>
      </div>
    );
  }

  /* ---------- Корневой модал ---------- */
  function RespondModalRoot() {
    const [task, setTask] = useState(null);
    const [stage, setStage] = useState("form"); // form | success

    useEffect(() => {
      const open = (e) => {
        setTask(e.detail?.task || null);
        setStage("form");
      };
      window.addEventListener("studradar:open-respond", open);
      return () => window.removeEventListener("studradar:open-respond", open);
    }, []);

    useEffect(() => {
      const onKey = (e) => { if (e.key === "Escape") close(); };
      if (task) {
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }, [task]);

    if (!task) return null;

    const close = () => { setTask(null); setStage("form"); };

    const handleSubmit = (payload) => {
      saveResponse(payload);
      setStage("success");
    };

    const continueFlow = () => {
      close();
      // прокрутить к каталогу, если он на странице
      const el = document.querySelector('#tasks, [data-section="catalog"], #cats');
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
      <div className="rm-overlay" onClick={(e) => { if (e.target.classList.contains("rm-overlay")) close(); }}>
        <div className={`rm-card ${stage === "success" ? "rm-card--success" : ""}`}>
          <button className="rm-close" onClick={close} aria-label="Закрыть">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M6 6l12 12"/><path d="M18 6L6 18"/>
            </svg>
          </button>
          {stage === "form"
            ? <RespondForm task={task} onClose={close} onSubmit={handleSubmit}/>
            : <SuccessScreen task={task} onClose={close} onContinue={continueFlow}/>
          }
        </div>
      </div>
    );
  }

  /* ---------- Глобальный API ---------- */
  window.openRespondModal = (task) => {
    if (!task) return;
    window.dispatchEvent(new CustomEvent("studradar:open-respond", { detail: { task } }));
  };
  window.studradarLoadResponses = loadResponses;

  /* ---------- Монтирование в отдельный root ---------- */
  function mount() {
    let host = document.getElementById("respond-modal-root");
    if (!host) {
      host = document.createElement("div");
      host.id = "respond-modal-root";
      document.body.appendChild(host);
    }
    ReactDOM.createRoot(host).render(<RespondModalRoot/>);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
