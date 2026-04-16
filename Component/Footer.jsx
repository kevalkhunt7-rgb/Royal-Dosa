"use client";

import { useState } from "react";
import Link from "next/link";
import {
  
  MapPin, Phone, Mail,
  Package, ShoppingBag, ChevronRight, Send,
  Award, Leaf, Zap,
} from "lucide-react";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";

/* ─── CSS ───────────────────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Outfit:wght@300;400;500;600;700&display=swap');

  :root {
    --nb:       #0a1628;   /* deep navy base */
    --nb2:      #0d1e38;   /* slightly lighter navy */
    --nb3:      #112244;   /* card bg navy */
    --gold:     #e8b84b;   /* warm gold */
    --gold-lt:  #f5d07a;   /* light gold */
    --gold-dk:  #c49a28;   /* dark gold */
    --green:    #1a7a4a;   /* brand green */
    --green-lt: #22a060;
    --white:    #ffffff;
    --cream:    #f0e8d5;
    --muted:    rgba(220,230,255,0.45);
    --border:   rgba(232,184,75,0.15);
    --border2:  rgba(255,255,255,0.08);
  }

  .ft-root  { font-family:'Outfit',sans-serif; background:var(--nb); }
  .ft-serif { font-family:'Cormorant Garamond',serif; }

  /* dot grid pattern */
  .ft-dots {
    background-image:
      radial-gradient(circle, rgba(232,184,75,.06) 1px, transparent 1px);
    background-size: 32px 32px;
  }

  /* top accent border */
  .ft-top-bar {
    height: 3px;
    background: linear-gradient(90deg,
      transparent 0%, var(--green) 20%,
      var(--gold) 50%, var(--green) 80%, transparent 100%
    );
  }

  /* section headings */
  .ft-h {
    font-family: 'Outfit', sans-serif;
    font-size: .78rem;
    font-weight: 700;
    letter-spacing: .14em;
    text-transform: uppercase;
    color: var(--gold);
    margin: 0 0 18px;
    padding-bottom: 10px;
    position: relative;
  }
  .ft-h::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 28px; height: 2px;
    background: linear-gradient(90deg, var(--gold), transparent);
    border-radius: 99px;
  }

  /* nav links */
  .ft-lnk {
    display: flex; align-items: center; gap: 6px;
    color: var(--muted);
    font-size: .855rem;
    font-weight: 400;
    text-decoration: none;
    padding: 4px 0;
    transition: color .2s, transform .2s, gap .2s;
  }
  .ft-lnk svg { opacity: 0; transition: opacity .2s; flex-shrink: 0; }
  .ft-lnk:hover { color: var(--gold-lt); transform: translateX(3px); gap: 8px; }
  .ft-lnk:hover svg { opacity: 1; }

  /* product pill tags */
  .ft-tag {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 12px;
    border-radius: 20px;
    border: 1px solid var(--border);
    background: rgba(232,184,75,.06);
    color: var(--muted);
    font-size: .78rem;
    font-weight: 400;
    cursor: default;
    transition: border-color .2s, color .2s, background .2s, transform .2s;
  }
  .ft-tag:hover {
    border-color: var(--gold);
    color: var(--gold-lt);
    background: rgba(232,184,75,.12);
    transform: translateY(-1px);
  }

  /* contact rows */
  .ft-contact-icon {
    width: 34px; height: 34px; border-radius: 9px;
    background: rgba(232,184,75,.1);
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    color: var(--gold); flex-shrink: 0;
    transition: background .2s, transform .2s;
  }
  .ft-contact-icon:hover { background: rgba(232,184,75,.2); transform: scale(1.08); }

  /* social */
  .ft-soc {
    width: 40px; height: 40px; border-radius: 12px;
    border: 1.5px solid var(--border2);
    display: flex; align-items: center; justify-content: center;
    color: var(--muted);
    transition: all .25s cubic-bezier(.22,1,.36,1);
    cursor: pointer; text-decoration: none;
  }
  .ft-soc:hover {
    transform: translateY(-4px) scale(1.1);
    border-color: var(--gold);
    color: var(--gold);
    background: rgba(232,184,75,.1);
    box-shadow: 0 8px 24px rgba(232,184,75,.2);
  }

  /* newsletter */
  .ft-nl {
    display: flex; align-items: center;
    border: 1.5px solid var(--border2);
    border-radius: 10px;
    overflow: hidden;
    background: rgba(255,255,255,.04);
    transition: border-color .25s, box-shadow .25s;
  }
  .ft-nl:focus-within {
    border-color: var(--gold);
    box-shadow: 0 0 0 3px rgba(232,184,75,.12);
  }
  .ft-nl input {
    flex: 1; background: transparent;
    border: none; outline: none;
    padding: 12px 14px;
    color: white;
    font-family: 'Outfit', sans-serif;
    font-size: .84rem;
  }
  .ft-nl input::placeholder { color: var(--muted); }
  .ft-nl button {
    padding: 10px 16px;
    background: var(--gold);
    border: none; cursor: pointer;
    color: var(--nb);
    display: flex; align-items: center;
    font-weight: 600; font-size: .82rem; gap: 6px;
    font-family: 'Outfit', sans-serif;
    transition: background .2s, transform .2s;
    flex-shrink: 0;
    white-space: nowrap;
  }
  .ft-nl button:hover { background: var(--gold-lt); transform: scale(1.03); }

  /* divider */
  .ft-div {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border), rgba(232,184,75,.4), var(--border), transparent);
  }

  /* feat card */
  .ft-feat {
    background: var(--nb3);
    border: 1px solid var(--border2);
    border-radius: 14px;
    padding: 16px 18px;
    display: flex; align-items: flex-start; gap: 12px;
    transition: border-color .25s, transform .25s, box-shadow .25s;
  }
  .ft-feat:hover {
    border-color: rgba(232,184,75,.35);
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(0,0,0,.3);
  }
  .ft-feat-icon {
    width: 38px; height: 38px; border-radius: 10px;
    background: linear-gradient(135deg, var(--green), var(--green-lt));
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; color: white;
  }

  /* tagline */
  .ft-tagline {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: .92rem;
    color: rgba(232,184,75,.45);
    letter-spacing: .05em;
  }

  /* ripple for live dot */
  @keyframes ft-ripple {
    0%  { box-shadow: 0 0 0 0   rgba(34,160,96,.7); }
    70% { box-shadow: 0 0 0 9px rgba(34,160,96,0);  }
    100%{ box-shadow: 0 0 0 0   rgba(34,160,96,0);  }
  }
  .ft-live { animation: ft-ripple 1.6s ease infinite; }

  /* responsive */
  @media (max-width: 900px) {
    .ft-main-grid { grid-template-columns: 1fr 1fr !important; }
    .ft-brand-col { grid-column: 1 / -1; }
    .ft-feat-row  { grid-template-columns: 1fr 1fr !important; }
  }
  @media (max-width: 560px) {
    .ft-main-grid { grid-template-columns: 1fr !important; }
    .ft-feat-row  { grid-template-columns: 1fr !important; }
    .ft-bottom    { flex-direction: column !important; text-align: center; }
  }
