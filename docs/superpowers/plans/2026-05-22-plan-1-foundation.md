# Voix — Plan 1: Foundation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bootstrap the Voix Next.js 15 project with MongoDB, NextAuth, Shadcn/ui, a production-ready landing page, full SEO foundation, and deploy to Vercel.

**Architecture:** Single Next.js 15 App Router monorepo. Route groups separate marketing pages `(marketing)` from the authenticated app `(app)`. MongoDB Atlas for data, NextAuth v5 for auth, Shadcn/ui for components. All public pages are Server Components with static metadata for SEO.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, Shadcn/ui, MongoDB Atlas, Mongoose, NextAuth v5 (@auth/mongodb-adapter), next-sitemap, Vitest, @testing-library/react

---

## File Map

```
french-tutor/                        ← project root (existing folder)
├── app/
│   ├── layout.tsx                   # Root layout — fonts, GA4 script, global metadata
│   ├── globals.css                  # Tailwind base + CSS variables for Shadcn
│   ├── (marketing)/
│   │   ├── layout.tsx               # Marketing layout — Header + Footer
│   │   └── page.tsx                 # Landing page — composes Hero, Features, Levels, CTA
│   └── (app)/
│       └── layout.tsx               # App shell layout (auth-aware, added in Plan 2)
├── components/
│   ├── ui/                          # Shadcn auto-generated components (Button, Card, etc.)
│   ├── layout/
│   │   ├── header.tsx               # Top nav — logo, nav links, sign in button
│   │   ├── footer.tsx               # Footer — links, copyright
│   │   └── mobile-nav.tsx           # Bottom navigation bar for mobile
│   └── landing/
│       ├── hero.tsx                 # Hero section — headline, subheadline, CTA button
│       ├── features.tsx             # 3-feature grid — speaking, grammar, exam prep
│       ├── levels-preview.tsx       # A1–C2 level cards with descriptions
│       └── cta.tsx                  # Bottom CTA — "Start learning free"
├── lib/
│   ├── db.ts                        # Mongoose connection with global caching
│   ├── mongodb-client.ts            # Native MongoClient for NextAuth adapter
│   └── utils.ts                     # Shadcn cn() helper (auto-generated)
├── models/
│   └── user.ts                      # Mongoose User model + IUser interface
├── auth.ts                          # NextAuth v5 config — providers, callbacks, adapter
├── middleware.ts                    # NextAuth middleware — protects /app/* routes
├── app/api/auth/[...nextauth]/
│   └── route.ts                     # NextAuth route handler
├── vitest.config.ts                 # Vitest config
├── vitest.setup.ts                  # Testing library setup
├── __tests__/
│   ├── lib/db.test.ts               # DB connection tests
│   └── models/user.test.ts          # User model tests
├── next.config.ts                   # Next.js config
├── next-sitemap.config.js           # Sitemap config — generates sitemap.xml + robots.txt
├── public/
│   └── robots.txt                   # Fallback robots (overridden by next-sitemap)
└── .env.local                       # Environment variables (never commit)
```

---

## Task 1: Initialize Next.js 15 Project

**Files:**
- Create: all project root files via CLI

- [ ] **Step 1: Initialize Next.js 15 inside the french-tutor folder**

Open terminal in `C:\Users\dobri\OneDrive\Desktop\newProject\french-tutor` and run:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```

When prompted about existing files, choose to continue. This installs into the current folder.

- [ ] **Step 2: Install Shadcn/ui**

```bash
npx shadcn@latest init
```

When prompted:
- Style: **Default**
- Base color: **Slate**
- CSS variables: **Yes**

- [ ] **Step 3: Add core Shadcn components**

```bash
npx shadcn@latest add button card badge separator sheet
```

- [ ] **Step 4: Install project dependencies**

```bash
npm install mongoose next-auth@beta @auth/mongodb-adapter mongodb
npm install next-sitemap
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 5: Verify dev server starts**

```bash
npm run dev
```

Expected: Server running at `http://localhost:3000` with default Next.js page. No errors in terminal.

- [ ] **Step 6: Commit**

```bash
git init
git add .
git commit -m "feat: initialize Next.js 15 project with Shadcn and dependencies"
```

---

## Task 2: Configure Vitest

