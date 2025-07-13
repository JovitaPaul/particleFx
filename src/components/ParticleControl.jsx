"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"
import { RotateCcw, Zap, Download, Upload, Settings, Palette, MousePointer } from "lucide-react"

const ParticleControls = ({
  config,
  onConfigChange,
  onReset,
  onExplode,
  onImageLoad,
  onDownloadImage,
  isMobile = false,
}) => {
  const handleSliderChange = (key, value) => {
    onConfigChange({ ...config, [key]: value[0] })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        onImageLoad(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const controlSections = [
    {
      title: "Physics",
      icon: Settings,
      controls: [
        {
          key: "particleGap",
          label: "Gap",
          min: 2,
          max: 10,
          step: 1,
        },
        {
          key: "gravity",
          label: "Gravity",
          min: 0.01,
          max: 0.2,
          step: 0.01,
        },
        {
          key: "noise",
          label: "Noise",
          min: 0,
          max: 50,
          step: 1,
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
        },
        {
          key: "clickStrength",
          label: "Click Power",
          min: 0,
          max: 200,
          step: 1,
        },
      ],
    },
  ]

  const containerClass = isMobile ? "w-full compact-controls" : "w-full max-w-sm"

  return (
    <div className={containerClass}>
      <ScrollArea className="h-screen max-h-[70dvh] p-2 border-2 border-primary/20  rounded-xl">
        <div className="space-y-4  ">
          {/* Action Buttons */}
          <Card className="border-2 border-primary/20 bg-card/50">
            <CardHeader className={isMobile ? "pb-3" : "pb-4"}>
              <CardTitle className="flex items-center space-x-2 text-base lg:text-lg">
                <Zap className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 lg:gap-3">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={onReset}
                    variant="outline"
                    size={isMobile ? "sm" : "default"}
                    className="w-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30 hover:border-blue-500/50 transition-all duration-300"
                  >
                    <RotateCcw className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                    Reset
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={onExplode}
                    variant="outline"
                    size={isMobile ? "sm" : "default"}
                    className="w-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/30 hover:border-orange-500/50 transition-all duration-300"
                  >
                    <Zap className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                    Explode
                  </Button>
                </motion.div>
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={onDownloadImage}
                  size={isMobile ? "sm" : "default"}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300"
                >
                  <Download className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                  Download
                </Button>
              </motion.div>
            </CardContent>
          </Card>

          {/* Image Upload */}
          <Card className="bg-card/50">
            <CardHeader className={isMobile ? "pb-3" : "pb-4"}>
              <CardTitle className="flex items-center space-x-2 text-base lg:text-lg">
                <Upload className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
                <span>Custom Image</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="imageLoader" className="text-xs lg:text-sm font-medium">
                  Upload your image
                </Label>
                <Input
                  type="file"
                  id="imageLoader"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="cursor-pointer text-xs lg:text-sm file:cursor-pointer file:bg-primary/10 file:text-primary file:border-0 file:rounded-md file:px-2 file:py-1 file:mr-2 hover:file:bg-primary/20 transition-all duration-300"
                />
              </div>
            </CardContent>
          </Card>

          {/* Control Sections */}
          {controlSections.map((section, sectionIndex) => {
            const SectionIcon = section.icon
            return (
              <Card key={section.title} className="bg-card/50">
                <CardHeader className={isMobile ? "pb-3" : "pb-4"}>
                  <CardTitle className="flex items-center space-x-2 text-base lg:text-lg">
                    <SectionIcon className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
                    <span>{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className={isMobile ? "space-y-4" : "space-y-5"}>
                  {section.controls.map((control) => (
                    <div key={control.key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs lg:text-sm font-medium">{control.label}</Label>
                        <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
                          {config[control.key]}
                          {control.suffix || ""}
                        </span>
                      </div>
                      <Slider
                        value={[config[control.key]]}
                        onValueChange={(value) => handleSliderChange(control.key, value)}
                        min={control.min}
                        max={control.max}
                        step={control.step}
                        className="w-full"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            )
          })}

          {/* Visual Controls */}
          <Card className="bg-card/50">
            <CardHeader className={isMobile ? "pb-3" : "pb-4"}>
              <CardTitle className="flex items-center space-x-2 text-base lg:text-lg">
                <Palette className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
                <span>Visual</span>
              </CardTitle>
            </CardHeader>
            <CardContent className={isMobile ? "space-y-4" : "space-y-5"}>
              {/* Hue Rotation */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs lg:text-sm font-medium">Hue Rotation</Label>
                  <span className="text-xs font-mono bg-muted px-2 py-1 rounded">{config.hueRotation}°</span>
                </div>
                <Slider
                  value={[config.hueRotation]}
                  onValueChange={(value) => handleSliderChange("hueRotation", value)}
                  min={0}
                  max={360}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Color Filter */}
              <div className="space-y-2">
                <Label className="text-xs lg:text-sm font-medium">Color Filter</Label>
                <Select value={config.filter} onValueChange={(value) => onConfigChange({ ...config, filter: value })}>
                  <SelectTrigger className="h-8 lg:h-9">
                    <SelectValue placeholder="Select filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="grayscale">Grayscale</SelectItem>
                    <SelectItem value="sepia">Sepia</SelectItem>
                    <SelectItem value="invert">Invert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Particle Shape */}
              <div className="space-y-2">
                <Label className="text-xs lg:text-sm font-medium">Particle Shape</Label>
                <Select
                  value={config.particleShape}
                  onValueChange={(value) => onConfigChange({ ...config, particleShape: value })}
                >
                  <SelectTrigger className="h-8 lg:h-9">
                    <SelectValue placeholder="Select shape" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="square">Square</SelectItem>
                    <SelectItem value="circle">Circle</SelectItem>
                    <SelectItem value="triangle">Triangle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Vortex Mode */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="vortexMode"
                  checked={config.vortexMode}
                  onCheckedChange={(checked) => onConfigChange({ ...config, vortexMode: checked })}
                />
                <Label htmlFor="vortexMode" className="text-xs lg:text-sm font-medium cursor-pointer">
                  Vortex Mode
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardContent className={isMobile ? "pt-4" : "pt-6"}>
              <div className="space-y-2 text-xs lg:text-sm">
                <h4 className="font-semibold text-primary mb-2 lg:mb-3">How to Use:</h4>
                <div className="space-y-1 text-muted-foreground">
                  <p>• Move mouse to attract particles</p>
                  <p>• Click for ripple effects</p>
                  <p>• Adjust sliders to modify behavior</p>
                  <p>• Upload custom images</p>
                  <p>• Enable vortex for swirl effects</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  )
}

export default ParticleControls