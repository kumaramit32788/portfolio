import { useEffect, useRef, type ReactElement } from 'react'
import * as THREE from 'three'

import './App.css'

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

const profile = {
  name: 'Amit Kumar Thakur',
  tagline: 'React Native Developer',
  location: 'Bangalore, India',
  headline:
    'React Native specialist with 3+ years building AI-enabled healthcare and enterprise apps with measurable product impact.',
  links: {
    resume: {
      label: 'View Resume',
      href: 'https://drive.google.com/file/d/1a9KT4apLREyP9enFKpReKGvGvG244I3B/view?usp=drive_link',
    },
    contact: {
      label: 'Email Amit',
      href: 'mailto:kumaramit32788@gmail.com',
    },
    phone: {
      label: 'Call +91 96853 45004',
      href: 'tel:+919685345004',
    },
    linkedin: {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/amit-kumar-thakur-6563b5214',
    },
  },
}

const mobileSpecialties = ['React Native', 'Android', 'iOS', 'App Performance', 'Push & Analytics']

const metrics = [
  { value: '3+ years', label: 'React Native delivery' },
  { value: '20%', label: 'Latency reduction achieved' },
  { value: '15%', label: 'Diagnosis accuracy uplift' },
  { value: '40%', label: 'Runtime error reduction' },
]

const skills: SkillGroup[] = [
  { category: 'Frontend & Mobile', items: ['React Native', 'React', 'TypeScript', 'JavaScript', 'Mobile UI/UX'] },
  { category: 'State & Data', items: ['Redux', 'Context API', 'Firebase', 'RESTful APIs', 'Socket.IO'] },
  { category: 'Delivery & Quality', items: ['Performance Optimization', 'Payment Gateways', 'CI/CD', 'Jest', 'Agile'] },
]

const projects: Project[] = [
  {
    title: 'Consumer trip booking — web & native',
    description:
      'Product engineering on a travel reservation stack: anonymous browsing that graduates into accounts, geo-aware planning, checkout with processor integrations, OAuth sign-on, push and in-app alerts, real-time support threads, and a traveler media layer (timeline posts plus vertical short video).',
    stack: ['React Native', 'React', 'TypeScript', 'REST APIs', 'WebSockets', 'Maps SDKs'],
    result:
      'Tightened the path from discovery to confirmed trips while giving operators a reliable channel for updates and two-way conversation alongside richer, shareable trip storytelling.',
    link: 'https://www.linkedin.com/in/amit-kumar-thakur-6563b5214',
  },
  {
    title: 'Healthcare Analytics AI Integration',
    description: 'Integrated AI modules in a care platform to support clinicians with in-app diagnosis insights.',
    stack: ['React Native', 'TypeScript', 'Python APIs', 'RudderStack', 'CleverTap'],
    result: 'Improved diagnosis accuracy by 15% and enabled real-time product analytics.',
    link: 'https://www.cloudphysician.ai/',
  },
  {
    title: 'Latency Optimisation Initiative',
    description: 'Refactored API orchestration and state flow to improve app responsiveness.',
    stack: ['React Native', 'Redux', 'Axios', 'REST APIs', 'TypeScript'],
    result: 'Reduced app latency by 20% across Android and iOS.',
    link: 'https://www.cloudphysician.ai/',
  },
  {
    title: 'HRMS Mobile Suite',
    description: 'Built attendance, WFH, and leave workflows with location-aware verification.',
    stack: ['React Native', 'Firebase', 'Socket.IO', 'Node.js'],
    result: 'Delivered real-time updates and spoof-resistant attendance tracking.',
    link: 'https://www.elxer.com/',
  },
]

