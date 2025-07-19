import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PostHogProvider } from 'posthog-js/react'
import posthog from 'posthog-js'
import { initPostHog } from './lib/posthog'
import './styles/index.css'
import App from './App.tsx'

// Initialize PostHog
initPostHog()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PostHogProvider client={posthog}>
      <App />
    </PostHogProvider>
  </StrictMode>
)
