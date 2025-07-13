"use client"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Sparkles, Github, Twitter } from "lucide-react"
import { motion } from "framer-motion"

const Navbar = () => {
  const location = useLocation()

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Features", href: "/features" },
    { name: "Download", href: "/download" },
    { name: "Contact", href: "/contact" },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Sparkles className="h-8 w-8 text-primary group-hover:text-accent transition-colors duration-300" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-accent/30 transition-all duration-300" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ParticleFX
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={link.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-accent/10 ${
                  isActive(link.href) ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Social Links - Desktop */}
        <div className="hidden md:flex items-center space-x-2">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/Anmol-TheDev"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://x.com/anmolthedev"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">X (Twitter)</span>
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 pt-6">
                <div className="flex items-center space-x-2 pb-4 border-b">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    ParticleFX
                  </span>
                </div>

                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`flex items-center px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300 ${
                      isActive(link.href)
                        ? "text-primary bg-primary/10 border border-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="flex items-center space-x-4 pt-4 border-t">
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href="https://github.com/Anmol-TheDev"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center space-x-2"
                    >
                      <Github className="h-4 w-4" />
                      <span>GitHub</span>
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href="https://x.com/anmolthedev"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center space-x-2"
                    >
                      <Twitter className="h-4 w-4" />
                      <span>Twitter</span>
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
