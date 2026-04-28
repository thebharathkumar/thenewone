import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'

const InteractiveThermalGlow = () => {
  const lightRef = useRef()
  const meshRef = useRef()
  const { viewport } = useThree()

  useFrame(({ mouse }) => {
    const x = (mouse.x * viewport.width) / 2
    const y = (mouse.y * viewport.height) / 2
    if (lightRef.current && meshRef.current) {
      lightRef.current.position.lerp(new THREE.Vector3(x, y, 1), 0.15)
      meshRef.current.position.lerp(new THREE.Vector3(x, y, 0), 0.15)
    }
  })

  return (
    <>
      <pointLight ref={lightRef} color="#fb923c" intensity={4} distance={6} decay={2} />
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </mesh>
    </>
  )
}

const NeuralNetwork = ({ color }) => {
  const pointsRef = useRef()
  const linesRef = useRef()

  const { positions, linePositions } = useMemo(() => {
    const nodeCount = 28
    const pos = []
    const nodes = []
    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 10
      const y = (Math.random() - 0.5) * 6
      const z = (Math.random() - 0.5) * 5
      nodes.push([x, y, z])
      pos.push(x, y, z)
    }
    const linePos = []
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = nodes[i][0] - nodes[j][0]
        const dy = nodes[i][1] - nodes[j][1]
        const dz = nodes[i][2] - nodes[j][2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (dist < 3.5) linePos.push(...nodes[i], ...nodes[j])
      }
    }
    return { positions: new Float32Array(pos), linePositions: new Float32Array(linePos) }
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.05
      pointsRef.current.rotation.x = Math.sin(t * 0.03) * 0.1
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = t * 0.05
      linesRef.current.rotation.x = Math.sin(t * 0.03) * 0.1
    }
  })

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.1} color={color} transparent opacity={0.8} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.1} />
      </lineSegments>
    </>
  )
}

const PulsingOrb = ({ position, color, speed = 1 }) => {
  const meshRef = useRef()
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.4
      const s = 1 + Math.sin(state.clock.elapsedTime * speed * 1.5) * 0.1
      meshRef.current.scale.setScalar(s)
    }
  })
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.28, 24, 24]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} transparent opacity={0.8} />
    </mesh>
  )
}

const RotatingRing = ({ color }) => {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3
      ref.current.rotation.z = state.clock.elapsedTime * 0.2
    }
  })
  return (
    <mesh ref={ref} position={[0, 0, -2]}>
      <torusGeometry args={[2.5, 0.014, 8, 120]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.55} />
    </mesh>
  )
}

const FloatingRing = ({ color }) => {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.PI / 3 + state.clock.elapsedTime * 0.15
      ref.current.rotation.y = state.clock.elapsedTime * 0.1
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
  })
  return (
    <mesh ref={ref} position={[3, 0.5, 0]}>
      <torusGeometry args={[1, 0.011, 8, 80]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.5} />
    </mesh>
  )
}

const HeroCanvas = ({ isLight, bgColor, cCyan, cPurple, cPink }) => (
  <Canvas
    camera={{ position: [0, 0, 7], fov: 60 }}
    dpr={[1, 1.75]}
    gl={{ antialias: true, powerPreference: 'high-performance' }}
  >
    <color attach="background" args={[bgColor]} />
    <ambientLight intensity={isLight ? 0.8 : 0.4} />
    <pointLight position={[5, 5, 5]} intensity={1.2} color={cCyan} />
    <pointLight position={[-5, -5, 3]} intensity={0.8} color={cPurple} />
    <pointLight position={[0, 8, -4]} intensity={0.6} color={cPink} />

    {!isLight && <Stars radius={60} depth={40} count={700} factor={3} saturation={0} fade speed={0.4} />}
    <NeuralNetwork color={cCyan} />
    <RotatingRing color={cPurple} />
    <FloatingRing color={cPink} />
    <PulsingOrb position={[-3.5, 1.5, 0]} color={cCyan} speed={0.8} />
    <PulsingOrb position={[4, -1.5, -1]} color={cPurple} speed={1.2} />
    <PulsingOrb position={[-1, -2, 1]} color={cPink} speed={0.6} />

    {isLight && <InteractiveThermalGlow />}

    <OrbitControls
      enableZoom={false}
      enablePan={false}
      autoRotate
      autoRotateSpeed={0.4}
      maxPolarAngle={Math.PI / 1.8}
      minPolarAngle={Math.PI / 3}
    />
  </Canvas>
)

export default HeroCanvas
