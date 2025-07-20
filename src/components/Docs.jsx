
import React from 'react';

const Docs = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-2">package-pariclefx</h1>
          <p className="text-lg text-gray-400">
            A lightweight, framework-agnostic JavaScript library for interactive particle-based image hover effects.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-gray-700 pb-2">Features</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li><strong>Image-to-Particles:</strong> Convert any image into animated particles.</li>
            <li><strong>Dynamic Interactions:</strong> Particles respond to mouse hover, clicks, and even a vortex mode.</li>
            <li><strong>Visual Customization:</strong> Apply color filters, hue rotation, and choose particle shapes.</li>
            <li><strong>Framework Agnostic:</strong> Works with React, Vue, Angular, or vanilla JS.</li>
            <li><strong>Highly Configurable:</strong> Fine-tune particle behavior, forces, and appearance.</li>
            <li><strong>Responsive:</strong> Automatically adapts to container size.</li>
            <li><strong>Image Download:</strong> Save the current canvas state as a PNG image.</li>
            <li><strong>TypeScript Support:</strong> Full type definitions included.</li>
            <li><strong>Lightweight:</strong> Zero dependencies, pure JavaScript.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-gray-700 pb-2">Installation</h2>
          <div className="bg-gray-800 rounded-lg p-4">
            <code className="text-sm text-white">npm install package-pariclefx</code>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-gray-700 pb-2">Quick Start</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Vanilla JavaScript</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <pre><code className="text-sm text-white">
{`import { createParticleCanvas } from 'package-pariclefx';

const container = document.getElementById('my-container');
const particleCanvas = createParticleCanvas(container, {
  imageSrc: 'path/to/your/image.jpg',
  width: 600,
  height: 400,
  particleGap: 3,
  mouseForce: 50,
  filter: 'sepia',
  particleShape: 'circle',
});

particleCanvas.explodeParticles();
particleCanvas.resetParticles();
particleCanvas.downloadImage('my-particle-art.png');`}
                </code></pre>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">React</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <pre><code className="text-sm text-white">
{`import React, { useRef, useEffect, useState } from 'react';
import { createParticleCanvas } from 'package-pariclefx';

function ParticleComponent() {
  const containerRef = useRef(null);
  const particleCanvasRef = useRef(null);
  const [config, setConfig] = useState({
    imageSrc: '/my-image.png',
    particleGap: 4,
    mouseForce: 30,
    hueRotation: 180,
    vortexMode: true,
  });

  useEffect(() => {
    if (containerRef.current) {
      particleCanvasRef.current = createParticleCanvas(containerRef.current, config);
    }
    return () => particleCanvasRef.current?.destroy();
  }, [config]);

  return (
    <div>
      <div ref={containerRef} style={{ width: '500px', height: '300px' }} />
      <button onClick={() => particleCanvasRef.current?.explodeParticles()}>Explode</button>
      <button onClick={() => particleCanvasRef.current?.resetParticles()}>Reset</button>
      <button onClick={() => particleCanvasRef.current?.downloadImage()}>Download</button>
    </div>
  );
}`}
                </code></pre>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-gray-700 pb-2">Configuration Options</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 rounded-lg">
              <thead>
                <tr className="bg-gray-700">
                  <th className="p-4 text-left">Option</th>
                  <th className="p-4 text-left">Type</th>
                  <th className="p-4 text-left">Default</th>
                  <th className="p-4 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { option: 'imageSrc', type: 'string', default: 'Built-in gradient', description: 'Path or data URL of the image to convert' },
                  { option: 'width', type: 'number', default: '400', description: 'Canvas width in pixels' },
                  { option: 'height', type: 'number', default: '400', description: 'Canvas height in pixels' },
                  { option: 'particleGap', type: 'number', default: '4', description: 'Spacing between particles (lower = more particles)' },
                  { option: 'mouseForce', type: 'number', default: '30', description: 'Strength of mouse repulsion effect' },
                  { option: 'gravity', type: 'number', default: '0.08', description: 'Force pulling particles back to origin' },
                  { option: 'noise', type: 'number', default: '10', description: 'Random movement applied to particles' },
                  { option: 'clickStrength', type: 'number', default: '100', description: 'Force applied when clicking on canvas' },
                  { option: 'hueRotation', type: 'number', default: '0', description: 'Rotates the hue of particle colors (0-360 degrees)' },
                  { option: 'filter', type: "'none' | 'grayscale' | 'sepia' | 'invert'", default: "'none'", description: 'Applies a color filter to particles' },
                  { option: 'particleShape', type: "'square' | 'circle' | 'triangle'", default: "'square'", description: 'Shape of individual particles' },
                  { option: 'vortexMode', type: 'boolean', default: 'false', description: 'If true, clicks create a vortex effect instead of a ripple' },
                ].map((item, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="p-4 font-mono">{item.option}</td>
                    <td className="p-4 font-mono">{item.type}</td>
                    <td className="p-4 font-mono">{item.default}</td>
                    <td className="p-4">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-gray-700 pb-2">API Reference</h2>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Methods</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li><strong>resetParticles():</strong> Resets all particles to their original positions.</li>
              <li><strong>explodeParticles():</strong> Applies random outward forces to all particles.</li>
              <li><strong>updateConfig(newOptions):</strong> Updates configuration options dynamically.</li>
              <li><strong>downloadImage(filename?):</strong> Downloads the current canvas content as a PNG image.</li>
              <li><strong>destroy():</strong> Stops animation and removes the canvas from DOM.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Docs;
