import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import {
  RotateCcw,
  Zap,
  Upload,
  Settings,
  Palette,
  MousePointer,
  Code,
  X,
  Dices,
} from "lucide-react";
import CodeSnippet from "./CodeSnippet";

// Hook to simulate hover on touch devices
const useHoverOnTouch = () => {
  const [isHovered, setIsHovered] = useState(false);
  const onTouchStart = () => setIsHovered(true);
  const onTouchEnd = () => setIsHovered(false);
  return { isHovered, onTouchStart, onTouchEnd };
};

// Tooltip component
const Tooltip = ({ children, text }) => (
  <div className="relative group">
    {children}
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-50">
      {text}
    </div>
  </div>
);

const ParticleControls = ({
  config,
  onConfigChange,
  onReset,
  onExplode,
  onRandomize,
  onImageLoad,
  onClose,
}) => {
  const [highlightKey, setHighlightKey] = useState(null);
  const [fps, setFps] = useState(0);

  // FPS Counter
  useEffect(() => {
    let lastFrame = performance.now();
    let frameCount = 0;
    const update = () => {
      const now = performance.now();
      frameCount++;
      if (now - lastFrame >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastFrame = now;
      }
      requestAnimationFrame(update);
    };
    update();
  }, []);

  const handleSliderChange = (key, value) => {
    onConfigChange({ ...config, [key]: value[0] });
    setHighlightKey(key);
    setTimeout(() => setHighlightKey(null), 300);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => onImageLoad(event.target.result);
      reader.readAsDataURL(file);
      onConfigChange({ ...config, uploadedFileName: file.name });
    }
  };

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

  const hoverReset = useHoverOnTouch();
  const hoverExplode = useHoverOnTouch();
  const hoverRandomize = useHoverOnTouch();

  return (
    <Card className="w-full max-w-md mx-auto border-2 border-primary/20 bg-card/95 backdrop-blur-xl shadow-2xl">
      {/* Header */}
      <CardHeader className="pb-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Particle Controls
          </CardTitle>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Customize your particle effects in real-time
        </p>
        <div className="text-xs text-muted-foreground mt-1">FPS: {fps}</div>

        {/* Quick Actions */}
        <div className="flex gap-2 mt-2">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            animate={hoverReset.isHovered ? { scale: 1.02 } : { scale: 1 }}
            onTouchStart={hoverReset.onTouchStart}
            onTouchEnd={hoverReset.onTouchEnd}
            className="w-full"
          >
            <Tooltip text="Reset all particle settings to default">
              <Button
                onClick={onReset}
                variant="outline"
                className="w-full bg-transparent"
                size="sm"
              >
                <RotateCcw className="h-4 w-4 mr-1" /> Reset
              </Button>
            </Tooltip>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            animate={hoverExplode.isHovered ? { scale: 1.02 } : { scale: 1 }}
            onTouchStart={hoverExplode.onTouchStart}
            onTouchEnd={hoverExplode.onTouchEnd}
            className="w-full"
          >
            <Tooltip text="Trigger an explosion effect">
              <Button
                onClick={onExplode}
                variant="outline"
                className="w-full bg-transparent"
                size="sm"
              >
                <Zap className="h-4 w-4 mr-1" /> Explode
              </Button>
            </Tooltip>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            animate={hoverRandomize.isHovered ? { scale: 1.02 } : { scale: 1 }}
            onTouchStart={hoverRandomize.onTouchStart}
            onTouchEnd={hoverRandomize.onTouchEnd}
            className="w-full"
          >
            <Tooltip text="Randomize all particle settings">
              <Button
                onClick={onRandomize}
                variant="outline"
                className="w-full bg-transparent"
                size="sm"
              >
                <Dices className="h-4 w-4 mr-1" /> Randomize
              </Button>
            </Tooltip>
          </motion.div>
        </div>
      </CardHeader>

      {/* Tabs */}
      <CardContent className="space-y-6 px-2">
        <Tabs defaultValue="physics" className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-auto p-1 text-xs">
            <TabsTrigger value="physics">
              <Settings className="h-3 w-3 mr-1" />
              Physics
            </TabsTrigger>
            <TabsTrigger value="visual">
              <Palette className="h-3 w-3 mr-1" />
              Visual
            </TabsTrigger>
            <TabsTrigger value="image">
              <Upload className="h-3 w-3 mr-1" />
              Image
            </TabsTrigger>
            <TabsTrigger value="code">
              <Code className="h-3 w-3 mr-1" />
              Code
            </TabsTrigger>
          </TabsList>

          {/* Physics Tab */}
          <TabsContent value="physics" className="mt-4">
            <ScrollArea className="h-[400px] pr-4 space-y-6">
              {controlSections.map((section) => (
                <div key={section.title} className="space-y-4">
                  <h3 className="text-sm font-semibold text-primary flex items-center gap-2">
                    <section.icon className="h-4 w-4" /> {section.title}
                  </h3>
                  {section.controls.map((control) => (
                    <div key={control.key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium">
                            {control.label}
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            {control.description}
                          </p>
                        </div>
                        <span
                          className={`text-xs font-mono px-2 py-1 rounded ${
                            highlightKey === control.key
                              ? "bg-accent/30 animate-pulse"
                              : "bg-muted"
                          }`}
                        >
                          {config[control.key]}
                        </span>
                      </div>
                      <Slider
                        value={[config[control.key]]}
                        onValueChange={(value) =>
                          handleSliderChange(control.key, value)
                        }
                        min={control.min}
                        max={control.max}
                        step={control.step}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </ScrollArea>
          </TabsContent>

          {/* Visual Tab */}
          <TabsContent value="visual" className="mt-4">
            <ScrollArea className="h-[400px] pr-4 space-y-6">
              {/* Hue Rotation */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Hue Rotation</Label>
                    <p className="text-xs text-muted-foreground">
                      Rotate color hue (0-360°)
                    </p>
                  </div>
                  <span
                    className={`text-xs font-mono px-2 py-1 rounded ${
                      highlightKey === "hueRotation"
                        ? "bg-accent/30 animate-pulse"
                        : "bg-muted"
                    }`}
                  >
                    {config.hueRotation}°
                  </span>
                </div>
                <Slider
                  value={[config.hueRotation]}
                  onValueChange={(value) =>
                    handleSliderChange("hueRotation", value)
                  }
                  min={0}
                  max={360}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Color Filter */}
              <div className="space-y-2 mb-2">
                <Label className="text-sm font-medium mt-2">Color Filter</Label>
                <Select
                  value={config.filter}
                  onValueChange={(value) =>
                    onConfigChange({ ...config, filter: value })
                  }
                >
                  <SelectTrigger>
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
                <Label className="text-sm font-medium">Particle Shape</Label>
                <Select
                  value={config.particleShape}
                  onValueChange={(value) =>
                    onConfigChange({ ...config, particleShape: value })
                  }
                >
                  <SelectTrigger>
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
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                <Checkbox
                  id="vortexMode"
                  checked={config.vortexMode}
                  onCheckedChange={(checked) =>
                    onConfigChange({ ...config, vortexMode: checked })
                  }
                />
                <div>
                  <Label
                    htmlFor="vortexMode"
                    className="text-sm font-medium cursor-pointer"
                  >
                    Vortex Mode
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Click creates vortex instead of ripple
                  </p>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Image Tab */}
          <TabsContent value="image" className="mt-4">
            <div className="space-y-4">
              <Label
                htmlFor="imageLoader"
                className="text-sm font-medium block"
              >
                Upload Custom Image
              </Label>
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  id="imageLoader"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="imageLoader"
                  className="cursor-pointer bg-primary/10 text-primary px-4 py-2 rounded-md hover:bg-primary/20 transition"
                >
                  Choose File
                </label>
                <span className="text-xs text-muted-foreground">
                  {config.uploadedFileName || "No file chosen"}
                </span>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="text-sm font-medium mb-2">
                  Tips for Best Results:
                </h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Use images with clear subjects</li>
                  <li>• Transparent backgrounds work great</li>
                  <li>• Higher contrast images create better effects</li>
                  <li>• Recommended size: 400x400px or similar</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          {/* Code Tab */}
          <TabsContent value="code" className="mt-4">
            <CodeSnippet config={config} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ParticleControls;
