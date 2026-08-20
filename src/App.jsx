import { useEffect, useRef, useState } from "react";
import { LANGUAGES, useLanguage } from "./i18n.jsx";

const FEATURE_ICONS = [
  "M4 6h16M4 12h10M4 18h6",
  "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0",
  "M8 3v4M16 3v4M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z",
  "M5 13l4 4L19 7",
  "M4 7h16v10H4zM4 11h16",
  "M4 21V9l8-6 8 6v12M9 21v-6h6v6",
  "M9 5h6a2 2 0 0 1 2 2v11H7V7a2 2 0 0 1 2-2Zm0 4h6M9 13h4M9 17h2",
];

function Reveal({ children, className = "", as: Tag = "div", delay = 0 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "shown" : ""} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

function GirihDivider() {
  return (
    <div className="divider" aria-hidden="true">
      <span className="divider-line" />
      <svg viewBox="0 0 40 40" width="26" height="26">
        <path
          d="M20 2 38 20 20 38 2 20Z M20 10 30 20 20 30 10 20Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="20" cy="20" r="3" fill="currentColor" />
      </svg>
      <span className="divider-line" />
    </div>
  );
}

function SectionHead({ kicker, title, text, center }) {
  return (
    <Reveal className={`section-head ${center ? "center" : ""}`}>
      <p className="kicker">{kicker}</p>
      <h2>{title}</h2>
      {text ? <p className="section-text">{text}</p> : null}
    </Reveal>
  );
}

function LangSwitch() {
  const { language, setLanguage } = useLanguage();
  return (
    <div className="lang-switch" role="group" aria-label="Language">
      {LANGUAGES.map((item) => (
        <button
          key={item.code}
          type="button"
          className={language === item.code ? "on" : ""}
          aria-label={item.label}
          onClick={() => setLanguage(item.code)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function Header() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const nav = [
    ["#product", t("navProduct")],
    ["#platform", t("navPlatform")],
    ["#features", t("navFeatures")],
    ["#steps", t("navSteps")],
    ["#plans", t("navPlans")],
    ["#contact", t("navContact")],
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <a className="brand" href="#top">
        <img src="/yagona-logo.png" alt="Yagona" width="44" height="44" />
        <span>
          <strong>Yagona</strong>
        </span>
      </a>
      <nav className={`nav-links ${open ? "open" : ""}`}>
        {nav.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <div className="lang-mobile">
          <LangSwitch />
        </div>
        <div className="nav-mobile-actions">
          <a className="btn primary" href="#contact" onClick={() => setOpen(false)}>
            {t("connectCenter")}
          </a>
          <a className="btn ghost" href="#platform" onClick={() => setOpen(false)}>
            {t("loginCabinet")}
          </a>
        </div>
      </nav>
      <div className="nav-actions">
        <LangSwitch />
        <a className="btn ghost" href="#platform">
          {t("loginCabinet")}
        </a>
        <a className="btn primary" href="#contact">
          {t("connectCenter")}
        </a>
        <button
          className="menu"
          type="button"
          aria-label={t("menu")}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

function Hero() {
  const { t } = useLanguage();
  return (
    <section className="hero" id="top">
      <div className="hero-arch" aria-hidden="true" />
      <Reveal className="hero-inner">
        <p className="kicker">{t("heroKicker")}</p>
        <div className="hero-mark">
          <img src="/yagona-logo.png" alt={t("logoAlt")} width="170" height="170" />
        </div>
        <h1 className="hero-title">
          <span className="hero-title-main">{t("heroTitle")}</span>
          <span className="hero-title-accent">{t("heroTitleEm")}</span>
        </h1>
        <p className="lead">{t("heroLead")}</p>
        <div className="hero-cta">
          <a className="btn primary lg" href="#contact">
            {t("requestDemo")}
          </a>
          <a className="btn ghost lg" href="#product">
            {t("howItWorks")}
          </a>
        </div>
        <ul className="hero-stats">
          <li>
            <strong>{t("statCrm")}</strong>
            <span>{t("statCrmHint")}</span>
          </li>
          <li>
            <strong>{t("statWeb")}</strong>
            <span>{t("statWebHint")}</span>
          </li>
          <li>
            <strong>{t("statApp")}</strong>
            <span>{t("statAppHint")}</span>
          </li>
        </ul>
      </Reveal>
    </section>
  );
}

function Preview() {
  const { t } = useLanguage();
  return (
    <Reveal className="wrap preview">
      <div className="preview-frame">
        <div className="preview-bar">
          <span />
          <span />
          <span />
          <p>{t("previewBar")}</p>
        </div>
        <div className="preview-body">
          <aside>
            <div className="mini-brand">
              <img src="/yagona-logo.png" alt="" width="28" height="28" />
              <b>Yagona</b>
            </div>
            <div className="mini-nav">
              <i className="on">{t("previewNavOverview")}</i>
              <i>{t("previewNavLeads")}</i>
              <i>{t("previewNavStudents")}</i>
              <i>{t("previewNavStudy")}</i>
              <i>{t("previewNavSchedule")}</i>
              <i>{t("previewNavBilling")}</i>
            </div>
          </aside>
          <div className="preview-main">
            <header>
              <div>
                <small>{t("previewToday")}</small>
                <b>{t("previewHeadline")}</b>
              </div>
              <span className="pill">{t("previewLicense")}</span>
            </header>
            <div className="mini-cards">
              <article>
                <small>{t("previewLeads")}</small>
                <b>48</b>
                <em>{t("previewLeadsHint")}</em>
              </article>
              <article>
                <small>{t("previewStudents")}</small>
                <b>126</b>
                <em>{t("previewStudentsHint")}</em>
              </article>
              <article>
                <small>{t("previewPayments")}</small>
                <b>92%</b>
                <em>{t("previewPaymentsHint")}</em>
              </article>
              <article>
                <small>{t("previewAttendance")}</small>
                <b>87%</b>
                <em>{t("previewAttendanceHint")}</em>
              </article>
            </div>
            <div className="mini-table">
              <div>
                <span>{t("previewRow1")}</span>
                <span>09:00</span>
                <span className="ok">{t("previewRow1Status")}</span>
              </div>
              <div>
                <span>{t("previewRow2")}</span>
                <span>11:30</span>
                <span>{t("previewRow2Status")}</span>
              </div>
              <div>
                <span>{t("previewRow3")}</span>
                <span>16:00</span>
                <span>{t("previewRow3Status")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function App() {
  const { t } = useLanguage();
  const [note, setNote] = useState(null);

  const roles = [
    { num: "01", title: t("role1Title"), text: t("role1Text") },
    { num: "02", title: t("role2Title"), text: t("role2Text") },
    { num: "03", title: t("role3Title"), text: t("role3Text") },
  ];

  const platform = [
    {
      tag: t("stack1Tag"),
      title: t("stack1Title"),
      text: t("stack1Text"),
      items: [t("stack1Item1"), t("stack1Item2"), t("stack1Item3"), t("stack1Item4")],
    },
    {
      tag: t("stack2Tag"),
      title: t("stack2Title"),
      text: t("stack2Text"),
      items: [t("stack2Item1"), t("stack2Item2"), t("stack2Item3"), t("stack2Item4"), t("stack2Item5")],
      featured: true,
    },
    {
      tag: t("stack3Tag"),
      title: t("stack3Title"),
      text: t("stack3Text"),
      items: [t("stack3Item1"), t("stack3Item2"), t("stack3Item3"), t("stack3Item4"), t("stack3Item5")],
    },
  ];

  const features = [
    { title: t("feature1Title"), text: t("feature1Text"), icon: FEATURE_ICONS[0] },
    { title: t("feature2Title"), text: t("feature2Text"), icon: FEATURE_ICONS[1] },
    { title: t("feature3Title"), text: t("feature3Text"), icon: FEATURE_ICONS[2] },
    { title: t("feature4Title"), text: t("feature4Text"), icon: FEATURE_ICONS[3] },
    { title: t("feature5Title"), text: t("feature5Text"), icon: FEATURE_ICONS[4] },
    { title: t("feature6Title"), text: t("feature6Text"), icon: FEATURE_ICONS[5] },
    { title: t("feature7Title"), text: t("feature7Text"), icon: FEATURE_ICONS[6] },
  ];

  const steps = [
    { title: t("step1Title"), text: t("step1Text") },
    { title: t("step2Title"), text: t("step2Text") },
    { title: t("step3Title"), text: t("step3Text") },
  ];

  const plans = [
    {
      title: t("planTrial"),
      price: t("planTrialPrice"),
      note: t("planTrialNote"),
      items: [t("planTrialItem1"), t("planTrialItem2"), t("planTrialItem3")],
      cta: t("planTrialCta"),
    },
    {
      title: t("planBusiness"),
      price: t("planBusinessPrice"),
      note: t("planBusinessNote"),
      items: [
        t("planBusinessItem1"),
        t("planBusinessItem2"),
        t("planBusinessItem3"),
        t("planBusinessItem4"),
      ],
      cta: t("planBusinessCta"),
      featured: true,
    },
    {
      title: t("planStart"),
      price: t("planStartPrice"),
      note: t("planStartNote"),
      items: [t("planStartItem1"), t("planStartItem2"), t("planStartItem3")],
      cta: t("planStartCta"),
    },
  ];

  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const center = String(data.get("center") || "").trim();
    const contact = String(data.get("contact") || "").trim();
    if (!name || !center || !contact) {
      setNote({ kind: "error", text: t("formError") });
      return;
    }
    const subject = encodeURIComponent(`${t("mailSubject")}: ${center}`);
    const body = encodeURIComponent(
      `${t("mailName")}: ${name}\n${t("mailCenter")}: ${center}\n${t("mailContact")}: ${contact}`,
    );
    setNote({ kind: "ok", text: t("formOk") });
    window.location.href = `mailto:hello@yagona.app?subject=${subject}&body=${body}`;
    event.target.reset();
  }

  return (
    <>
      <div className="bg" aria-hidden="true">
        <div className="bg-pattern" />
        <div className="bg-glow a" />
        <div className="bg-glow b" />
      </div>

      <Header />

      <main>
        <Hero />
        <Preview />

        <section id="product" className="wrap section">
          <SectionHead
            kicker={t("productKicker")}
            title={t("productTitle")}
            text={t("productText")}
          />
          <div className="grid three">
            {roles.map((role, i) => (
              <Reveal key={role.num} className="card role" delay={i * 90}>
                <span className="num">{role.num}</span>
                <h3>{role.title}</h3>
                <p>{role.text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <GirihDivider />

        <section id="platform" className="wrap section">
          <SectionHead
            kicker={t("platformKicker")}
            title={t("platformTitle")}
            text={t("platformText")}
          />
          <div className="grid three stretch">
            {platform.map((item, i) => (
              <Reveal
                key={item.tag}
                className={`card stack ${item.featured ? "featured" : ""}`}
                delay={i * 90}
              >
                <div className="stack-icon">{item.tag}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <ul>
                  {item.items.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        <GirihDivider />

        <section id="features" className="wrap section">
          <SectionHead kicker={t("featuresKicker")} title={t("featuresTitle")} />
          <div className="grid three">
            {features.map((feature, i) => (
              <Reveal key={feature.title} className="card feature" delay={i * 70}>
                <span className="feature-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22">
                    <path
                      d={feature.icon}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="steps" className="steps-band">
          <div className="wrap section">
            <SectionHead
              kicker={t("stepsKicker")}
              title={t("stepsTitle")}
              center
            />
            <ol className="grid three steps">
              {steps.map((step, i) => (
                <Reveal key={step.title} as="li" className="card step" delay={i * 90}>
                  <span className="step-num">0{i + 1}</span>
                  <strong>{step.title}</strong>
                  <span>{step.text}</span>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section id="plans" className="wrap section">
          <SectionHead
            kicker={t("plansKicker")}
            title={t("plansTitle")}
            text={t("plansText")}
          />
          <div className="grid three stretch">
            {plans.map((plan, i) => (
              <Reveal
                key={plan.title}
                className={`card plan ${plan.featured ? "featured" : ""}`}
                delay={i * 90}
              >
                {plan.featured ? <p className="badge">{t("planBadge")}</p> : null}
                <h3>{plan.title}</h3>
                <p className="price">{plan.price}</p>
                <p className="price-note">{plan.note}</p>
                <ul>
                  {plan.items.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
                <a
                  className={`btn ${plan.featured ? "primary" : "ghost"}`}
                  href="#contact"
                >
                  {plan.cta}
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="contact" className="wrap section">
          <Reveal className="contact card">
            <div>
              <p className="kicker">{t("contactKicker")}</p>
              <h2>{t("contactTitle")}</h2>
              <p className="section-text">
                {t("contactText")}{" "}
                <a className="link" href="mailto:hello@yagona.app">
                  hello@yagona.app
                </a>
              </p>
              <div className="contact-ornament" aria-hidden="true" />
            </div>
            <form onSubmit={submit} noValidate>
              <label>
                {t("formName")}
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder={t("formNamePh")}
                />
              </label>
              <label>
                {t("formCenter")}
                <input name="center" type="text" placeholder={t("formCenterPh")} />
              </label>
              <label>
                {t("formContact")}
                <input name="contact" type="text" placeholder={t("formContactPh")} />
              </label>
              <button className="btn primary lg" type="submit">
                {t("formSubmit")}
              </button>
              {note ? (
                <p className={`form-note ${note.kind}`}>{note.text}</p>
              ) : null}
            </form>
          </Reveal>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-grid">
          <div className="footer-brand">
            <a className="brand light" href="#top">
              <img src="/yagona-logo.png" alt="Yagona" width="44" height="44" />
              <span>
                <strong>Yagona</strong>
              </span>
            </a>
            <p className="footer-org">{t("footerOrg")}</p>
            <a className="footer-phone" href="tel:+998946484450">
              +998 94 648 44 50
            </a>
            <p className="footer-muted">{t("footerSupport")}</p>
          </div>

          <nav className="footer-col" aria-label={t("footerCabinet")}>
            <h4>{t("footerCabinet")}</h4>
            <a href="#platform">{t("footerWebCabinet")}</a>
            <a href="#platform">{t("footerStudentApp")}</a>
            <a href="#features">{t("footerFeatures")}</a>
            <a href="#plans">{t("footerPlans")}</a>
            <a href="#contact">{t("footerFaq")}</a>
          </nav>

          <nav className="footer-col" aria-label={t("footerForCenters")}>
            <h4>{t("footerForCenters")}</h4>
            <a href="#contact">{t("footerConnect")}</a>
            <a href="#contact">{t("footerDemo")}</a>
            <a href="#steps">{t("footerHow")}</a>
            <a href="#contact">{t("footerHelp")}</a>
          </nav>

          <div className="footer-col">
            <h4>{t("footerCompany")}</h4>
            <a href="#product">{t("footerAbout")}</a>
            <a href="#contact">{t("footerContactUs")}</a>
            <a href="#contact">{t("footerPrivacy")}</a>
            <a href="#contact">{t("footerOffer")}</a>

            <h4 className="footer-social-title">{t("footerSocial")}</h4>
            <div className="footer-social">
              <a href="#top" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
                </svg>
              </a>
              <a href="#top" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path
                    d="M14 8h2.5V4.5H14c-2.5 0-4 1.6-4 4V11H7.5v3.5H10v5h3.5v-5h2.6l.5-3.5h-3.1V8.8c0-.5.2-.8.5-.8Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a href="#top" aria-label="Telegram">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path
                    d="m20.5 4.2-17 6.8c-.8.3-.8 1.4 0 1.7l4.3 1.5 1.6 4.9c.2.7 1.1.9 1.6.3l2.3-2.5 4.4 3.2c.6.4 1.5.1 1.6-.7l2.3-13.7c.2-1-.7-1.8-1.6-1.5ZM8.7 13.7l8.5-6.4-6.7 7.4-.3 3-1.5-4Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a href="#top" aria-label="YouTube">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path
                    d="M21.5 8s-.2-1.4-.8-2c-.7-.8-1.6-.8-2-.9C15.9 4.9 12 4.9 12 4.9s-3.9 0-6.7.2c-.4.1-1.3.1-2 .9-.6.6-.8 2-.8 2S2.3 9.6 2.3 11.3v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.7.8 1.7.8 2.1.9 1.6.1 6.6.2 6.6.2s3.9 0 6.7-.2c.4-.1 1.3-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5c0-1.7-.2-3.3-.2-3.3ZM9.9 14.7V9.4l5.3 2.7-5.3 2.6Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>

            <div className="store-buttons">
              <a className="store-btn" href="#top">
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                  <path d="M4 3.5v17c0 .4.5.7.8.4l9.6-8.1c.3-.2.3-.6 0-.8L5 3c-.4-.3-1 0-1 .5Z" fill="#00c4ff" />
                  <path d="m14.4 12.8 2.7 2.3 2.8-1.6c.5-.3.5-1 0-1.3l-2.8-1.6-2.7 2.2Z" fill="#ffce00" />
                  <path d="M4.8 20.9c.2.1.5.1.7-.1l9-7.9 2.6 2.2-11.3 6.2c-.3.2-.7 0-1-.4Z" fill="#f63448" />
                  <path d="M4.8 3.1c.2-.1.5-.1.7.1l9 7.9 2.6-2.2L5.8 2.7c-.3-.2-.7 0-1 .4Z" fill="#00ee76" />
                </svg>
                <span>
                  <small>{t("footerAppYagona")}</small>
                  <b>{t("footerGooglePlay")}</b>
                </span>
              </a>
              <a className="store-btn" href="#top">
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                  <path
                    d="M16.4 12.8c0-2.2 1.8-3.2 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-2.9-.8-1.5 0-2.9.9-3.7 2.2-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.7 2.3 2.8 2.3 1.1 0 1.6-.7 2.9-.7 1.4 0 1.7.7 2.9.7 1.2 0 2-1.1 2.7-2.2.9-1.3 1.2-2.5 1.2-2.6-.1 0-2.3-.9-2.3-3.7ZM14.2 5.9c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.6.6-1 1.6-.9 2.6 1 .1 1.9-.5 2.5-1.2Z"
                    fill="currentColor"
                  />
                </svg>
                <span>
                  <small>{t("footerAppYagona")}</small>
                  <b>{t("footerAppStore")}</b>
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="wrap footer-bottom">
          <p>{t("footerCopy", { year: new Date().getFullYear() })}</p>
          <div className="payments">
            <span className="payments-label">{t("footerPayments")}</span>
            <span className="pay">UZCARD</span>
            <span className="pay">HUMO</span>
            <span className="pay">VISA</span>
            <span className="pay">Mastercard</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
