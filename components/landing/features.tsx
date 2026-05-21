const features = [
  {
    icon: '🎤',
    title: 'Speaking practice',
    description:
      'Speak with an AI tutor that gives real-time feedback on your pronunciation, fluency, and grammar. Two modes: free conversation and timed exam simulation.',
    tag: 'Core feature',
  },
  {
    icon: '📝',
    title: 'Grammar exercises',
    description:
      'Tenses, active and passive voice, sentence formation — everything tested in DELF and TCF, generated fresh by AI and matched exactly to your CEFR level.',
    tag: 'A1 to C2',
  },
  {
    icon: '🎯',
    title: 'Exam simulation',
    description:
      'Full-length mock tests in DELF/DALF and TCF Canada format. Timed, scored, and reviewed so you know exactly where to focus before exam day.',
    tag: 'TCF · DELF · DALF',
  },
  {
    icon: '📊',
    title: 'Progress tracking',
    description:
      'See your improvement over time. Track scores per skill area, maintain your daily streak, and get a clear picture of exam readiness.',
    tag: 'All levels',
  },
  {
    icon: '🧠',
    title: 'Adaptive difficulty',
    description:
      'Exercises adjust to your performance. Get harder when you nail it, revisit problem areas automatically. No wasted practice time.',
    tag: 'Smart learning',
  },
  {
    icon: '📱',
    title: 'Practice anywhere',
    description:
      'Fully optimised for mobile. Practice on the metro, during lunch, or before bed. Your progress syncs instantly across all devices.',
    tag: 'Mobile first',
  },
]

export default function Features() {
  return (
    <section id="features" className="bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need to pass
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
            Not a vocabulary game. A serious tool built around the skills that
            actually get tested.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl">{feature.icon}</span>
                <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-600">
                  {feature.tag}
                </span>
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
