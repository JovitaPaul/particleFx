"use client"

import { useState, useCallback, useRef } from "react"
import { motion } from "framer-motion"
import ParticleCanvas from "./ParticleCanvas"
import ParticleControls from "./ParticleControl"
import { downloadCanvasAsImage } from "../utils/recorder"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Zap, MousePointer, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const ParticleApp = () => {
  // Default configuration
  const [config, setConfig] = useState({
    particleGap: 4,
    mouseForce: 30,
    gravity: 0.08,
    noise: 10,
    clickStrength: 100,
    filter: "none",
    particleShape: "square",
    hueRotation: 0,
    vortexMode: false,
  })

  // Default image URL
  const [imageUrl, setImageUrl] = useState(
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNjY2NmZmO3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3R5bGU9InN0b3AtY29sb3I6IzMzMzNjYztzdG9wLW9wYWNpdHk6MSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMDAwMDk5O3N0b3Atb3BhY2l0eToxIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgCiAgPHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9InVybCgjZ3JhZGllbnQpIi8+CiAgCiAgPGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSI0MCIgZmlsbD0iI2ZmNjY2NiIgb3BhY2l0eT0iMC44Ii8+CiAgPGNpcmNsZSBjeD0iMzAwIiBjeT0iMTAwIiByPSI0MCIgZmlsbD0iIzY2ZmY2NiIgb3BhY2l0eT0iMC44Ii8+CiAgPGNpcmNsZSBjeD0iMjAwIiBjeT0iMjAwIiByPSI2MCIgZmlsbD0iI2ZmZmY2NiIgb3BhY2l0eT0iMC44Ii8+CiAgPGNpcmNsZSBjeD0iMTAwIiBjeT0iMzAwIiByPSI0MCIgZmlsbD0iI2ZmNjZmZiIgb3BhY2l0eT0iMC44Ii8+CiAgPGNpcmNsZSBjeD0iMzAwIiBjeT0iMzAwIiByPSI0MCIgZmlsbD0iIzY2ZmZmZiIgb3BhY2l0eT0iMC44Ii8+CiAgCiAgPHRleHQgeD0iMjAwIiB5PSI2MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UEFSVElDTEU8L3RleHQ+CiAgPHRleHQgeD0iMjAwIiB5PSIzNjAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkVGRkVDVDwvdGV4dD4KPC9zdmc+",
  )

  // Triggers for actions
  const [resetTrigger, setResetTrigger] = useState(0)
  const [explodeTrigger, setExplodeTrigger] = useState(0)
  const canvasRef = useRef(null)

  // Particle system info
  const [particleInfo, setParticleInfo] = useState({
    particleCount: 0,
    speed: 1,
    gravityFactor: 0.92,
  })

  // Handlers
  const handleConfigChange = useCallback((newConfig) => {
    setConfig(newConfig)
  }, [])

  const handleReset = useCallback(() => {
    setResetTrigger((prev) => prev + 1)
  }, [])

  const handleExplode = useCallback(() => {
    setExplodeTrigger((prev) => prev + 1)
  }, [])

  const handleImageLoad = useCallback((newImageUrl) => {
    setImageUrl(newImageUrl)
  }, [])

  const handleParticlesInit = useCallback((info) => {
    setParticleInfo(info)
  }, [])

  const handleDownloadImage = useCallback(() => {
    if (canvasRef.current) {
      downloadCanvasAsImage(canvasRef.current)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-4 lg:py-8">
        {/* Hero Section - Compact for mobile */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center space-y-4 mb-6 lg:mb-8"
        >
          <div className="space-y-2 lg:space-y-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center justify-center space-x-2 lg:space-x-3"
            >
              <div className="relative">
                <Sparkles className="h-8 w-8 lg:h-12 lg:w-12 text-primary" />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                ParticleFX
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4"
            >
              Transform images into stunning particle effects.
              <span className="text-primary font-semibold block md:inline"> Interactive & customizable.</span>
            </motion.p>
          </div>

          {/* Stats - Compact for mobile */}
          {particleInfo.particleCount > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-2 lg:gap-4"
            >
              <Badge
                variant="secondary"
                className="px-2 py-1 text-xs lg:px-4 lg:py-2 lg:text-sm bg-primary/10 text-primary border-primary/20"
              >
                <Zap className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                {particleInfo.particleCount.toLocaleString()} Particles
              </Badge>
              <Badge
                variant="secondary"
                className="px-2 py-1 text-xs lg:px-4 lg:py-2 lg:text-sm bg-accent/10 text-accent border-accent/20"
              >
                <MousePointer className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                Speed: {particleInfo.speed.toFixed(2)}x
              </Badge>
            </motion.div>
          )}
        </motion.div>

        {/* Main Content - Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-4 lg:gap-8 items-start">
          {/* Canvas Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-1 lg:order-1"
          >
            <Card className="p-3 lg:p-6 bg-card/50 border-2 border-primary/20 shadow-2xl">
              <div className="space-y-3 lg:space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg lg:text-xl font-semibold text-foreground">Canvas</h2>
                  <Badge variant="outline" className="text-xs">
                    Interactive
                  </Badge>
                </div>

                <div className="flex justify-center">
                  <ParticleCanvas
                    config={config}
                    imageUrl={imageUrl}
                    resetTrigger={resetTrigger}
                    explodeTrigger={explodeTrigger}
                    onParticlesInit={handleParticlesInit}
                    canvasRef={canvasRef}
                  />
                </div>

                <div className="text-center">
                  <p className="text-xs lg:text-sm text-muted-foreground">
                    Hover to attract • Click for ripples • Drag to interact
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Controls Section - Desktop */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="order-2 lg:order-2 hidden lg:block"
          >
            <div className="sticky top-20">
              <ParticleControls
                config={config}
                onConfigChange={handleConfigChange}
                onReset={handleReset}
                onExplode={handleExplode}
                onImageLoad={handleImageLoad}
                onDownloadImage={handleDownloadImage}
                isMobile={false}
              />
            </div>
          </motion.div>

          {/* Mobile Controls - Sheet */}
          <div className="lg:hidden order-3 fixed bottom-4 right-4 z-50">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="lg" className="rounded-full h-14 w-14 shadow-lg bg-primary hover:bg-primary/90">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open Controls</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
                <div className="py-4">
                  <ParticleControls
                    config={config}
                    onConfigChange={handleConfigChange}
                    onReset={handleReset}
                    onExplode={handleExplode}
                    onImageLoad={handleImageLoad}
                    onDownloadImage={handleDownloadImage}
                    isMobile={true}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Features Section - Compact for mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mt-8 lg:mt-16"
        >
          {[
            {
              icon: Sparkles,
              title: "Real-time Physics",
              description: "Advanced particle physics with gravity and realistic motion.",
            },
            {
              icon: MousePointer,
              title: "Interactive Controls",
              description: "Mouse interaction and customizable parameters.",
            },
            {
              icon: Zap,
              title: "Visual Effects",
              description: "Color filters and dynamic transformations.",
            },
          ].map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
              >
                <Card className="p-4 lg:p-6 h-full bg-card/30 border-primary/10 hover:border-primary/30 transition-all duration-300">
                  <div className="space-y-3 lg:space-y-4">
                    <div className="flex items-center space-x-2 lg:space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-5 w-5 lg:h-6 lg:w-6 text-primary" />
                      </div>
                      <h3 className="text-base lg:text-lg font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

export default ParticleApp
