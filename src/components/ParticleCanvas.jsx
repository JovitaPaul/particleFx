import React, { useRef, useEffect, useCallback } from 'react';

const ParticleCanvas = ({ 
  config, 
  onParticlesInit, 
  imageUrl, 
  resetTrigger, 
  explodeTrigger 
}) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const originsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const animationIdRef = useRef(null);
  const imageRef = useRef(null);

  // Initialize particles from image
  const initParticles = useCallback(() => {
    if (!imageRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const particles = [];
    const origins = [];
    
    // Create a temporary canvas to analyze the image
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    
    // Draw the image on the temporary canvas
    tempCtx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);
    
    // Get image data
    const imageData = tempCtx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Create particles from non-transparent pixels
    for (let x = 0; x < canvas.width; x += config.particleGap) {
      for (let y = 0; y < canvas.height; y += config.particleGap) {
        const index = (x + y * canvas.width) * 4;
        const alpha = data[index + 3];
        
        if (alpha > 0) {
          const origin = {
            x: x,
            y: y,
            color: [data[index], data[index + 1], data[index + 2], alpha]
          };
          
          const particle = {
            x: x + (Math.random() - 0.5) * 100,
            y: y + (Math.random() - 0.5) * 100,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            targetX: x,
            targetY: y,
            isDead: false,
            isHidden: false
          };
          
          origins.push(origin);
          particles.push(particle);
        }
      }
    }
    
    particlesRef.current = particles;
    originsRef.current = origins;
    
    // Calculate speed and gravity factor
    const speed = Math.log(particles.length) / 10;
    const gravityFactor = 1 - config.gravity * speed;
    
    if (onParticlesInit) {
      onParticlesInit({ speed, gravityFactor, particleCount: particles.length });
    }
  }, [config.particleGap, config.gravity, onParticlesInit]);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particles = particlesRef.current;
    const origins = originsRef.current;
    const mouse = mouseRef.current;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate dynamic values
    const speed = Math.log(particles.length) / 10;
    const gravityFactor = 1 - config.gravity * speed;
    
    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      const origin = origins[i];
      
      if (particle.isDead || particle.isHidden) continue;
      
      // Calculate forces toward origin with improved precision
      const dx = origin.x - particle.x + (Math.random() - 0.5) * config.noise;
      const dy = origin.y - particle.y + (Math.random() - 0.5) * config.noise;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Improved force calculation for better repositioning
      let force;
      if (distance < 5) {
        // When very close to origin, use stronger force with distance-based scaling
        force = 0.1 * (distance / 5);
      } else {
        // Normal force for farther particles
        force = 0.02 * distance;
      }
      
      if (distance > 0) {
        particle.vx += (dx / distance) * force * speed;
        particle.vy += (dy / distance) * force * speed;
      }
      
      // Mouse interaction
      if (mouse.active) {
        const mdx = particle.x - mouse.x;
        const mdy = particle.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        
        if (mdist > 0) {
          const mforce = config.mouseForce / mdist;
          particle.vx += (mdx / mdist) * mforce * speed;
          particle.vy += (mdy / mdist) * mforce * speed;
        }
      }
      
      // Improved damping - stronger when close to origin for better settling
      let dampingFactor = gravityFactor;
      if (!mouse.active && distance < 10) {
        // Apply stronger damping when close to origin and mouse is not active
        dampingFactor = Math.max(0.8, gravityFactor);
      }
      
      particle.vx *= dampingFactor;
      particle.vy *= dampingFactor;
      
      // Snap to origin if very close and moving slowly
      if (!mouse.active && distance < 1 && Math.abs(particle.vx) < 0.1 && Math.abs(particle.vy) < 0.1) {
        particle.x = origin.x;
        particle.y = origin.y;
        particle.vx = 0;
        particle.vy = 0;
      } else {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
      }
      
      // Check boundaries
      if (particle.x < 0 || particle.x >= canvas.width || 
          particle.y < 0 || particle.y >= canvas.height) {
        particle.isHidden = true;
      } else {
        particle.isHidden = false;
      }
      
      // Draw particle
      if (!particle.isHidden) {
        ctx.fillStyle = `rgba(${origin.color[0]}, ${origin.color[1]}, ${origin.color[2]}, ${origin.color[3] / 255})`;
        ctx.fillRect(Math.floor(particle.x), Math.floor(particle.y), 1, 1);
      }
    }
    
    animationIdRef.current = requestAnimationFrame(animate);
  }, [config]);

  // Start animation
  const startAnimation = useCallback(() => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }
    animate();
  }, [animate]);

  // Reset particles
  const resetParticles = useCallback(() => {
    const particles = particlesRef.current;
    const origins = originsRef.current;
    
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      const origin = origins[i];
      particle.x = origin.x + (Math.random() - 0.5) * 20;
      particle.y = origin.y + (Math.random() - 0.5) * 20;
      particle.vx = 0;
      particle.vy = 0;
      particle.isDead = false;
      particle.isHidden = false;
    }
  }, []);

  // Explode particles
  const explodeParticles = useCallback(() => {
    const particles = particlesRef.current;
    
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      const angle = Math.random() * Math.PI * 2;
      const force = Math.random() * 5 + 2;
      particle.vx += Math.cos(angle) * force;
      particle.vy += Math.sin(angle) * force;
    }
  }, []);

  // Handle mouse events
  const handleMouseMove = useCallback((e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
    mouseRef.current.active = true;
  }, []);

  const handleMouseOut = useCallback(() => {
    mouseRef.current.active = false;
  }, []);

  const handleClick = useCallback((e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const particles = particlesRef.current;
    
    // Apply click force to all particles
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      const dx = particle.x - clickX;
      const dy = particle.y - clickY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 0) {
        const force = config.clickStrength / (distance + 1);
        particle.vx += (dx / distance) * force * 0.1;
        particle.vy += (dy / distance) * force * 0.1;
      }
    }
  }, [config.clickStrength]);

  // Load image effect
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      imageRef.current = img;
      initParticles();
      startAnimation();
    };
    img.src = imageUrl;

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [imageUrl, initParticles, startAnimation]);

  // Handle reset trigger
  useEffect(() => {
    if (resetTrigger) {
      resetParticles();
    }
  }, [resetTrigger, resetParticles]);

  // Handle explode trigger
  useEffect(() => {
    if (explodeTrigger) {
      explodeParticles();
    }
  }, [explodeTrigger, explodeParticles]);

  // Reinitialize particles when config changes
  useEffect(() => {
    if (imageRef.current) {
      initParticles();
    }
  }, [config.particleGap, initParticles]);

  return (
    <div className="relative border-2 border-gray-600 rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
        onClick={handleClick}
        className="block cursor-pointer"
      />
    </div>
  );
};

export default ParticleCanvas;