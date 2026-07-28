// ============================================================
//  APEX — script.js
//  Language toggle (EN/RU) · Nav scroll · Mobile menu · Animations
// ============================================================

// ─── TRANSLATIONS ───────────────────────────────────────────
const i18n = {
  en: {
    "nav.process":   "Process",
    "nav.services":  "Visas",
    "nav.pricing":   "Pricing",
    "nav.contact":   "Contact",
    "nav.cta":       "Book a call",

    "hero.eyebrow":      "",
    "hero.heading_1":    "We believe talented",
    "hero.heading_2":    "people exist everywhere",
    "hero.subtitle":     "The talent is already there. We help you recognize it, package it, and turn it into a visa.",
    "hero.cta_primary":  "Book a call",
    "hero.cta_secondary":"How it works",
    "hero.stat_1":       "Cases filed",
    "hero.stat_2":       "Flat fee, no surprises",
    "hero.stat_3":       "Average timeline",

    "who.title":     "Built something. Shipped something. Led something. You qualify",
    "who.c1_title":  "Founders",
    "who.c1_desc":   "Venture-backed or bootstrapped. We know how to prove your critical role using traction, pitch decks, and investor backing.",
    "who.c2_title":  "Engineers",
    "who.c2_desc":   "AI/ML, infra, and fullstack. We translate your code, system architecture, and core product contributions into legal evidence.",
    "who.c3_title":  "Researchers",
    "who.c3_desc":   "Biotech, AI, and academia. We frame your citations, peer reviews, and papers through their real-world commercial impact.",
    "who.c4_title":  "Designers & Creators",
    "who.c4_desc":   "Product, UI/UX, and brand directors. We package your design systems, reach, and industry awards into a compelling petition.",

    "visas.label":   "Three visas",
    "visas.subtitle":"Three visas for extraordinary people",
    "visa.cta":      "Get started",

    "services.title":    "Three visas.",
    "services.subtitle": "We only do extraordinary ability visas. Nothing else.",
    "services.badge":    "Most common",
    "services.o1a_tag":  "Sciences · Business · Athletics",
    "services.o1a_desc": "The most common path for founders, engineers, and researchers who've built something real. If you've led meaningful work in your field, this is probably your route.",
    "services.o1b_tag":  "Arts · Entertainment · Film",
    "services.o1b_desc": "For creators and artists with a body of work that speaks for itself. If you've made your mark in film, music, design, or entertainment — we can build the case.",
    "services.eb1a_tag": "Permanent Residency",
    "services.eb1a_desc":"The same extraordinary ability standard as O-1A, but it stays with you forever. No employer sponsor needed.",
    "services.cta_link": "Get started →",

    "process.title":       "The process",
    "process.subtitle":    "Here's what working with us looks like",
    "process.step_1_title":"Qualification Call",
    "process.step_1_desc": "We look honestly at your background and tell you whether you have a case. If you need more work, we give you a clear roadmap.",
    "process.step_2_title":"Case Architecture",
    "process.step_2_desc": "We lock in your 3 strongest criteria and design a strategy around them. You'll know the exact plan before we write a single word.",
    "process.step_3_title":"Content Drafting",
    "process.step_3_desc": "We write the petition, draft recommendation templates, and complete all forms. You provide the facts; we build the legal argument.",
    "process.step_4_title":"Filing & Defense",
    "process.step_4_desc": "We file your petition and handle any RFE responses at no extra cost. We stay with you until your Approval Notice arrives.",

    "criteria.subtitle": "Need 3 of 8 criteria. Most clients clear that bar before the first call ends.",
    "criteria.c1": "Awards — Hackathons, grants, or acceptance into top-tier accelerators",
    "criteria.c2": "Membership — Exclusive tech communities, founder clubs, or expert groups",
    "criteria.c3": "Press — Articles about you or your product in specialized or major media",
    "criteria.c4": "Original contributions — An algorithm, product, or system with proven industry impact",
    "criteria.c5": "Scholarly articles — Technical papers, reviews, or docs in peer-reviewed publications",
    "criteria.c6": "Judging — Hackathon juries, PR reviews, or vetting technical projects",
    "criteria.c7": "Critical role — Lead / Founding Engineer / CTO / CEO in a distinguished organization",
    "criteria.c8": "High salary — Compensation significantly above market average for your role",
    "criteria.cta": "Think you might qualify? Let's talk. →",

    "o1b.criteria_note": "Need 3 of 6 criteria. If your work speaks for itself, so does your case.",
    "o1b.c1": "Lead role — Leading or starring role in a major product rollout or distinguished project",
    "o1b.c2": "Critical acclaim — Articles and case reviews about your work in major industry media",
    "o1b.c3": "Commercial success — Products you designed achieved massive adoption, top rankings, or revenue",
    "o1b.c4": "Significant recognition — Endorsements from established industry leaders",
    "o1b.c5": "High salary — Compensation substantially above average in your creative field",
    "o1b.c6": "Past achievements — Track record evidenced by critical reviews or major industry assets",

    "eb1a.criteria_note": "Need 3 of 10 criteria. No U.S. employer or sponsor required.",
    "eb1a.c1":  "Awards — Major prizes, grants, or top placements at a national or international level",
    "eb1a.c2":  "Membership — Selective associations that require outstanding achievements for entry",
    "eb1a.c3":  "Press — Dedicated articles, interviews, and features about you in major media",
    "eb1a.c4":  "Judging — Contest juries, hackathon judging, or reviewing peer research",
    "eb1a.c5":  "Original contributions — Systems, algorithms, or patents with proven major industry impact",
    "eb1a.c6":  "Scholarly articles — Analytical or technical articles in peer-reviewed publications",
    "eb1a.c7":  "Critical role — Essential role in companies with a distinguished reputation",
    "eb1a.c8":  "High salary — Income substantially exceeding the market average",
    "eb1a.c9":  "Exhibitions — Work displayed at major scientific, artistic, or professional showcases",
    "eb1a.c10": "Commercial success — Proven results via downloads, active users, or revenue generated",

    "pricing.title":     "Pricing",
    "pricing.subtitle":  "Full service through approval",
    "pricing.amount":    "$7,500",
    "pricing.period":    "flat fee",
    "pricing.item_1":    "Complete petition preparation",
    "pricing.item_2":    "All forms and filings",
    "pricing.item_3":    "Support letters and exhibit packages",
    "pricing.item_4":    "USCIS communication and RFE responses",
    "pricing.item_5":    "Unlimited support through approval",
    "pricing.note_title":"Need it faster?",
    "pricing.note_desc": "USCIS premium processing (15 business days) is available for an additional $2,805 government fee.",
    "pricing.timeline":  "Standard timeline: 2–6 months",
    "pricing.cta":       "Get started",

    "proof.label": "Clients from",

    "framework.title": "We don't just fill templates. We engineer your narrative",
    "framework.desc":  "Most people undervalue what they've built. Our job is to go through everything you've done and surface what you've been underselling.",
    "team.alex_quote": "\"Our job is to strip the bureaucratic stress out of the process. You keep building product; we build the legal foundation.\"",
    "team.alex_name":  "Bermet D.",
    "team.alex_role":  "Founder of Apex",

    "outcomes.title":          "Proven outcomes",
    "outcomes.c1_badge":       "O-1A · Approved in 12 days",
    "outcomes.c1_title":       "AI/ML Founder",
    "outcomes.problem_label":  "The Problem",
    "outcomes.solution_label": "The Solution",
    "outcomes.c1_problem":     "The startup was early-stage (pre-seed) with an active product and strong traction, but no massive revenue metrics yet.",
    "outcomes.c1_solution":    "We proved his critical role through past technical milestones and packaged expert letters from prominent US venture partners.",
    "outcomes.c2_badge":       "EB-1A · Green Card Granted",
    "outcomes.c2_title":       "Senior Infra Engineer",
    "outcomes.c2_problem":     "The engineer had zero academic citations and no PhD — just a highly successful commercial career in Big Tech.",
    "outcomes.c2_solution":    "We documented high salary benchmarks, leading roles in core infrastructure deployment, and industry media mentions to establish federal merit.",

    "faq.label": "FAQ",
    "faq.title": "Common questions",
    "faq.q1": "Do I actually qualify?",
    "faq.a1": "Probably. Most people who come to us thinking they don't qualify, do. You need 3 of 8 criteria — and most professionals with real accomplishments clear that bar easily. The free call exists exactly for this.",
    "faq.q2": "What does the fee cover?",
    "faq.a2": "Everything. Strategy, petition writing, all forms, support letters, exhibit packages, and RFE responses from first call through approval. Government filing fees are separate and vary by visa type.",
    "faq.q3": "Can you guarantee approval?",
    "faq.a3": "No one can — USCIS makes the final call. What we can tell you is that we only take cases we believe in, and we build the strongest possible petition for every one of them.",
    "faq.q4": "How long does the process take?",
    "faq.a4": "Standard timeline is 2–6 months total. With USCIS premium processing (an additional $2,805 government fee), the review takes 15 business days.",
    "faq.q5": "Do I need an employer to sponsor me?",
    "faq.a5": "For O-1A and O-1B — no traditional employer sponsor needed. You need a U.S. petitioner, which can be an agent or a company. For EB-1A — no sponsor required at all.",
    "faq.q6": "What's the difference between O-1A and EB-1A?",
    "faq.a6": "O-1A is a temporary work visa — typically 3 years, extendable. EB-1A is a green card — permanent residency. Same criteria, different outcome. Many clients do O-1A first, then EB-1A.",
    "faq.q7": "What if I get an RFE?",
    "faq.a7": "We handle it. RFE responses are included in the flat fee — no extra charge, no surprises.",

    "contact.title":    "Find out if you qualify",
    "contact.subtitle": "Free 30-minute call. We'll tell you honestly whether you have a case — no pitch, no pressure.",
    "contact.cta":      "Book a free call",

    "footer.tagline": "You're already extraordinary. Let us prove it.",
    "footer.process": "Process",
    "footer.services":"Visas",
    "footer.pricing": "Pricing",
    "footer.contact": "Contact",
    "footer.legal":   "© 2026 Apex. All rights reserved.",
  },
};


