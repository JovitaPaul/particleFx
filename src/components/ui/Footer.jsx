"use client"
import { Github, Twitter, Heart, Sparkles, Mail, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const Footer = () => {
  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/Anmol-TheDev",
      icon: Github,
      color: "hover:text-purple-400",
    },
    {
      name: "Twitter",
      href: "https://x.com/anmolthedev",
      icon: Twitter,
      color: "hover:text-blue-400",
    },
    {
      name: "Email",
      href: "mailto:contact@anmolthedev.com",
      icon: Mail,
      color: "hover:text-green-400",
    },
  ]

  const footerLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Documentation", href: "/docs" },
    { name: "Support", href: "/support" },
  ]

  return (
    <footer className="border-t bg-background/50 backdrop-blur-sm">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 flex flex-col items-center text-center"
          >
            <div className="flex items-center space-x-2 justify-center">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ParticleFX
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Create stunning particle disintegration effects from any image. Built with React and powered by
              creativity.
            </p>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground justify-center">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>by Anmol Singh</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4 flex flex-col items-center text-center"
          >
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center space-x-1 group justify-center"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4 flex flex-col items-center text-center"
          >
            <h3 className="font-semibold text-foreground">Connect</h3>
            <div className="flex flex-col space-y-3 items-center">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.div key={social.name} whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Button variant="ghost" size="sm" asChild className="justify-start p-0 h-auto">
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className={`flex items-center space-x-2 text-muted-foreground ${social.color} transition-colors duration-300`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-sm">{social.name}</span>
                      </a>
                    </Button>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 pt-8 border-t flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
        >
          <p className="text-sm text-muted-foreground text-center md:text-left">Copyright © 2025 Anmol Singh. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span className="text-xs text-muted-foreground text-center">Built with React + Vite + shadcn/ui</span>
            <div className="flex space-x-2">
              {socialLinks.slice(0, 2).map((social) => {
                const Icon = social.icon
                return (
                  <motion.div key={social.name} whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                    <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className={`${social.color} transition-colors duration-300`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="sr-only">{social.name}</span>
                      </a>
                    </Button>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
