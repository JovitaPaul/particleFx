

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Expand, Check, ExternalLink, X } from "lucide-react";

const CodeSnippet = ({ config }) => {
  const [copied, setCopied] = useState(false);
  const [activeFramework, setActiveFramework] = useState("react");
  const [dialogOpen, setDialogOpen] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateCode = (framework) => {
    const configString = JSON.stringify(
      {
        imageSrc: "/path/to/your/image.jpg",
        width: 400,
        height: 400,
        ...config,
      },
      null,
      2
    );

    switch (framework) {
      case "react":
        return `import React, { useRef, useEffect } from 'react';
import { createParticleCanvas } from 'package-particlefx';

const ParticleComponent = () => {
  const containerRef = useRef(null);
  const particleCanvasRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      particleCanvasRef.current = createParticleCanvas(
        containerRef.current, 
        ${configString}
      );
    }

    return () => {
      particleCanvasRef.current?.destroy();
    };
  }, []);

  return (
    <div>
      <div ref={containerRef} style={{ width: '400px', height: '400px' }} />
    </div>
  );
};

export default ParticleComponent;`;

      case "vue":
        return `<template>
  <div>
    <div ref="container" :style="{ width: '400px', height: '400px' }"></div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { createParticleCanvas } from 'package-particlefx';

const container = ref(null);
let particleCanvas = null;

const config = ${configString};

onMounted(() => {
  if (container.value) {
    particleCanvas = createParticleCanvas(container.value, config);
  }
});

onUnmounted(() => {
  particleCanvas?.destroy();
});


</script>`;

      case "vanilla":
        return `import { createParticleCanvas } from 'package-particlefx';

// Get container element
const container = document.getElementById('particle-container');

// Configuration
const config = ${configString};

// Create particle canvas
const particleCanvas = createParticleCanvas(container, config);

// Add event listeners
document.getElementById('explode-btn').addEventListener('click', () => {
  particleCanvas.explodeParticles();
});

document.getElementById('reset-btn').addEventListener('click', () => {
  particleCanvas.resetParticles();
});

// Clean up when needed
// particleCanvas.destroy();`;

      default:
        return generateCode("react");
    }
  };

  return (
    <div className="space-y-4">
      {/* Compact Preview */}
      <div className="p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-sm font-medium">Get the Code</h4>
            <p className="text-xs text-muted-foreground">
              Copy your current configuration
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Expand className="h-4 w-4 mr-2" />
                View Full Code
              </Button>
            </DialogTrigger>
            <DialogContent
              className="w-[95vw] max-w-6xl h-[85vh] max-h-[85vh] p-0 bg-background border-primary/20 shadow-2xl"
              onInteractOutside={(e) => e.preventDefault()}
            >
              <div className="flex flex-col h-full">
                <DialogHeader className="p-6 pb-4 border-b border-border/50">
                  <div className="flex items-center justify-between">
                    <DialogTitle className="flex items-center space-x-2">
                      <span>package-particlefx Code Generator</span>
                      <Button variant="ghost" size="sm" asChild>
                        <a
                          href="https://www.npmjs.com/package/package-particlefx"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-accent"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          NPM
                        </a>
                      </Button>
                    </DialogTitle>
                  </div>
                </DialogHeader>

                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-6">
                    {/* Installation */}
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold">Installation</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            copyToClipboard("npm install package-particlefx")
                          }
                        >
                          {copied ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <code className="text-sm font-mono text-primary">
                        npm install package-particlefx
                      </code>
                    </div>

                    {/* Framework Tabs */}
                    <Tabs
                      value={activeFramework}
                      onValueChange={setActiveFramework}
                      className="w-full"
                    >
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="react">React</TabsTrigger>
                        <TabsTrigger value="vue">Vue</TabsTrigger>
                        <TabsTrigger value="vanilla">Vanilla JS</TabsTrigger>
                      </TabsList>

                      {["react", "vue", "vanilla"].map((framework) => (
                        <TabsContent
                          key={framework}
                          value={framework}
                          className="mt-4"
                        >
                          <div className="relative">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-sm font-semibold capitalize">
                                {framework === "vanilla"
                                  ? "Vanilla JavaScript"
                                  : framework}{" "}
                                Implementation
                              </h3>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  copyToClipboard(generateCode(framework))
                                }
                              >
                                {copied ? (
                                  <Check className="h-4 w-4" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                            <div className="bg-muted/50 rounded-lg p-4 max-h-80 overflow-auto">
                              <pre className="text-sm text-foreground whitespace-pre-wrap break-words">
                                <code>{generateCode(framework)}</code>
                              </pre>
                            </div>
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>
                </ScrollArea>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Quick Copy */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard("npm install package-particlefx")}
            className="flex-1"
          >
            {copied ? (
              <Check className="h-4 w-4 mr-2" />
            ) : (
              <Copy className="h-4 w-4 mr-2" />
            )}
            Copy Install Command
          </Button>
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-2">
        <Button variant="ghost" size="sm" asChild>
          <a href="/docs" className="text-xs">
            <ExternalLink className="h-3 w-3 mr-1" />
            Docs
          </a>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <a
            href="https://www.npmjs.com/package/package-particlefx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            NPM
          </a>
        </Button>
      </div>
    </div>
  );
};

export default CodeSnippet;
