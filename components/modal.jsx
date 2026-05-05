/* === Modal forms === */
const { useState } = React;

function Field({ label, ...props }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input {...props} />
    </label>
  );
}
function SelectField({ label, options, ...props }) {
  return (
    <label className="field">
      <span>{label}</span>
      <select {...props}>{options.map(o => <option key={o} value={o}>{o}</option>)}</select>
    </label>
  );
}
function TextareaField({ label, ...props }) {
  return (
    <label className="field">
      <span>{label}</span>
      <textarea {...props}/>
    </label>
  );
}

function Modal({ kind, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  if (!kind) return null;

  const isStudent = kind === "student";
  const isCustomer = kind === "customer";
  const isTurnkey = kind === "turnkey";
  const isSubscribe = kind === "subscribe";

  const titles = {
    student: { h: "Регистрация студента", s: "Заполни анкету — верификация занимает 10 минут" },
    customer: { h: "Регистрация компании", s: "Опубликуйте первую задачу — это бесплатно" },
    turnkey: { h: "Заявка на подбор под ключ", s: "Координатор свяжется с вами в течение часа" },
    subscribe: { h: "Подписка для бизнеса", s: "Менеджер расскажет про условия и подключит" },
  };

  const submit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Закрыть">×</button>
        {submitted ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
            <h3>Заявка отправлена</h3>
            <p className="modal__sub">Мы свяжемся с вами в течение рабочего дня. Проверьте почту — там письмо с подтверждением.</p>
            <button className="btn btn-primary modal__submit" onClick={onClose}>
              Понятно <span className="arrow-pixel"></span>
            </button>
          </div>
        ) : (
          <>
            <h3>{titles[kind].h}</h3>
            <p className="modal__sub">{titles[kind].s}</p>
            <form onSubmit={submit}>
              {isStudent && (
                <>
                  <Field label="ФИО" placeholder="Иванов Иван" required/>
                  <Field label="E-mail" type="email" placeholder="ivanov@yugu.ru" required/>
                  <SelectField label="Вуз" options={["ЮГУ — Югорский ГУ","Сургутский ГУ","Нижневартовский ГУ","Другой вуз ХМАО"]}/>
                  <div className="field-row">
                    <SelectField label="Курс" options={["1 курс","2 курс","3 курс","4 курс","Магистратура"]}/>
                    <Field label="Направление" placeholder="Лингвистика" required/>
                  </div>
                  <Field label="Телефон" type="tel" placeholder="+7 (___) ___-__-__" required/>
                </>
              )}
              {isCustomer && (
                <>
                  <Field label="Название компании" placeholder='ООО "Югра-Экспо"' required/>
                  <div className="field-row">
                    <Field label="ИНН" placeholder="10 цифр" required/>
                    <Field label="Должность" placeholder="HR-директор"/>
                  </div>
                  <Field label="ФИО контакта" placeholder="Петрова Анна" required/>
                  <Field label="E-mail" type="email" placeholder="hr@company.ru" required/>
                  <Field label="Телефон" type="tel" placeholder="+7 (___) ___-__-__" required/>
                  <TextareaField label="Какие задачи планируете" placeholder="Хостес на форум, переводчики, дизайнер на проект…"/>
                </>
              )}
              {isTurnkey && (
                <>
                  <Field label="Название мероприятия" placeholder="IT-Forum Югра 2026" required/>
                  <div className="field-row">
                    <Field label="Дата" type="date"/>
                    <Field label="Город" placeholder="Ханты-Мансийск"/>
                  </div>
                  <Field label="Сколько студентов нужно" type="number" placeholder="например, 24"/>
                  <Field label="E-mail для связи" type="email" required/>
                  <Field label="Телефон" type="tel" required/>
                  <TextareaField label="Какие роли" placeholder="Регистрация, координация, переводчики…"/>
                </>
              )}
              {isSubscribe && (
                <>
                  <Field label="Название компании" required/>
                  <Field label="ИНН"/>
                  <Field label="ФИО" required/>
                  <Field label="E-mail" type="email" required/>
                  <Field label="Телефон" type="tel" required/>
                  <TextareaField label="Сколько задач планируете в месяц" placeholder="5–10 публикаций"/>
                </>
              )}
              <button type="submit" className={`btn ${isCustomer || isTurnkey || isSubscribe ? "btn-accent" : "btn-primary"} modal__submit`}>
                Отправить заявку <span className="arrow-pixel"></span>
              </button>
              <p className="modal__legal">Нажимая кнопку, вы соглашаетесь с <a href="#">политикой обработки персональных данных</a> в соответствии с ФЗ-152.</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

window.Modal = Modal;
