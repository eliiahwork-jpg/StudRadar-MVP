/* === Customer pane === */
const CustomerPane = ({ openModal }) => (
  <div className="mode-pane is-active" data-pane="customer">
    {/* Hero */}
    <section className="hero shell hero--ref hero--ref-c" id="hero-c">
      <div className="hero-ref__top">
        <h1 className="t-display t-display-xl hero-ref__title">Студенты для<br/>вашего бизнеса</h1>
        <div className="hero-ref__sub">
          Ищите идеальных<br/>кандидатов за минуты
        </div>
        <div className="hero-ref__folder">
          <FolderIcon color="#C04331" label="Резюме" textColor="#0E1530"/>
        </div>
      </div>

      <div className="hero-ref__plate">
        <button className="btn btn-primary hero-ref__cta" onClick={() => openModal("customer")}>
          К студентам <span className="arrow-pixel"/>
        </button>

        <div className="hero-ref__cards">
          {[
            { photo: "assets/student-photo.png", rating: "5,0", title: "Сопровожу иностранных гостей", name: "Екатерина Лебедева, 4 курс", tasks: 20, reviews: 15, uni: "Казанский национальный уни" },
            { photo: "assets/student-photo.png", rating: "5,0", title: "Сопровожу иностранных гостей", name: "Екатерина Лебедева, 4 курс", tasks: 20, reviews: 15, uni: "Казанский национальный уни" },
            { photo: "assets/student-photo.png", rating: "5,0", title: "Сопровожу иностранных гостей", name: "Екатерина Лебедева, 4 курс", tasks: 20, reviews: 15, uni: "Казанский национальный уни" },
            { photo: "assets/student-photo.png", rating: "5,0", title: "Сопровожу иностранных гостей", name: "Екатерина Лебедева, 4 курс", tasks: 20, reviews: 15, uni: "Казанский национальный уни" },
          ].map((p, i) => (
            <article key={i} className="perf-card">
              <div className="perf-card__photo" style={{ backgroundImage: `url(${p.photo})` }}>
                <span className="perf-card__rating"><Icon.Star/> {p.rating}</span>
              </div>
              <div className="perf-card__body">
                <div className="perf-card__title">{p.title}</div>
                <div className="perf-card__name">{p.name}</div>
                <div className="perf-card__stats">
                  <div>Выполнил задач <strong>{p.tasks}</strong></div>
                  <div>Отзывов <strong>{p.reviews}</strong></div>
                </div>
                <div className="perf-card__uni">{p.uni}</div>
              </div>
            </article>
          ))}
        </div>

        <img className="hero-ref__man" src="assets/man.png" alt=""/>
      </div>

      <div className="trust-strip">
        <div className="trust-strip__item">
          <div className="trust-strip__num t-mono">6 ч</div>
          <div className="trust-strip__label">среднее время до закрытия позиции</div>
        </div>
        <div className="trust-strip__item">
          <div className="trust-strip__num t-mono">4 ч</div>
          <div className="trust-strip__label">срок страховой замены при срыве</div>
        </div>
        <div className="trust-strip__item">
          <div className="trust-strip__num t-mono">15%</div>
          <div className="trust-strip__label">комиссия — только при успешной приёмке</div>
        </div>
        <div className="trust-strip__item">
          <div className="trust-strip__num t-mono">152-ФЗ</div>
          <div className="trust-strip__label">серверы в РФ, NDA с каждым исполнителем</div>
        </div>
      </div>
    </section>

    {/* Pains */}
    <section className="section-pad shell" id="pains-c">
      <div className="section-head">
        <div className="section-head__title">
          <span className="t-eyebrow">// если знакомо</span>
          <h2 className="t-display t-display-lg">Если знакомо —<br/>вы по адресу</h2>
        </div>
        <p className="section-head__lede">Четыре боли, которые слышим от ивент-агентств, КВЦ и HR-команд ХМАО. Закрываем системно, а не «по знакомству».</p>
      </div>
      <div className="pains">
        {[
          { n: "// 01", q: "«За три дня до форума ищем 30 человек на регистрацию через личные звонки»", a: "У нас — пул из 200+ верифицированных студентов с подтверждённым выходом и системой страховой замены. Закроете позицию за 6 часов, а не за неделю." },
          { n: "// 02", q: "«Заплатили волонтёру в конверте, теперь не отчитаться»", a: "Все исполнители — самозанятые. Чек формируется в момент приёмки и автоматически уходит вам на e-mail. Никаких серых ГПХ-договоров." },
          { n: "// 03", q: "«Студент не вышел на смену, и мероприятие провалено»", a: "При срыве в течение 4 часов даём замену из резервного пула. Если замены нет — оплата возвращается полностью." },
          { n: "// 04", q: "«Не понимаем, кого нанимаем — резюме у студентов нет»", a: "Профиль каждого исполнителя содержит вуз, специальность, курс, выполненные задачи, отзывы и рейтинг. Все данные верифицированы вузом." },
        ].map((p, i) => (
          <div key={i} className="pain">
            <span className="pain__num">{p.n}</span>
            <div>
              <h3 className="pain__quote">{p.q}</h3>
              <p className="pain__answer">{p.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* How (3 paths) */}
    <section className="section-pad shell" id="how-c">
      <div className="section-head">
        <div className="section-head__title">
          <span className="t-eyebrow">// форматы</span>
          <h2 className="t-display t-display-lg">Три формата —<br/>выбирайте под задачу</h2>
        </div>
      </div>
      <div className="steps">
        <div className="step">
          <div className="step__num">// 01 · самостоятельно</div>
          <div className="step__icon"><Icon.Spark/></div>
          <h3>Самостоятельный подбор</h3>
          <p>Публикуете задачу, получаете отклики верифицированных студентов, выбираете сами. Подходит для разовых задач — копирайтинг, дизайн, перевод.</p>
          <div style={{ marginTop: "auto" }}>
            <strong style={{ fontFamily: "Tektur", fontSize: 24, color: "#C04331" }}>Комиссия 15%</strong>
            <button className="btn btn-accent" style={{ marginTop: 16, width: "100%", justifyContent: "center" }} onClick={() => openModal("customer")}>
              Опубликовать задачу
            </button>
          </div>
        </div>
        <div className="step">
          <div className="step__num">// 02 · под ключ</div>
          <div className="step__icon"><Icon.Briefcase/></div>
          <h3>Подбор под ключ для мероприятий</h3>
          <p>Координатор СтудРадара формирует команду студентов под ваш ивент: брифует, проверяет выход, заменяет при срыве, готовит отчёт.</p>
          <div style={{ marginTop: "auto" }}>
            <strong style={{ fontFamily: "Tektur", fontSize: 24, color: "#C04331" }}>от 20 000 ₽</strong>
            <button className="btn btn-accent" style={{ marginTop: 16, width: "100%", justifyContent: "center" }} onClick={() => openModal("turnkey")}>
              Оставить заявку
            </button>
          </div>
        </div>
        <div className="step">
          <div className="step__num">// 03 · подписка</div>
          <div className="step__icon"><Icon.Bolt/></div>
          <h3>Подписка для регулярных задач</h3>
          <p>Безлимитные публикации, приоритет в выдаче, выделенный менеджер, ежемесячный отчёт. Подходит МСБ с повторяющимися задачами.</p>
          <div style={{ marginTop: "auto" }}>
            <strong style={{ fontFamily: "Tektur", fontSize: 24, color: "#C04331" }}>3 990 ₽/мес</strong>
            <button className="btn btn-accent" style={{ marginTop: 16, width: "100%", justifyContent: "center" }} onClick={() => openModal("subscribe")}>
              Узнать о подписке
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* Roster */}
    <section className="section-pad shell" id="roster-c">
      <div className="tasks" style={{ background: "var(--c-orange)" }}>
        <div className="radar-bg" style={{ opacity: 0.25 }}><RadarPattern/></div>
        <div className="section-head" style={{ position: "relative", zIndex: 2 }}>
          <div className="section-head__title">
            <span className="t-eyebrow">// каталог</span>
            <h2 className="t-display t-display-lg">Кого вы будете нанимать</h2>
          </div>
          <a className="section-link" href="performers.html" style={{ color: "#fff" }}>
            Открыть каталог <span className="arrow-pixel"/>
          </a>
        </div>
        <div className="roster" style={{ position: "relative", zIndex: 2 }}>
          {[
            { n: "Екатерина Л.", role: "Лингвистика, ЮГУ", course: "4 курс", tasks: 20, rating: "5.0", skills: ["Перевод", "Сопровождение", "EN B2"] },
            { n: "Илья П.", role: "Прикладная информатика", course: "3 курс", tasks: 12, rating: "4.9", skills: ["Python", "Tilda", "Боты"] },
            { n: "Анна С.", role: "Журналистика", course: "2 курс", tasks: 7, rating: "4.8", skills: ["Reels", "Фото", "SMM"] },
            { n: "Полина Б.", role: "Дизайн", course: "3 курс", tasks: 15, rating: "5.0", skills: ["Figma", "Брендинг"] },
            { n: "Тимур К.", role: "Менеджмент", course: "4 курс", tasks: 24, rating: "4.9", skills: ["Координация", "Ивенты"] },
            { n: "Мария В.", role: "Лингвистика", course: "2 курс", tasks: 9, rating: "4.7", skills: ["Перевод", "EN C1", "DE B1"] },
            { n: "Алина Р.", role: "Реклама и PR", course: "3 курс", tasks: 11, rating: "4.8", skills: ["Копирайт", "Telegram"] },
            { n: "Рустам Х.", role: "ИТ-безопасность", course: "4 курс", tasks: 18, rating: "5.0", skills: ["Тестирование", "QA"] },
          ].map((s, i) => (
            <article key={i} className="roster-card">
              <div className="roster-card__photo">
                <span className="roster-card__rating"><Icon.Star/> {s.rating}</span>
              </div>
              <h3 className="roster-card__name">{s.n}</h3>
              <div className="roster-card__role">{s.role} · {s.course}</div>
              <div className="roster-card__skills">{s.skills.map(k => <span key={k}>{k}</span>)}</div>
              <div className="roster-card__meta">{s.tasks} задач · отзывы 100%</div>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* Cases */}
    <section className="section-pad shell" id="cases-c">
      <div className="section-head">
        <div className="section-head__title">
          <span className="t-eyebrow">// кейсы</span>
          <h2 className="t-display t-display-lg">С кем мы<br/>уже работаем</h2>
        </div>
      </div>
      <div className="cases">
        <article className="case">
          <div className="case__img" data-caption="фото с IT-Forum Югра 2024"/>
          <div className="case__body">
            <div className="case__num">24/48ч</div>
            <h3>IT-Forum Югра, 2024</h3>
            <p>Закрыли 24 позиции хостес и координаторов за 48 часов. Без ручного обзвона: студенты-лингвисты, журналисты, менеджмент.</p>
          </div>
        </article>
        <article className="case">
          <div className="case__img" data-caption="фото с КВЦ Югра-Экспо"/>
          <div className="case__body">
            <div className="case__num">−92%</div>
            <h3>КВЦ «Югра-Экспо», 2024–2025</h3>
            <p>Перевели поиск временного персонала с мессенджеров на платформу. Время подбора сократилось с 3 дней до 6 часов.</p>
          </div>
        </article>
        <article className="case">
          <div className="case__img" data-caption="чемпионат, Ханты-Мансийск 2025"/>
          <div className="case__body">
            <div className="case__num">12 чел</div>
            <h3>Чемпионат азиатских городов, 2025</h3>
            <p>Команда студентов-лингвистов и журналистов: переводы, координация делегаций, фото-видео. Полный цикл за две недели.</p>
          </div>
        </article>
      </div>
    </section>

    {/* Pricing */}
    <section className="section-pad shell" id="pricing-c">
      <div className="section-head">
        <div className="section-head__title">
          <span className="t-eyebrow">// тарифы</span>
          <h2 className="t-display t-display-lg">Сколько стоит</h2>
        </div>
        <p className="section-head__lede">Платите только за результат. Деньги списываются после успешной приёмки задачи.</p>
      </div>
      <div className="pricing">
        <div className="plan">
          <span className="plan__badge">Разовая задача</span>
          <h3>Опубликовать<br/>задачу</h3>
          <div className="plan__price">15%<small>комиссия</small></div>
          <p className="plan__lede">Один исполнитель, понятная задача. Платите только при приёмке.</p>
          <ul>
            <li><Icon.Check/><span>Эскроу-выплаты</span></li>
            <li><Icon.Check/><span>Чек самозанятого автоматически</span></li>
            <li><Icon.Check/><span>Замена при срыве через спор</span></li>
            <li><Icon.Check/><span>Отчёт по сделкам по запросу</span></li>
          </ul>
          <button className="btn btn-primary" onClick={() => openModal("customer")}>
            Опубликовать <span className="arrow-pixel"/>
          </button>
        </div>
        <div className="plan plan--featured">
          <span className="plan__badge">Под ключ · популярно</span>
          <h3>Подбор<br/>под ключ</h3>
          <div className="plan__price">от 20 000 ₽<small>/проект</small></div>
          <p className="plan__lede">Мероприятие на 10+ человек. Координатор СтудРадара ведёт всё сам.</p>
          <ul>
            <li><Icon.Check/><span>Эскроу-выплаты</span></li>
            <li><Icon.Check/><span>Замена в течение 4 часов</span></li>
            <li><Icon.Check/><span>Выделенный менеджер</span></li>
            <li><Icon.Check/><span>Брифинг и проверка выхода</span></li>
            <li><Icon.Check/><span>Отчёт после каждого проекта</span></li>
          </ul>
          <button className="btn btn-accent" onClick={() => openModal("turnkey")}>
            Оставить заявку <span className="arrow-pixel"/>
          </button>
        </div>
        <div className="plan">
          <span className="plan__badge">Подписка</span>
          <h3>Подписка<br/>для бизнеса</h3>
          <div className="plan__price">3 990 ₽<small>/мес</small></div>
          <p className="plan__lede">Регулярные публикации, приоритет в выдаче, выделенный менеджер.</p>
          <ul>
            <li><Icon.Check/><span>Безлимитные публикации</span></li>
            <li><Icon.Check/><span>Приоритет в выдаче</span></li>
            <li><Icon.Check/><span>Замена в течение 4 часов</span></li>
            <li><Icon.Check/><span>Ежемесячный отчёт</span></li>
          </ul>
          <button className="btn btn-primary" onClick={() => openModal("subscribe")}>
            Подключить <span className="arrow-pixel"/>
          </button>
        </div>
      </div>
    </section>

    {/* Legal */}
    <section className="section-pad shell" id="legal-c">
      <div className="legal">
        <div className="legal__col">
          <span className="t-eyebrow">// налоги и чеки</span>
          <h3>Юридическая чистота</h3>
          <p>Все выплаты — через самозанятость исполнителя. Чек формируется в момент приёмки и автоматически уходит вам на e-mail. Ни наличных, ни серых ГПХ-договоров. При работе через подбор под ключ или подписку — выдаём акт выполненных работ от имени платформы.</p>
        </div>
        <div className="legal__col">
          <span className="t-eyebrow">// данные и доступ</span>
          <h3>Безопасность данных</h3>
          <p>Платформа соответствует ФЗ-152 о персональных данных. Серверы в РФ. Мы не передаём контакты студентов до того, как вы оформили сделку, — спам и обходные сделки исключены.</p>
          <div className="legal__badges">
            <span className="legal__badge">ФНС · самозанятость</span>
            <span className="legal__badge">152-ФЗ</span>
            <span className="legal__badge">Эскроу 395-1</span>
          </div>
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="section-pad shell" id="faq-c">
      <div className="section-head" style={{ justifyContent: "center", textAlign: "center" }}>
        <div className="section-head__title" style={{ margin: "0 auto" }}>
          <span className="t-eyebrow">// вопросы и ответы</span>
          <h2 className="t-display t-display-lg">Частые вопросы</h2>
        </div>
      </div>
      <Faq items={[
        { q: "Что делать, если студент не вышел на смену?", a: "Сообщаете в течение 30 минут после старта — менеджер подбирает замену из резервного пула в течение 4 часов. Если замены нет, оплата возвращается полностью." },
        { q: "Можем ли мы заключить договор со студентом напрямую после знакомства?", a: "До закрытия первой сделки — нет. После закрытия — да; СтудРадар не препятствует прямым контрактам, если вы продолжаете сотрудничество вне платформы." },
        { q: "Как с НДС?", a: "Самозанятые НДС не платят. Для закрытия отчётности мы выдаём акт выполненных работ от имени платформы при работе через подбор под ключ или подписку." },
        { q: "Какой средний чек задачи?", a: "3 000 ₽ за разовую задачу, от 7 000 ₽/смена за ивент-позицию, индивидуально для проектов под ключ." },
        { q: "В каких городах работаете?", a: "На пилоте — Ханты-Мансийск, Сургут, Нижневартовск. Расширение в УрФО запланировано на 2027 год." },
      ]}/>
    </section>

    {/* Final CTA */}
    <section className="section-pad shell">
      <div className="cta-final">
        <div className="radar-bg" style={{ opacity: 0.3 }}><RadarPattern/></div>
        <div style={{ position: "relative", zIndex: 2 }}>
          <span className="t-eyebrow" style={{ color: "rgba(255,255,255,.7)" }}>// первый шаг</span>
          <h2 className="t-display t-display-lg" style={{ marginTop: 16 }}>Опубликуйте<br/>первую задачу</h2>
          <p>Это бесплатно. Деньги списываются только после того, как работа сдана и принята вашей стороной.</p>
          <div className="cta-final__buttons">
            <button className="btn btn-primary" onClick={() => openModal("customer")}>
              Опубликовать задачу <span className="arrow-pixel"/>
            </button>
            <button className="btn btn-ghost btn-on-blue" onClick={() => openModal("turnkey")}>
              Связаться с менеджером
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
);

window.CustomerPane = CustomerPane;
