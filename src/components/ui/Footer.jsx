import React from 'react';
import { Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Copyright © 2025 Anmol Singh.
        </p>
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/Anmol-TheDev"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://x.com/anmolthedev"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">X (Twitter)</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
