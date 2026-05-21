import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

const levels = [
  {
    code: 'A1',
    label: 'Beginner',
    desc: 'Basic phrases and expressions. Introduce yourself and ask simple questions about familiar topics.',
    exams: 'DELF A1',
  },
  {
    code: 'A2',
    label: 'Elementary',
    desc: 'Routine tasks and familiar situations. Short conversations about everyday life and immediate environment.',
    exams: 'DELF A2',
  },
  {
    code: 'B1',
    label: 'Intermediate',
    desc: 'Handle travel situations, describe experiences and events. The minimum for most Canadian immigration pathways.',
    exams: 'DELF B1 · TCF',
  },
  {
    code: 'B2',
    label: 'Upper Intermediate',
    desc: 'Complex topics and spontaneous conversation with native speakers. Required for most Quebec immigration programs.',
    exams: 'DELF B2 · TCF Canada',
  },
  {
    code: 'C1',
    label: 'Advanced',
    desc: 'Fluent and spontaneous expression on complex subjects. Professional and academic proficiency.',
    exams: 'DALF C1',
  },
  {
    code: 'C2',
    label: 'Mastery',
    desc: 'Complete command of French. Understand virtually everything, express yourself with precision and nuance.',
    exams: 'DALF C2',
  },
]

export default function LevelsPreview() {
  return (
    <section id="levels" className="bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Choose your level
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
            All six CEFR levels covered — from first words to complete fluency.
            Not sure where you are?{' '}
            <Link href="/level-test" className="text-blue-600 underline underline-offset-2">
              Take the free level test →
            </Link>
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {levels.map((level) => (
            <Link
              key={level.code}
              href={`/levels/${level.code.toLowerCase()}`}
              className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-blue-600">
                    {level.code}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {level.label}
                  </Badge>
                </div>
                <span className="text-xs text-slate-400">{level.exams}</span>
              </div>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {level.desc}
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
                Start {level.code} exercises
                <svg
                  className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