// ─── LANGUAGE (EN only) ─────────────────────────────────────
function setLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (i18n.en[key] !== undefined) el.textContent = i18n.en[key];
  });
}

setLanguage('en');

// ─── STABLE HERO HEIGHT: lock 100vh to the viewport height measured once at
//     load, so the hero doesn't resize (and the bottom-anchored illustration
//     doesn't jump) as the browser's address bar shows/hides during scroll. ──
(function () {
  function setHeroVH() {
    document.documentElement.style.setProperty('--hero-vh', window.innerHeight + 'px');
  }
  setHeroVH();
  window.addEventListener('orientationchange', () => setTimeout(setHeroVH, 100));
})();

// ─── NAV SCROLL ─────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ─── MOBILE MENU ────────────────────────────────────────────
const menuBtn    = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

function toggleMenu(open) {
  menuOpen = open;
  mobileMenu.classList.toggle('open', open);
  const [s1, s2, s3] = menuBtn.querySelectorAll('span');
  if (open) {
    s1.style.transform = 'translateY(7px) rotate(45deg)';
    s2.style.opacity   = '0';
    s3.style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    s1.style.transform = s3.style.transform = '';
    s2.style.opacity = '';
  }
}

menuBtn.addEventListener('click', () => toggleMenu(!menuOpen));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

