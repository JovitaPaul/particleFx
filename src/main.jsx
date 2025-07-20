import React from 'react'
import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'
import App from './App'
import './index.css'

// ViteReactSSG expects a *function* that returns the app tree
export const createRoot = ViteReactSSG(
  { routes, basename: '/' },
  ({ isClient }) => {
    // optional: do client-only setup here
  },
  ({ url, isClient }) => (
    // Minimal wrapper that mimics your old BrowserRouter setup
    <App />   // App already contains <Routes>, <Navbar>, <Footer>
  )
)