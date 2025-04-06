"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei"
import { motion } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import type * as THREE from "three"

// Simple contract document 3D model created with primitives
function ContractModel(props: any) {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2
    group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1
  })

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Simple document shape made with primitives */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 1.4, 0.1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0, 0.06]}>
        <boxGeometry args={[0.8, 0.2, 0.01]} />
        <meshStandardMaterial color="#2dd4bf" />
      </mesh>
      <mesh castShadow receiveShadow position={[0, -0.3, 0.06]}>
        <boxGeometry args={[0.8, 0.1, 0.01]} />
        <meshStandardMaterial color="#2dd4bf" opacity={0.7} transparent />
      </mesh>
      <mesh castShadow receiveShadow position={[0, -0.5, 0.06]}>
        <boxGeometry args={[0.8, 0.1, 0.01]} />
        <meshStandardMaterial color="#2dd4bf" opacity={0.5} transparent />
      </mesh>
    </group>
  )
}

export default function Hero3D() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative bg-red-200 h-full w-full min-h-[400px]">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <ContractModel position={[0, -0.5, 0]} />
        <Environment preset="city" />
        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={5} blur={2.4} />
        <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2} />
      </Canvas>

      <div className="absolute top-0  w-full h-full flex flex-col items-center justify-center pointer-events-none">
        <motion.div
          className="bg-gradient-to-r from-teal-500 to-emerald-500 p-4 rounded-lg shadow-xl text-white text-center max-w-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h3 className="text-lg font-bold">AI-Powered Analysis</h3>
          <p className="text-sm mt-1">Instantly extract insights from your contracts</p>
        </motion.div>
      </div>

      <div className="absolute bottom-4 left-0 w-full flex justify-center pointer-events-none">
        <Link href="/login" className="pointer-events-auto">
          <Button size="lg" className="gap-1.5">
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

/* 
To implement a custom 3D model:
1. Create or obtain a .glb 3D model file of a contract/document
2. Place it in the public folder (e.g., public/contract-model.glb)
3. Install required packages: npm install three @react-three/fiber @react-three/drei
4. Use useGLTF from @react-three/drei to load the model:

   import { useGLTF } from "@react-three/drei"
   
   function ContractModel(props) {
     const { nodes, materials } = useGLTF("/contract-model.glb")
     // Render the model using the nodes and materials
     return (
       <group {...props}>\
         {/* Your model components }*/ 
      //  </group>
    //  )
  //  }
   
   // Important: Preload the model
  //  useGLTF.preload("/contract-model.glb")


