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
      option: "imageSrc",
      type: "string",
      default: "Built-in gradient",
      description: "Path or data URL of the image to convert",
    },
    {
      option: "width",
      type: "number",
      default: "400",
      description: "Canvas width in pixels",
    },
    {
      option: "height",
      type: "number",
      default: "400",
      description: "Canvas height in pixels",
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
      description: "Resets all particles to their original positions.",
    },
    {
      name: "explodeParticles()",
      description: "Applies random outward forces to all particles.",
    },
    {
      name: "updateConfig(newOptions)",
      description: "Updates configuration options dynamically.",
    },
    {
      name: "downloadImage(filename?)",
      description: "Downloads the current canvas content as a PNG image.",
    },
    {
      name: "destroy()",
      description: "Stops animation and removes the canvas from DOM.",
    },
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
            A lightweight, framework-agnostic JavaScript library for interactive
            particle-based image hover effects.
          </p>
        </div>

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
  imageSrc: 'path/to/your/image.jpg',
});`}</code>
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
                  <code>{`import React, { useRef, useState } from 'react';
import { createParticleCanvas } from 'package-particlefx';

function ParticleComponent() {
  const containerRef = useRef(null);
  const [config, setConfig] = useState({
    imageSrc: '/my-image.png',
  });

  return (
    <div>
      <div ref={containerRef} style={{ width: '500px', height: '300px' }} />
    </div>
  );
}`}</code>
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
        <section>
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-3xl font-semibold">API Reference</h2>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Methods</CardTitle>
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
        </section>
      </div>
    </div>
  );
};

export default Docs;
