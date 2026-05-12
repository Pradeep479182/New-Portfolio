/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Text } from '@react-three/drei'
import type { Group } from 'three'

const skills = [
  { label: 'React', short: 'R', color: '#22d3ee', angle: 0 },
  { label: 'TypeScript', short: 'TS', color: '#60a5fa', angle: 1.04 },
  { label: 'Figma', short: 'F', color: '#f472b6', angle: 2.08 },
  { label: 'Tailwind CSS', short: 'TW', color: '#38bdf8', angle: 3.12 },
  { label: 'C#', short: 'C#', color: '#a78bfa', angle: 4.16 },
  { label: 'SQL Server', short: 'SQL', color: '#34d399', angle: 5.2 },
]

const seeded = (seed: number) => {
  const value = Math.sin(seed * 173.719) * 10000
  return value - Math.floor(value)
}

function SkillNode({ skill, index }: { skill: (typeof skills)[number]; index: number }) {
  const groupRef = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime + index) * 0.18
    groupRef.current.position.y += Math.sin(clock.elapsedTime * 1.4 + index) * 0.0008
  })

  const radius = 3.05
  const x = Math.cos(skill.angle) * radius
  const z = Math.sin(skill.angle) * radius
  const y = index % 2 === 0 ? 0.72 : -0.55

  return (
    <Float floatIntensity={1.2} rotationIntensity={0.45} speed={1.05 + index * 0.08}>
      <group ref={groupRef} position={[x, y, z]} rotation={[0.08, -skill.angle + Math.PI / 2, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.54, 0.54, 0.16, 6]} />
          <meshStandardMaterial color="#06111f" emissive={skill.color} emissiveIntensity={0.42} metalness={0.72} roughness={0.22} />
        </mesh>
        <mesh position={[0, 0.11, 0]}>
          <cylinderGeometry args={[0.38, 0.38, 0.035, 48]} />
          <meshBasicMaterial color={skill.color} transparent opacity={0.28} />
        </mesh>
        <Text position={[0, 0.16, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.16} color="#ffffff" anchorX="center" anchorY="middle">
          {skill.short}
        </Text>
        <Text position={[0, -0.26, 0]} fontSize={0.13} color="#e2e8f0" anchorX="center" anchorY="middle">
          {skill.label}
        </Text>
      </group>
    </Float>
  )
}

function OrbitLines() {
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      {[2.2, 3.08, 3.92].map((radius, index) => (
        <mesh key={radius}>
          <torusGeometry args={[radius, 0.008, 12, 160]} />
          <meshBasicMaterial color={index === 1 ? '#22d3ee' : '#94a3b8'} transparent opacity={index === 1 ? 0.34 : 0.12} />
        </mesh>
      ))}
    </group>
  )
}

export function SkillsScene() {
  const groupRef = useRef<Group>(null)
  const stars = useMemo(() => {
    return Array.from({ length: 46 }, (_, index) => ({
      id: index,
      position: [(seeded(index + 1) - 0.5) * 7.2, (seeded(index + 11) - 0.5) * 4.5, (seeded(index + 21) - 0.5) * 5.5],
      color: index % 3 === 0 ? '#22d3ee' : index % 3 === 1 ? '#c084fc' : '#34d399',
    }))
  }, [])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = clock.elapsedTime * 0.12
    groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.25) * 0.08
  })

  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[-3, 3, 4]} intensity={2.4} color="#22d3ee" />
      <pointLight position={[4, -1, 3]} intensity={2} color="#c084fc" />
      <group ref={groupRef}>
        <OrbitLines />
        <mesh>
          <icosahedronGeometry args={[0.72, 1]} />
          <meshStandardMaterial color="#07111f" emissive="#22d3ee" emissiveIntensity={0.34} metalness={0.86} roughness={0.18} />
        </mesh>
        <Text position={[0, -1.05, 0]} fontSize={0.18} color="#e0f2fe" anchorX="center" anchorY="middle">
          Frontend Stack
        </Text>
        {skills.map((skill, index) => (
          <SkillNode key={skill.label} skill={skill} index={index} />
        ))}
        {stars.map((star) => (
          <mesh key={star.id} position={star.position}>
            <sphereGeometry args={[0.025, 12, 12]} />
            <meshBasicMaterial color={star.color} transparent opacity={0.7} />
          </mesh>
        ))}
      </group>
    </>
  )
}

export default SkillsScene
