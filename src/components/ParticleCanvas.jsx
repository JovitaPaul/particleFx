
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { createParticleCanvas } from "package-particlefx";

const ParticleCanvas = ({
  config,
  onParticlesInit,
  imageUrl,
  resetTrigger,
  explodeTrigger,
}) => {
  const containerRef = useRef(null);
  const particleCanvasRef = useRef(null);

  const isMounted = useRef(false);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
          if (!particleCanvasRef.current) {
            particleCanvasRef.current = createParticleCanvas(
              containerRef.current,
              {
                ...config,
                width: "100%",
                height: "100%",
              }
            );

            if (onParticlesInit) {
              onParticlesInit({
                particleCount: particleCanvasRef.current.getParticleCount(),
                speed: 1, // Speed is not directly available from the package
                gravityFactor: config.gravity,
              });
            }
            isMounted.current = true;
          }
        }
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      particleCanvasRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      particleCanvasRef.current.updateConfig(config);
    }
  }, [config]);

  useEffect(() => {
    if (resetTrigger > 0) {
      particleCanvasRef.current?.resetParticles();
    }
  }, [resetTrigger]);

  useEffect(() => {
    if (explodeTrigger > 0) {
      particleCanvasRef.current?.explodeParticles();
    }
  }, [explodeTrigger]);


  useEffect(() => {
    if (particleCanvasRef.current) {
      particleCanvasRef.current.updateConfig({ imageSrc: imageUrl });
    }
  }, [imageUrl]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-xl bg-gradient-to-br from-card/50 to-muted/20 p-2"
    >
      <div
        ref={containerRef}
        className="relative border-2 border-primary/30 rounded-lg overflow-hidden bg-card/30 backdrop-blur-sm w-[75dvw] sm:w-[50vw] md:w-[30vw] h-full"
        style={{ aspectRatio: "1" }}
      ></div>
    </motion.div>
  );
};

export default ParticleCanvas;
