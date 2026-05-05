/* === Icons (inline SVG components) === */
const Icon = {
  Search: () =>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>,

  Login: () =>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" x2="3" y1="12" y2="12" /></svg>,

  Pin: () =>
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>,

  Calendar: () =>
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>,

  Share: () =>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" /></svg>,

  Heart: () =>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" /></svg>,

  Check: () =>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,

  Star: () =>
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 15.09 8.26 22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>,

  Plus: () =>
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" x2="12" y1="5" y2="19" /><line x1="5" x2="19" y1="12" y2="12" /></svg>,

  Burger: () =>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="18" y2="18" /></svg>,

  Tg: () =>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21.5 2.5 1.7 10.3c-.9.4-.9 1.6 0 2l4.6 1.6 1.8 5.6c.2.7 1 .9 1.6.4l2.7-2.2 4.7 3.5c.7.5 1.7.1 1.9-.7l3.6-16.5c.2-.9-.7-1.7-1.6-1.5zM9 14.4l9.8-7.4-7.6 8L11 18l-2-3.6z" /></svg>,

  Vk: () =>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.2 17.5c-5.3 0-8.7-3.6-8.8-9.7H7.4c.1 4.5 2.1 6.4 3.7 6.8V7.8h2.5v3.7c1.6-.2 3.2-1.9 3.8-3.7H20c-.5 2.3-2.2 4.4-4.3 5.2 2.1.7 4 2.7 4.8 5.5h-2.7c-.6-2-2.1-3.6-3.9-3.8v3.8h-.7z" /></svg>,

  Spark: () =>
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v3M12 18v3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M3 12h3M18 12h3M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></svg>,

  Shield: () =>
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></svg>,

  Coin: () =>
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5h3a2 2 0 1 1 0 4h-3v-4zm0 4v3M14.5 16.5v-7" /></svg>,

  Briefcase: () =>
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="6" rx="2" /><path d="M16 2H8a2 2 0 0 0-2 2v2h12V4a2 2 0 0 0-2-2z" /></svg>,

  Camera: () =>
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>,

  Code: () =>
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,

  Pen: () =>
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.2 7.8 16.2 2.8a2 2 0 0 0-2.8 0L3 13.2V21h7.8l10.4-10.4a2 2 0 0 0 0-2.8z" /></svg>,

  User: () =>
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,

  Bolt: () =>
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>

};

/* === Radar pattern (background) === */
const RadarPattern = ({ stroke = "rgba(255,255,255,0.18)" }) =>
<svg className="radar-bg__svg" viewBox="0 0 800 600" preserveAspectRatio="xMaxYMid slice" aria-hidden="true">
    <defs>
      <radialGradient id="rg" cx="80%" cy="50%" r="80%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </radialGradient>
    </defs>
    <g transform="translate(640 300)">
      {[60, 140, 220, 300, 380, 460, 540].map((r, i) =>
    <circle key={i} r={r} fill="none" stroke={stroke} strokeWidth={i === 0 ? 2 : 1.2} />
    )}
      <line x1="-560" y1="0" x2="560" y2="0" stroke={stroke} strokeWidth="1" />
      <line x1="0" y1="-560" x2="0" y2="560" stroke={stroke} strokeWidth="1" />
      <line x1="-400" y1="-400" x2="400" y2="400" stroke={stroke} strokeWidth="1" strokeDasharray="2 6" />
      <line x1="-400" y1="400" x2="400" y2="-400" stroke={stroke} strokeWidth="1" strokeDasharray="2 6" />
      <path d="M 0 0 L 540 -200 A 540 540 0 0 1 540 200 Z" fill="url(#rg)" />
      <circle cx="180" cy="-110" r="6" fill="#FF6B2C" />
      <circle cx="-220" cy="80" r="5" fill="#4DFF3F" />
      <circle cx="320" cy="160" r="5" fill="#FFD84D" />
      <circle cx="-140" cy="-220" r="4" fill="#FFFFFF" />
      <circle cx="60" cy="220" r="4" fill="#FFFFFF" />
    </g>
  </svg>;


/* === Folder (decorative side element from Figma) === */
const FolderIcon = ({ color = "#0040A0", label = "Вакансии", textColor }) =>
<div className="hero__folder">
    <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      <path d="M0 12 C0 5.4 5.4 0 12 0 H40 L52 12 H108 C114.6 12 120 17.4 120 24 V78 C120 84.6 114.6 90 108 90 H12 C5.4 90 0 84.6 0 78 Z" fill={color} />
      <path d="M14 4 H38 L48 14 H106" stroke="rgba(0,0,0,0.18)" strokeWidth="1.5" fill="none" />
    </svg>
    <span style={textColor ? { color: textColor } : undefined}>{label}</span>
  </div>;


