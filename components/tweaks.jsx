/* === СтудРадар Tweaks === */

function StudRadarTweaks() {
  const [tweaks, setTweak] = useTweaks(/*EDITMODE-BEGIN*/{
    "theme": "light",
    "density": "standard",
    "character": "tech"
  }/*EDITMODE-END*/);

  // Apply tweaks to document root as CSS vars + data attrs
  React.useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    // ── THEME ──────────────────────────────────────────
    if (tweaks.theme === "dark") {
      root.style.setProperty("--c-bg", "#0B0D1A");
      root.style.setProperty("--c-surface", "#131627");
      root.style.setProperty("--c-cream", "#161929");
      root.style.setProperty("--c-white", "#1C2035");
      root.style.setProperty("--c-ink", "#F0F2FF");
      root.style.setProperty("--c-text", "#C0C8E0");
      root.style.setProperty("--c-mute", "#7A86A8");
      root.style.setProperty("--c-navy", "#F0F2FF");
      root.style.setProperty("--c-border", "#252A45");
      root.style.setProperty("--c-border-soft", "#1E2338");
      // header
      body.style.setProperty("--header-bg", "rgba(11,13,26,0.88)");
      root.setAttribute("data-theme", "dark");
    } else {
      root.style.setProperty("--c-bg", "#F2F2F2");
      root.style.setProperty("--c-surface", "#F9F9F9");
      root.style.setProperty("--c-cream", "#F7F4EE");
      root.style.setProperty("--c-white", "#FFFFFF");
      root.style.setProperty("--c-ink", "#0E1530");
      root.style.setProperty("--c-text", "#404A52");
      root.style.setProperty("--c-mute", "#5A6478");
      root.style.setProperty("--c-navy", "#020327");
      root.style.setProperty("--c-border", "#E5E7EC");
      root.style.setProperty("--c-border-soft", "#DCDCDE");
      body.style.removeProperty("--header-bg");
      root.setAttribute("data-theme", "light");
    }

    // ── DENSITY ────────────────────────────────────────
    const densityMap = {
      compact:  { sectionPad: "40px", cardGap: "12px", cardPad: "20px", heroMin: "340px" },
      standard: { sectionPad: "clamp(56px,9vw,120px)", cardGap: "18px", cardPad: "32px", heroMin: "460px" },
      airy:     { sectionPad: "clamp(80px,12vw,160px)", cardGap: "28px", cardPad: "44px", heroMin: "580px" },
    };
    const d = densityMap[tweaks.density] || densityMap.standard;
    root.style.setProperty("--density-section-pad", d.sectionPad);
    root.style.setProperty("--density-card-gap", d.cardGap);
    root.style.setProperty("--density-card-pad", d.cardPad);
    root.style.setProperty("--density-hero-min", d.heroMin);

    // ── CHARACTER ──────────────────────────────────────
    if (tweaks.character === "warm") {
      root.style.setProperty("--r-card", "36px");
      root.style.setProperty("--r-card-lg", "56px");
      root.style.setProperty("--r-btn", "999px");
      root.style.setProperty("--c-blue-deep", "#1A5FD4");
      root.style.setProperty("--c-orange", "#E8693A");
      root.style.setProperty("--char-heading-font", "'Manrope', system-ui, sans-serif");
      root.style.setProperty("--char-heading-transform", "none");
      root.style.setProperty("--char-heading-weight", "800");
      root.style.setProperty("--char-heading-tracking", "-0.03em");
      root.style.setProperty("--char-mono-display", "none");
      root.setAttribute("data-char", "warm");
    } else {
      root.style.setProperty("--r-card", "28px");
      root.style.setProperty("--r-card-lg", "40px");
      root.style.setProperty("--r-btn", "14px");
      root.style.setProperty("--c-blue-deep", "#0040A0");
      root.style.setProperty("--c-orange", "#DD5444");
      root.style.setProperty("--char-heading-font", "'Tektur', monospace");
      root.style.setProperty("--char-heading-transform", "uppercase");
      root.style.setProperty("--char-heading-weight", "700");
      root.style.setProperty("--char-heading-tracking", "-0.01em");
      root.style.setProperty("--char-mono-display", "");
      root.setAttribute("data-char", "tech");
    }
  }, [tweaks.theme, tweaks.density, tweaks.character]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Тема">
        <TweakRadio
          id="theme"
          value={tweaks.theme}
          options={[
            { value: "light", label: "Светлая" },
            { value: "dark",  label: "Тёмная" },
          ]}
          onChange={v => setTweak("theme", v)}
        />
      </TweakSection>

      <TweakSection label="Плотность">
        <TweakRadio
          id="density"
          value={tweaks.density}
          options={[
            { value: "compact",  label: "Компакт" },
            { value: "standard", label: "Стандарт" },
            { value: "airy",     label: "Просторно" },
          ]}
          onChange={v => setTweak("density", v)}
        />
      </TweakSection>

      <TweakSection label="Характер">
        <TweakRadio
          id="character"
          value={tweaks.character}
          options={[
            { value: "tech", label: "Технично" },
            { value: "warm", label: "Тепло" },
          ]}
          onChange={v => setTweak("character", v)}
        />
        <div style={{ fontSize: 11, color: "#888", marginTop: 6, lineHeight: 1.4 }}>
          {tweaks.character === "tech"
            ? "Tektur, моно-метки, острые края — узнаваемый «радарный» язык"
            : "Manrope, скруглённые формы, мягкий акцент — ближе к людям"}
        </div>
      </TweakSection>
    </TweaksPanel>
  );
}

window.StudRadarTweaks = StudRadarTweaks;
