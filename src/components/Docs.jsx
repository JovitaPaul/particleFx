import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const Docs = () => {
  const configOptions = [
    {
      option: "preset",
      type: "'fireworks' | 'snow' | 'galaxy' | 'rain'",
      default: "undefined",
      description: "Applies a pre-configured set of options",
    },
    {
      option: "imageSrc",
      type: "string",
      default: "Built-in gradient",
      description: "Path or data URL of the image to convert",
    },
    {
      option: "width",
      type: "number | string",
      default: "400",
      description: "Canvas width in pixels or string with units (e.g., '100vw')",
    },
    {
      option: "height",
      type: "number | string",
      default: "400",
      description: "Canvas height in pixels or string with units (e.g., '100vh')",
    },
    {
      option: "particleGap",
      type: "number",
      default: "4",
      description: "Spacing between particles (lower = more particles)",
    },
    {
      option: "mouseForce",
      type: "number",
      default: "30",
      description: "Strength of mouse repulsion effect",
    },
    {
      option: "gravity",
      type: "number",
      default: "0.08",
      description: "Force pulling particles back to origin",
    },
    {
      option: "noise",
      type: "number",
      default: "10",
      description: "Random movement applied to particles",
    },
    {
      option: "clickStrength",
      type: "number",
      default: "100",
      description: "Force applied when clicking on canvas",
    },
    {
      option: "hueRotation",
      type: "number",
      default: "0",
      description: "Rotates the hue of particle colors (0-360 degrees)",
    },
    {
      option: "filter",
      type: "'none' | 'grayscale' | 'sepia' | 'invert'",
      default: "'none'",
      description: "Applies a color filter to particles",
    },
    {
      option: "particleShape",
      type: "'square' | 'circle' | 'triangle'",
      default: "'square'",
      description: "Shape of individual particles",
    },
    {
      option: "vortexMode",
      type: "boolean",
      default: "false",
      description: "If true, clicks create a vortex effect instead of a ripple",
    },
  ];

  const apiMethods = [
    {
      name: "resetParticles()",
      description: "Resets all particles to their original positions with minimal random offset.",
    },
    {
      name: "explodeParticles()",
      description: "Applies random outward forces to all particles, creating an explosion effect.",
    },
    {
      name: "updateConfig(newOptions)",
      description: "Updates configuration options dynamically. Only changed options need to be provided.",
    },
    {
      name: "downloadImage(filename?)",
      description: "Downloads the current canvas content as a PNG image.",
    },
    {
      name: "destroy()",
      description: "Stops animation and removes the canvas from DOM. Call this for cleanup.",
    },
    {
      name: "getParticleCount()",
      description: "Returns the current number of particles.",
    },
    {
      name: "getConfig()",
      description: "Returns a copy of the current configuration.",
    },
    {
      name: "stopAnimation()",
      description: "Stops the animation loop manually.",
    },
    {
      name: "startAnimation()",
      description: "Starts the animation loop manually.",
    },
  ];

  const features = [
    "Image-to-Particles: Convert any image into animated particles",
    "Dynamic Interactions: Particles respond to mouse hover, clicks, and even a vortex mode",
    "Visual Customization: Apply color filters (grayscale, sepia, invert), hue rotation, and choose particle shapes",
    "Framework Agnostic: Works seamlessly with React, Vue, Angular, or vanilla JS",
    "Highly Configurable: Fine-tune particle behavior, forces, and appearance",
    "Responsive: Automatically adapts to container size",
    "Image Download: Save the current canvas state as a PNG image",
    "TypeScript Support: Full type definitions included",
    "Lightweight: Zero dependencies, pure JavaScript"
  ];

  const whatsNew = [
    "Responsive Units: width and height now accept responsive units like '100vw', '80vh', or '50%'",
    "Presets: Quickly apply stunning visual styles with pre-configured presets like 'fireworks', 'snow', 'galaxy', and 'rain'",
    "New Default Image: A vibrant, dynamically generated placeholder image is now used by default",
    "Improved Mouse Detection: Replaced mouseout with mouseleave for more reliable event handling"
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container max-w-5xl mx-auto py-12 px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            package-particlefx
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A lightweight, framework-agnostic JavaScript library that renders interactive
            particle-based image hover effects using canvas. Customize particle behavior with
            extensive options for physics, visual effects, and user interaction.
          </p>
        </div>

        {/* What's New */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-3xl font-semibold">What's New in 1.2.0</h2>
            <Badge variant="default">Latest</Badge>
          </div>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {whatsNew.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-secondary-foreground rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md">
                <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                  Breaking Changes:
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  The <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">unit</code> option has been removed. 
                  Instead, specify units directly in the width and height properties (e.g., <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">width: '100vw'</code>).
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Features */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-3xl font-semibold">Features</h2>
          </div>
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-secondary-foreground rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Installation */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-3xl font-semibold">Installation</h2>
          </div>
          <Card>
            <CardContent className="pt-6">
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code className="text-sm font-mono">
                  npm install package-particlefx
                </code>
              </pre>
            </CardContent>
          </Card>
        </section>

        {/* Quick Start */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-3xl font-semibold">Quick Start</h2>
          </div>

          <div className="space-y-8">
            {/* Vanilla JS */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Vanilla JavaScript
                  <Badge variant="secondary">JavaScript</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                  <code>{`import { createParticleCanvas } from 'package-particlefx';

const container = document.getElementById('my-container');
const particleCanvas = createParticleCanvas(container, {
  preset: 'fireworks', // Use a preset for a quick start
  width: '100vw',      // Responsive width
  height: '100vh',     // Responsive height
});

// Control the animation
particleCanvas.explodeParticles();
particleCanvas.resetParticles();
particleCanvas.downloadImage('my-particle-art.png');`}</code>
                </pre>
              </CardContent>
            </Card>

            {/* React */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  React
                  <Badge variant="secondary">React</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                  <code>{`import React, { useRef, useEffect, useState } from 'react';
import { createParticleCanvas } from 'package-particlefx';

function ParticleComponent() {
  const containerRef = useRef(null);
  const particleCanvasRef = useRef(null);
  const [config, setConfig] = useState({
    preset: 'galaxy',
    width: '100%',
    height: '400px',
  });

  useEffect(() => {
    if (containerRef.current) {
      particleCanvasRef.current = createParticleCanvas(containerRef.current, config);
    }

    return () => {
      particleCanvasRef.current?.destroy();
    };
  }, [config]);

  const handleExplode = () => {
    particleCanvasRef.current?.explodeParticles();
  };

  const handleReset = () => {
    particleCanvasRef.current?.resetParticles();
  };

  const handleDownload = () => {
    particleCanvasRef.current?.downloadImage();
  };

  return (
    <div>
      <div ref={containerRef} style={{ width: '100%', height: '400px' }} />
      <button onClick={handleExplode}>Explode</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleDownload}>Download</button>
      <button onClick={() => setConfig(prev => ({ ...prev, preset: 'snow' }))}>
        Change to Snow
      </button>
    </div>
  );
}

export default ParticleComponent;`}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Configuration Options */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-3xl font-semibold">Configuration Options</h2>
          </div>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold">Option</th>
                      <th className="text-left p-4 font-semibold">Type</th>
                      <th className="text-left p-4 font-semibold">Default</th>
                      <th className="text-left p-4 font-semibold">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {configOptions.map((item, index) => (
                      <tr key={index} className="border-b last:border-b-0">
                        <td className="p-4 font-mono text-sm">{item.option}</td>
                        <td className="p-4 font-mono text-sm text-muted-foreground">
                          {item.type}
                        </td>
                        <td className="p-4 font-mono text-sm">
                          {item.default}
                        </td>
                        <td className="p-4 text-sm">{item.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* API Reference */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-3xl font-semibold">API Reference</h2>
          </div>

          <div className="space-y-6">
            {/* createParticleCanvas */}
            <Card>
              <CardHeader>
                <CardTitle>createParticleCanvas(container, options)</CardTitle>
                <CardDescription>
                  Creates a new particle canvas instance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <strong className="text-sm">Parameters:</strong>
                    <ul className="text-sm text-muted-foreground ml-4 mt-1">
                      <li>• <code>container</code> (Element|string): DOM element or CSS selector</li>
                      <li>• <code>options</code> (Object): Configuration options</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-sm">Returns:</strong>
                    <span className="text-sm text-muted-foreground ml-2">ParticleCanvas instance</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Methods */}
            <Card>
              <CardHeader>
                <CardTitle>ParticleCanvas Methods</CardTitle>
                <CardDescription>
                  Available methods for controlling particle behavior
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {apiMethods.map((method, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono text-xs">
                        {method.name}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground ml-2">
                      {method.description}
                    </p>
                    {index < apiMethods.length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Example Usage */}
            <Card>
              <CardHeader>
                <CardTitle>Example: updateConfig()</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                  <code>{`particleCanvas.updateConfig({
  mouseForce: 80,
  gravity: 0.12,
  particleGap: 2,
  filter: 'grayscale'
});`}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Performance Tips */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-3xl font-semibold">Performance Tips</h2>
          </div>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary-foreground rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-sm">Particle Gap:</strong>
                    <span className="text-sm text-muted-foreground ml-2">
                      Higher values (4-8) create fewer particles and better performance
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary-foreground rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-sm">Image Size:</strong>
                    <span className="text-sm text-muted-foreground ml-2">
                      Smaller images process faster during initialization
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary-foreground rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-sm">Canvas Size:</strong>
                    <span className="text-sm text-muted-foreground ml-2">
                      Larger canvases require more computational power
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary-foreground rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-sm">Mobile:</strong>
                    <span className="text-sm text-muted-foreground ml-2">
                      Consider reducing particle count on mobile devices
                    </span>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Browser Support */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-3xl font-semibold">Browser Support</h2>
          </div>
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center border rounded-lg p-4">
                  <div className="font-semibold text-sm mb-1">Chrome</div>
                  <div className="text-xs text-muted-foreground">Version 60+</div>
                </div>
                <div className="text-center border rounded-lg p-4">
                  <div className="font-semibold text-sm mb-1">Firefox</div>
                  <div className="text-xs text-muted-foreground">Version 55+</div>
                </div>
                <div className="text-center border rounded-lg p-4">
                  <div className="font-semibold text-sm mb-1">Safari</div>
                  <div className="text-xs text-muted-foreground">Version 12+</div>
                </div>
                <div className="text-center border rounded-lg p-4">
                  <div className="font-semibold text-sm mb-1">Edge</div>
                  <div className="text-xs text-muted-foreground">Version 79+</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Docs;