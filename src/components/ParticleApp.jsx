"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import ParticleCanvas from "./ParticleCanvas";
import ParticleControls from "./ParticleControl";
import MobileBottomSheet from "./MobileBottomSheet";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Zap,
  MousePointer,
  Settings,
  ExternalLink,
  Code,
  Github,
  Star,
} from "lucide-react";
import CodeTabs from "./CodeTabs";

const ParticleApp = () => {
  // Default configuration
  const [config, setConfig] = useState({
    particleGap: 4,
    mouseForce: 45,
    gravity: 0.08,
    noise: 10,
    clickStrength: 100,
    particleShape: "square",
    hueRotation: 0,
    vortexMode: false,
  });

  const controlSections = [
    {
      title: "Physics",
      icon: Settings,
      controls: [
        {
          key: "particleGap",
          label: "Particle Gap",
          min: 2,
          max: 10,
          step: 1,
          description: "Spacing between particles",
        },
        {
          key: "gravity",
          label: "Gravity",
          min: 0.01,
          max: 0.2,
          step: 0.01,
          description: "Return force strength",
        },
        {
          key: "noise",
          label: "Noise",
          min: 0,
          max: 50,
          step: 1,
          description: "Random movement",
        },
      ],
    },
    {
      title: "Interaction",
      icon: MousePointer,
      controls: [
        {
          key: "mouseForce",
          label: "Mouse Force",
          min: 10,
          max: 100,
          step: 1,
          description: "Mouse repulsion strength",
        },
        {
          key: "clickStrength",
          label: "Click Power",
          min: 0,
          max: 200,
          step: 1,
          description: "Click interaction force",
        },
      ],
    },
  ];

  // Default image URL
  const [imageUrl, setImageUrl] = useState("favicon_io/img.png");

  // Triggers for actions
  const [resetTrigger, setResetTrigger] = useState(0);
  const [explodeTrigger, setExplodeTrigger] = useState(0);

  // Particle system info
  const [particleInfo, setParticleInfo] = useState({
    particleCount: 0,
    speed: 1,
    gravityFactor: 0.92,
  });

  // Handlers
  const handleConfigChange = useCallback((newConfig) => {
    setConfig(newConfig);
  }, []);

  const handleReset = useCallback(() => {
    setResetTrigger((prev) => prev + 1);
  }, []);

  const handleExplode = useCallback(() => {
    setExplodeTrigger((prev) => prev + 1);
  }, []);

  const handleRandomize = () => {
    const newConfig = { ...config };

    controlSections.forEach((section) => {
      section.controls.forEach((ctrl) => {
        const rand = ctrl.min + Math.random() * (ctrl.max - ctrl.min);
        const steps = Math.round((rand - ctrl.min) / ctrl.step);
        newConfig[ctrl.key] = +(ctrl.min + steps * ctrl.step).toFixed(2); // 2 decimals
      });
    });

    setConfig(newConfig);
    setResetTrigger((prev) => prev + 1);
  };

  const handleImageLoad = useCallback((newImageUrl) => {
    setImageUrl(newImageUrl);
  }, []);

  const handleParticlesInit = useCallback((info) => {
    setParticleInfo(info);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center space-y-6 mb-12"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center justify-center space-x-3"
            >
              <div className="relative">
                <Sparkles className="h-12 w-12 lg:h-16 lg:w-16 text-primary" />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  ParticleFX
                </h1>
                <p className="text-sm md:text-base text-muted-foreground font-mono">
                  package-particlefx playground
                </p>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-md md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              Interactive playground for{" "}
              <a
                href="https://www.npmjs.com/package/package-particlefx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-colors font-semibold underline decoration-primary/30 hover:decoration-accent/50"
              >
                package-particlefx
              </a>{" "}
              — Transform images into stunning particle effects with real-time
              customization.
            </motion.p>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              <Button asChild variant="outline" size="sm">
                <a
                  href="https://github.com/Anmol-TheDev/package-particleFx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  <Star className="h-4 w-4" />
                  Star on GitHub
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a
                  href="https://www.npmjs.com/package/package-particlefx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  NPM Package
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href="/docs">
                  <Code className="h-4 w-4 mr-2" />
                  Documentation
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href="/features">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Features
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Stats */}
          {particleInfo.particleCount > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              <Badge
                variant="secondary"
                className="px-3 py-1.5 text-sm bg-primary/10 text-primary border-primary/20"
              >
                <Zap className="h-4 w-4 mr-2" />
                {particleInfo.particleCount.toLocaleString()} Particles
              </Badge>
              <Badge
                variant="secondary"
                className="px-3 py-1.5 text-sm bg-accent/10 text-accent border-accent/20"
              >
                <MousePointer className="h-4 w-4 mr-2" />
                Speed: {particleInfo.speed.toFixed(2)}x
              </Badge>
            </motion.div>
          )}
        </motion.div>

        {/* Main Playground Layout - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Canvas Section - Left Side (2/3 width on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="p-6 bg-card/50 border-2 border-primary/20 shadow-2xl h-full">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                      Interactive Canvas
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Hover to attract • Click for ripples • Drag to interact
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      Live Preview
                    </Badge>
                  </div>
                </div>

                <div className="flex justify-center">
                  <ParticleCanvas
                    config={config}
                    imageUrl={imageUrl}
                    resetTrigger={resetTrigger}
                    explodeTrigger={explodeTrigger}
                    onParticlesInit={handleParticlesInit}
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Controls Section - Right Side (1/3 width on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1"
          >
            {/* Desktop Controls - Always visible on desktop */}
            <div className="hidden lg:block h-full">
              <ParticleControls
                config={config}
                onConfigChange={handleConfigChange}
                onReset={handleReset}
                onExplode={handleExplode}
                onRandomize={handleRandomize}
                onImageLoad={handleImageLoad}
                onClose={() => {}}
              />
            </div>

            {/* Mobile Bottom Sheet - Only visible on mobile */}
            <div className="lg:hidden">
              <MobileBottomSheet
                config={config}
                onConfigChange={handleConfigChange}
                onReset={handleReset}
                onExplode={handleExplode}
                onRandomize={handleRandomize}
                onImageLoad={handleImageLoad}
              />
            </div>
          </motion.div>
        </div>

        {/* Installation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="p-8 bg-card/30 border-primary/10">
            <div className="text-center space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold">
                Ready to Use package-particlefx?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Install the package and start creating amazing particle effects
                in your projects
              </p>
              <div className="mx-auto w-full max-w-lg">
                <CodeTabs />
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <a href="/docs">
                    <Code className="mr-2 h-5 w-5" />
                    Get Started
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a
                    href="https://www.npmjs.com/package/package-particlefx"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    View on NPM
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a
                    href="https://github.com/Anmol-TheDev/package-particleFx"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-5 w-5" />
                    GitHub Repository
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ParticleApp;
