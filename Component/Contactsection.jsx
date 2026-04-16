"use client";

import { useEffect, useRef, useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');

  @keyframes ct-titleWord {
    from { opacity:0; transform:translateY(28px) skewY(3deg); }
    to   { opacity:1; transform:translateY(0)    skewY(0deg); }
  }
  @keyframes ct-lineGrow {
    from { transform:scaleX(0); opacity:0; }
    to   { transform:scaleX(1); opacity:1; }
  }
  @keyframes ct-subFade {
    from { opacity:0; letter-spacing:.18em; }
    to   { opacity:1; letter-spacing:.02em; }
  }
  @keyframes ct-fadeLeft {
    from { opacity:0; transform:translateX(-40px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes ct-fadeRight {
    from { opacity:0; transform:translateX(40px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes ct-fadeUp {
    from { opacity:0; transform:translateY(22px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes ct-iconPop {
    0%   { opacity:0; transform:scale(.4) rotate(-15deg); }
    60%  { transform:scale(1.15) rotate(4deg); }
    100% { opacity:1; transform:scale(1) rotate(0deg); }
  }
  @keyframes ct-shimmer {
    0%   { background-position:-220% center; }
    100% { background-position: 220% center; }
  }
  @keyframes ct-pulse {
    0%,100% { box-shadow:0 0 0 0   rgba(245,197,40,.5); }
    50%      { box-shadow:0 0 0 10px rgba(245,197,40,0);  }
  }
  @keyframes ct-floatPin {
    0%,100% { transform:translateY(0); }
    50%      { transform:translateY(-7px); }
  }
  @keyframes ct-orb {
    0%,100% { transform:scale(1)   translate(0,0); }
    33%      { transform:scale(1.06) translate(12px,-8px); }
    66%      { transform:scale(.96)  translate(-8px,6px); }
  }
  @keyframes ct-btnPulse {
    0%,100% { box-shadow:0 0 0 0   rgba(245,197,40,.55); }
    50%      { box-shadow:0 0 0 14px rgba(245,197,40,0);  }
  }
  @keyframes ct-inputFocus {
    from { border-color: rgba(255,255,255,.12); }
    to   { border-color: #f5c518; }
  }

  .ct-hf { font-family:'Playfair Display',serif; }
  .ct-bf { font-family:'DM Sans',sans-serif; }

  .ct-word { display:inline-block; opacity:0; animation:ct-titleWord .65s cubic-bezier(.22,1,.36,1) forwards; }
  .ct-sub  { opacity:0; animation:ct-subFade .7s ease forwards; }
  .ct-line { transform-origin:left; transform:scaleX(0); animation:ct-lineGrow .65s cubic-bezier(.22,1,.36,1) forwards; }

  .ct-left  { opacity:0; }
  .ct-left.in  { animation:ct-fadeLeft  .75s cubic-bezier(.22,1,.36,1) forwards; }
  .ct-right { opacity:0; }
  .ct-right.in { animation:ct-fadeRight .75s cubic-bezier(.22,1,.36,1) forwards; }

  .ct-info-row { opacity:0; }
  .ct-info-row.in { animation:ct-fadeUp .6s cubic-bezier(.22,1,.36,1) forwards; }

  .ct-icon-box {
    width:42px; height:42px; border-radius:12px;
    background:#f5c518;
    display:flex; align-items:center; justify-content:center;
    flex-shrink:0; opacity:0;
    transition:transform .3s cubic-bezier(.22,1,.36,1);
  }
  .ct-icon-box.in { animation:ct-iconPop .6s cubic-bezier(.22,1,.36,1) forwards; }
  .ct-icon-box:hover {
    transform:scale(1.12) rotate(-6deg);
    animation:ct-pulse 1.4s ease infinite;
  }

  /* form card */
  .ct-form-card {
    background:rgba(255,255,255,.07);
    border:1.5px solid rgba(255,255,255,.12);
    border-radius:20px;
    padding:32px 30px 30px;
    backdrop-filter:blur(8px);
  }

  /* inputs */
  .ct-input {
    width:100%; box-sizing:border-box;
    background:rgba(255,255,255,.08);
    border:1.5px solid rgba(255,255,255,.13);
    border-radius:10px;
    padding:12px 16px;
    color:white;
    font-family:'DM Sans',sans-serif;
    font-size:.88rem;
    outline:none;
    transition:border-color .25s, background .25s, box-shadow .25s;
  }
  .ct-input::placeholder { color:rgba(255,255,255,.38); }
  .ct-input:focus {
    border-color:#f5c518;
    background:rgba(255,255,255,.12);
    box-shadow:0 0 0 3px rgba(245,197,40,.18);
  }

  /* map box */
  .ct-map-box {
    background:rgba(255,255,255,.06);
    border:1.5px solid rgba(255,255,255,.1);
    border-radius:16px;
    display:flex; flex-direction:column;
    align-items:center; justify-content:center;
    gap:10px; padding:28px 20px;
    cursor:pointer;
    transition:border-color .3s, background .3s;
  }
  .ct-map-box:hover {
    border-color:rgba(245,197,40,.5);
    background:rgba(245,197,40,.06);
  }

  /* send button */
  .ct-btn {
    width:100%;
    background:#f5c518;
    color:#111;
    font-family:'DM Sans',sans-serif;
    font-weight:700;
    font-size:.93rem;
    border:none;
    border-radius:12px;
    padding:15px 24px;
    cursor:pointer;
    transition:transform .2s, box-shadow .2s, filter .2s;
  }
  .ct-btn:hover {
    transform:translateY(-2px);
    filter:brightness(1.08);
    animation:ct-btnPulse 1.4s ease infinite;
  }
  .ct-btn:active { transform:translateY(0) scale(.98); }

  /* orb bg */
  .ct-orb {
    position:absolute; border-radius:50%; pointer-events:none;
    animation:ct-orb ease-in-out infinite;
  }
`;

export default function ContactSection() {
  const [vis, setVis]   = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const sectionRef      = useRef(null);
  const leftRef         = useRef(null);
  const rightRef        = useRef(null);
  const iconRefs        = useRef([]);
  const rowRefs         = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!vis) return;
    setTimeout(() => leftRef.current?.classList.add("in"),  120);
    setTimeout(() => rightRef.current?.classList.add("in"), 260);
    rowRefs.current.forEach((el, i) => {
      setTimeout(() => el?.classList.add("in"), 300 + i * 110);
    });
    iconRefs.current.forEach((el, i) => {
      setTimeout(() => el?.classList.add("in"), 360 + i * 110);
    });
  }, [vis]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    setForm({ name: "", phone: "", message: "" });
  };

  const contactItems = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.59 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6 6l.88-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: "Phone & WhatsApp",
      value: "+91 98765 43210",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="22,6 12,13 2,6" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: "Email",
      value: "info@royaldosapaper.com",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="10" r="3" stroke="#111" strokeWidth="2"/>
        </svg>
      ),
      label: "Address",
      value: "123, Food Processing Zone\nUdhna, Surat – 394210\nGujarat, India",
    },
  ];

  return (
    <>
      <style>{styles}</style>

      <section id="contact"
        ref={sectionRef}
        className="ct-bf"
        style={{
          position: "relative", overflow: "hidden",
          background: "linear-gradient(135deg,#0d2b1a 0%,#1a4a2a 45%,#0f3320 100%)",
          padding: "80px 24px 90px",
        }}
      >
        {/* ambient orbs */}
        <div className="ct-orb" style={{
          width:340, height:340, top:-80, right:-60,
          background:"radial-gradient(circle,rgba(26,122,74,.35) 0%,transparent 70%)",
          animationDuration:"8s", animationDelay:"0s",
        }}/>
        <div className="ct-orb" style={{
          width:260, height:260, bottom:-60, left:"25%",
          background:"radial-gradient(circle,rgba(245,197,40,.12) 0%,transparent 70%)",
          animationDuration:"10s", animationDelay:"2s",
        }}/>

        <div style={{ maxWidth:1100, margin:"0 auto", position:"relative", zIndex:1 }}>

          {/* ── Heading ── */}
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <h2 className="ct-hf" style={{
              fontSize:"clamp(2rem,4.5vw,2.9rem)",
              fontWeight:900, color:"white",
              lineHeight:1.15, marginBottom:10,
            }}>
              {vis && (
                <>
                  <span className="ct-word" style={{ animationDelay:".05s", marginRight:".2em" }}>Get In</span>
                  <span className="ct-word" style={{ animationDelay:".18s" }}>Touch</span>
                </>
              )}
            </h2>
            {vis && (
              <div style={{ display:"flex", justifyContent:"center", marginBottom:12 }}>
                <div className="ct-line" style={{
                  height:3, width:66, borderRadius:99,
                  background:"linear-gradient(90deg,#f5c518,#ffe066)",
                  animationDelay:".3s",
                }}/>
              </div>
            )}
            {vis && (
              <p className="ct-sub" style={{
                color:"rgba(255,255,255,.6)",
                fontSize:".95rem", fontWeight:400,
                animationDelay:".42s",
                fontFamily:"'DM Sans',sans-serif",
              }}>
                We'd love to hear from you
              </p>
            )}
          </div>

          {/* ── Two-column layout ── */}
          <div style={{
            display:"grid",
            gridTemplateColumns:"1fr 1.35fr",
            gap:28,
            alignItems:"start",
          }}
          className="ct-grid"
          >

            {/* LEFT — contact info */}
            <div ref={leftRef} className="ct-left" style={{ display:"flex", flexDirection:"column", gap:24 }}>

              <h3 className="ct-hf" style={{
                color:"white", fontWeight:700,
                fontSize:"1.15rem", margin:0,
              }}>
                Contact Information
              </h3>

              <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                {contactItems.map((item, i) => (
                  <div
                    key={item.label}
                    ref={el => rowRefs.current[i] = el}
                    className="ct-info-row"
                    style={{
                      display:"flex", alignItems:"flex-start", gap:14,
                      animationDelay:`${.32 + i * .11}s`,
                    }}
                  >
                    <div
                      ref={el => iconRefs.current[i] = el}
                      className="ct-icon-box"
                      style={{ animationDelay:`${.38 + i * .11}s` }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ color:"rgba(255,255,255,.55)", fontSize:".75rem", fontWeight:600, letterSpacing:".05em", marginBottom:3 }}>
                        {item.label}
                      </div>
                      <div style={{ color:"white", fontSize:".88rem", lineHeight:1.6, whiteSpace:"pre-line" }}>
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div
                className="ct-map-box"
                onClick={() => window.open("https://maps.google.com/?q=Udhna,Surat,Gujarat", "_blank")}
              >
                <svg
                  width="36" height="36" viewBox="0 0 24 24" fill="none"
                  style={{ animation:"ct-floatPin 2.8s ease-in-out infinite", color:"#f5c518" }}
                >
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" stroke="#f5c518" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="10" r="3" stroke="#f5c518" strokeWidth="1.8"/>
                </svg>
                <span style={{ color:"rgba(255,255,255,.6)", fontSize:".82rem", fontWeight:500 }}>
                  Map Location
                </span>
              </div>
            </div>

            {/* RIGHT — form */}
            <div ref={rightRef} className="ct-right ct-form-card">
              <h3 className="ct-hf" style={{
                color:"white", fontWeight:700,
                fontSize:"1.15rem", margin:"0 0 22px",
              }}>
                Send Us a Message
              </h3>

              <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:18 }}>
                <div>
                  <label style={{ display:"block", color:"rgba(255,255,255,.65)", fontSize:".8rem", fontWeight:600, marginBottom:7, letterSpacing:".04em" }}>
                    Name
                  </label>
                  <input
                    className="ct-input"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <label style={{ display:"block", color:"rgba(255,255,255,.65)", fontSize:".8rem", fontWeight:600, marginBottom:7, letterSpacing:".04em" }}>
                    Phone
                  </label>
                  <input
                    className="ct-input"
                    type="tel"
                    placeholder="Your phone number"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <label style={{ display:"block", color:"rgba(255,255,255,.65)", fontSize:".8rem", fontWeight:600, marginBottom:7, letterSpacing:".04em" }}>
                    Message
                  </label>
                  <textarea
                    className="ct-input"
                    placeholder="How can we help you?"
                    rows={4}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    style={{ resize:"vertical", minHeight:110 }}
                    required
                  />
                </div>

                <button type="submit" className="ct-btn">
                  {sent ? "✓ Message Sent!" : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* responsive grid fix */}
        <style>{`
          @media (max-width: 700px) {
            .ct-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  );
}