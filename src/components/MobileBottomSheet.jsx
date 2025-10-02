"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  Settings,
  MousePointer,
  Palette,
  Upload,
  RotateCcw,
  Zap,
  Dices,
} from "lucide-react";

const MobileBottomSheet = ({
  config,
  onConfigChange,
  onReset,
  onExplode,
  onRandomize,
  onImageLoad,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSliderChange = (key, value) => {
    onConfigChange({ ...config, [key]: value[0] });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageLoad(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const controlSections = [
    {
      title: "Physics",
      icon: Settings,
      id: "physics",
      controls: [
        {
          key: "particleGap",
          label: "Particle Gap",
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
      id: "interaction",
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
    {
      title: "Visual",
      icon: Palette,
      id: "visual",
      controls: [
        {
          key: "hueRotation",
          label: "Hue Rotation",
          min: 0,
          max: 360,
          step: 1,
        },
        {
          key: "particleShape",
          label: "Shape",
          type: "select",
          options: [
            { value: "square", label: "Square" },
            { value: "circle", label: "Circle" },
          ],
        },
        {
          key: "vortexMode",
          label: "Vortex Mode",
          type: "checkbox",
        },
      ],
    },
  ];

  const renderControl = (control) => {
    if (control.type === "select") {
      return (
        <div key={control.key} className="space-y-2">
          <Label className="text-sm font-medium">{control.label}</Label>
          <Select
            value={config[control.key]?.toString()}
            onValueChange={(value) =>
              onConfigChange({ ...config, [control.key]: value })
            }
          >
            <SelectTrigger className="h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {control.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }

    if (control.type === "checkbox") {
      return (
        <div key={control.key} className="flex items-center space-x-2">
          <Checkbox
            id={control.key}
            checked={config[control.key]}
            onCheckedChange={(checked) =>
              onConfigChange({ ...config, [control.key]: checked })
            }
          />
          <Label htmlFor={control.key} className="text-sm font-medium">
            {control.label}
          </Label>
        </div>
      );
    }

    return (
      <div key={control.key} className="space-y-2">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-medium">{control.label}</Label>
          <span className="text-xs text-muted-foreground">
            {typeof config[control.key] === "number"
              ? config[control.key].toFixed(2)
              : config[control.key]}
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
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 z-40 lg:hidden rounded-full h-14 w-14 shadow-lg"
          size="lg"
        >
          <Settings className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl p-0">
        <div className="flex justify-center pt-4 pb-2">
          <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full" />
        </div>

        <SheetHeader className="px-6 pb-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Particle Controls
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="physics" className="h-full flex flex-col">
            <div className="px-6 pt-4">
              <TabsList className="grid w-full grid-cols-3">
                {controlSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <TabsTrigger
                      key={section.id}
                      value={section.id}
                      className="flex items-center gap-1 text-xs"
                    >
                      <Icon className="h-3 w-3" />
                      <span className="hidden sm:inline">{section.title}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            <div className="flex-1 overflow-hidden">
              {controlSections.map((section) => (
                <TabsContent
                  key={section.id}
                  value={section.id}
                  className="h-full mt-0"
                >
                  <ScrollArea className="h-full px-6">
                    <div className="space-y-6 pb-6">
                      <Card>
                        <CardContent className="p-4 space-y-4">
                          {section.controls.map(renderControl)}
                        </CardContent>
                      </Card>
                    </div>
                  </ScrollArea>
                </TabsContent>
              ))}
            </div>

            <div className="border-t p-4">
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Upload Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Button onClick={onReset} variant="outline" size="sm">
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Reset
                  </Button>
                  <Button onClick={onExplode} variant="outline" size="sm">
                    <Zap className="h-3 w-3 mr-1" />
                    Explode
                  </Button>
                  <Button onClick={onRandomize} variant="outline" size="sm">
                    <Dices className="h-3 w-3 mr-1" />
                    Random
                  </Button>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileBottomSheet;
