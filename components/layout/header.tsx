import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            Voix
          </span>
          <span className="hidden rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600 sm:inline">
            French Learning
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <Link href="/#features" className="transition-colors hover:text-slate-900">
            Features
          </Link>
          <Link href="/#levels" className="transition-colors hover:text-slate-900">
            Levels
          </Link>
          <Link href="/#how-it-works" className="transition-colors hover:text-slate-900">
            How it works
          </Link>
          <Link href="/blog" className="transition-colors hover:text-slate-900">
            Blog
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/levels">Start free →</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
