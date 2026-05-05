/* === FAQ accordion === */
function Faq({ items }) {
  const [open, setOpen] = React.useState(0);
  return (
    <div className="faq">
      {items.map((it, i) => (
        <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
          <button className="faq-item__q" onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{it.q}</span>
            <span className="faq-item__icon"><Icon.Plus/></span>
          </button>
          <div className="faq-item__a">
            <div className="faq-item__a-inner">{it.a}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
window.Faq = Faq;
