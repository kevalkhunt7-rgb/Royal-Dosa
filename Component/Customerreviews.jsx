"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const styles = `
  @keyframes cr-titleWord {
    from { opacity:0; transform:translateY(26px) skewY(3deg); }
    to   { opacity:1; transform:translateY(0) skewY(0deg); }
  }
  @keyframes cr-lineGrow {
    from { transform:scaleX(0); opacity:0; }
    to   { transform:scaleX(1); opacity:1; }
  }
  @keyframes cr-subFade {
    from { opacity:0; letter-spacing:.18em; }
    to   { opacity:1; letter-spacing:.02em; }
  }
  @keyframes cr-cardIn {
    from { opacity:0; transform:translateY(44px) scale(.95); }
    to   { opacity:1; transform:translateY(0) scale(1); }
  }
  @keyframes cr-starPop {
    0%   { opacity:0; transform:scale(0) rotate(-30deg); }
    60%  { transform:scale(1.3) rotate(6deg); }
    100% { opacity:1; transform:scale(1) rotate(0deg); }
  }
  @keyframes cr-textIn {
    from { opacity:0; transform:translateY(12px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes cr-shimmer {
    0%   { background-position:-220% center; }
    100% { background-position:220% center; }
  }
  @keyframes cr-quoteFloat {
    0%,100% { transform:translateY(0) rotate(-8deg); opacity:.18; }
    50% { transform:translateY(-6px) rotate(-5deg); opacity:.26; }
  }
  @keyframes cr-floatDot {
    0%,100% { transform:translateY(0) scale(1); opacity:.35; }
    50% { transform:translateY(-12px) scale(1.2); opacity:.7; }
  }

  .cr-hf { font-family: var(--font-playfair), serif; }
  .cr-bf { font-family: var(--font-dm-sans), sans-serif; }

  .cr-word { display:inline-block; opacity:0; animation:cr-titleWord .65s cubic-bezier(.22,1,.36,1) forwards; }
  .cr-sub  { opacity:0; animation:cr-subFade .7s ease forwards; }
  .cr-line { transform-origin:left; transform:scaleX(0); animation:cr-lineGrow .65s cubic-bezier(.22,1,.36,1) forwards; }

  .cr-slider-wrap {
    overflow: hidden;
    position: relative;
  }

  .cr-slider-track {
    display: flex;
    gap: 22px;
    will-change: transform;
    transition: transform .65s cubic-bezier(.22,1,.36,1);
  }

  .cr-slide {
    flex: 0 0 calc((100% - 44px) / 3);
    min-width: 0;
  }

  @media (max-width: 1023px) {
    .cr-slide {
      flex: 0 0 calc((100% - 22px) / 2);
    }
  }

  @media (max-width: 639px) {
    .cr-slide {
      flex: 0 0 100%;
    }
  }

  .cr-card {
    position:relative;
    overflow:hidden;
    background:#fff;
    border:1.5px solid #e4f0e6;
    border-radius:20px;
    padding:32px 28px 28px;
    display:flex;
    flex-direction:column;
    gap:16px;
    opacity:0;
    transition: transform .35s cubic-bezier(.22,1,.36,1),
                box-shadow .35s, border-color .35s;
    height: 100%;
    min-height: 255px;
  }

  .cr-card.in { animation:cr-cardIn .72s cubic-bezier(.22,1,.36,1) forwards; }

  .cr-card:hover {
    transform:translateY(-8px) scale(1.018);
    box-shadow:0 24px 56px rgba(26,122,74,.12);
    border-color:#9fcfb2;
  }

  .cr-card::before {
    content:'';
    position:absolute;
    inset:0;
    pointer-events:none;
    background:linear-gradient(110deg,transparent 36%,rgba(255,255,255,.58) 50%,transparent 64%);
    background-size:220% 100%;
    opacity:0;
    transition:opacity .15s;
  }

  .cr-card:hover::before {
    opacity:1;
    animation:cr-shimmer .55s ease forwards;
  }

  .cr-quote-bg {
    position:absolute;
    top:16px;
    right:20px;
    font-size:6rem;
    line-height:1;
    color:#1a7a4a;
    font-family: var(--font-playfair), serif;
    font-weight:900;
    animation:cr-quoteFloat 4s ease-in-out infinite;
    pointer-events:none;
    user-select:none;
  }

  .cr-star {
    opacity:0;
    display:inline-block;
  }

  .cr-star.in {
    animation:cr-starPop .5s cubic-bezier(.22,1,.36,1) forwards;
  }

  .cr-text { opacity:0; }
  .cr-text.in { animation:cr-textIn .55s cubic-bezier(.22,1,.36,1) forwards; }

  .cr-bar {
    height:3px;
    border-radius:99px;
    background:linear-gradient(90deg,#1a7a4a,#4ade80);
    transform-origin:left;
    transform:scaleX(0);
    transition:transform .45s cubic-bezier(.22,1,.36,1);
    flex-shrink:0;
  }

  .cr-card:hover .cr-bar { transform:scaleX(1); }

  .cr-avatar {
    width:40px;
    height:40px;
    border-radius:50%;
    background:linear-gradient(135deg,#1a7a4a,#4ade80);
    display:flex;
    align-items:center;
    justify-content:center;
    color:white;
    font-weight:700;
    font-size:.95rem;
    flex-shrink:0;
    font-family: var(--font-dm-sans), sans-serif;
    transition:transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s;
  }

  .cr-card:hover .cr-avatar {
    transform:scale(1.1) rotate(-5deg);
    box-shadow:0 6px 18px rgba(26,122,74,.3);
  }

  .cr-dot {
    position:absolute;
    border-radius:50%;
    background:rgba(26,122,74,.13);
    pointer-events:none;
    animation:cr-floatDot ease-in-out infinite;
  }

  .cr-nav {
    display:flex;
    align-items:center;
    justify-content:center;
    gap:10px;
    margin-top:28px;
  }

  .cr-dot-btn {
    width:10px;
    height:10px;
    border-radius:999px;
    border:none;
    background:#c9dfcf;
    cursor:pointer;
    transition:all .25s ease;
  }

  .cr-dot-btn.active {
    width:28px;
    background:#1a7a4a;
  }

  .cr-arrow {
    width:42px;
    height:42px;
    border-radius:999px;
    border:1.5px solid #d7eadc;
    background:#fff;
    color:#1a7a4a;
    cursor:pointer;
    font-size:18px;
    font-weight:700;
    transition:.25s ease;
  }

  .cr-arrow:hover {
    background:#f2fbf5;
    border-color:#9fcfb2;
    transform:translateY(-2px);
  }
`;

const reviews = [
  {
    name: "Rajesh Patel",
    role: "Retailer, Surat",
    initials: "RP",
    stars: 5,
    text: `"Best quality dosa snacks in the market! Customers love the crispy texture and authentic taste. High demand and good margins make it a profitable product."`,
  },
  {
    name: "Priya Sharma",
    role: "Distributor, Ahmedabad",
    initials: "PS",
    stars: 5,
    text: `"Excellent partnership with The Royal Dosa Paper. Professional team, quality products, and strong brand support. Our sales have grown 40% since we started."`,
  },
  {
    name: "Amit Kumar",
    role: "Consumer",
    initials: "AK",
    stars: 5,
    text: `"My family's favorite snack! The taste is authentic and the quality is consistently good. Love that it's hygienic and ready to eat anytime."`,
  },
  {
    name: "Neha Joshi",
    role: "Cafe Owner, Vadodara",
    initials: "NJ",
    stars: 5,
    text: `"Our customers keep asking for this snack again and again. Packaging looks premium and the taste really stands out from other ready-to-eat products."`,
  },
  {
    name: "Karan Mehta",
    role: "Wholesaler, Rajkot",
    initials: "KM",
    stars: 5,
    text: `"Fast-moving product with strong repeat orders. The brand support and consistency in supply make business smooth and dependable for us."`,
  },
  {
    name: "Sneha Iyer",
    role: "Consumer",
    initials: "SI",
    stars: 5,
    text: `"It actually tastes like something special, not just another packaged snack. Crispy, flavorful, and perfect with tea in the evening."`,
  },
  {
    name: "Vikram Desai",
    role: "Supermarket Buyer",
    initials: "VD",
    stars: 5,
    text: `"We added it to our shelves as a test, and it quickly became one of the best-performing snacks in its category. Great customer response."`,
  },
  {
    name: "Meera Nair",
    role: "Food Blogger",
    initials: "MN",
    stars: 5,
    text: `"Loved the authentic South Indian touch and the crunch. It feels premium and interesting, which makes it very easy to recommend."`,
  },
];

const bgDots = [
  { w: 10, h: 10, top: "10%", left: "4%", delay: "0s", dur: "3.8s" },
  { w: 7, h: 7, top: "75%", left: "2%", delay: "1.3s", dur: "4.5s" },
  { w: 11, h: 11, top: "20%", right: "3%", delay: "0.6s", dur: "3.4s" },
  { w: 6, h: 6, top: "80%", right: "6%", delay: "2s", dur: "5s" },
  { w: 8, h: 8, top: "50%", left: "48%", delay: "1.7s", dur: "4.1s" },
];

export default function CustomerReviews() {
  const [vis, setVis] = useState(false);
  const [current, setCurrent] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const autoRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, reviews.length - cardsPerView);

  useEffect(() => {
    if (current > maxIndex) setCurrent(0);
  }, [cardsPerView, current, maxIndex]);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVis(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!vis) return;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;

      const base = 140 + i * 90;
      setTimeout(() => card.classList.add("in"), base);

      card.querySelectorAll(".cr-star").forEach((star, si) => {
        setTimeout(() => star.classList.add("in"), base + 140 + si * 60);
      });

      card.querySelectorAll(".cr-text").forEach((el, ti) => {
        setTimeout(() => el.classList.add("in"), base + 200 + ti * 80);
      });
    });
  }, [vis]);

  useEffect(() => {
    if (!vis || maxIndex <= 0) return;

    autoRef.current = setInterval(() => {
      setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 2800);

    return () => clearInterval(autoRef.current);
  }, [vis, maxIndex]);

  const slideWidthPercent = useMemo(() => {
    return 100 / cardsPerView;
  }, [cardsPerView]);

  const goPrev = () => {
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goNext = () => {
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const dots = Array.from({ length: maxIndex + 1 });

  return (
    <>
      <style>{styles}</style>

      <section
        id="reviews"
        ref={sectionRef}
        className="cr-bf"
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#f5f8f0",
          padding: "80px 24px 90px",
        }}
      >
        {bgDots.map((d, i) => (
          <div
            key={i}
            className="cr-dot"
            style={{
              width: d.w,
              height: d.h,
              top: d.top,
              left: d.left,
              right: d.right,
              animationDelay: d.delay,
              animationDuration: d.dur,
            }}
          />
        ))}

        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <h2
              className="cr-hf"
              style={{
                fontSize: "clamp(2rem,4.5vw,2.8rem)",
                fontWeight: 900,
                color: "#111",
                lineHeight: 1.15,
                marginBottom: 10,
              }}
            >
              {vis && (
                <>
                  <span
                    className="cr-word"
                    style={{ animationDelay: ".05s", marginRight: ".2em" }}
                  >
                    Customer
                  </span>
                  <span
                    className="cr-word"
                    style={{ animationDelay: ".18s", color: "#1a7a4a" }}
                  >
                    Reviews
                  </span>
                </>
              )}
            </h2>

            {vis && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 12,
                }}
              >
                <div
                  className="cr-line"
                  style={{
                    height: 3,
                    width: 66,
                    borderRadius: 99,
                    background: "linear-gradient(90deg,#1a7a4a,#4ade80)",
                    animationDelay: ".3s",
                  }}
                />
              </div>
            )}

            {vis && (
              <p
                className="cr-sub"
                style={{
                  color: "#888",
                  fontSize: ".94rem",
                  fontWeight: 400,
                  animationDelay: ".42s",
                }}
              >
                What our customers say about us
              </p>
            )}
          </div>

          <div
            className="cr-slider-wrap"
            onMouseEnter={() => clearInterval(autoRef.current)}
            onMouseLeave={() => {
              if (maxIndex > 0) {
                autoRef.current = setInterval(() => {
                  setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
                }, 2800);
              }
            }}
          >
            <div
              className="cr-slider-track"
              style={{
                transform: `translateX(calc(-${current * slideWidthPercent}% - ${current * 22}px))`,
              }}
            >
              {reviews.map((r, i) => (
                <div className="cr-slide" key={`${r.name}-${i}`}>
                  <div
                    ref={(el) => (cardRefs.current[i] = el)}
                    className="cr-card"
                  >
                    <div
                      className="cr-quote-bg"
                      style={{ animationDelay: `${i * 0.4}s` }}
                    >
                      "
                    </div>

                    <div style={{ display: "flex", gap: 4 }}>
                      {Array.from({ length: r.stars }).map((_, si) => (
                        <span
                          key={si}
                          className="cr-star"
                          style={{
                            fontSize: "1.2rem",
                            color: "#f5c518",
                          }}
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    <p
                      className="cr-text"
                      style={{
                        fontSize: ".88rem",
                        color: "#444",
                        lineHeight: 1.72,
                        fontStyle: "italic",
                        margin: 0,
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      {r.text}
                    </p>

                    <div className="cr-bar" />

                    <div
                      className="cr-text"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <div className="cr-avatar">{r.initials}</div>
                      <div>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: ".9rem",
                            color: "#111",
                          }}
                        >
                          {r.name}
                        </div>
                        <div
                          style={{
                            fontSize: ".75rem",
                            color: "#888",
                            fontWeight: 400,
                          }}
                        >
                          {r.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cr-nav">
            <button className="cr-arrow" onClick={goPrev} aria-label="Previous review">
              ←
            </button>

            {dots.map((_, i) => (
              <button
                key={i}
                className={`cr-dot-btn ${current === i ? "active" : ""}`}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}

            <button className="cr-arrow" onClick={goNext} aria-label="Next review">
              →
            </button>
          </div>
        </div>
      </section>
    </>
  );
}