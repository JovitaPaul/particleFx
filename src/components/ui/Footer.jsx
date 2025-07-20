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
    <footer className=" backdrop-blur-sm px-6 py-2 ">
  
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
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
     
    </footer>
  )
}

export default Footer
