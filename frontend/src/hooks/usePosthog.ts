import { useFeatureFlagVariantKey } from 'posthog-js/react'

export const usePosthog = () => {
  const variant = useFeatureFlagVariantKey('spacex-variants')
  
  const finalVariant = variant === 'variant1' ? 'variant1' : 'control'
  
  console.log('🎯 PostHog A/B Test:', { rawVariant: variant, finalVariant })

  return {
    variant: finalVariant,
    isLoading: false,
    title: finalVariant === 'variant1' ? 'SpaceX Explorer' : 'SpaceX',
    buttonColor: finalVariant === 'variant1' ? 'green' : 'default',
    isVariant1: finalVariant === 'variant1'
  }
}
