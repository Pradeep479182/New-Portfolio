/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Text, useTexture } from '@react-three/drei'
import { LinearFilter, SRGBColorSpace } from 'three'
import type { Group, Mesh } from 'three'
import profilePhoto from '../assets/photo1.jpeg'

function MonitorRig() {
  const groupRef = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.38) * 0.1
    groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.7) * 0.035
  })

  return (
    <group ref={groupRef} position={[0, -0.35, 0]}>
      <mesh position={[0, -1.38, -0.1]} receiveShadow>
        <boxGeometry args={[4.6, 0.24, 2.2]} />
        <meshStandardMaterial color="#07101f" metalness={0.55} roughness={0.24} />
      </mesh>

      <group position={[0, 0.08, -0.48]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.7, 2.15, 0.16]} />
          <meshStandardMaterial color="#06101e" metalness={0.78} roughness={0.18} />
        </mesh>
        <mesh position={[0, 0, 0.086]}>
          <planeGeometry args={[3.42, 1.88]} />
          <meshStandardMaterial
            color="#041426"
            emissive="#0ea5e9"
            emissiveIntensity={0.34}
            roughness={0.18}
            metalness={0.2}
          />
        </mesh>
        <mesh position={[-0.72, 0.25, 0.098]}>
          <planeGeometry args={[1.7, 0.34]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.26} />
        </mesh>
        <mesh position={[0.62, -0.2, 0.101]}>
          <planeGeometry args={[1.55, 0.26]} />
          <meshBasicMaterial color="#c084fc" transparent opacity={0.25} />
        </mesh>
        <mesh position={[0.18, -0.68, 0.102]}>
          <planeGeometry args={[2.42, 0.12]} />
          <meshBasicMaterial color="#34d399" transparent opacity={0.2} />
        </mesh>
      </group>

      <mesh position={[0, -1.04, -0.48]} castShadow>
        <boxGeometry args={[0.22, 0.9, 0.18]} />
        <meshStandardMaterial color="#101a2f" metalness={0.74} roughness={0.24} />
      </mesh>
      <mesh position={[0, -1.48, -0.35]} castShadow>
        <boxGeometry args={[1.35, 0.14, 0.8]} />
        <meshStandardMaterial color="#11182b" metalness={0.7} roughness={0.25} />
      </mesh>

      <mesh position={[0, -1.2, 0.8]} rotation={[0.08, 0, 0]}>
        <boxGeometry args={[2.6, 0.11, 0.72]} />
        <meshStandardMaterial color="#0b1527" metalness={0.68} roughness={0.32} />
      </mesh>
      {Array.from({ length: 9 }).map((_, index) => (
        <mesh key={index} position={[-1.05 + index * 0.26, -1.11, 0.45]} rotation={[0.08, 0, 0]}>
          <boxGeometry args={[0.16, 0.035, 0.08]} />
          <meshStandardMaterial color="#11233a" emissive={index % 2 ? '#22d3ee' : '#c084fc'} emissiveIntensity={0.25} />
        </mesh>
      ))}
    </group>
  )
}