/* === Logo === */
const Logo = () =>
<a className="logo" href="#top" aria-label="СтудРадар">
    <span className="logo__mark">
      <svg viewBox="0 0 63.408 70.213" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M 28.347 26.498 L 34.466 26.498 C 34.846 24.008 35.141 21.602 35.563 19.239 C 36.406 14.061 38.38 9.133 41.345 4.805 C 42.002 3.874 42.751 3.011 43.582 2.231 C 44.304 1.499 45.169 0.924 46.124 0.544 C 47.08 0.163 48.103 -0.015 49.131 0.021 C 50.158 0.057 51.167 0.305 52.093 0.751 C 53.02 1.197 53.844 1.83 54.513 2.611 C 57.413 5.569 59.518 9.213 60.632 13.204 C 63.319 22.042 64.067 31.355 62.827 40.509 C 62.279 44.759 61.26 48.935 59.788 52.959 C 58.695 56.082 56.952 58.937 54.675 61.338 C 52.399 63.738 49.639 65.629 46.578 66.886 C 41.496 69.287 35.907 70.418 30.291 70.183 C 24.674 69.947 19.199 68.353 14.335 65.535 C 11.412 63.898 8.855 61.679 6.823 59.015 C 4.79 56.351 3.325 53.299 2.518 50.047 C 0.331 42.416 -0.441 34.449 0.24 26.54 C 0.519 20.095 2.113 13.776 4.924 7.97 C 5.882 6.077 7.104 4.33 8.554 2.779 C 9.277 1.868 10.206 1.141 11.265 0.659 C 12.324 0.178 13.482 -0.046 14.645 0.008 C 15.807 0.061 16.94 0.39 17.95 0.968 C 18.96 1.545 19.819 2.354 20.455 3.328 C 23.133 6.463 25.015 10.198 25.941 14.216 C 26.827 17.804 27.672 22.868 28.347 26.498 Z M 41.936 51.819 C 41.092 53.001 40.29 54.014 39.615 55.111 C 38.94 56.209 39.615 57.095 40.797 57.01 C 41.997 56.961 43.195 56.848 44.384 56.673 C 46.178 56.439 47.992 56.907 49.448 57.981 C 50.461 58.699 51.474 59.458 52.529 60.091 C 52.75 60.183 52.986 60.23 53.225 60.23 C 53.464 60.23 53.701 60.183 53.922 60.091 C 54.238 59.727 54.417 59.265 54.428 58.783 C 54.491 58.01 54.491 57.234 54.428 56.462 C 54.146 55.187 54.162 53.865 54.477 52.598 C 54.792 51.331 55.396 50.154 56.243 49.161 C 56.845 48.445 57.368 47.667 57.804 46.839 C 57.927 46.677 58.001 46.482 58.015 46.279 C 58.03 46.076 57.986 45.873 57.888 45.694 C 57.789 45.516 57.642 45.37 57.462 45.273 C 57.283 45.177 57.079 45.135 56.876 45.151 C 55.441 45.151 54.006 45.405 52.656 45.531 C 53.249 46.889 53.336 48.414 52.903 49.83 C 52.469 51.247 51.543 52.461 50.292 53.254 C 48.939 54.036 47.35 54.304 45.815 54.01 C 44.281 53.715 42.904 52.878 41.936 51.651 Z M 11.634 45.32 C 10.073 45.32 8.68 45.067 7.414 45.067 C 6.148 45.067 5.979 45.911 6.528 46.797 C 7.076 47.684 8.005 48.907 8.765 49.92 C 9.851 51.276 10.366 53.002 10.199 54.731 C 10.038 55.964 9.94 57.203 9.904 58.445 C 9.885 58.706 9.92 58.969 10.007 59.216 C 10.094 59.463 10.232 59.689 10.41 59.88 C 10.641 59.989 10.894 60.046 11.149 60.046 C 11.404 60.046 11.657 59.989 11.888 59.88 C 12.863 59.268 13.807 58.606 14.715 57.897 C 15.442 57.325 16.275 56.903 17.166 56.657 C 18.058 56.411 18.989 56.344 19.906 56.462 C 21.138 56.623 22.378 56.722 23.62 56.757 C 24.759 56.757 25.308 55.913 24.717 54.942 C 24.126 53.972 23.114 52.748 22.312 51.651 C 18.345 54.309 16.192 54.774 13.871 53.212 C 12.622 52.376 11.711 51.123 11.302 49.677 C 10.892 48.232 11.01 46.687 11.634 45.32 Z M 30.921 60.007 L 31.934 61.779 L 33.2 60.387 L 32.103 58.91 L 30.921 60.007 Z" />
      </svg>
    </span>
    <span>СтудРадар</span>
  </a>;


Object.assign(window, { Icon, RadarPattern, FolderIcon, Logo });