**Files:**
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Modify: `package.json` (add test scripts)

- [ ] **Step 1: Create vitest config**

Create `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
```

- [ ] **Step 2: Create vitest setup file**

Create `vitest.setup.ts`:

```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 3: Add test scripts to package.json**

Open `package.json` and add to the `scripts` section:

```json
"test": "vitest",
"test:run": "vitest run",
"test:ui": "vitest --ui"
```

- [ ] **Step 4: Run tests to confirm setup works**

```bash
npm run test:run
```

Expected: `No test files found` — that's fine, no tests written yet.

- [ ] **Step 5: Commit**

```bash
git add vitest.config.ts vitest.setup.ts package.json
git commit -m "feat: configure vitest for testing"
```

---

## Task 3: MongoDB Connection + User Model

**Files:**
- Create: `lib/db.ts`
- Create: `lib/mongodb-client.ts`
- Create: `models/user.ts`
- Create: `__tests__/models/user.test.ts`
- Create: `.env.local`

- [ ] **Step 1: Create .env.local**

Create `.env.local` at the project root (never commit this file):

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/voix?retryWrites=true&w=majority
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
GOOGLE_CLIENT_ID=<from Google Cloud Console>
GOOGLE_CLIENT_SECRET=<from Google Cloud Console>
```

Add `.env.local` to `.gitignore` (it should already be there from Next.js init, verify it is).

- [ ] **Step 2: Create Mongoose connection**

Create `lib/db.ts`:

```typescript
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not defined')
}

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongooseCache: MongooseCache
}

const cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null }
global.mongooseCache = cached

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}
```

- [ ] **Step 3: Create native MongoClient for NextAuth adapter**

Create `lib/mongodb-client.ts`:

```typescript
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI!

if (!uri) {
  throw new Error('MONGODB_URI environment variable is not defined')
}

declare global {
  var _mongoClientPromise: Promise<MongoClient>
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

export default clientPromise
```

- [ ] **Step 4: Write failing User model test**

Create `__tests__/models/user.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { User } from '@/models/user'

describe('User model', () => {
  it('has correct default values', () => {
    const user = new User({ email: 'test@test.com' })
    expect(user.level).toBe('A1')
    expect(user.plan).toBe('free')
    expect(user.streak).toBe(0)
    expect(user.totalPoints).toBe(0)
    expect(user.dailyExerciseCount).toBe(0)
    expect(user.dailySpeakingCount).toBe(0)
  })

  it('rejects invalid CEFR level', () => {
    const user = new User({ email: 'test@test.com', level: 'D1' })
    const error = user.validateSync()
    expect(error?.errors.level).toBeDefined()
  })

  it('rejects invalid plan type', () => {
    const user = new User({ email: 'test@test.com', plan: 'enterprise' })
    const error = user.validateSync()
    expect(error?.errors.plan).toBeDefined()
  })

  it('requires email', () => {
    const user = new User({})
    const error = user.validateSync()
    expect(error?.errors.email).toBeDefined()
  })
})
```

- [ ] **Step 5: Run test to confirm it fails**

```bash
npm run test:run
```

Expected: FAIL — `Cannot find module '@/models/user'`

- [ ] **Step 6: Create User model**

Create `models/user.ts`:

```typescript
import mongoose, { Schema, Document, Model } from 'mongoose'

export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
export type UserPlan = 'free' | 'paid'

export interface IUser extends Document {
  email: string
  name?: string
  image?: string
  level: CefrLevel
  plan: UserPlan
  planExpiresAt?: Date
  dailyExerciseCount: number
  dailySpeakingCount: number
  lastActiveDate?: Date
  streak: number
  totalPoints: number
  referralCode?: string
  referredBy?: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, trim: true },
    image: String,
    level: {
      type: String,
      enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as CefrLevel[],
      default: 'A1',
    },
    plan: {
      type: String,
      enum: ['free', 'paid'] as UserPlan[],
      default: 'free',
    },
    planExpiresAt: Date,
    dailyExerciseCount: { type: Number, default: 0, min: 0 },
    dailySpeakingCount: { type: Number, default: 0, min: 0 },
    lastActiveDate: Date,
    streak: { type: Number, default: 0, min: 0 },
    totalPoints: { type: Number, default: 0, min: 0 },
    referralCode: { type: String, unique: true, sparse: true },
    referredBy: String,
  },
  { timestamps: true }
)

export const User: Model<IUser> =
  mongoose.models.User ?? mongoose.model<IUser>('User', UserSchema)
```

