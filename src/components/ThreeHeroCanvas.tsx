import { useEffect, useRef, type ReactElement } from 'react'
import * as THREE from 'three'

const MOBILE_BREAKPOINT = 768

function ThreeHeroCanvas(): ReactElement {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mountNode = mountRef.current
    if (!mountNode) return undefined

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x090d1f, 2.8, 8)

    const isMobile = window.innerWidth < MOBILE_BREAKPOINT
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    camera.position.set(0, 0.15, 4.2)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mountNode.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
    const topLight = new THREE.PointLight(0x6ea4ff, 18, 20)
    topLight.position.set(2.4, 1.8, 2.8)
    const fillLight = new THREE.PointLight(0xff8f67, 12, 20)
    fillLight.position.set(-2.6, -1.2, 1.6)

    scene.add(ambientLight, topLight, fillLight)

    const coreGeometry = new THREE.IcosahedronGeometry(isMobile ? 1 : 1.15, 2)
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x6ea4ff,
      metalness: 0.35,
      roughness: 0.2,
      emissive: 0x1b3a86,
      emissiveIntensity: 0.45,
      wireframe: false,
      flatShading: true,
    })
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial)
    scene.add(coreMesh)

    const ringGeometry = new THREE.TorusGeometry(isMobile ? 1.35 : 1.55, 0.06, 24, 120)
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xff9a73,
      metalness: 0.5,
      roughness: 0.35,
      emissive: 0x5b2212,
      emissiveIntensity: 0.35,
    })
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial)
    ringMesh.rotation.x = Math.PI * 0.45
    ringMesh.rotation.y = Math.PI * 0.08
    scene.add(ringMesh)

    const starsGeometry = new THREE.BufferGeometry()
    const starCount = isMobile ? 120 : 200
    const positions = new Float32Array(starCount * 3)

    for (let index = 0; index < starCount; index += 1) {
      const base = index * 3
      positions[base] = (Math.random() - 0.5) * 12
      positions[base + 1] = (Math.random() - 0.5) * 8
      positions[base + 2] = -Math.random() * 6
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xd8e8ff,
      size: isMobile ? 0.02 : 0.03,
      transparent: true,
      opacity: 0.75,
    })
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    const clock = new THREE.Clock()
    let frameId = 0

    const setRendererSize = () => {
      const { clientWidth, clientHeight } = mountNode
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(clientWidth, clientHeight, false)
    }

    const animate = () => {
      const elapsed = clock.getElapsedTime()
      coreMesh.rotation.x = elapsed * 0.26
      coreMesh.rotation.y = elapsed * 0.5

      ringMesh.rotation.z = elapsed * 0.35
      ringMesh.position.y = Math.sin(elapsed * 1.15) * 0.1

      stars.rotation.y = elapsed * 0.04
      stars.rotation.x = elapsed * 0.02

      renderer.render(scene, camera)
      frameId = window.requestAnimationFrame(animate)
    }

    setRendererSize()
    animate()
    window.addEventListener('resize', setRendererSize)

    return () => {
      window.removeEventListener('resize', setRendererSize)
      window.cancelAnimationFrame(frameId)
      mountNode.removeChild(renderer.domElement)

      coreGeometry.dispose()
      coreMaterial.dispose()
      ringGeometry.dispose()
      ringMaterial.dispose()
      starsGeometry.dispose()
      starsMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      className="hero__three-scene"
      ref={mountRef}
      role="img"
      aria-label="Animated Three.js 3D scene with geometric object and orbiting ring"
    />
  )
}

export default ThreeHeroCanvas
