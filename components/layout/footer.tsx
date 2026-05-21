import Link from 'next/link'

const links = {
  Product: [
    { label: 'Levels', href: '/levels' },
    { label: 'Grammar exercises', href: '/exercises' },
    { label: 'Speaking practice', href: '/speaking' },
    { label: 'Mock exams', href: '/mock-exam' },
  ],
  Learn: [
    { label: 'Blog', href: '/blog' },
    { label: 'TCF Canada guide', href: '/blog/tcf-canada-guide' },
    { label: 'DELF preparation', href: '/blog/delf-preparation' },
    { label: 'French level test', href: '/level-test' },
  ],
  Company: [
    { label: 'Privacy policy', href: '/privacy' },
    { label: 'Terms of service', href: '/terms' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <span className="text-xl font-bold text-slate-900">Voix</span>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              AI-powered French learning for real exam success. TCF Canada, DELF, and DALF preparation.
            </p>
          </div>
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="text-sm font-semibold text-slate-900">{category}</p>
              <ul className="mt-3 space-y-2">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-500 transition-colors hover:text-slate-900"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-slate-200 pt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Voix. All rights reserved.
          </p>
          <p className="text-xs text-slate-400">
            Built for serious French learners worldwide
          </p>
        </div>
      </div>
    </footer>
  )
}
