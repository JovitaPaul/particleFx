"use client"

import { useRef, useEffect, useCallback } from "react"
import { motion } from "framer-motion"

// Helper function to apply color filters
const applyFilter = (color, filter, hueRotation) => {
  let [r, g, b, a] = color

  // Apply color filter
  switch (filter) {
    case "grayscale":
      const gray = 0.299 * r + 0.587 * g + 0.114 * b
      r = g = b = gray
      break
    case "sepia":
      const tr = Math.min(255, 0.393 * r + 0.769 * g + 0.189 * b)
      const tg = Math.min(255, 0.349 * r + 0.686 * g + 0.168 * b)
      const tb = Math.min(255, 0.272 * r + 0.534 * g + 0.131 * b)
      r = tr
      g = tg
      b = tb
      break
    case "invert":
      r = 255 - r
      g = 255 - g
      b = 255 - b
      break
    default:
      break
  }

  // Apply hue rotation
  if (hueRotation !== 0) {
    // Convert RGB to HSL
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h,
      s,
      l = (max + min) / 2

    if (max === min) {
      h = s = 0 // achromatic
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }

    // Apply rotation
    h = (h * 360 + hueRotation) % 360
    if (h < 0) h += 360
    h /= 360

    // Convert HSL back to RGB
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)

    r = Math.round(r * 255)
    g = Math.round(g * 255)
    b = Math.round(b * 255)
  }

  return [r, g, b, a]
}

// Helper function to draw particles
const drawParticle = (ctx, particle, origin, config) => {
  const filteredColor = applyFilter(origin.color, config.filter, config.hueRotation)
  ctx.fillStyle = `rgba(${filteredColor[0]}, ${filteredColor[1]}, ${filteredColor[2]}, ${filteredColor[3] / 255})`

  const x = Math.floor(particle.x)
  const y = Math.floor(particle.y)
  const size = config.particleGap / 2

  switch (config.particleShape) {
    case "circle":
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
      break
    case "triangle":
      ctx.beginPath()
      ctx.moveTo(x, y - size)
      ctx.lineTo(x + size, y + size)
      ctx.lineTo(x - size, y + size)
      ctx.closePath()
      ctx.fill()
      break
    case "square":
    default:
      ctx.fillRect(x - size / 2, y - size / 2, size, size)
      break
  }
}