const experience: ExperienceItem[] = [
  {
    company: 'Freelance',
    role: 'Software Engineer',
    period: 'Nov 2025 - Present',
    summary:
      'Software engineer for a trip-booking web and mobile platform: guest and signed-in flows, payments, maps, authentication, posts and shorts-style engagement, notifications, chat, and real-time messaging.',
    highlights: [
      'Designed and implemented guest and authenticated user journeys so browse, search, and booking work with clear upgrade paths after login.',
      'Delivered payment gateway integrations and social sign-in alongside Google Maps–based location and routing experiences.',
      'Built notification and in-app chat modules for booking updates, support, and operational messaging.',
      'Added feed posts and shorts-style surfaces in the trip app for user-generated trip content, discovery, and booking-adjacent engagement.',
    ],
  },
  {
    company: 'Cloudphysician Healthcare',
    role: 'React Native Developer',
    period: 'Jun 2023 - 3 Nov 2025',
    summary: 'Shipped TypeScript-first healthcare mobile apps with AI insights and faster release workflows.',
    highlights: [
      'Integrated AI-assisted analytics for clinician workflows.',
      'Reduced latency by 20% through API and rendering optimizations.',
      'Aligned analytics pipelines for personalized engagement use cases.',
    ],
  },
  {
    company: 'Elxer Communications Pvt. Ltd.',
    role: 'Junior Software Engineer',
    period: 'Jun 2022 - May 2023',
    summary: 'Delivered end-to-end React Native features for HRMS and subscription products.',
    highlights: [
      'Built secure Firebase auth and data flows.',
      'Implemented GPS-backed attendance verification.',
      'Integrated payment gateway journeys for subscriptions.',
    ],
  },
]

