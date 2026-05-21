# French Tutor Platform — Design Spec
**Date:** 2026-05-22
**Builder:** Sarthak Dobriyal
**Status:** Approved, ready for implementation planning

---

## 1. Problem & Users

### Primary Users
- **Immigration exam preppers** — people preparing for TCF/TEF Canada (Canada PR route). Self-learners with some French background who need structured practice, especially speaking.
- **Advanced learners** — French language students (BA/Masters level) wanting to improve speaking fluency, sentence formation, and pass exams like DELF/DALF.

### The Gap
Duolingo is gamified and casual — it does not prepare users for structured language exams. IELTS/TOEFL have dozens of quality AI-powered prep tools. French exam prep has almost nothing serious. Low competition, high intent users.

---

## 2. Product Overview

An AI-powered French learning platform focused on:
- **Speaking practice** (core differentiator) — conversation mode + exam simulation mode
- **Grammar exercises** — tenses, active/passive voice, sentence formation
- **Exam prep** — DELF/DALF and TCF/TEF Canada format mock tests
- **CEFR levels** — A1, A2, B1, B2, C1, C2 with level assessment quiz
- **SEO blog** — content targeting exam prep keywords for organic growth

Not a Duolingo clone. Serious tool for serious learners.

---

## 3. Tech Stack

| Layer | Tool | Notes |
|---|---|---|
| Framework | Next.js 15 (App Router) | Latest version, Server Components, Server Actions |
| UI | Shadcn/ui + Tailwind CSS | Clean, professional, fast to build |
| Database | MongoDB Atlas | Free M0 tier, never pauses, flexible schema |
| ORM | Mongoose | Schema validation on top of MongoDB |
| Auth | NextAuth.js v5 | Email + Google login, MongoDB adapter |
| AI (free users) | Google Gemini Flash | Generous free tier |
| AI (paid users) | Claude Sonnet (Anthropic) | Best language feedback quality |
| Speech (free) | Web Speech API | Browser native, zero cost |
| Speech (paid) | OpenAI Whisper API | High accuracy transcription |
| Payments | Razorpay | India-first, supports UPI |
| Analytics | GA4 + Microsoft Clarity | Free, tracks all users including anonymous |
| SEO | Next.js Metadata API + next-sitemap + JSON-LD | Built into Next.js 15 |
| Blog | MDX + static generation | Statically generated, fast, SEO-friendly |
| OG Images | @vercel/og | Dynamic social preview images per page |
| Deploy | Vercel | Zero-config, free tier |
| Search monitoring | Google Search Console | Free, essential for SEO |

---

## 4. Features

### Public (no login required)
- Landing page — hero, features, testimonials, CTA
- Level selector — pick A1 through C2 with descriptions
- Free preview — 3 grammar exercises + 1 speaking attempt before login prompt
- Blog — MDX-powered posts targeting exam prep keywords
- French level test — shareable result card (viral growth feature)

### Free Tier (after login)
- Dashboard — progress, streak, current level
- Grammar exercises — 10/day (fill-in-blank, MCQ, sentence correction, AI-generated)
- Speaking — conversation mode 3 sessions/day (Gemini Flash + Web Speech API)
- Speaking — test mode 1/day with AI scoring
- Level assessment quiz
- Progress tracker — scores over time

### Paid Tier
- Unlimited grammar exercises
- Unlimited speaking sessions (Claude Sonnet quality)
- High-accuracy speech via Whisper API
- Mock exam mode — full DELF/DALF or TCF format, timed
- Detailed AI feedback
- Downloadable progress PDF reports

### Admin (later phase)
- User analytics dashboard
- Content management for exercises
- Revenue and subscription data
- Blog post management

---

## 5. User Flow

### Try-Before-Login (critical for conversion)
1. User lands → picks level → starts exercises immediately (zero friction)
2. After 3 exercises → soft prompt: *"Save your progress — create a free account"* (dismissible)
3. 2 more exercises → hard gate: *"Sign up to continue — it's free"*
4. Anonymous session data transfers to account on signup

### Speaking Flow
- **Conversation mode:** AI gives French prompt/scenario → user speaks (Web Speech API records) → transcript sent to AI → AI replies in French + shows corrections inline
- **Test mode:** Timed prompt → user speaks → AI scores pronunciation, fluency, grammar, vocabulary on 1-10 scale with detailed feedback

