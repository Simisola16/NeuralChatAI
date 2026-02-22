import { useEffect } from 'react';
import './index.css';
import useLenis from './hooks/useLenis';
import { siteConfig } from './config';
import Hero from './sections/Hero';
import AlbumCube from './sections/AlbumCube';
import Features from './sections/Features';
import Solutions from './sections/Solutions';
import Stats from './sections/Stats';
import ParallaxGallery from './sections/ParallaxGallery';
import Pricing from './sections/Pricing';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  // Initialize Lenis smooth scrolling
  useLenis();

  useEffect(() => {
    // Set page title from config
    if (siteConfig.title) {
      document.title = siteConfig.title;
    }

    // Add viewport meta for better mobile experience
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-void-black overflow-x-hidden">
      {/* Hero Section - Immersive landing */}
      <Hero />

      {/* Stats Section - Key metrics */}
      <Stats />

      {/* Album Cube Section - 3D showcase */}
      <AlbumCube />

      {/* Features Section - Platform capabilities */}
      <Features />

      {/* Solutions Section - Industry solutions */}
      <Solutions />

      {/* Parallax Gallery Section */}
      <ParallaxGallery />

      {/* Pricing Section */}
      <Pricing />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Contact Section */}
      <Contact />

      {/* Footer Section */}
      <Footer />
    </main>
  );
}

export default App;
