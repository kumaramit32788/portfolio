import { useEffect, useRef, useState, type CSSProperties } from 'react'

import './App.css'

type Link = {
  label: string
  href: string
}

type Profile = {
  name: string
  tagline: string
  location: string
  headline: string
  ctaLinks: {
    resume: Link
    contact: Link
    phone?: Link
    linkedin?: Link
  }
}

type SkillGroup = {
  category: string
  items: string[]
}

type Project = {
  title: string
  description: string
  stack: string[]
  result: string
  link: string
}

type ExperienceItem = {
  company: string
  role: string
  period: string
  summary: string
  highlights: string[]
}

type HeroMetric = {
  value: string
  caption: string
}

type RevealStyle = CSSProperties & Record<'--reveal-index', string>

const profile: Profile = {
  name: 'Amit Kumar Thakur',
  tagline: 'React Native Developer',
  location: 'Bangalore, India',
  headline:
    'React Native specialist with 3+ years building AI-enabled, cross-platform healthcare and enterprise apps. I integrate analytics, payments, and performance optimisations that keep mobile teams shipping fast and users engaged.',
  ctaLinks: {
    resume: {
      label: 'View Résumé',
      href: 'https://drive.google.com/file/d/amit-kumar-thakur-resume/view',
    },
    contact: {
      label: 'Email Amit',
      href: 'mailto:kumaramit32788@gmail.com',
    },
    phone: {
      label: 'Call 96853 45004',
      href: 'tel:+919685345004',
    },
    linkedin: {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/amit-kumar-thakur-6563b5214',
    },
  },
}

const heroHighlights: string[] = ['AI-led product delivery', 'Production-grade reliability', 'Mobile-first execution']

const heroMetrics: HeroMetric[] = [
  { value: '3+ years', caption: 'React Native leadership' },
  { value: '20% faster', caption: 'Latency reductions delivered' },
  { value: '15% lift', caption: 'Clinical accuracy improvements' },
]

const skills: SkillGroup[] = [
  {
    category: 'Frontend & Mobile',
    items: ['React Native', 'React', 'TypeScript', 'JavaScript', 'Mobile UI/UX'],
  },
  {
    category: 'State & Data',
    items: ['Redux', 'Context API', 'Firebase', 'RESTful APIs', 'Socket.IO'],
  },
  {
    category: 'Delivery & Quality',
    items: ['Performance Optimization', 'Payment Gateways', 'CI/CD', 'Jest', 'Agile & Jira'],
  },
]

const projects: Project[] = [
  {
    title: 'Healthcare Analytics AI Integration',
    description:
      'Embedded AI modules inside a React Native care platform to surface diagnosis insights for clinicians.',
    stack: ['React Native', 'TypeScript', 'Python APIs', 'RudderStack', 'CleverTap'],
    result: 'Improved diagnosis accuracy by 15% and unlocked real-time analytics across mobile apps.',
    link: 'https://www.cloudphysician.ai/',
  },
  {
    title: 'Latency Optimisation Initiative',
    description:
      'Refactored API orchestration and caching strategies across Android and iOS builds.',
    stack: ['React Native', 'Redux', 'Axios', 'REST APIs', 'TypeScript'],
    result: 'Reduced app latency by 20% while maintaining cross-platform parity and stability.',
    link: 'https://www.cloudphysician.ai/',
  },
  {
    title: 'HRMS Mobile Suite',
    description:
      'Full-stack attendance, WFH, and leave management solution with GPS validation and web parity.',
    stack: ['React Native', 'Firebase', 'Socket.IO', 'Node.js', 'AsyncStorage'],
    result: 'Delivered secure authentication, real-time updates, and spoof-resistant location logging.',
    link: 'https://www.elxer.com/',
  },
]

const experience: ExperienceItem[] = [
  {
    company: 'Cloudphysician Healthcare',
    role: 'React Native Developer',
    period: 'Jun 2023 — Present',
    summary:
      'Shipping TypeScript-first healthcare mobile apps with AI insights, analytics, and CI/CD automation for bi-weekly releases.',
    highlights: [
      'Integrated AI analytics to aid diagnosis, driving a 15% accuracy uplift for clinicians.',
      'Optimised API handling and refactored code to cut latency by 20% across Android and iOS.',
      'Unified RudderStack and CleverTap analytics pipelines to power personalised engagement campaigns (+25% retention).',
      'Migrated the codebase to TypeScript, reducing pre-production runtime errors by 40%.',
      'Piloted CI/CD flows via GitHub Actions and Fastlane for faster release cycles.',
    ],
  },
  {
    company: 'Elxer Communications Pvt. Ltd.',
    role: 'Junior Software Engineer',
    period: 'Jun 2022 — May 2023',
    summary:
      'Delivered end-to-end React Native features for HRMS and subscription products with secure, real-time experiences.',
    highlights: [
      'Implemented Firebase Auth + Firestore data flows with reusable navigation and storage patterns.',
      'Built GPS-backed attendance verification to prevent spoofing and improve accuracy by 40%.',
      'Delivered payment gateway modules supporting seamless subscription and billing journeys.',
      'Transitioned real-time services from polling to Socket.IO for instantaneous updates.',
      'Maintained modular codebases with continuous integration and custom component libraries.',
    ],
  },
]

const toolbelt: string[] = [
  'React Navigation',
  'AsyncStorage',
  'Firebase Suite',
  'RudderStack',
  'CleverTap',
  'Fastlane',
  'GitHub Actions',
  'Socket.IO',
  'Stripe & Payment SDKs',
]

const revealIndexStyle = (index: number): RevealStyle => ({
  '--reveal-index': String(index),
})

