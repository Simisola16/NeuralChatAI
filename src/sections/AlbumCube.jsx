import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { albumCubeConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Cube = ({ rotationProgress }) => {
  const meshRef = useRef(null);
  const { viewport } = useThree();

  const textures = useTexture(albumCubeConfig.cubeTextures);

  // Responsive cube size - smaller on mobile
  const cubeSize = Math.min(viewport.width * 0.35, 2.5);

  useFrame(() => {
    if (meshRef.current) {
      // Map rotation progress (0-1) to rotation angles
      const targetRotationY = rotationProgress * Math.PI * 2;
      const targetRotationX = Math.sin(rotationProgress * Math.PI) * 0.3;

      // Smooth interpolation
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotationY,
        0.1
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotationX,
        0.1
      );
    }
  });

  return (
    <mesh ref={meshRef} castShadow>
      <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
      {textures.map((texture, index) => (
        <meshStandardMaterial
          key={index}
          attach={`material-${index}`}
          map={texture}
          roughness={0.2}
          metalness={0.1}
        />
      ))}
    </mesh>
  );
};

const AlbumCube = () => {
  // Null check: if config is empty, do not render
  if (albumCubeConfig.albums.length === 0 || albumCubeConfig.cubeTextures.length === 0) {
    return null;
  }

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [rotationProgress, setRotationProgress] = useState(0);
  const [currentAlbumIndex, setCurrentAlbumIndex] = useState(0);
  const [blurAmount, setBlurAmount] = useState(0);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const scrollTriggerRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=300%',
      scrub: 1,
      pin: true,
      onUpdate: (self) => {
        const progress = self.progress;
        setRotationProgress(progress);

        // Calculate current album index
        const albumIndex = Math.min(
          Math.floor(progress * 4),
          albumCubeConfig.albums.length - 1
        );
        setCurrentAlbumIndex(albumIndex);

        // Velocity-based blur effect
        const velocity = Math.abs(self.getVelocity());
        const targetBlur = Math.min(velocity / 500, 8);
        const targetSpacing = Math.min(velocity / 100, 30);

        setBlurAmount(prev => prev + (targetBlur - prev) * 0.2);
        setLetterSpacing(prev => prev + (targetSpacing - prev) * 0.2);
      },
    });

    scrollTriggerRef.current = st;

    return () => {
      st.kill();
    };
  }, []);

  const currentAlbum = albumCubeConfig.albums[currentAlbumIndex];

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative w-full h-screen bg-void-black overflow-hidden"
    >
      {/* Background title with blur effect */}
      <div
        ref={titleRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        style={{
          filter: `blur(${blurAmount}px)`,
          letterSpacing: `${letterSpacing}px`,
        }}
      >
        <h2 className="font-display text-[15vw] md:text-[20vw] text-white/5 uppercase whitespace-nowrap select-none">
          {currentAlbum.subtitle}
        </h2>
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              intensity={1}
              castShadow
            />
            <spotLight
              position={[-10, -10, -10]}
              angle={0.15}
              penumbra={1}
              intensity={0.5}
              color="#9DC4FF"
            />
            <pointLight position={[0, 0, 5]} intensity={0.5} color="#00D4FF" />
            <Cube rotationProgress={rotationProgress} />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>

      {/* Album info overlay */}
      <div className="absolute bottom-8 md:bottom-12 left-4 md:left-12 z-20">
        <p className="font-mono-custom text-[10px] md:text-xs text-neon-soft/60 uppercase tracking-wider mb-1 md:mb-2">
          Feature {String(currentAlbum.id).padStart(2, '0')} / {String(albumCubeConfig.albums.length).padStart(2, '0')}
        </p>
        <h3 className="font-display text-3xl md:text-5xl lg:text-7xl text-white mb-1 md:mb-2 transition-all duration-300">
          {currentAlbum.title}
        </h3>
        <p className="font-mono-custom text-xs md:text-sm text-white/50">
          {currentAlbum.subtitle}
        </p>
      </div>

      {/* Progress indicator */}
      <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-20">
        <div className="flex flex-col gap-2 md:gap-3">
          {albumCubeConfig.albums.map((album, index) => (
            <div
              key={album.id}
              className={`w-1.5 md:w-2 rounded-full transition-all duration-300 ${
                index === currentAlbumIndex
                  ? 'bg-neon-cyan h-6 md:h-8'
                  : 'bg-white/20 h-1.5 md:h-2'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 md:bottom-12 right-4 md:right-12 z-20">
        <p className="font-mono-custom text-[10px] md:text-xs text-white/40 uppercase tracking-wider">
          {albumCubeConfig.scrollHint}
        </p>
      </div>

      {/* Decorative corner lines */}
      <div className="absolute top-8 md:top-12 left-4 md:left-12 w-12 md:w-20 h-px bg-gradient-to-r from-neon-cyan/50 to-transparent" />
      <div className="absolute top-8 md:top-12 left-4 md:left-12 w-px h-12 md:h-20 bg-gradient-to-b from-neon-cyan/50 to-transparent" />
    </section>
  );
};

export default AlbumCube;