// ─── PHASE BLOCK ANIMATIONS (index.html #features, 6 phases, loop while in view) ──
(function () {
  const phaseBlocks = document.querySelectorAll('.phase-block');
  if (!phaseBlocks.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const T = 1.6; // global pacing multiplier — slows every step/cycle uniformly

  // snapshot each block's original DOM text so every loop can reset to a clean "before" state
  document.querySelectorAll('.mock-panel__label[data-scene-text]').forEach(el => {
    el.dataset.loadingText = el.textContent;
  });
  document.querySelectorAll('.mock-badge.mock-badge--pending').forEach(el => {
    el.dataset.pendingText = el.textContent;
  });

  function track(block, id) {
    (block._timeouts || (block._timeouts = [])).push(id);
  }
  function clearTracked(block) {
    (block._timeouts || []).forEach(clearTimeout);
    block._timeouts = [];
  }

  function animateCount(block, el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = target + suffix; return; }
    const duration = 900 * T;
    const start = performance.now();
    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (t < 1) track(block, requestAnimationFrame(tick));
    }
    track(block, requestAnimationFrame(tick));
  }

  function crossfadeText(block, el, newText, holdMs) {
    if (reduceMotion) { el.textContent = newText; return; }
    el.style.opacity = 0;
    track(block, setTimeout(() => {
      el.textContent = newText;
      el.style.opacity = 1;
    }, (holdMs || 200) * T));
  }

  function animateBar(block, fillEl, numEl) {
    const start = parseFloat(fillEl.dataset.start);
    const target = parseFloat(fillEl.dataset.targetW);
    if (reduceMotion) {
      fillEl.style.setProperty('--w', target + '%');
      if (numEl) numEl.textContent = target + '%';
      return;
    }
    fillEl.style.setProperty('--w', target + '%');
    const duration = 1000 * T;
    const t0 = performance.now();
    function tick(now) {
      const t = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      if (numEl) numEl.textContent = Math.round(start + (target - start) * eased) + '%';
      if (t < 1) track(block, requestAnimationFrame(tick));
    }
    track(block, requestAnimationFrame(tick));
  }

  // ── Phase 1 — Visa Path Finder: one scene, options considered one by
  // one → settle on A with checkmark + "Best match" tag, B/C dimmed
  function resetPhase1(block) {
    block.querySelectorAll('.mock-geo__node').forEach(n => {
      n.classList.remove('mock-geo__node--active', 'mock-geo__node--dim', 'mock-geo__node--considering');
    });
  }
  function runPhase1(block) {
    const nodes = Array.from(block.querySelectorAll('.mock-geo__node'));

    // sequentially "consider" each node before deciding
    const considerOrder = nodes; // A, B, C in DOM order
    const CONSIDER_START = 400;
    const CONSIDER_STEP = 500;
    considerOrder.forEach((node, i) => {
      const delay = (CONSIDER_START + i * CONSIDER_STEP) * T;
      track(block, setTimeout(() => {
        considerOrder.forEach(n => n.classList.remove('mock-geo__node--considering'));
        node.classList.add('mock-geo__node--considering');
      }, delay));
    });

    track(block, setTimeout(() => {
      const active = block.querySelector('[data-option="A"]');
      const dims = block.querySelectorAll('[data-option="B"], [data-option="C"]');
      nodes.forEach(n => n.classList.remove('mock-geo__node--considering'));
      active.classList.add('mock-geo__node--active');
      dims.forEach(n => n.classList.add('mock-geo__node--dim'));
    }, (CONSIDER_START + considerOrder.length * CONSIDER_STEP + 150) * T));
  }

  // ── Phase 2a/2b — doc rows: pending/queued → done one at a time, one stays "in progress"
  function resetPhase2(block) {
    block.querySelectorAll('.mock-badge').forEach(badge => {
      badge.classList.remove('is-swapping', 'is-inprogress');
      if (badge.dataset.pendingText) {
        badge.textContent = badge.dataset.pendingText;
        badge.classList.add('mock-badge--pending');
      } else if (badge.dataset.target) {
        badge.textContent = '0' + (badge.dataset.suffix || '');
      }
    });
  }
  function runPhase2(block) {
    const rows = block.querySelectorAll('.mock-doc-row');
    rows.forEach((row, i) => {
      const badge = row.querySelector('.mock-badge');
      if (!badge) return;
      const delay = (550 + i * 420) * T;
      if (badge.dataset.doneText) {
        track(block, setTimeout(() => {
          badge.classList.add('is-swapping');
          track(block, setTimeout(() => {
            badge.textContent = badge.dataset.doneText;
            badge.classList.remove('mock-badge--pending', 'is-swapping');
          }, 180 * T));
        }, delay));
      } else if (badge.dataset.progressText) {
        track(block, setTimeout(() => {
          badge.classList.add('is-swapping');
          track(block, setTimeout(() => {
            badge.textContent = badge.dataset.progressText;
            badge.classList.remove('mock-badge--pending', 'is-swapping');
            badge.classList.add('is-inprogress');
          }, 180 * T));
        }, delay));
      } else if (badge.dataset.target) {
        track(block, setTimeout(() => animateCount(block, badge), delay));
      }
    });
  }

  // ── Phase 3a — bars rise from today's baseline to the scored value
  function resetPhase3(block) {
    block.querySelectorAll('.mock-bar-row').forEach(row => {
      const fill = row.querySelector('.mock-bar-fill');
      const num = row.querySelector('span[data-target]');
      fill.style.setProperty('--w', fill.dataset.start + '%');
      if (num) num.textContent = num.dataset.start + '%';
    });
  }
  function runPhase3(block) {
    block.querySelectorAll('.mock-bar-row').forEach((row, i) => {
      const fill = row.querySelector('.mock-bar-fill');
      const num = row.querySelector('span[data-target]');
      track(block, setTimeout(() => animateBar(block, fill, num), (500 + i * 220) * T));
    });
  }

  // ── Phase 4 — spotlight scans across tiles, settles on the selected one, which starts "playing"
  function resetPhase4(block) {
    block.querySelectorAll('.mock-video-tile').forEach(t => t.classList.remove('is-spotlit', 'is-playing'));
  }
  function runPhase4(block) {
    const tiles = Array.from(block.querySelectorAll('.mock-video-tile'));
    tiles.forEach((tile, i) => {
      track(block, setTimeout(() => {
        tiles.forEach(t => t.classList.remove('is-spotlit'));
        tile.classList.add('is-spotlit');
      }, (500 + i * 180) * T));
    });
    const selected = block.querySelector('.mock-video-tile[data-selected]');
    track(block, setTimeout(() => {
      tiles.forEach(t => t.classList.remove('is-spotlit'));
      if (selected) selected.classList.add('is-spotlit', 'is-playing');
    }, (500 + tiles.length * 180 + 100) * T));
  }

  // ── Phase 5 — checklist: pending dash → checked, one row at a time; last stays pending, pulsing
  function resetPhase5(block) {
    block.querySelectorAll('.mock-check').forEach(check => {
      check.classList.remove('is-checking', 'is-active-pulse');
      check.classList.add('mock-check--pending');
    });
  }
  function runPhase5(block) {
    const rows = block.querySelectorAll('.mock-check-row');
    rows.forEach((row, i) => {
      const check = row.querySelector('.mock-check');
      const isLast = i === rows.length - 1;
      const delay = (500 + i * 380) * T;
      if (isLast) {
        track(block, setTimeout(() => check.classList.add('is-active-pulse'), delay));
        return;
      }
      track(block, setTimeout(() => {
        check.classList.add('is-checking');
        track(block, setTimeout(() => {
          check.classList.remove('mock-check--pending', 'is-checking');
        }, 160 * T));
      }, delay));
    });
  }

  const phases = {
    '1':  { reset: resetPhase1, run: runPhase1, cycle: 2600 * T },
    '2a': { reset: resetPhase2, run: runPhase2, cycle: 2600 * T },
    '3a': { reset: resetPhase3, run: runPhase3, cycle: 3200 * T },
    '4':  { reset: resetPhase4, run: runPhase4, cycle: 4800 * T },
    '5':  { reset: resetPhase5, run: runPhase5, cycle: 3000 * T },
  };

  function startLoop(block, phase) {
    if (block._interval) return; // already looping
    function cycle() {
      clearTracked(block);
      phase.reset(block);
      track(block, setTimeout(() => phase.run(block), 60));
    }
    cycle();
    block._interval = setInterval(cycle, phase.cycle);
  }

  function stopLoop(block) {
    clearInterval(block._interval);
    block._interval = null;
    clearTracked(block);
  }

  const phaseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const block = entry.target;
      const phase = phases[block.dataset.phase];
      if (!phase) return;
      if (entry.isIntersecting) {
        block.classList.add('is-inview');
        startLoop(block, phase);
      } else {
        block.classList.remove('is-inview');
        stopLoop(block);
        phase.reset(block);
      }
    });
  }, { threshold: 0.35 });

  phaseBlocks.forEach(block => phaseObserver.observe(block));
})();