function App(): ReactElement {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const projectsRef = useRef<HTMLDivElement | null>(null)

  const scrollProjects = (direction: 'left' | 'right'): void => {
    const container = projectsRef.current
    if (!container) return

    const scrollStep = container.clientWidth / 3
    container.scrollBy({
      left: direction === 'left' ? -scrollStep : scrollStep,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const mountNode = containerRef.current
    if (!mountNode) return undefined

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x050914)
    scene.fog = new THREE.Fog(0x050914, 10, 26)

    const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 100)
    camera.position.set(0, 0.4, 8.4)

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance', alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountNode.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.82)
    const keyLight = new THREE.DirectionalLight(0x8fbcff, 1.4)
    keyLight.position.set(5, 6, 5)
    const accentLight = new THREE.PointLight(0xff8a65, 13, 20)
    accentLight.position.set(-4, -2, 4)
    scene.add(ambientLight, keyLight, accentLight)

    const starsGeometry = new THREE.BufferGeometry()
    const starsCount = 700
    const positions = new Float32Array(starsCount * 3)
    for (let i = 0; i < starsCount; i += 1) {
      const offset = i * 3
      positions[offset] = (Math.random() - 0.5) * 52
      positions[offset + 1] = (Math.random() - 0.5) * 34
      positions[offset + 2] = (Math.random() - 0.5) * 52
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xb8d4ff,
      size: 0.07,
      transparent: true,
      opacity: 0.68,
    })
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    const centerOrb = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.15, 2),
      new THREE.MeshStandardMaterial({
        color: 0x7ca9ff,
        emissive: 0x1b3c83,
        emissiveIntensity: 0.56,
        metalness: 0.4,
        roughness: 0.23,
        flatShading: true,
      }),
    )
    centerOrb.position.y = 0.2
    scene.add(centerOrb)

    const phoneGroup = new THREE.Group()
    phoneGroup.position.set(0, 0.2, -1.2)

    const phoneBody = new THREE.Mesh(
      new THREE.BoxGeometry(1.95, 3.7, 0.16),
      new THREE.MeshStandardMaterial({
        color: 0x131e3e,
        metalness: 0.72,
        roughness: 0.22,
      }),
    )
    phoneGroup.add(phoneBody)

    const phoneScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(1.65, 3.18),
      new THREE.MeshStandardMaterial({
        color: 0x4b72ff,
        emissive: 0x15356f,
        emissiveIntensity: 0.75,
        metalness: 0.18,
        roughness: 0.45,
      }),
    )
    phoneScreen.position.z = 0.086
    phoneGroup.add(phoneScreen)

    const cameraNotch = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.09, 0.03),
      new THREE.MeshStandardMaterial({
        color: 0x0a1127,
        metalness: 0.2,
        roughness: 0.7,
      }),
    )
    cameraNotch.position.set(0, 1.48, 0.1)
    phoneGroup.add(cameraNotch)

    const widgetMaterial = new THREE.MeshStandardMaterial({
      color: 0xaec6ff,
      emissive: 0x2d4782,
      emissiveIntensity: 0.5,
      metalness: 0.12,
      roughness: 0.58,
      transparent: true,
      opacity: 0.9,
    })
    const widgetGeometries = [
      new THREE.PlaneGeometry(1.18, 0.38),
      new THREE.PlaneGeometry(1.18, 0.58),
      new THREE.PlaneGeometry(1.18, 0.48),
    ]
    const widgets = widgetGeometries.map((geometry, index) => {
      const widget = new THREE.Mesh(geometry, widgetMaterial.clone())
      widget.position.set(0, 0.85 - index * 0.85, 0.1)
      phoneGroup.add(widget)
      return widget
    })

    scene.add(phoneGroup)

    const appTilesGroup = new THREE.Group()
    const tileOffsets = [
      [-3.1, 1.2, -2.4],
      [3.2, 0.5, -1.9],
      [-2.8, -1.2, -1.6],
      [2.9, -1.5, -2.2],
    ] as const
    const appTiles = tileOffsets.map((offset, index) => {
      const tile = new THREE.Mesh(
        new THREE.BoxGeometry(0.92, 0.92, 0.12),
        new THREE.MeshStandardMaterial({
          color: new THREE.Color().setHSL(0.56 + index * 0.06, 0.72, 0.62),
          emissive: new THREE.Color().setHSL(0.58 + index * 0.05, 0.52, 0.2),
          emissiveIntensity: 0.4,
          metalness: 0.2,
          roughness: 0.5,
        }),
      )
      tile.position.set(offset[0], offset[1], offset[2])
      appTilesGroup.add(tile)
      return tile
    })
    scene.add(appTilesGroup)

    const signalRingGroup = new THREE.Group()
    const signalRings = [1.7, 2.15, 2.6].map((radius, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.014, 12, 80),
        new THREE.MeshBasicMaterial({
          color: index % 2 === 0 ? 0x6f95ff : 0xff9c77,
          transparent: true,
          opacity: 0.36 - index * 0.08,
        }),
      )
      ring.rotation.x = Math.PI * 0.5
      signalRingGroup.add(ring)
      return ring
    })
    signalRingGroup.position.set(0, 0.2, -1.15)
    scene.add(signalRingGroup)

    const outerRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.2, 0.08, 18, 120),
      new THREE.MeshStandardMaterial({
        color: 0xff9872,
        emissive: 0x602717,
        emissiveIntensity: 0.32,
        metalness: 0.5,
        roughness: 0.35,
      }),
    )
    outerRing.rotation.x = Math.PI * 0.4
    scene.add(outerRing)

    const resize = () => {
      const { clientWidth, clientHeight } = mountNode
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(clientWidth, clientHeight, false)
    }

    let rafId = 0
    const clock = new THREE.Clock()
    const animate = () => {
      const time = clock.getElapsedTime()
      centerOrb.rotation.y = time * 0.38
      centerOrb.rotation.x = time * 0.18
      centerOrb.position.y = 0.2 + Math.sin(time * 0.9) * 0.06

      phoneGroup.rotation.y = Math.sin(time * 0.45) * 0.28
      phoneGroup.rotation.x = Math.sin(time * 0.3) * 0.05
      phoneGroup.position.y = 0.2 + Math.sin(time * 1.2) * 0.15

      widgets.forEach((widget, index) => {
        widget.position.x = Math.sin(time * (1 + index * 0.15)) * 0.05
        widget.material.opacity = 0.65 + Math.sin(time * 1.4 + index) * 0.2
      })

      appTiles.forEach((tile, index) => {
        tile.rotation.z += 0.004 + index * 0.0008
        tile.position.y += Math.sin(time * 1.2 + index * 0.7) * 0.0026
      })

      signalRings.forEach((ring, index) => {
        ring.scale.setScalar(1 + Math.sin(time * 1.45 - index * 0.6) * 0.04)
      })

      outerRing.rotation.z = time * 0.26
      outerRing.position.y = Math.sin(time * 1.1) * 0.08
      stars.rotation.y = time * 0.01
      stars.rotation.x = time * 0.005
      renderer.render(scene, camera)
      rafId = window.requestAnimationFrame(animate)
    }

    resize()
    animate()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      window.cancelAnimationFrame(rafId)
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Points) {
          object.geometry.dispose()
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose())
          } else {
            object.material.dispose()
          }
        }
      })
      starsGeometry.dispose()
      starsMaterial.dispose()
      renderer.dispose()
      mountNode.innerHTML = ''
    }
  }, [])

  return (
    <div className="portfolio-app">
      <div className="portfolio-app__bg" ref={containerRef} aria-hidden="true" />

      <header className="topbar">
        <div className="topbar__brand">{profile.name}</div>
        <nav className="topbar__nav">
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className="content">
        <section className="hero card">
          <p className="hero__location">{profile.location}</p>
          <h1>{profile.tagline}</h1>
          <p className="hero__headline">{profile.headline}</p>
          <div className="hero__chipset" aria-hidden="true">
            {mobileSpecialties.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="hero__actions">
            <a className="button button--primary" href={profile.links.contact.href}>
              {profile.links.contact.label}
            </a>
            <a className="button" href={profile.links.resume.href} target="_blank" rel="noreferrer">
              {profile.links.resume.label}
            </a>
          </div>
          <div className="hero__links">
            <a href={profile.links.phone.href}>{profile.links.phone.label}</a>
            <a href={profile.links.linkedin.href} target="_blank" rel="noreferrer">
              {profile.links.linkedin.label}
            </a>
          </div>
        </section>

        <section className="metrics-grid">
          {metrics.map((metric) => (
            <article className="metric card" key={metric.label}>
              <span>{metric.value}</span>
              <p>{metric.label}</p>
            </article>
          ))}
        </section>

        <section id="skills" className="card">
          <h2>Skills</h2>
          <div className="skills-grid">
            {skills.map((group) => (
              <article className="sub-card" key={group.category}>
                <h3>{group.category}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="card">
          <div className="projects-header">
            <h2>Projects</h2>
            <div className="projects-controls" aria-label="Project navigation">
              <button
                className="project-nav-button"
                type="button"
                aria-label="Scroll projects left"
                onClick={() => scrollProjects('left')}
              >
                ←
              </button>
              <button
                className="project-nav-button"
                type="button"
                aria-label="Scroll projects right"
                onClick={() => scrollProjects('right')}
              >
                →
              </button>
            </div>
          </div>
          <div className="projects-grid" ref={projectsRef}>
            {projects.map((project) => (
              <article className="sub-card" key={project.title}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <p className="result">{project.result}</p>
                <div className="tags">
                  {project.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <a href={project.link} target="_blank" rel="noreferrer">
                  View project
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="card">
          <h2>Experience</h2>
          <div className="experience-list">
            {experience.map((item) => (
              <article className="sub-card" key={item.company}>
                <h3>
                  {item.role} - {item.company}
                </h3>
                <p className="period">{item.period}</p>
                <p>{item.summary}</p>
                <ul>
                  {item.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="card card--center">
          <h2>Let&apos;s build your next mobile milestone</h2>
          <p>Available for feature sprints, optimization projects, and long-term React Native delivery.</p>
          <div className="hero__actions">
            <a className="button button--primary" href={profile.links.contact.href}>
              Email Amit
            </a>
            <a className="button" href={profile.links.resume.href} target="_blank" rel="noreferrer">
              Open Resume
            </a>
          </div>
        </section>
      </main>

    </div>
  )
}

export default App

