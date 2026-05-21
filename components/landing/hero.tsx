import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-white to-white pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 py-24 text-center sm:px-6 md:py-32">
        <Badge
          variant="secondary"
          className="mb-6 rounded-full px-4 py-1 text-sm font-medium"
        >
          🇫🇷 TCF Canada · DELF · DALF preparation
        </Badge>

        <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl md:text-7xl">
          Learn French through{' '}
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            speaking
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 leading-relaxed sm:text-xl">
          AI-powered practice for serious French learners. Grammar exercises, real
          conversation practice, and full mock exams — tailored to your CEFR level.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" className="h-12 px-8 text-base shadow-md" asChild>
            <Link href="/levels">Start practising free →</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-8 text-base"
            asChild
          >
            <Link href="/level-test">Take the level test</Link>
          </Button>
        </div>

        <p className="mt-4 text-sm text-slate-400">
          No account needed · 5 exercises free · Takes 2 minutes to start
        </p>

        {/* Stats row */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-slate-100 pt-10">
          {[
            { value: '6', label: 'CEFR levels' },
            { value: '3', label: 'Exam formats' },
            { value: 'AI', label: 'Powered feedback' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
              <div className="mt-1 text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