// ─── FAQ ACCORDION ──────────────────────────────────────────
document.querySelectorAll('.faq__q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq__item.open').forEach(el => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ─── VISA TABS ───────────────────────────────────────────────
document.querySelectorAll('.visa-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    document.querySelectorAll('.visa-tab').forEach(t => t.classList.toggle('active', t === tab));
    document.querySelectorAll('.visa-panel').forEach(p => p.classList.toggle('active', p.id === `panel-${target}`));
  });
});

// ─── HERO ILLUSTRATION (static, no hover interaction) ────────
(function () {
  const bridgeEl = document.getElementById('heroBridge');
  if (!bridgeEl) return;

  fetch((bridgeEl.dataset.src || 'images/hero-bridge-dots.svg') + '?v=16')
    .then(r => r.text())
    .then(svgText => { bridgeEl.innerHTML = svgText; });
})();

// ─── STEPS TIMELINE: turn vertical mouse-wheel scrolling into horizontal scroll ──
document.querySelectorAll('.steps-scroll').forEach(el => {
  el.addEventListener('wheel', e => {
    if (el.scrollWidth <= el.clientWidth + 2) return; // nothing to scroll, don't touch the page scroll
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    const atStart = el.scrollLeft <= 0 && e.deltaY < 0;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1 && e.deltaY > 0;
    if (atStart || atEnd) return;
    e.preventDefault();
    el.scrollLeft += e.deltaY;
  }, { passive: false });
});

