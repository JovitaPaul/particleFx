import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ParticleApp from './components/ParticleApp';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import Home from './components/Home';
import About from './components/About';
import Features from './components/Features';
import Download from './components/Download';
import Contact from './components/Contact';

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<ParticleApp />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/download" element={<Download />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