### AI Provider Abstraction
Single interface in `/lib/ai/` that routes based on user plan:
```
free user  → Gemini Flash
paid user  → Claude Sonnet
```
Same response format regardless. UI never knows which model ran.

---

## 6. Data Models

### User
```
{
  email, name, image,
  level: 'A1'|'A2'|'B1'|'B2'|'C1'|'C2',
  plan: 'free'|'paid',
  planExpiresAt: Date,
  dailyExerciseCount: number,
  dailySpeakingCount: number,
  streak: number,
  lastActiveDate: Date,
  totalPoints: number,
  referralCode: string,
  referredBy: string
}
```

### Exercise
```
{
  level: CEFR level,
  type: 'grammar'|'vocabulary'|'sentence'|'tense'|'active-passive',
  question: string,
  options: string[],
  correctAnswer: string,
  explanation: string,
  source: 'ai_generated'|'past_paper',
  tags: string[]
}
```

### SpeakingSession
```
{
  userId,
  type: 'conversation'|'test',
  level: CEFR level,
  transcript: [{ role: 'ai'|'user', text, corrections }],
  scores: { pronunciation, fluency, grammar, vocabulary }, // 1-10
  aiFeedback: string,
  duration: number,
  createdAt: Date
}
```

### Progress
```
{
  userId,
  exerciseId,
  score: number,
  isCorrect: boolean,
  timeSpent: number,
  completedAt: Date
}
```

---

## 7. SEO Strategy

### Technical SEO (Day 1)
- Next.js Metadata API for all pages — title, description, OG tags, Twitter cards
- JSON-LD schemas: `Course`, `WebSite`, `Article` (blog), `FAQPage`
- Sitemap via `next-sitemap` — auto-generated on build
- `robots.txt` — allow all, block `/api/`, `/dashboard/`
- `next/image` for all images — LCP optimization
- Server Components by default — no client-side fetch on public pages
- Target LCP < 2.5s, INP < 200ms from day 1

### Content Strategy
Blog posts targeting low-competition, high-intent keywords:
- "how to prepare for TCF Canada from scratch"
- "DELF B2 grammar exercises free"
- "French speaking practice online free"
- "TCF vs DELF which is easier for Canada PR"
- "A2 French grammar exercises with answers"

### OG Images
Dynamic per-page OG images via `@vercel/og` — improves CTR on social shares significantly.

---

## 8. Analytics Setup

- **GA4** — page views, events, user properties (plan type, level), conversion funnels
- **Microsoft Clarity** — session recordings, heatmaps, click maps (free, no limits)
- **Google Search Console** — keyword rankings, indexing status, Core Web Vitals
- Track: anonymous users, signup conversion rate, free→paid conversion, daily active users

---

## 9. Growth Features (Built Into Product)

- **Shareable level test result** — *"I'm B2 in French — test yourself!"* card image
- **Streak sharing** — *"30-day French streak"* shareable card
- **Referral system** — invite friend, both get 7 days premium free
- **Email capture before hard gate** — *"Get your free study plan"* before forcing signup

---

## 10. Growth Channels (External)

Priority order:
1. Reddit — r/learnfrench, r/ImmigrationCanada, r/DELF
2. Facebook/WhatsApp — Indian Canada PR groups (huge, active)
3. SEO blog — compounds over 3-6 months
4. Quora — answer TCF/TEF prep questions, rank on Google
5. YouTube shorts — French exam tips, link to app
6. Product Hunt — launch for initial spike
7. Build in public on Twitter/X

---

## 11. Monetization

- **Free tier** — limited daily usage (10 exercises, 3 speaking sessions)
- **Paid tier** — ₹499-999/month (to be finalized), unlimited + premium AI
- **Razorpay** — payments, subscriptions, UPI support
- AI cost scales with revenue: free users on Gemini Flash (near zero cost), paid users on Claude Sonnet

---

## 12. MVP Scope (Phase 1)

Build in this order:
1. Project setup (Next.js 15, MongoDB, NextAuth, Shadcn)
2. Landing page + SEO foundation (metadata, sitemap, JSON-LD)
3. Level selector + assessment quiz
4. Grammar exercises (AI-generated, 5 types)
5. Try-before-login flow + auth
6. Speaking — conversation mode
7. Speaking — test mode with scoring
8. Dashboard + progress tracking
9. Freemium gating + Razorpay integration
10. Blog (MDX) + first 5 posts
11. GA4 + Clarity + Search Console setup
12. Referral system + shareable cards

Admin panel and mock exam mode come after MVP validation.