- [ ] **Step 7: Run tests to confirm they pass**

```bash
npm run test:run
```

Expected: All 4 tests PASS.

- [ ] **Step 8: Commit**

```bash
git add lib/db.ts lib/mongodb-client.ts models/user.ts __tests__/models/user.test.ts .gitignore
git commit -m "feat: add MongoDB connection and User model with tests"
```

---

## Task 4: NextAuth v5 Setup

**Files:**
- Create: `auth.ts`
- Create: `middleware.ts`
- Create: `app/api/auth/[...nextauth]/route.ts`

- [ ] **Step 1: Create NextAuth config**

Create `auth.ts` at the project root:

```typescript
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from '@/lib/mongodb-client'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
})
```

- [ ] **Step 2: Create NextAuth route handler**

Create `app/api/auth/[...nextauth]/route.ts`:

```typescript
import { handlers } from '@/auth'

export const { GET, POST } = handlers
```

- [ ] **Step 3: Create middleware to protect app routes**

Create `middleware.ts` at the project root:

```typescript
import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isAppRoute = req.nextUrl.pathname.startsWith('/dashboard') ||
    req.nextUrl.pathname.startsWith('/exercises') ||
    req.nextUrl.pathname.startsWith('/speaking')

  if (isAppRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
```

- [ ] **Step 4: Extend NextAuth session types**

Create `types/next-auth.d.ts`:

```typescript
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
    } & DefaultSession['user']
  }
}
```

- [ ] **Step 5: Set up Google OAuth credentials**

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project called "Voix"
3. Go to APIs & Services → Credentials → Create OAuth 2.0 Client ID
4. Application type: Web application
5. Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret into `.env.local`
7. Generate NEXTAUTH_SECRET: run `openssl rand -base64 32` in terminal, paste into `.env.local`

- [ ] **Step 6: Verify auth works**

```bash
npm run dev
```

Navigate to `http://localhost:3000/api/auth/signin` — should show Google sign-in option. Click it, complete OAuth flow. Expected: redirects back, no errors.

- [ ] **Step 7: Commit**

```bash
git add auth.ts middleware.ts app/api/auth types/next-auth.d.ts
git commit -m "feat: configure NextAuth v5 with Google provider and MongoDB adapter"
```

---

## Task 5: Root Layout + Global Styles

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Update root layout**

Replace `app/layout.tsx` with:

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL('https://getvoix.com'),
  title: {
    default: 'Voix — Learn French Through Speaking',
    template: '%s | Voix',
  },
  description: 'AI-powered French learning platform focused on speaking practice. Prepare for TCF Canada, DELF, and DALF exams. Practice grammar, conversation, and mock tests.',
  keywords: ['learn French', 'TCF Canada', 'DELF preparation', 'French speaking practice', 'French grammar exercises'],
  authors: [{ name: 'Voix' }],
  creator: 'Voix',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://getvoix.com',
    siteName: 'Voix',
    title: 'Voix — Learn French Through Speaking',
    description: 'AI-powered French speaking practice. Prepare for TCF Canada, DELF, and DALF exams.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Voix — French Learning Platform' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Voix — Learn French Through Speaking',
    description: 'AI-powered French speaking practice for TCF, DELF, and DALF exams.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Add GA ID to .env.local**

Add to `.env.local`:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

