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

// ─── SCROLL ANIMATIONS ──────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

document.querySelectorAll('.card, .process-step, .criterion, .testimonial, .pricing-card').forEach((el, i) => {
  el.classList.add('fade-up');
  el.style.transitionDelay = `${(i % 4) * 0.07}s`;
  observer.observe(el);
});

document.querySelectorAll('.section__header, .hero__stats, .criteria__cta').forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

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
