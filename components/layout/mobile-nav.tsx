'use client'

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
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-100 bg-white pb-safe md:hidden">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 px-3 py-3 text-xs font-medium transition-colors ${
              pathname.startsWith(item.href)
                ? 'text-blue-600'
                : 'text-slate-400 hover:text-slate-900'
            }`}
          >
            <span className="text-xl leading-none">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
