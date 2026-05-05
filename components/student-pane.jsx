/* === Student pane === */
const StudentPane = ({ openModal }) =>
<div className="mode-pane is-active" data-pane="student">
    {/* Hero */}
    <section className="hero shell hero--ref" id="hero">
      <div className="hero-ref__top">
        <h1 className="t-display t-display-xl hero-ref__title">Работа без<br />отрыва от учёбы</h1>
        <div className="hero-ref__sub">
          Выбирай задачи по навыкам, срокам<br />и оплате, собирай портфолио и<br />зарабатывай уже во время учёбы
        </div>
        <div className="hero-ref__folder">
          <FolderIcon color="#1F4FD9" label="Вакансии" textColor="#0E1530" />
        </div>
      </div>

      <div className="hero-ref__plate" style={{ width: "1300px" }}>
        <button className="btn btn-primary hero-ref__cta" onClick={() => openModal("student")}>
          К задачам <span className="arrow-pixel"></span>
        </button>

        <div className="hero-ref__cards">
          <article className="ref-card">
            <div className="ref-card__top">
              <span className="ref-card__cat">Дизайн</span>
              <div className="ref-card__icons"><Icon.Share /><Icon.Heart /></div>
            </div>
            <div className="ref-card__pay">7 500 ₽ <span>За задание</span></div>
            <div className="ref-card__title">Оформление соцсети компании</div>
            <div className="ref-card__meta">
              <div><Icon.Pin /> Удалённо</div>
              <div><Icon.Calendar /> До 24 апреля</div>
            </div>
            <div className="ref-card__actions">
              <button className="btn ref-card__respond" onClick={() => window.openRespondModal({ cat:"Дизайн", title:"Оформление соцсети компании", pay:"7 500 ₽", per:" / задание", place:"Удалённо", date:"До 24 апреля" })}>Откликнуться</button>
              <button className="btn ref-card__more">Подробнее</button>
            </div>
          </article>
          <article className="ref-card">
            <div className="ref-card__top">
              <span className="ref-card__cat">Ивент</span>
              <div className="ref-card__icons"><Icon.Share /><Icon.Heart /></div>
            </div>
            <div className="ref-card__pay">4 200 ₽ <span>За задание</span></div>
            <div className="ref-card__title">Сопровождение гостей</div>
            <div className="ref-card__meta">
              <div><Icon.Pin /> Югра-Экспо</div>
              <div><Icon.Calendar /> 26 апреля</div>
            </div>
            <div className="ref-card__actions">
              <button className="btn ref-card__respond" onClick={() => window.openRespondModal({ cat:"Ивент", title:"Сопровождение гостей", pay:"4 200 ₽", per:" / задание", place:"Югра-Экспо", date:"26 апреля" })}>Откликнуться</button>
              <button className="btn ref-card__more">Подробнее</button>
            </div>
          </article>
          <article className="ref-card">
            <div className="ref-card__top">
              <span className="ref-card__cat">Дизайн</span>
              <div className="ref-card__icons"><Icon.Share /><Icon.Heart /></div>
            </div>
            <div className="ref-card__pay">7 500 ₽ <span>За задание</span></div>
            <div className="ref-card__title">Оформление соцсети компании</div>
            <div className="ref-card__meta">
              <div><Icon.Pin /> Удалённо</div>
              <div><Icon.Calendar /> До 24 апреля</div>
            </div>
            <div className="ref-card__actions">
              <button className="btn ref-card__respond" onClick={() => window.openRespondModal({ cat:"Дизайн", title:"Оформление соцсети компании", pay:"7 500 ₽", per:" / задание", place:"Удалённо", date:"До 24 апреля" })}>Откликнуться</button>
              <button className="btn ref-card__more">Подробнее</button>
            </div>
          </article>
        </div>

        <img className="hero-ref__girl" src="assets/girl.png" alt="" />
      </div>

      <div className="trust-strip">
        <div className="trust-strip__item">
          <div className="trust-strip__num t-mono">200+</div>
          <div className="trust-strip__label">студентов ЮГУ в базе на старт пилота</div>
        </div>
        <div className="trust-strip__item">
          <div className="trust-strip__num t-mono">15</div>
          <div className="trust-strip__label">партнёров-заказчиков в ХМАО-Югре</div>
        </div>
        <div className="trust-strip__item">
          <div className="trust-strip__num t-mono">100%</div>
          <div className="trust-strip__label">задач проходят через эскроу-счёт</div>
        </div>
        <div className="trust-strip__item">
          <div className="trust-strip__num t-mono">4–6%</div>
          <div className="trust-strip__label">налог по самозанятости — оформляем в 2 клика</div>
        </div>
      </div>
    </section>

    {/* How it works */}
    <section className="section-pad shell" id="how">
      <div className="section-head">
        <div className="section-head__title">
          <span className="t-eyebrow">// 03 шага</span>
          <h2 className="t-display t-display-lg">Три шага<br />до первой оплаты</h2>
        </div>
        <p className="section-head__lede">Никаких заявок «в стол». Регистрация — одно действие, дальше платформа сама находит подходящие задачи.</p>
      </div>
      <div className="steps">
        <div className="step">
          <div className="step__num">// 01</div>
          <div className="step__icon"><Icon.User /></div>
          <h3>Регистрация через ЮГУ-аккаунт</h3>
          <p>Подтверждаем, что ты студент, и помогаем оформить самозанятость прямо в личном кабинете. Налог 4–6% считаем за тебя.</p>
        </div>
        <div className="step">
          <div className="step__num">// 02</div>
          <div className="step__icon"><Icon.Spark /></div>
          <h3>Отклик на задачу</h3>
          <p>Платформа подбирает варианты под твою специальность и расписание. Согласовываешь детали с заказчиком — без посредников.</p>
        </div>
        <div className="step">
          <div className="step__num">// 03</div>
          <div className="step__icon"><Icon.Coin /></div>
          <h3>Сделал — получил деньги</h3>
          <p>Заказчик резервирует оплату до старта. После приёмки сумма уходит на твой счёт за минуту. Каждая задача попадает в портфолио.</p>
        </div>
      </div>
    </section>

    {/* Categories */}
    <section className="section-pad shell" id="cats">
      <div className="section-head">
        <div className="section-head__title">
          <span className="t-eyebrow">// направления</span>
          <h2 className="t-display t-display-lg">Что можно делать</h2>
        </div>
        <a className="section-link" href="#">Все 40+ типов задач <span className="arrow-pixel" /></a>
      </div>
      <div className="cats">
        <div className="cat">
          <div className="cat__icon"><Icon.Camera /></div>
          <h3>События<br />и гостеприимство</h3>
          <p>Стойка регистрации, координация участников, ведущий, фотосъёмка мероприятий, переводы для делегаций.</p>
          <div className="cat__meta"><span>Очно</span><span>Почасовая</span></div>
        </div>
        <div className="cat">
          <div className="cat__icon" style={{ background: "#FFE9DD", color: "#C04331" }}><Icon.Pen /></div>
          <h3>Медиа<br />и контент</h3>
          <p>Тексты для соцсетей, монтаж reels, дизайн в Figma и Canva, ведение Telegram-каналов, копирайтинг.</p>
          <div className="cat__meta"><span>Удалённо</span><span>Фикс. объём</span></div>
        </div>
        <div className="cat">
          <div className="cat__icon" style={{ background: "#E5FFE0", color: "#1FB36A" }}><Icon.Code /></div>
          <h3>IT и цифровые<br />услуги</h3>
          <p>Парсеры на Python, лендинги на Tilda, чат-боты в Telegram, тестирование сайтов, техподдержка первой линии.</p>
          <div className="cat__meta"><span>Удалённо</span><span>По проектам</span></div>
        </div>
        <div className="cat">
          <div className="cat__icon" style={{ background: "#F4ECFF", color: "#5B3FCC" }}><Icon.Briefcase /></div>
          <h3>Ассистент<br />и бизнес-задачи</h3>
          <p>Репетиторство, ассистент руководителя, ведение CRM, переводы документов, юр. шаблоны под наставничеством.</p>
          <div className="cat__meta"><span>Гибко</span><span>На длинной дистанции</span></div>
        </div>
      </div>
    </section>

    {/* Tasks feed */}
    <section className="section-pad shell" id="tasks">
      <div className="tasks">
        <div className="radar-bg" style={{ opacity: 0.3 }}><RadarPattern /></div>
        <div className="section-head" style={{ position: "relative", zIndex: 2 }}>
          <div className="section-head__title">
            <span className="t-eyebrow">// сегодня</span>
            <h2 className="t-display t-display-lg">Свежие задачи</h2>
          </div>
          <a className="section-link" href="#" style={{ color: "#fff" }}>Все задачи <span className="arrow-pixel" /></a>
        </div>
        <div className="tasks-grid" style={{ position: "relative", zIndex: 2 }}>
          {[
        { cat: "Ивент", title: "Хостес на форум IT Югра", pay: "8 000", per: "/день", date: "6–7 июня", place: "Ханты-Мансийск" },
        { cat: "Лингвистика", title: "Перевод сайта на английский, 15 страниц", pay: "12 000", per: "/проект", date: "до 5 декабря", place: "Удалённо" },
        { cat: "IT", title: "Сборка лендинга на Tilda для кофейни", pay: "18 000", per: "/проект", date: "5 дней", place: "Удалённо" },
        { cat: "Медиа", title: "Фотограф на корпоратив, 6 часов", pay: "7 500", per: "/смена", date: "14 декабря", place: "Сургут" }].
        map((t, i) =>
        <article key={i} className="task">
              <div className="task__top">
                <span className="task__cat">{t.cat}</span>
                <div className="task__icons"><Icon.Share /><Icon.Heart /></div>
              </div>
              <div className="task__pay">{t.pay} ₽<sub>{t.per}</sub></div>
              <h3 className="task__title">{t.title}</h3>
              <div className="task__meta">
                <div><Icon.Pin /> {t.place}</div>
                <div><Icon.Calendar /> {t.date}</div>
              </div>
              <div className="task__actions">
                <button className="btn btn-respond" onClick={() => window.openRespondModal({ cat: t.cat, title: t.title, pay: t.pay + " ₽", per: " " + t.per, date: t.date, place: t.place })}>Откликнуться</button>
                <button className="btn btn-more">Подробнее</button>
              </div>
            </article>
        )}
        </div>
      </div>
    </section>

    {/* Escrow */}
    <section className="section-pad shell" id="escrow">
      <div className="escrow">
        <div className="escrow__text">
          <span className="t-eyebrow">// безопасная сделка</span>
          <h2 className="t-display t-display-lg">Деньги — там,<br />где безопасно</h2>
          <p>Перед стартом задачи заказчик переводит сумму на счёт платформы. До приёмки она там и остаётся: ни ты, ни заказчик не можете её снять.</p>
          <p>Когда работа сдана и принята, деньги падают тебе на карту в течение часа. Если заказчик пропадает или меняет условия — спор решает модератор СтудРадара в течение 48 часов.</p>
        </div>
        <div className="escrow__diag">
          <div className="escrow__steps">
            <div className="escrow__step">
              <span className="escrow__step-num">1</span>
              <span className="escrow__step-title">Заказчик публикует задачу</span>
              <span className="escrow__step-amount">— ₽</span>
            </div>
            <div className="escrow__step">
              <span className="escrow__step-num">2</span>
              <span className="escrow__step-title">Деньги — на эскроу-счёт</span>
              <span className="escrow__step-amount">+ 12 000 ₽</span>
            </div>
            <div className="escrow__step escrow__step--active">
              <span className="escrow__step-num">3</span>
              <span className="escrow__step-title">Ты выполняешь работу</span>
              <span className="escrow__step-amount">резерв 12 000 ₽</span>
            </div>
            <div className="escrow__step">
              <span className="escrow__step-num">4</span>
              <span className="escrow__step-title">Приёмка — выплата на карту</span>
              <span className="escrow__step-amount">+ 12 000 ₽</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Profile */}
    <section className="section-pad shell" id="profile">
      <div className="profile-preview">
        <div className="escrow__text">
          <span className="t-eyebrow">// портфолио</span>
          <h2 className="t-display t-display-lg">Каждая задача —<br />строчка в резюме</h2>
          <p>Платформа автоматически собирает выполненные задачи: с описанием, ролью, отзывом заказчика и оценкой. К выпуску у тебя готовый кейс-лист, который можно показать на собеседовании.</p>
          <p>Не нужно «как-то этим заняться» — оно собирается само.</p>
          <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => openModal("student")}>
            Завести профиль <span className="arrow-pixel" />
          </button>
        </div>
        <div className="profile-card">
          <div className="profile-card__head">
            <div className="profile-card__avatar" />
            <div>
              <h3 className="profile-card__name">Мария И.</h3>
              <div className="profile-card__sub">Лингвистика, ЮГУ · 2 курс</div>
              <div className="profile-card__sub" style={{ marginTop: 4, color: "#0040A0", fontWeight: 600 }}>★ 5.0 · 30 задач</div>
            </div>
          </div>
          <div className="profile-stats">
            <div className="profile-stat">
              <span className="profile-stat__num">30</span>
              <span className="profile-stat__label">задач</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat__num">12</span>
              <span className="profile-stat__label">кейсов</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat__num">23</span>
              <span className="profile-stat__label">отзывов</span>
            </div>
          </div>
          <div className="portfolio-list">
            <div className="portfolio-row"><span>Перевод на «Дух огня» 2025</span><span className="portfolio-row__year">2025</span></div>
            <div className="portfolio-row"><span>Хостес на IT-Forum Югра</span><span className="portfolio-row__year">2024</span></div>
            <div className="portfolio-row"><span>Сопровождение делегации</span><span className="portfolio-row__year">2024</span></div>
          </div>
        </div>
      </div>
    </section>

    {/* Stories */}
    <section className="section-pad shell" id="stories">
      <div className="section-head">
        <div className="section-head__title">
          <span className="t-eyebrow">// истории</span>
          <h2 className="t-display t-display-lg">Как ребята<br />уже работают</h2>
        </div>
      </div>
      <div className="stories">
        {[
      { name: "Лейла", course: "4 курс, лингвистика", caption: "фото с Югра-Экспо", quote: "Раньше я три раза волонтёрила бесплатно — обещали оплату и не платили. Через СтудРадар первая задача — синхрон на чемпионате — пришла за две недели, оплата на эскроу. Сделала, получила. Это другая лига." },
      { name: "Стас", course: "3 курс, лингвистика", caption: "фото с форума IT Югра", quote: "Я делал переводы по знакомству, но они нигде не были оформлены. Сейчас у меня в профиле уже 7 закрытых задач и отзывы — выглядит как реальный опыт, а не «умею английский»." },
      { name: "Полина", course: "2 курс, журналистика", caption: "фото со съёмки в кофейне", quote: "Не искала работу — просто посмотрела ленту. Взяла монтаж reels для местной кофейни на выходные. Получилось 4 000 за два дня. На большее пока не готова, но начало есть." }].
      map((s, i) =>
      <article key={i} className="story">
            <div className="story__photo" data-caption={s.caption} style={{ backgroundSize: "auto" }} />
            <p className="story__quote">«{s.quote}»</p>
            <div className="story__author"><strong>{s.name}</strong> · {s.course}</div>
          </article>
      )}
      </div>
    </section>

    {/* PRO */}
    <section className="section-pad shell" id="pro">
      <div className="pro">
        <div className="radar-bg" style={{ opacity: 0.2 }}><RadarPattern stroke="rgba(255,255,255,0.15)" /></div>
        <div style={{ position: "relative", zIndex: 2 }}>
          <span className="t-eyebrow" style={{ color: "rgba(255,255,255,.6)" }}>// PRO-тариф</span>
          <h2 className="t-display t-display-lg">СтудРадар PRO</h2>
          <div className="pro__price">399 ₽<small>/мес</small></div>
          <p className="pro__lede" style={{ marginTop: 16 }}>Базовый функционал бесплатный. PRO нужен, если ты хочешь брать больше задач.</p>
          <button className="btn btn-accent" onClick={() => openModal("student")}>
            Попробовать PRO <span className="arrow-pixel" />
          </button>
        </div>
        <ul className="pro__list" style={{ position: "relative", zIndex: 2 }}>
          <li><Icon.Check /><span>Безлимитные отклики (вместо 5 в день)</span></li>
          <li><Icon.Check /><span>Приоритет в выдаче для заказчиков</span></li>
          <li><Icon.Check /><span>Расширенные фильтры по задачам</span></li>
          <li><Icon.Check /><span>Консультация по портфолио — раз в квартал</span></li>
          <li><Icon.Check /><span>Метка «PRO» в карточке профиля</span></li>
        </ul>
      </div>
    </section>

    {/* FAQ */}
    <section className="section-pad shell" id="faq">
      <div className="section-head" style={{ justifyContent: "center", textAlign: "center" }}>
        <div className="section-head__title" style={{ margin: "0 auto" }}>
          <span className="t-eyebrow">// вопросы и ответы</span>
          <h2 className="t-display t-display-lg">Частые вопросы</h2>
        </div>
      </div>
      <Faq items={[
    { q: "Сколько берёт платформа?", a: "С тебя — ничего. 15% берём с заказчика после успешной приёмки задачи. Сумма, которую ты видишь в карточке, — это сумма, которая придёт тебе на карту." },
    { q: "Самозанятость — это сложно?", a: "Оформляем за пять минут в приложении «Мой налог», помогаем в личном кабинете. Налог 4–6%, считаем автоматом — тебе ничего не надо." },
    { q: "А если задача займёт много времени и пойдут хвосты по учёбе?", a: "Мы не диспетчер — ты сам выбираешь, на что откликаться. Большинство задач — от пары часов до выходных. Можно фильтровать по длительности и расписанию." },
    { q: "Что делать, если заказчик не принимает работу?", a: "Открываешь спор. Модератор смотрит переписку и техзадание, решает в течение 48 часов. Если работа сдана по ТЗ — деньги уходят тебе." },
    { q: "Можно работать без портфолио?", a: "Да. Первые 2–3 задачи — простые, не требующие опыта. Дальше портфолио соберётся само из закрытых задач." }]
    } />
    </section>

    {/* Final CTA */}
    <section className="section-pad shell">
      <div className="cta-final">
        <div className="radar-bg" style={{ opacity: 0.3 }}><RadarPattern /></div>
        <div style={{ position: "relative", zIndex: 2 }}>
          <span className="t-eyebrow" style={{ color: "rgba(255,255,255,.7)" }}>// начни сейчас</span>
          <h2 className="t-display t-display-lg" style={{ marginTop: 16 }}>Начни<br />с одной задачи</h2>
          <p>Регистрация бесплатна, верификация занимает 10 минут. Первый отклик можно отправить уже сегодня.</p>
          <div className="cta-final__buttons">
            <button className="btn btn-accent" onClick={() => openModal("student")}>
              Зарегистрироваться <span className="arrow-pixel" />
            </button>
            <a className="btn btn-ghost btn-on-blue" href="#how">Как это работает</a>
          </div>
        </div>
      </div>
    </section>
  </div>;


window.StudentPane = StudentPane;