// ─── MOBILE CARD GRIDS: when a grid collapses to a single column, replace the
//     (now-hidden) vertical dividers with horizontal ones between stacked cards —
//     same divider, rotated 90° to match the new stacking direction. ──
(function () {
  const GRID_SELECTOR = '.who-cards, .pricing-cards, .features-row, .platform-why, #articles .res-grid, .team-grid, .principle-grid--four, .principle-grid--three';
  const CARD_SELECTOR = '.who-card, .pricing-card, .feature-card, .platform-why__item, .res-item, .company-card';

  function updateStackedDividers() {
    document.querySelectorAll('.stacked-hdivider').forEach(el => el.remove());

    document.querySelectorAll(GRID_SELECTOR).forEach(grid => {
      const cards = Array.from(grid.children).filter(el =>
        el.matches(CARD_SELECTOR) && getComputedStyle(el).display !== 'none'
      );
      if (cards.length < 2) return;

      // single column only: every card's row (by top position) must be unique
      const tops = cards.map(c => Math.round(c.getBoundingClientRect().top));
      const isSingleColumn = new Set(tops).size === cards.length;
      if (!isSingleColumn) return;

      // anchor to the enclosing <section> (full page width), not the grid
      // itself (clipped inside .container) — so left:0/right:0 reaches the
      // true page frame lines, same as every other horizontal divider.
      const section = grid.closest('section');
      if (!section) return;
      if (getComputedStyle(section).position === 'static') section.style.position = 'relative';
      const sectionTop = section.getBoundingClientRect().top;

      const dividerColor = section.classList.contains('section--dark') ? 'rgba(255,255,255,.12)' : 'var(--gray-2)';

      for (let i = 0; i < cards.length - 1; i++) {
        const a = cards[i].getBoundingClientRect();
        const b = cards[i + 1].getBoundingClientRect();
        const mid = (a.bottom + b.top) / 2 - sectionTop;
        const div = document.createElement('div');
        div.className = 'stacked-hdivider';
        div.style.cssText = `position:absolute;left:0;right:0;top:${mid}px;height:1px;background:${dividerColor};pointer-events:none;z-index:2;`;
        section.appendChild(div);
      }
    });
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateStackedDividers, 100);
  });
  window.addEventListener('load', updateStackedDividers);
  document.addEventListener('DOMContentLoaded', updateStackedDividers);
})();
