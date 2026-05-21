# Voix — Project Context (Always Read This First)
**Product Name: Voix** (French for "voice", pronounced "vwa") — AI-powered French learning platform

> This file is the single source of truth for project state. Read before every task.

---

## Who Is Building This
**Sarthak Dobriyal** — Next.js/React fullstack developer, Dehradun India. B.Tech CS 2023.
Building this as: (1) a real product for actual users, (2) a portfolio showcase for remote job applications.

## What We're Building
An AI-powered French learning platform for serious learners — people preparing for TCF/TEF Canada (immigration), DELF/DALF exams, and French language students wanting speaking + grammar improvement. NOT a Duolingo clone.

## Real Users (Day 1)
- Sarthak's girlfriend — preparing for TCF Canada PR, self-learner, needs speaking + grammar
- Sarthak's friend — BA+Masters in French, wants speaking fluency + exam prep

## Tech Stack
- **Next.js 15** (App Router, Server Components, Server Actions)
- **MongoDB Atlas** (free M0 tier, Mongoose)
- **NextAuth.js v5** (email + Google, MongoDB adapter)
- **Shadcn/ui + Tailwind CSS**
- **Gemini Flash** (free user AI) → **Claude Sonnet** (paid user AI)
- **Web Speech API** (free) → **Whisper API** (paid)
- **Razorpay** (payments, India-first)
- **GA4 + Microsoft Clarity** (analytics)
- **next-sitemap + JSON-LD** (SEO)
- **MDX** (blog)
- **Vercel** (deploy)

## Business Model
Freemium — free tier with daily limits (10 exercises, 3 speaking sessions), paid tier unlocks unlimited + Claude Sonnet quality + Whisper speech. Razorpay for payments.

## Critical UX Decision
**Try-before-login:** Users start exercises immediately with no account. Soft prompt at 3 exercises, hard gate at 5. Anonymous session transfers to account on signup. This is non-negotiable for conversion.

## Key Features (MVP Order)
1. Project setup
2. Landing page + SEO foundation
3. Level selector (A1-C2) + assessment quiz
4. Grammar exercises (AI-generated)
5. Try-before-login + auth
6. Speaking — conversation mode
7. Speaking — test mode with scoring
8. Dashboard + progress tracking
9. Freemium gating + Razorpay
10. Blog (MDX) + first 5 posts
11. Analytics (GA4 + Clarity + Search Console)
12. Referral system + shareable cards

## Current Phase
**PLANNING COMPLETE** — Design spec written. Next: implementation plan via writing-plans skill.

## Design Spec Location
`docs/superpowers/specs/2026-05-22-french-tutor-design.md`

## Progress Log
- [2026-05-22] Brainstorming complete, full design spec written and approved
- [2026-05-22] Implementation planning — IN PROGRESS

## Decisions Made (Don't Revisit)
- **Product name: Voix** — French for "voice", no accents, 4 letters, domain: voix.app / getvoix.com
- MongoDB over Supabase (never pauses, Sarthak familiar)
- NextAuth.js over Clerk (free, portfolio value, full control)
- Razorpay over Stripe (India-first)
- Gemini Flash for free tier (not OpenAI — cost)
- Next.js 15 App Router (not Pages Router)
- Shadcn/ui + Tailwind (confirmed)
- Mobile-first, minimal design — bottom nav on mobile, single column, large tap targets
- No AI fine-tuning — use RAG + system prompts with French grammar references instead
- Real images from Unsplash/Pexels — no AI-generated images
- Exercise quality reviewed by girlfriend (TCF prep) + friend (Masters in French)
- Analytics: GA4 + Microsoft Clarity + Google Search Console (all free)

## SEO Goals
- LCP < 2.5s, INP < 200ms from day 1
- Meta tags, OG tags, JSON-LD on every page
- Blog targeting: "TCF Canada prep", "DELF B2 exercises", "French speaking practice online"
- Google Search Console set up before first user arrives