(Leave as placeholder until GA4 is set up — it won't render if empty.)

- [ ] **Step 3: Update globals.css to keep Shadcn variables**

Verify `app/globals.css` has the Shadcn CSS variables (they should already be there from `shadcn init`). The file should start with `@tailwind base;` and include `:root` CSS custom properties. Do not modify it — just confirm it exists.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx app/globals.css
git commit -m "feat: configure root layout with global metadata and GA4"
```

---

## Task 6: Landing Page Components

**Files:**
- Create: `app/(marketing)/layout.tsx`
- Create: `app/(marketing)/page.tsx`
- Create: `components/layout/header.tsx`
- Create: `components/layout/footer.tsx`
- Create: `components/layout/mobile-nav.tsx`
- Create: `components/landing/hero.tsx`
- Create: `components/landing/features.tsx`
- Create: `components/landing/levels-preview.tsx`
- Create: `components/landing/cta.tsx`

- [ ] **Step 1: Create marketing layout**

Create `app/(marketing)/layout.tsx`:

```typescript
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Create Header**

Create `components/layout/header.tsx`:

```typescript
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight text-slate-900">Voix</span>
          <span className="hidden text-sm text-slate-500 sm:inline">French Learning</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <Link href="#features" className="hover:text-slate-900 transition-colors">Features</Link>
          <Link href="#levels" className="hover:text-slate-900 transition-colors">Levels</Link>
          <Link href="/blog" className="hover:text-slate-900 transition-colors">Blog</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/levels">Start free</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
```

- [ ] **Step 3: Create Hero section**

Create `components/landing/hero.tsx`:

```typescript
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20 text-center md:py-28">
      <Badge variant="secondary" className="mb-4 text-sm">
        Built for TCF Canada, DELF &amp; DALF
      </Badge>
      <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
        Learn French through{' '}
        <span className="text-blue-600">speaking</span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
        AI-powered practice for real French exams. Grammar exercises, speaking sessions,
        and mock tests tailored to your level — from A1 to C2.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button size="lg" asChild>
          <Link href="/levels">Start practising free →</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="#levels">See levels</Link>
        </Button>
      </div>
      <p className="mt-4 text-sm text-slate-500">No account needed to start. Try 5 exercises free.</p>
    </section>
  )
}
```

- [ ] **Step 4: Create Features section**

Create `components/landing/features.tsx`:

```typescript
const features = [
  {
    icon: '🎤',
    title: 'Speaking Practice',
    description: 'Speak with an AI tutor that corrects your pronunciation, grammar, and fluency in real time. Conversation mode and exam simulation both included.',
  },
  {
    icon: '📝',
    title: 'Grammar Exercises',
    description: 'Tenses, active/passive voice, sentence formation — everything tested in DELF and TCF, generated fresh by AI and matched to your CEFR level.',
  },
  {
    icon: '🎯',
    title: 'Exam Simulation',
    description: 'Full-length mock tests in DELF/DALF and TCF Canada format. Timed, scored, and reviewed by AI so you know exactly where to improve.',
  },
]

export default function Features() {
  return (
    <section id="features" className="bg-slate-50 py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-center text-3xl font-bold text-slate-900">
          Everything you need to pass
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-slate-600">
          Not a vocabulary app. Not a flashcard game. A serious tool for serious learners.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border bg-white p-6 shadow-sm">
              <span className="text-3xl">{f.icon}</span>
              <h3 className="mt-4 font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Create Levels Preview section**

Create `components/landing/levels-preview.tsx`:

```typescript
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

const levels = [
  { code: 'A1', label: 'Beginner', desc: 'Basic phrases and expressions. Introduce yourself, ask simple questions.' },
  { code: 'A2', label: 'Elementary', desc: 'Routine tasks and familiar topics. Short conversations about everyday life.' },
  { code: 'B1', label: 'Intermediate', desc: 'Handle most travel situations. Describe experiences, events, and dreams.' },
  { code: 'B2', label: 'Upper Intermediate', desc: 'Complex topics, spontaneous conversation with native speakers.' },
  { code: 'C1', label: 'Advanced', desc: 'Fluent, spontaneous expression. Flexible and effective use of language.' },
  { code: 'C2', label: 'Mastery', desc: 'Complete command of French. Understand virtually everything effortlessly.' },
]

export default function LevelsPreview() {
  return (
    <section id="levels" className="py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-center text-3xl font-bold text-slate-900">Choose your level</h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-slate-600">
          Not sure where you are? Take a 5-minute assessment quiz — free, no account needed.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {levels.map((level) => (
            <Link
              key={level.code}
              href={`/levels/${level.code.toLowerCase()}`}
              className="group rounded-xl border bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold text-blue-600">{level.code}</span>
                <Badge variant="secondary">{level.label}</Badge>
              </div>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{level.desc}</p>
              <span className="mt-4 inline-block text-sm font-medium text-blue-600 group-hover:underline">
                Start {level.code} exercises →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Create CTA section**

Create `components/landing/cta.tsx`:

```typescript
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function CTA() {
  return (
    <section className="bg-blue-600 py-16">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h2 className="text-3xl font-bold text-white">
          Start practising French today
        </h2>
        <p className="mt-4 text-blue-100">
          5 exercises free. No account needed. No credit card.
        </p>
        <Button size="lg" variant="secondary" className="mt-8" asChild>
          <Link href="/levels">Pick your level and start →</Link>
        </Button>
      </div>
    </section>
  )
}
```

- [ ] **Step 7: Create Footer**

Create `components/layout/footer.tsx`:

```typescript
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t bg-white py-10">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <span className="text-lg font-bold text-slate-900">Voix</span>
            <p className="mt-1 text-sm text-slate-500">AI-powered French learning</p>
          </div>
          <nav className="flex flex-wrap gap-6 text-sm text-slate-500">
            <Link href="/blog" className="hover:text-slate-900">Blog</Link>
            <Link href="/levels" className="hover:text-slate-900">Levels</Link>
            <Link href="/privacy" className="hover:text-slate-900">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-900">Terms</Link>
          </nav>
        </div>
        <p className="mt-8 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Voix. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 8: Create Mobile Nav**

Create `components/layout/mobile-nav.tsx`:

```typescript
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/levels', label: 'Levels', icon: '📚' },
  { href: '/exercises', label: 'Exercises', icon: '✏️' },
  { href: '/speaking', label: 'Speak', icon: '🎤' },
  { href: '/dashboard', label: 'Progress', icon: '📊' },
]

export default function MobileNav() {
  const pathname = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white px-2 pb-safe md:hidden">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 px-3 py-3 text-xs font-medium transition-colors ${
              pathname.startsWith(item.href) ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
```

- [ ] **Step 9: Compose landing page**

Replace `app/(marketing)/page.tsx` (or create it):

```typescript
import Hero from '@/components/landing/hero'
import Features from '@/components/landing/features'
import LevelsPreview from '@/components/landing/levels-preview'
import CTA from '@/components/landing/cta'

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <LevelsPreview />
      <CTA />
    </>
  )
}
```

- [ ] **Step 10: Move default Next.js page**

Delete `app/page.tsx` (the default one) since `app/(marketing)/page.tsx` now serves the root route.

- [ ] **Step 11: Check landing page in browser**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify:
- Header with Voix logo and navigation renders
- Hero section with headline and CTA buttons
- Features 3-card grid
- 6 level cards with links
- CTA section with blue background
- Footer

Check on mobile: open DevTools → toggle device toolbar → verify single column, readable text, no horizontal scroll.

- [ ] **Step 12: Commit**

```bash
git add app/ components/ 
git commit -m "feat: build landing page with hero, features, levels preview, and CTA"
```

---

## Task 7: SEO Foundation

**Files:**
- Create: `next-sitemap.config.js`
- Modify: `next.config.ts`
- Modify: `package.json` (postbuild script)

- [ ] **Step 1: Create next-sitemap config**

Create `next-sitemap.config.js` at project root:

```javascript
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://getvoix.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api/', '/dashboard/', '/exercises/', '/speaking/'] },
    ],
  },
  exclude: ['/dashboard', '/exercises', '/speaking', '/login', '/api/*'],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
}
```

- [ ] **Step 2: Add postbuild script to package.json**

Add to the `scripts` section in `package.json`:

```json
"postbuild": "next-sitemap"
```

- [ ] **Step 3: Add JSON-LD schema to landing page**

Update `app/(marketing)/page.tsx` to include structured data:

```typescript
import Hero from '@/components/landing/hero'
import Features from '@/components/landing/features'
import LevelsPreview from '@/components/landing/levels-preview'
import CTA from '@/components/landing/cta'

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Voix',
  url: 'https://getvoix.com',
  description: 'AI-powered French learning platform for TCF Canada, DELF, and DALF exam preparation',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://getvoix.com/blog?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'French Language Learning — A1 to C2',
  description: 'AI-powered French speaking practice, grammar exercises, and mock exams for TCF Canada, DELF, and DALF preparation.',
  provider: { '@type': 'Organization', name: 'Voix', sameAs: 'https://getvoix.com' },
  hasCourseInstance: [
    { '@type': 'CourseInstance', name: 'A1 Beginner French', courseMode: 'online' },
    { '@type': 'CourseInstance', name: 'B2 Upper Intermediate French', courseMode: 'online' },
    { '@type': 'CourseInstance', name: 'TCF Canada Preparation', courseMode: 'online' },
  ],
}

