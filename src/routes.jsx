import ParticleApp from './components/ParticleApp'
import Features      from './components/Features'
import Docs          from './components/Docs'

export const routes = [
  { path: '/',       element: <ParticleApp /> },
  { path: '/features', element: <Features /> },
  { path: '/docs',   element: <Docs /> }
]