function HologramProfile() {
  const ringRef = useRef<Mesh>(null)
  const coreRef = useRef<Group>(null)
  const profileTexture = useTexture(profilePhoto)

  useEffect(() => {
    profileTexture.colorSpace = SRGBColorSpace
    profileTexture.minFilter = LinearFilter
    profileTexture.magFilter = LinearFilter
    profileTexture.repeat.set(0.72, 0.72)
    profileTexture.offset.set(0.14, 0.14)
    profileTexture.needsUpdate = true
  }, [profileTexture])

  useFrame(({ clock }) => {
    const time = clock.elapsedTime

    if (ringRef.current) {
      ringRef.current.rotation.x = time * 0.45
      ringRef.current.rotation.y = time * 0.32
    }

    if (coreRef.current) {
      coreRef.current.position.y = Math.sin(time * 1.1) * 0.08
      coreRef.current.rotation.y = Math.sin(time * 0.5) * 0.18
    }
  })

  return (
    <Float floatIntensity={1} rotationIntensity={0.35} speed={1.15}>
      <group position={[0, 0.55, 0.55]} ref={coreRef}>
        <mesh castShadow>
          <sphereGeometry args={[0.55, 48, 48]} />
          <meshStandardMaterial color="#0d1b2d" emissive="#22d3ee" emissiveIntensity={0.34} metalness={0.7} roughness={0.18} />
        </mesh>
        <mesh position={[0, 0, 0.57]} castShadow>
          <circleGeometry args={[0.76, 128]} />
          <meshBasicMaterial map={profileTexture} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0, 0.585]}>
          <torusGeometry args={[0.775, 0.022, 16, 128]} />
          <meshBasicMaterial color="#a5f3fc" transparent opacity={0.86} />
        </mesh>
        <mesh position={[0, -0.74, 0]} castShadow>
          <capsuleGeometry args={[0.48, 0.72, 12, 24]} />
          <meshStandardMaterial color="#11172b" emissive="#c084fc" emissiveIntensity={0.24} metalness={0.55} roughness={0.28} />
        </mesh>
        <mesh ref={ringRef}>
          <torusGeometry args={[0.92, 0.016, 16, 100]} />
          <meshBasicMaterial color="#67e8f9" transparent opacity={0.78} />
        </mesh>
        <mesh rotation={[Math.PI / 2.6, 0, 0.5]}>
          <torusGeometry args={[1.22, 0.012, 16, 100]} />
          <meshBasicMaterial color="#f0abfc" transparent opacity={0.52} />
        </mesh>
        <Text position={[0, -1.36, 0.05]} fontSize={0.18} color="#e0f2fe" anchorX="center" anchorY="middle">
          UX/UI + Frontend
        </Text>
      </group>
    </Float>
  )
}

function FloatingPanels() {
  return (
    <group>
      {[
        [-1.85, 1.2, 0.35, 'React'],
        [1.78, 0.85, 0.25, 'R3F'],
        [-1.72, -0.55, 0.5, 'Figma'],
        [1.62, -0.68, 0.55, 'TypeScript'],
      ].map(([x, y, z, label], index) => (
        <Float key={label} floatIntensity={1.3} rotationIntensity={0.45} speed={1.1 + index * 0.16}>
          <group position={[x, y, z]} rotation={[0.08, index % 2 ? -0.34 : 0.34, 0]}>
            <mesh>
              <boxGeometry args={[1.12, 0.42, 0.035]} />
              <meshStandardMaterial
                color="#06101f"
                emissive={index % 2 ? '#c084fc' : '#22d3ee'}
                emissiveIntensity={0.35}
                metalness={0.55}
                roughness={0.18}
                transparent
                opacity={0.9}
              />
            </mesh>
            <Text position={[0, 0, 0.04]} fontSize={0.115} color="#f8fafc" anchorX="center" anchorY="middle">
              {label}
            </Text>
          </group>
        </Float>
      ))}
    </group>
  )
}

export function HeroScene() {
  return (
    <>
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#02040b', 8, 18]} />
      <ambientLight intensity={0.62} />
      <directionalLight position={[4.6, 5.5, 4]} intensity={1.2} color="#e0f2fe" castShadow />
      <pointLight position={[-2.8, 2.4, 2.6]} intensity={2.2} color="#22d3ee" distance={8} />
      <pointLight position={[3, 1.3, 3.2]} intensity={1.9} color="#c084fc" distance={8} />
      <spotLight position={[0, 5, 5]} intensity={1.35} color="#ffffff" angle={0.4} penumbra={0.72} castShadow />
      <MonitorRig />
      <HologramProfile />
      <FloatingPanels />
      <Text
        position={[0, 2.05, -0.35]}
        fontSize={0.42}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.012}
        outlineColor="#22d3ee"
      >
        NATPU
      </Text>
    </>
  )
}

export default HeroScene