export default function LandingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <Hero />
      <Features />
      <LevelsPreview />
      <CTA />
    </>
  )
}
```

- [ ] **Step 4: Add SITE_URL to .env.local**

Add to `.env.local`:

```bash
SITE_URL=http://localhost:3000
```

- [ ] **Step 5: Run build to verify sitemap generates**

```bash
npm run build
```

Expected: Build succeeds. After build, check `public/sitemap.xml` and `public/robots.txt` exist.

- [ ] **Step 6: Commit**

```bash
git add next-sitemap.config.js next.config.ts package.json app/\(marketing\)/page.tsx
git commit -m "feat: add SEO foundation — sitemap, robots.txt, JSON-LD schemas"
```

---

## Task 8: Deploy to Vercel

**Files:** No code changes — deploy configuration only.

- [ ] **Step 1: Create GitHub repository**

1. Go to [github.com](https://github.com) → New repository → name it `voix`
2. Set to **Private** for now (make public when ready to launch)
3. Do NOT initialize with README (we already have code)

- [ ] **Step 2: Push to GitHub**

```bash
git remote add origin https://github.com/<your-username>/voix.git
git branch -M main
git push -u origin main
```

- [ ] **Step 3: Deploy on Vercel**

1. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub → select `voix`
2. Framework preset: **Next.js** (auto-detected)
3. Root directory: leave as default (`./`)
4. Click **Deploy** (first deploy will fail — that's expected, env vars not set yet)

- [ ] **Step 4: Add environment variables on Vercel**

In Vercel dashboard → Project → Settings → Environment Variables, add:

```
MONGODB_URI         = <your Atlas connection string>
NEXTAUTH_URL        = https://<your-vercel-url>.vercel.app
NEXTAUTH_SECRET     = <same value as local>
GOOGLE_CLIENT_ID    = <same as local>
GOOGLE_CLIENT_SECRET = <same as local>
SITE_URL            = https://<your-vercel-url>.vercel.app
```

- [ ] **Step 5: Add Vercel URL to Google OAuth**

1. Go to Google Cloud Console → APIs & Services → Credentials → your OAuth client
2. Add to Authorized redirect URIs: `https://<your-vercel-url>.vercel.app/api/auth/callback/google`

