
    const { useState, useEffect } = React;

    function App() {
      const [mode, setMode] = useState("student");
      const [modal, setModal] = useState(null);

      useEffect(() => {
        document.documentElement.setAttribute("data-mode", mode);
      }, [mode]);

      const studentNav = [
        { href: "#how", label: "Как это работает" },
        { href: "tasks.html", label: "Задачи" },
        { href: "performers.html", label: "Исполнители" },
        { href: "#pro", label: "PRO" },
        { href: "#faq", label: "FAQ" },
      ];
      const customerNav = [
        { href: "#how-c", label: "Как это работает" },
        { href: "tasks.html", label: "Задачи" },
        { href: "performers.html", label: "Исполнители" },
        { href: "#cases-c", label: "Кейсы" },
        { href: "#pricing-c", label: "Тарифы" },
        { href: "#faq-c", label: "FAQ" },
      ];
      const nav = mode === "student" ? studentNav : customerNav;

      return (
        <>
          <header className="site-header" id="top">
            <div className="site-header__inner">
              <Logo/>
              <div className="audience-toggle" role="tablist" aria-label="Аудитория">
                <button
                  role="tab"
                  className={`audience-toggle__option ${mode === "student" ? "audience-toggle__option--active" : ""}`}
                  onClick={() => setMode("student")}
                >Студенту</button>
                <button
                  role="tab"
                  className={`audience-toggle__option ${mode === "customer" ? "audience-toggle__option--active" : ""}`}
                  onClick={() => setMode("customer")}
                >Заказчику</button>
                <span className="audience-toggle__indicator" aria-hidden="true"/>
              </div>
              <nav className="nav">
                {nav.map(n => <a key={n.href} href={n.href}>{n.label}</a>)}
              </nav>
              <div className="header__right">
                <button className="icon-btn" aria-label="Поиск"><Icon.Search/></button>
                <a className="btn-login" href={mode === "customer" ? "customer-cabinet.html" : "cabinet.html"}><Icon.Login/><span>Войти</span></a>
                <button className="burger" aria-label="Меню"><Icon.Burger/></button>
              </div>
            </div>
          </header>

          <main>
            {mode === "student" ? <StudentPane openModal={setModal}/> : <CustomerPane openModal={setModal}/>}
          </main>

          <footer className="footer">
            <div className="footer__grid">
              <div className="footer__brand">
                <Logo/>
                <p>Региональная платформа подработок и проектов для студентов ЮГУ и вузов ХМАО-Югры. Базовый вуз — Югорский ГУ.</p>
                <div className="footer__socials">
                  <a className="footer__social" href="#" aria-label="Telegram"><Icon.Tg/></a>
                  <a className="footer__social" href="#" aria-label="ВКонтакте"><Icon.Vk/></a>
                </div>
              </div>
              <div className="footer__col">
                <h4>// студентам</h4>
                <a href="#" onClick={(e) => { e.preventDefault(); setModal("student"); }}>Регистрация</a>
                <a href="#how">Как это работает</a>
                <a href="#pro">PRO-тариф</a>
                <a href="#faq">Помощь</a>
              </div>
              <div className="footer__col">
                <h4>// заказчикам</h4>
                <a href="#" onClick={(e) => { e.preventDefault(); setModal("customer"); }}>Опубликовать задачу</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setModal("turnkey"); }}>Под ключ</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setModal("subscribe"); }}>Подписка</a>
                <a href="#cases-c">Кейсы</a>
              </div>
              <div className="footer__col">
                <h4>// о платформе</h4>
                <a href="#">Команда</a>
                <a href="#">Контакты</a>
                <a href="#">Партнёры</a>
                <a href="#">Стартап как диплом</a>
              </div>
              <div className="footer__col">
                <h4>// приложения</h4>
                <a href="#">iOS · скоро</a>
                <a href="#">Android · скоро</a>
                <a href="mailto:hello@studradar.ru">hello@studradar.ru</a>
              </div>
            </div>
            <div className="footer__bottom">
              <span>© 2026 СтудРадар · ИНН 8601000000 · ОГРН 1268600000000</span>
              <span>
                <a href="#">Политика конфиденциальности</a>
                <a href="#">Согласие на ПД</a>
                <a href="#">Оферта</a>
              </span>
            </div>
          </footer>

          <Modal kind={modal} onClose={() => setModal(null)}/>
          <StudRadarTweaks/>
        </>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
  