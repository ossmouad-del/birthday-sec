import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Starfield() {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = host.current
    if (!node) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100)
    camera.position.z = 22

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    })

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7))
    node.appendChild(renderer.domElement)

    const count = 700
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const gold = new THREE.Color('#d9b879')
    const rose = new THREE.Color('#d77e9f')

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 58
      positions[i * 3 + 1] = (Math.random() - 0.5) * 38
      positions[i * 3 + 2] = (Math.random() - 0.5) * 35

      const c = Math.random() > 0.72 ? rose : gold

      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    const geometry = new THREE.BufferGeometry()

    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    )

    geometry.setAttribute(
      'color',
      new THREE.BufferAttribute(colors, 3)
    )

    const material = new THREE.PointsMaterial({
      size: 0.075,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    })

    const stars = new THREE.Points(geometry, material)
    scene.add(stars)

    const resize = () => {
      const w = node.clientWidth
      const h = node.clientHeight

      renderer.setSize(w, h, false)
      camera.aspect = w / Math.max(h, 1)
      camera.updateProjectionMatrix()
    }

    resize()

    const observer = new ResizeObserver(resize)
    observer.observe(node)

    let frame = 0

    const animate = () => {
      frame = requestAnimationFrame(animate)

      stars.rotation.y += 0.00022
      stars.rotation.x = Math.sin(Date.now() * 0.00012) * 0.035

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      geometry.dispose()
      material.dispose()
      renderer.dispose()

      if (node.contains(renderer.domElement)) {
        node.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div className="starfield" ref={host} aria-hidden="true" />
}