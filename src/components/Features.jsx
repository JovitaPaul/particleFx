"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sparkles,
  MousePointer,
  Palette,
  Zap,
  Download,
  Code,
  Smartphone,
  Globe,
  Settings,
  ImageIcon,
  ExternalLink,
  CheckCircle,
} from "lucide-react"

const Features = () => {
  const features = [
    {
      icon: ImageIcon,
      title: "Image-to-Particles Conversion",
      description:
        "Transform any image into animated particles with pixel-perfect accuracy. Supports PNG, JPG, SVG, and data URLs.",
      category: "Core",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: MousePointer,
      title: "Dynamic Mouse Interactions",
      description:
        "Particles respond to mouse hover, clicks, and movement. Includes repulsion forces and vortex mode for engaging user experiences.",
      category: "Interaction",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Palette,
      title: "Visual Customization",
      description:
        "Apply color filters (grayscale, sepia, invert), hue rotation (0-360°), and choose from multiple particle shapes.",
      category: "Styling",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Globe,
      title: "Framework Agnostic",
      description:
        "Works seamlessly with React, Vue, Angular, Svelte, or vanilla JavaScript. No framework dependencies required.",
      category: "Compatibility",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Settings,
      title: "Highly Configurable",
      description:
        "Fine-tune particle behavior with 12+ configuration options including gravity, noise, forces, and animation parameters.",
      category: "Customization",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description:
        "Automatically adapts to container size and device dimensions. Optimized for both desktop and mobile experiences.",
      category: "Responsive",
      color: "from-teal-500 to-blue-500",
    },
    {
      icon: Download,
      title: "Image Export",
      description:
        "Save the current particle state as a PNG image. Perfect for creating unique artwork and sharing creations.",
      category: "Export",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Code,
      title: "TypeScript Support",
      description:
        "Full type definitions included for better development experience. IntelliSense support in VS Code and other editors.",
      category: "Developer",
      color: "from-violet-500 to-purple-500",
    },
    {
      icon: Zap,
      title: "Zero Dependencies",
      description:
        "Lightweight pure JavaScript implementation with no external dependencies. Minimal bundle size impact.",
      category: "Performance",
      color: "from-yellow-500 to-orange-500",
    },
  ]

  const configOptions = [
    { name: "imageSrc", description: "Source image path or data URL" },
    { name: "width/height", description: "Canvas dimensions in pixels" },
    { name: "particleGap", description: "Spacing between particles (2-10)" },
    { name: "mouseForce", description: "Mouse repulsion strength (10-100)" },
    { name: "gravity", description: "Return force to origin (0.01-0.2)" },
    { name: "noise", description: "Random particle movement (0-50)" },
    { name: "clickStrength", description: "Click interaction force (0-200)" },
    { name: "hueRotation", description: "Color hue shift in degrees (0-360)" },
    { name: "filter", description: "Color filters: none, grayscale, sepia, invert" },
    { name: "particleShape", description: "Particle shapes: square, circle, triangle" },
    { name: "vortexMode", description: "Vortex interaction on click (boolean)" },
  ]

  const useCases = [
    {
      title: "Interactive Websites",
      description: "Add engaging hover effects to hero sections, portfolios, and landing pages",
      icon: Globe,
    },
    {
      title: "Digital Art Projects",
      description: "Create unique particle-based artwork and visual experiences",
      icon: Palette,
    },
    {
      title: "Game Development",
      description: "Implement particle effects for game UI, transitions, and visual feedback",
      icon: Zap,
    },
    {
      title: "Marketing Campaigns",
      description: "Create memorable interactive advertisements and promotional content",
      icon: Sparkles,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Sparkles className="h-16 w-16 text-primary" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            package-particlefx Features
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover the powerful capabilities of our interactive particle effects library. Transform images into
            stunning animated experiences with ease.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <a href="https://www.npmjs.com/package/package-particlefx" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-5 w-5" />
                View on NPM
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/docs">
                <Code className="mr-2 h-5 w-5" />
                Documentation
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Main Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full bg-card/50 border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 overflow-hidden group">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} bg-opacity-10`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {feature.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Configuration Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Configuration Options</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Customize every aspect of your particle effects with our comprehensive configuration system
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {configOptions.map((option, index) => (
              <motion.div
                key={option.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4 p-4 rounded-lg bg-card/30 border border-primary/10"
              >
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{option.name}</h3>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Perfect For</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Versatile applications across different industries and use cases
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon
              return (
                <motion.div
                  key={useCase.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="text-center p-6 bg-card/30 border-primary/10 hover:border-primary/30 transition-all duration-300">
                    <div className="mb-4 flex justify-center">
                      <div className="p-3 rounded-full bg-primary/10">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{useCase.title}</h3>
                    <p className="text-sm text-muted-foreground">{useCase.description}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Installation & Quick Start */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="max-w-4xl mx-auto p-8 bg-card/50 border-2 border-primary/20">
            <h2 className="text-3xl font-bold mb-6">Get Started Today</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Install package-particlefx and start creating amazing particle effects in minutes
            </p>
            <div className="bg-muted/50 rounded-lg p-6 mb-8">
              <code className="text-lg font-mono text-primary">npm install package-particlefx</code>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <a href="/">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Try Playground
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/docs">
                  <Code className="mr-2 h-5 w-5" />
                  View Documentation
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="https://www.npmjs.com/package/package-particlefx" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  NPM Package
                </a>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default Features