function App(): JSX.Element {
  const heroLinks = [profile.ctaLinks.phone, profile.ctaLinks.linkedin].filter((link): link is Link => Boolean(link))
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const [isHeroVisible, setIsHeroVisible] = useState(false)

  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => setIsHeroVisible(true))

    return () => cancelAnimationFrame(animationFrame)
  }, [])

  useEffect(() => {
    const sections = sectionsRef.current
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            obs.unobserve(entry.target)
          }
        })
      },
      {
        root: null,
        threshold: 0.3,
      },
    )

    sections.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const setSectionRef = (index: number) => (element: HTMLElement | null) => {
    sectionsRef.current[index] = element
  }

  return (
    <div className="app">
      <header className={`hero ${isHeroVisible ? 'is-visible' : ''}`} id="top">
        <div className="hero__content">
          <p className="hero__eyebrow">{profile.location}</p>
          <h1>{profile.name}</h1>
          <h2>{profile.tagline}</h2>
          <p className="hero__headline">{profile.headline}</p>
          <div className="hero__badges" aria-hidden="true">
            {heroHighlights.map((badge) => (
              <span className="hero__badge" key={badge}>
                {badge}
              </span>
            ))}
          </div>
          <div className="hero__actions">
            <a className="button button--primary" href={profile.ctaLinks.contact.href}>
              {profile.ctaLinks.contact.label}
            </a>
            <a className="button" href={profile.ctaLinks.resume.href} target="_blank" rel="noreferrer">
              {profile.ctaLinks.resume.label}
            </a>
          </div>
          {heroLinks.length > 0 && (
            <div className="hero__links">
              {heroLinks.map((link, index) => (
                <span className="hero__link" key={link.label}>
                  <a href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                    {link.label}
                  </a>
                  {index < heroLinks.length - 1 && <span aria-hidden="true">•</span>}
                </span>
              ))}
            </div>
          )}
          <ul className="hero__metrics">
            {heroMetrics.map((metric, index) => (
              <li key={metric.caption} style={revealIndexStyle(index)}>
                <span>{metric.value}</span>
                <small>{metric.caption}</small>
              </li>
            ))}
          </ul>
        </div>
        <div className="hero__media" aria-hidden="true">
          <div className="hero__orb hero__orb--one" />
          <div className="hero__orb hero__orb--two" />
          <div className="hero__portrait">
            <img
              src="/images/amit-portrait.png"
              alt="Amit Kumar Thakur smiling in a cafe"
            />
          </div>
        </div>
      </header>

      <main>
        <section id="skills" className="section reveal" ref={setSectionRef(0)}>
          <div className="section__header">
            <p className="section__eyebrow">Expertise</p>
            <h3>React Native-first, shipping pixel-perfect mobile journeys</h3>
          </div>
          <div className="skills reveal-grid">
            {skills.map((group, index) => (
              <div className="card" key={group.category} style={revealIndexStyle(index)}>
                <h4>{group.category}</h4>
                <ul>
                  {group.items.map((item, itemIndex) => (
                    <li key={item} style={revealIndexStyle(itemIndex)}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="section reveal" ref={setSectionRef(1)}>
          <div className="section__header">
            <p className="section__eyebrow">Selected Work</p>
            <h3>Apps users keep on their home screen</h3>
          </div>
          <div className="projects reveal-grid">
            {projects.map((project, index) => (
              <article className="card" key={project.title} style={revealIndexStyle(index)}>
                <div className="card__body">
                  <div className="card__header">
                      <h4>{project.title}</h4>
                    <a href={project.link} target="_blank" rel="noreferrer" className="card__link">
                      View case study →
                    </a>
                  </div>
                  <p>{project.description}</p>
                  <ul className="card__tags">
                    {project.stack.map((tech, techIndex) => (
                      <li key={tech} style={revealIndexStyle(techIndex)}>
                        {tech}
                      </li>
                    ))}
                  </ul>
                  <p className="card__result">{project.result}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section reveal" ref={setSectionRef(2)}>
          <div className="section__header">
            <p className="section__eyebrow">Experience</p>
            <h3>Shipped with product teams from seed to Series B</h3>
          </div>
          <div className="experience reveal-stack">
            {experience.map((item, index) => (
              <article className="experience__item" key={item.company} style={revealIndexStyle(index)}>
                <div className="experience__meta">
                  <p className="experience__period">{item.period}</p>
                  <h4>
                    {item.role} · {item.company}
                  </h4>
                  <p>{item.summary}</p>
                </div>
                <ul>
                  {item.highlights.map((highlight, highlightIndex) => (
                    <li key={highlight} style={revealIndexStyle(highlightIndex)}>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="toolbelt" className="section reveal" ref={setSectionRef(3)}>
          <div className="section__header">
            <p className="section__eyebrow">Toolbelt</p>
            <h3>Reliable mobile delivery from design handoff to app store launch</h3>
          </div>
          <div className="toolbelt reveal-grid">
            {toolbelt.map((tool, index) => (
              <span className="pill" key={tool} style={revealIndexStyle(index)}>
                {tool}
              </span>
            ))}
          </div>
        </section>

        <section id="contact" className="section section--highlight reveal" ref={setSectionRef(4)}>
          <div className="cta">
            <h3>Ready to build your next mobile milestone?</h3>
            <p>
              I partner with founders and product teams to ship high-performing React Native apps—whether you need a feature sprint, a
              production rescue, or ongoing delivery.
            </p>
            <div className="cta__actions">
              <a className="button button--primary" href={profile.ctaLinks.contact.href}>
                {profile.ctaLinks.contact.label}
              </a>
              <a className="button" href={profile.ctaLinks.resume.href} target="_blank" rel="noreferrer">
                {profile.ctaLinks.resume.label}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with React &amp; Vite. Deployed on Vercel.
        </p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  )
}

export default App