const ParticleCanvas = ({ config, onParticlesInit, imageUrl, resetTrigger, explodeTrigger, canvasRef }) => {
  const particlesRef = useRef([])
  const originsRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const vortexRef = useRef({ x: 0, y: 0, active: false })
  const animationIdRef = useRef(null)
  const imageRef = useRef(null)

  // Get responsive canvas size
  const getCanvasSize = () => {
    const isMobile = window.innerWidth < 768
    return isMobile ? 350 : 400
  }

  // Initialize particles from image
  const initParticles = useCallback(() => {
    if (!imageRef.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const particles = []
    const origins = []

    // Create a temporary canvas to analyze the image
    const tempCanvas = document.createElement("canvas")
    const tempCtx = tempCanvas.getContext("2d")
    tempCanvas.width = canvas.width
    tempCanvas.height = canvas.height

    // Draw the image on the temporary canvas
    tempCtx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height)

    // Get image data
    const imageData = tempCtx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    // Create particles from non-transparent pixels
    for (let x = 0; x < canvas.width; x += config.particleGap) {
      for (let y = 0; y < canvas.height; y += config.particleGap) {
        const index = (x + y * canvas.width) * 4
        const alpha = data[index + 3]

        if (alpha > 0) {
          const origin = {
            x: x,
            y: y,
            color: [data[index], data[index + 1], data[index + 2], alpha],
          }

          const particle = {
            x: x + (Math.random() - 0.5) * 100,
            y: y + (Math.random() - 0.5) * 100,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            targetX: x,
            targetY: y,
            isDead: false,
            isHidden: false,
          }

          origins.push(origin)
          particles.push(particle)
        }
      }
    }

    particlesRef.current = particles
    originsRef.current = origins

    // Calculate speed and gravity factor
    const speed = Math.log(particles.length) / 10
    const gravityFactor = 1 - config.gravity * speed

    if (onParticlesInit) {
      onParticlesInit({ speed, gravityFactor, particleCount: particles.length })
    }
  }, [config.particleGap, config.gravity, onParticlesInit])

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const particles = particlesRef.current
    const origins = originsRef.current
    const mouse = mouseRef.current

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Calculate dynamic values
    const speed = Math.log(particles.length) / 10
    const gravityFactor = 1 - config.gravity * speed

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i]
      const origin = origins[i]

      if (particle.isDead || particle.isHidden) continue

      // Calculate forces toward origin with improved precision
      const dx = origin.x - particle.x + (Math.random() - 0.5) * config.noise
      const dy = origin.y - particle.y + (Math.random() - 0.5) * config.noise
      const distance = Math.sqrt(dx * dx + dy * dy)

      // Improved force calculation for better repositioning
      let force
      if (distance < 5) {
        // When very close to origin, use stronger force with distance-based scaling
        force = 0.1 * (distance / 5)
      } else {
        // Normal force for farther particles
        force = 0.02 * distance
      }

      if (distance > 0) {
        particle.vx += (dx / distance) * force * speed
        particle.vy += (dy / distance) * force * speed
      }

      // Mouse interaction
      if (mouse.active) {
        if (config.vortexMode) {
          const vdx = particle.x - vortexRef.current.x
          const vdy = particle.y - vortexRef.current.y
          const vdist = Math.sqrt(vdx * vdx + vdy * vdy)
          if (vdist > 0) {
            const angle = Math.atan2(vdy, vdx)
            const force = 1 / vdist
            particle.vx += Math.cos(angle + Math.PI / 2) * force
            particle.vy += Math.sin(angle + Math.PI / 2) * force
            particle.vx -= (vdx / vdist) * force * 0.1
            particle.vy -= (vdy / vdist) * force * 0.1
          }
        } else {
          const mdx = particle.x - mouse.x
          const mdy = particle.y - mouse.y
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy)

          if (mdist > 0) {
            const mforce = config.mouseForce / mdist
            particle.vx += (mdx / mdist) * mforce * speed
            particle.vy += (mdy / mdist) * mforce * speed
          }
        }
      }

      // Improved damping - stronger when close to origin for better settling
      let dampingFactor = gravityFactor
      if (!mouse.active && distance < 10) {
        // Apply stronger damping when close to origin and mouse is not active
        dampingFactor = Math.max(0.8, gravityFactor)
      }

      particle.vx *= dampingFactor
      particle.vy *= dampingFactor

      // Snap to origin if very close and moving slowly
      if (!mouse.active && distance < 1 && Math.abs(particle.vx) < 0.1 && Math.abs(particle.vy) < 0.1) {
        particle.x = origin.x
        particle.y = origin.y
        particle.vx = 0
        particle.vy = 0
      } else {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
      }

      // Check boundaries
      if (particle.x < 0 || particle.x >= canvas.width || particle.y < 0 || particle.y >= canvas.height) {
        particle.isHidden = true
      } else {
        particle.isHidden = false
      }

      // Draw particle
      if (!particle.isHidden) {
        drawParticle(ctx, particle, origin, config)
      }
    }

    animationIdRef.current = requestAnimationFrame(animate)
  }, [config])

  // Start animation
  const startAnimation = useCallback(() => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current)
    }
    animate()
  }, [animate])

  // Reset particles
  const resetParticles = useCallback(() => {
    const particles = particlesRef.current
    const origins = originsRef.current

    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i]
      const origin = origins[i]
      particle.x = origin.x + (Math.random() - 0.5) * 20
      particle.y = origin.y + (Math.random() - 0.5) * 20
      particle.vx = 0
      particle.vy = 0
      particle.isDead = false
      particle.isHidden = false
    }
  }, [])

  // Explode particles
  const explodeParticles = useCallback(() => {
    const particles = particlesRef.current

    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i]
      const angle = Math.random() * Math.PI * 2
      const force = Math.random() * 5 + 2
      particle.vx += Math.cos(angle) * force
      particle.vy += Math.sin(angle) * force
    }
  }, [])

  // Handle mouse events
  const handleMouseMove = useCallback((e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    const scaleX = canvasRef.current.width / rect.width
    const scaleY = canvasRef.current.height / rect.height

    mouseRef.current.x = (e.clientX - rect.left) * scaleX
    mouseRef.current.y = (e.clientY - rect.top) * scaleY
    mouseRef.current.active = true
  }, [])

  const handleMouseOut = useCallback(() => {
    mouseRef.current.active = false
    vortexRef.current.active = false
  }, [])

  const handleClick = useCallback(
    (e) => {
      const rect = canvasRef.current.getBoundingClientRect()
      const scaleX = canvasRef.current.width / rect.width
      const scaleY = canvasRef.current.height / rect.height

      const clickX = (e.clientX - rect.left) * scaleX
      const clickY = (e.clientY - rect.top) * scaleY

      if (config.vortexMode) {
        vortexRef.current.x = clickX
        vortexRef.current.y = clickY
        vortexRef.current.active = true
      } else {
        const particles = particlesRef.current

        // Apply click force to all particles
        for (let i = 0; i < particles.length; i++) {
          const particle = particles[i]
          const dx = particle.x - clickX
          const dy = particle.y - clickY
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance > 0) {
            const force = config.clickStrength / (distance + 1)
            particle.vx += (dx / distance) * force * 0.1
            particle.vy += (dy / distance) * force * 0.1
          }
        }
      }
    },
    [config.clickStrength, config.vortexMode],
  )

  // Load image effect
  useEffect(() => {
    const img = new Image()
    img.crossOrigin = "Anonymous"
    img.onload = () => {
      imageRef.current = img
      initParticles()
      startAnimation()
    }
    img.src = imageUrl

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [imageUrl, initParticles, startAnimation])

  // Handle reset trigger
  useEffect(() => {
    if (resetTrigger) {
      resetParticles()
    }
  }, [resetTrigger, resetParticles])

  // Handle explode trigger
  useEffect(() => {
    if (explodeTrigger) {
      explodeParticles()
    }
  }, [explodeTrigger, explodeParticles])

  // Reinitialize particles when config changes
  useEffect(() => {
    if (imageRef.current) {
      initParticles()
    }
  }, [config.particleGap, initParticles])

  // Handle responsive canvas sizing
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const size = getCanvasSize()
        canvasRef.current.width = size
        canvasRef.current.height = size
        if (imageRef.current) {
          initParticles()
        }
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Initial call

    return () => window.removeEventListener("resize", handleResize)
  }, [initParticles])

  const canvasSize = typeof window !== "undefined" ? getCanvasSize() : 400

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-xl bg-gradient-to-br from-card/50 to-muted/20 p-2"
    >
      <div className="relative border-2 border-primary/30 rounded-lg overflow-hidden bg-card/30 backdrop-blur-sm">
        <canvas
          ref={canvasRef}
          width={canvasSize}
          height={canvasSize}
          onMouseMove={handleMouseMove}
          onMouseOut={handleMouseOut}
          onClick={handleClick}
          className="block cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 w-full h-auto max-w-full"
          style={{ aspectRatio: "1" }}
        />

        {/* Overlay effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm rounded-md px-2 py-1">
            <span className="text-xs text-muted-foreground font-mono">
              {config.vortexMode ? "Vortex Mode" : "Normal Mode"}
            </span>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-0 right-0 w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-lg" />
          <div className="absolute bottom-0 left-0 w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-tr from-accent/20 to-transparent rounded-tr-lg" />
        </div>
      </div>
    </motion.div>
  )
}

export default ParticleCanvas
