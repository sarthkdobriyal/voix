import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-blue-600 py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-500 opacity-50" />
      <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Your exam date is coming.
          <br />
          Start practising today.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-blue-100">
          No account needed to start. Pick your level, do 5 exercises free, and
          see exactly what Voix feels like before you sign up.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button
            size="lg"
            variant="secondary"
            className="h-12 px-8 text-base font-semibold"
            asChild
          >
            <Link href="/levels">Start practising free →</Link>
          </Button>
          <Link
            href="/level-test"
            className="inline-flex h-12 items-center justify-center rounded-md border border-white/40 bg-transparent px-8 text-base font-medium text-white transition-colors hover:bg-white/10"
          >
            Take the level test
          </Link>
        </div>
        <p className="mt-6 text-sm text-blue-200">
          TCF Canada · DELF A1–B2 · DALF C1–C2
        </p>
      </div>
    </section>
  )
}