- [ ] **Step 6: Trigger redeploy**

```bash
git commit --allow-empty -m "chore: trigger redeploy with env vars"
git push
```

- [ ] **Step 7: Verify production deploy**

Open the Vercel URL. Verify:
- Landing page loads correctly
- No console errors
- `/api/auth/signin` shows Google sign-in
- Complete a sign-in flow — verify user appears in MongoDB Atlas (check via Atlas dashboard → Browse Collections → users)

- [ ] **Step 8: Final commit**

```bash
git add .
git commit -m "chore: production deploy verified on Vercel"
git push
```

---

## Self-Review

**Spec coverage check:**
- ✅ Next.js 15 App Router setup
- ✅ MongoDB Atlas + Mongoose + User model
- ✅ NextAuth v5 with Google provider
- ✅ Shadcn/ui + Tailwind
- ✅ Landing page (Hero, Features, Levels, CTA)
- ✅ Mobile-first layout
- ✅ SEO metadata (title, description, OG, Twitter)
- ✅ JSON-LD schemas (WebSite, Course)
- ✅ Sitemap + robots.txt
- ✅ Vercel deploy
- ⏭️ GA4 + Clarity (set up after deploy, requires live URL — done in Plan 4)
- ⏭️ Try-before-login flow (Plan 2)
- ⏭️ Exercises + levels (Plan 2)
- ⏭️ Speaking features (Plan 3)

**Placeholder check:** All steps have exact code, exact commands, exact expected output. No TBDs.

**Type consistency:** `CefrLevel` and `UserPlan` defined in `models/user.ts` — referenced nowhere else yet. Will be imported in Plans 2+.
