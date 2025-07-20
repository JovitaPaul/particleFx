import { createParticleCanvas } from "package-pariclefx";
import { useRef, useEffect, useState } from "react";

export default function Test() {
  const containerRef = useRef(null);
  const particleCanvasRef = useRef(null);
  const [config, setConfig] = useState({
    imageSrc: "/image.jpeg",
    particleGap: 4,
    mouseForce: 30,
    hueRotation: 180, // New: Rotate hue by 180 degrees
    vortexMode: true, // New: Enable vortex interaction
  });
  useEffect(() => {
    if (containerRef.current) {
      particleCanvasRef.current = createParticleCanvas(
        containerRef.current,
        config
      );
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
      <div ref={containerRef} style={{ width: "500px", height: "300px" }} />
      <button onClick={handleExplode}>Explode</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleDownload}>Download</button>
      {/* Example of dynamically updating config */}
      <button
        onClick={() =>
          setConfig((prev) => ({ ...prev, vortexMode: !prev.vortexMode }))
        }
      >
        Toggle Vortex Mode
      </button>
    </div>
  );
}
