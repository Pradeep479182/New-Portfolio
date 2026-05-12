/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Points, PointMaterial } from '@react-three/drei'
import type { Group, Mesh, Points as ThreePoints } from 'three'

const seeded = (seed: number) => {
  const value = Math.sin(seed * 137.531) * 10000
  return value - Math.floor(value)
}

function ParticleField() {
  const pointsRef = useRef<ThreePoints>(null)
  const positions = useMemo(() => {
    const count = 1500
    const values = new Float32Array(count * 3)

    for (let index = 0; index < count; index += 1) {
      const radius = 9 + seeded(index + 1) * 21
      const angle = seeded(index + 11) * Math.PI * 2
      values[index * 3] = Math.cos(angle) * radius
      values[index * 3 + 1] = (seeded(index + 21) - 0.5) * 15
      values[index * 3 + 2] = Math.sin(angle) * radius - 9
    }

    return values
  }, [])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = clock.elapsedTime * 0.018
    pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.14) * 0.04
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial transparent color="#67e8f9" size={0.035} sizeAttenuation depthWrite={false} opacity={0.72} />
    </Points>
  )
}

function FloatingArchitecture() {
  const groupRef = useRef<Group>(null)
  const waveRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    const time = clock.elapsedTime

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.13) * 0.14
      groupRef.current.position.y = Math.sin(time * 0.25) * 0.28
    }

    if (waveRef.current) {
      waveRef.current.rotation.z = Math.sin(time * 0.18) * 0.05
      waveRef.current.position.y = -4.3 + Math.sin(time * 0.55) * 0.18
    }
  })

  return (
    <>
      <group ref={groupRef}>
        {[
          [-7.5, 1.6, -7.8, '#22d3ee'],
          [6.4, -0.6, -6.2, '#c084fc'],
          [4.2, 3.1, -9.6, '#f472b6'],
          [-4.4, -2.3, -5.9, '#34d399'],
        ].map(([x, y, z, color], index) => (
          <Float key={`${x}-${y}`} floatIntensity={1.2} rotationIntensity={0.55} speed={1.2 + index * 0.18}>
            <mesh position={[x, y, z]} rotation={[0.4 + index, 0.7, 0.2]}>
              {index % 2 === 0 ? <octahedronGeometry args={[0.75, 0]} /> : <torusKnotGeometry args={[0.48, 0.09, 72, 10]} />}
              <meshStandardMaterial
                color="#07111f"
                emissive={color}
                emissiveIntensity={0.85}
                roughness={0.22}
                metalness={0.82}
              />
            </mesh>
          </Float>
        ))}
      </group>

      <mesh ref={waveRef} position={[0, -4.3, -10.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[46, 18, 56, 18]} />
        <meshBasicMaterial color="#0ea5e9" wireframe transparent opacity={0.2} />
      </mesh>

      <gridHelper args={[48, 48, '#1dd3ff', '#10233d']} position={[0, -4.7, -9]} />
    </>
  )
}

function BackgroundScene() {
  return (
    <>
      <color attach="background" args={['#02040b']} />
      <fog attach="fog" args={['#02040b', 10, 34]} />
      <ambientLight intensity={0.55} />
      <pointLight position={[-6, 4, 2]} intensity={1.8} color="#22d3ee" distance={18} />
      <pointLight position={[7, 1, -2]} intensity={1.4} color="#c084fc" distance={18} />
      <spotLight position={[0, 8, 4]} intensity={1.5} angle={0.42} penumbra={0.8} color="#f8fafc" />
      <ParticleField />
      <FloatingArchitecture />
    </>
  )
}

export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0.8, 10.8], fov: 58 }} dpr={[1, 1.5]}>
        <BackgroundScene />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.16),transparent_32%),radial-gradient(circle_at_80%_18%,rgba(192,132,252,0.13),transparent_30%),linear-gradient(180deg,rgba(2,4,11,0.18),rgba(2,4,11,0.86))]" />
      <div className="absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="scanline" />
    </div>
  )
}

export default Background
