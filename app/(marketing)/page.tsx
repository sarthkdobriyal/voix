import Hero from '@/components/landing/hero'
import Features from '@/components/landing/features'
import HowItWorks from '@/components/landing/how-it-works'
import LevelsPreview from '@/components/landing/levels-preview'
import CTA from '@/components/landing/cta'

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Voix',
  url: 'https://getvoix.com',
  description:
    'AI-powered French learning platform for TCF Canada, DELF, and DALF exam preparation',
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
  description:
    'AI-powered French speaking practice, grammar exercises, and mock exams for TCF Canada, DELF, and DALF preparation.',
  provider: {
    '@type': 'Organization',
    name: 'Voix',
    sameAs: 'https://getvoix.com',
  },
  hasCourseInstance: [
    { '@type': 'CourseInstance', name: 'A1 Beginner French', courseMode: 'online' },
    { '@type': 'CourseInstance', name: 'A2 Elementary French', courseMode: 'online' },
    { '@type': 'CourseInstance', name: 'B1 Intermediate French', courseMode: 'online' },
    { '@type': 'CourseInstance', name: 'B2 Upper Intermediate French', courseMode: 'online' },
    { '@type': 'CourseInstance', name: 'C1 Advanced French', courseMode: 'online' },
    { '@type': 'CourseInstance', name: 'C2 Mastery French', courseMode: 'online' },
    { '@type': 'CourseInstance', name: 'TCF Canada Preparation', courseMode: 'online' },
    { '@type': 'CourseInstance', name: 'DELF Preparation', courseMode: 'online' },
    { '@type': 'CourseInstance', name: 'DALF Preparation', courseMode: 'online' },
  ],
}

export default function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <Hero />
      <Features />
      <HowItWorks />
      <LevelsPreview />
      <CTA />
    </>
  )
}