`;

const quickLinks = [
  { label: "Home",           href: "/" },
  { label: "About Us",       href: "/about" },
  { label: "Our Products",   href: "/product" },
  { label: "Become Distributor", href: "/distributor" },
  { label: "Contact",        href: "/contact" },
];

const products = [
  "Classic Paper Dosa",
  "Masala Paper Dosa",
  "Mysore Paper Dosa",
  "Mini Dosa Bites",
  "Dosa Crunch Mix",
];

const features = [
  { icon: <Leaf size={17}/>,     title: "100% Natural",      desc: "No preservatives, no artificial flavors" },
  { icon: <Zap size={17}/>,      title: "Ready in 2 Mins",   desc: "Just open, heat & eat — crispy everytime" },
  { icon: <Award size={17}/>,    title: "FSSAI Certified",   desc: "Hygienically packed, quality assured" },
  { icon: <Package size={17}/>,  title: "Pan-India Delivery", desc: "Available across Gujarat & growing" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone]   = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email) return;
    setDone(true); setEmail("");
    setTimeout(() => setDone(false), 3500);
  };

  return (
    <>
      <style>{css}</style>

      <footer className="ft-root" style={{ position:"relative", overflow:"hidden" }}>

        {/* dot pattern overlay */}
        <div className="ft-dots" style={{ position:"absolute", inset:0, zIndex:0, pointerEvents:"none" }} />

        {/* ambient glow orbs */}
        <div style={{
          position:"absolute", top:-120, right:-80, width:420, height:420, borderRadius:"50%",
          background:"radial-gradient(circle, rgba(26,122,74,.12) 0%, transparent 70%)",
          pointerEvents:"none", zIndex:0,
        }}/>
        <div style={{
          position:"absolute", bottom:-80, left:"-5%", width:360, height:360, borderRadius:"50%",
          background:"radial-gradient(circle, rgba(232,184,75,.07) 0%, transparent 70%)",
          pointerEvents:"none", zIndex:0,
        }}/>

        {/* top accent bar */}
        <div className="ft-top-bar" />

        {/* ══ FEATURE STRIP ══════════════════════════════════════════════ */}
        
        {/* ══ NEWSLETTER BANNER ══════════════════════════════════════════ */}
       
          
           

        {/* ══ MAIN BODY ══════════════════════════════════════════════════ */}
        <div style={{ position:"relative", zIndex:1, maxWidth:1100, margin:"0 auto", padding:"60px 24px 52px" }}>
          <div
            className="ft-main-grid"
            style={{ display:"grid", gridTemplateColumns:"1.7fr 1fr 1fr 1fr", gap:"40px 32px" }}
          >

            {/* COL 1 — Brand */}
            <div className="ft-brand-col">
              {/* Logo row */}
              <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20 }}>
                <div style={{
                  width:54, height:54, borderRadius:14,
                  background:"linear-gradient(135deg,var(--green),#0f4d2e)",
                  border:"1.5px solid rgba(232,184,75,.3)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  boxShadow:"0 6px 20px rgba(26,122,74,.35)",
                  flexShrink:0,
                }}>
                  <span className="ft-serif" style={{ color:"var(--gold)", fontWeight:700, fontSize:"1.15rem" }}>RD</span>
                </div>
                <div>
                  <div className="ft-serif" style={{ color:"white", fontSize:"1.4rem", fontWeight:700, lineHeight:1.1 }}>
                    Royal Paper Dosa
                  </div>
                  <div style={{ color:"var(--green-lt)", fontSize:".68rem", letterSpacing:".16em", textTransform:"uppercase", fontWeight:600, marginTop:2 }}>
                    Ready-to-Eat · Premium Snack
                  </div>
                </div>
              </div>

              <p style={{ color:"var(--muted)", fontSize:".875rem", lineHeight:1.8, marginBottom:22, maxWidth:300 }}>
                Serving the authentic taste of South India with love, tradition, and flavor — crispy, hygienic, and ready to eat in minutes.
              </p>

              {/* Social */}
              <div style={{ display:"flex", gap:10, marginBottom:24 }}>
                {[
                  { icon:<FaInstagram  size={17}/>, href:"#", label:"Instagram" },
                  { icon:<FaFacebookF  size={17}/>, href:"#", label:"Facebook"  },
                  { icon:<FaYoutube    size={17}/>, href:"#", label:"YouTube"   },
                ].map(s => (
                  <a key={s.label} href={s.href} aria-label={s.label} className="ft-soc">{s.icon}</a>
                ))}
              </div>

              {/* Availability badge */}
              <div style={{
                display:"inline-flex", alignItems:"center", gap:10,
                background:"rgba(26,122,74,.15)",
                border:"1px solid rgba(26,122,74,.35)",
                borderRadius:10, padding:"10px 16px",
              }}>
                <div style={{
                  width:8, height:8, borderRadius:"50%",
                  background:"var(--green-lt)",
                  flexShrink:0,
                }} className="ft-live" />
                <span style={{ color:"var(--green-lt)", fontSize:".78rem", fontWeight:600 }}>
                  Available across Gujarat · Expanding Pan-India
                </span>
              </div>
            </div>

            {/* COL 2 — Quick Links */}
            <div>
              <h4 className="ft-h">Quick Links</h4>
              <nav style={{ display:"flex", flexDirection:"column", gap:1 }}>
                {quickLinks.map(l => (
                  <Link key={l.label} href={l.href} className="ft-lnk">
                    <ChevronRight size={12}/>
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* COL 3 — Products */}
            <div>
              <h4 className="ft-h">Our Products</h4>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {products.map(p => (
                  <div key={p} className="ft-tag">
                    <span style={{ color:"var(--gold)", fontSize:".6rem" }}>◆</span>
                    {p}
                  </div>
                ))}
              </div>

              {/* Where to buy */}
              <div style={{ marginTop:22 }}>
                <h4 className="ft-h" style={{ marginBottom:12 }}>Where to Buy</h4>
                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  {["Local Grocery Stores","Modern Trade Outlets","Online Distributors","Wholesale Markets"].map(w => (
                    <div key={w} style={{
                      display:"flex", alignItems:"center", gap:7,
                      color:"var(--muted)", fontSize:".81rem",
                    }}>
                      <ShoppingBag size={11} style={{ color:"var(--green-lt)", flexShrink:0 }}/>
                      {w}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* COL 4 — Contact */}
            <div>
              <h4 className="ft-h">Contact Us</h4>
              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                {[
                  { icon:<MapPin size={15}/>, lines:["123, Food Processing Zone,","Udhna, Surat – 394210,","Gujarat, India"] },
                  { icon:<Phone  size={15}/>, lines:["+91 98765 43210","+91 80000 12345"] },
                  { icon:<Mail   size={15}/>, lines:["info@royaldosapaper.com","sales@royaldosapaper.com"] },
                ].map((item,i) => (
                  <div key={i} style={{ display:"flex", gap:11, alignItems:"flex-start" }}>
                    <div className="ft-contact-icon">{item.icon}</div>
                    <div>
                      {item.lines.map((l,li) => (
                        <div key={li} style={{ color:"var(--muted)", fontSize:".82rem", lineHeight:1.65 }}>{l}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Distributor CTA */}
              <div style={{
                marginTop:22,
                background:"linear-gradient(135deg,rgba(26,122,74,.2),rgba(26,122,74,.08))",
                border:"1px solid rgba(26,122,74,.3)",
                borderRadius:12, padding:"14px 16px",
              }}>
                <div style={{ color:"white", fontWeight:600, fontSize:".84rem", marginBottom:4 }}>
                  Become a Distributor
                </div>
                <div style={{ color:"var(--muted)", fontSize:".77rem", lineHeight:1.5, marginBottom:10 }}>
                  Join our growing network across India
                </div>
                <Link href="/distributor" style={{
                  display:"inline-flex", alignItems:"center", gap:6,
                  background:"var(--green)", color:"white",
                  padding:"7px 14px", borderRadius:8,
                  fontSize:".78rem", fontWeight:600,
                  textDecoration:"none",
                  transition:"background .2s, transform .2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background="var(--green-lt)"; e.currentTarget.style.transform="translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background="var(--green)"; e.currentTarget.style.transform="translateY(0)"; }}
                >
                  Apply Now <ChevronRight size={13}/>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ══ BOTTOM BAR ═════════════════════════════════════════════════ */}
        <div style={{ position:"relative", zIndex:1 }}>
          <div className="ft-div" />

          {/* ornament row */}
          <div style={{
            display:"flex", justifyContent:"center", alignItems:"center",
            gap:10, padding:"12px 0 0",
            color:"rgba(232,184,75,.2)", fontSize:".6rem", letterSpacing:".2em",
          }}>
            {"✦ ◆ ✦ ◆ ✦ ◆ ✦ ◆ ✦ ◆ ✦".split(" ").map((s,i) => <span key={i}>{s}</span>)}
          </div>

          <div
            className="ft-bottom"
            style={{
              maxWidth:1100, margin:"0 auto",
              padding:"14px 24px 26px",
              display:"flex", alignItems:"center", justifyContent:"space-between",
              flexWrap:"wrap", gap:10,
            }}
          >
            <p style={{ color:"rgba(220,230,255,.28)", fontSize:".76rem", margin:0 }}>
              © {new Date().getFullYear()} Royal Paper Dosa. All rights reserved.
              {" · "}
              <span style={{ cursor:"pointer", transition:"color .2s" }}
                onMouseEnter={e => e.currentTarget.style.color="var(--gold)"}
                onMouseLeave={e => e.currentTarget.style.color="rgba(220,230,255,.28)"}
              >Privacy Policy</span>
              {" · "}
              <span style={{ cursor:"pointer", transition:"color .2s" }}
                onMouseEnter={e => e.currentTarget.style.color="var(--gold)"}
                onMouseLeave={e => e.currentTarget.style.color="rgba(220,230,255,.28)"}
              >Terms</span>
            </p>
            <p className="ft-tagline">✦ Crafted with tradition, served with royalty ✦</p>
          </div>
        </div>

      </footer>
    </>
  );
}