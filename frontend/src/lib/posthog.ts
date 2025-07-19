import posthog from 'posthog-js'

export const initPostHog = () => {
  posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
    debug: import.meta.env.DEV,
  })
}