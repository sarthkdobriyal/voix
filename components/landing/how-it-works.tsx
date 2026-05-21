const steps = [
  {
    step: '01',
    title: 'Pick your level',
    description:
      'Choose from A1 to C2, or take the free 5-minute level test to find exactly where you stand.',
  },
  {
    step: '02',
    title: 'Practice daily',
    description:
      'Grammar exercises and speaking sessions tailored to your level. Each session takes 10–15 minutes.',
  },
  {
    step: '03',
    title: 'Get AI feedback',
    description:
      'Instant, detailed corrections on every exercise and speaking session. Understand your mistakes, not just your score.',
  },
  {
    step: '04',
    title: 'Take the mock exam',
    description:
      'When you feel ready, simulate the real exam. Full length, timed, and scored exactly like the actual TCF or DELF.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            From beginner to exam-ready
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
            A clear path from wherever you are today to the score you need.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => (
            <div key={item.step} className="relative">
              {index < steps.length - 1 && (
                <div className="absolute left-10 top-5 hidden h-0.5 w-full bg-slate-100 lg:block" />
              )}
              <div className="relative flex flex-col gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
