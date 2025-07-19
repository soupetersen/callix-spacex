import { usePosthog } from '../hooks/usePosthog'

export const Header = () => {
  const { title, isVariant1 } = usePosthog()

  return (
    <header className="text-center mb-8" data-testid="header">
      <h1
        className="text-4xl font-bold text-foreground mb-2"
        data-testid="app-title"
        data-variant={isVariant1 ? 'variant1' : 'control'}
      >
        {title}
      </h1>
      <p className="text-xl text-muted-foreground">
        Explore os lançamentos da SpaceX
      </p>
    </header>
  )
}
