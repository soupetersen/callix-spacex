import { useSpacex } from './hooks/useSpacex'
import { usePosthog } from './hooks/usePosthog'
import { Header } from './components/Header'
import { LaunchSection } from './components/LaunchSection'
import { Button } from './components/ui/button'
import { RefreshCw } from 'lucide-react'
import './styles/App.css'

function App() {
  const {
    nextLaunch,
    latestLaunch,
    upcomingLaunches,
    pastLaunches,
    loading,
    error,
    refetch,
  } = useSpacex()

  const { buttonColor, variant } = usePosthog()

  const isAnyLoading =
    loading.nextLaunch ||
    loading.latestLaunch ||
    loading.upcomingLaunches ||
    loading.pastLaunches

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <Header />

        <div className="flex justify-center mb-8">
          <Button
            onClick={refetch}
            disabled={isAnyLoading}
            variant={buttonColor === 'green' ? 'green' : 'default'}
            className="flex items-center gap-2 cursor-pointer"
            data-testid="refresh-button"
            data-variant={variant}
          >
            <RefreshCw
              className={`h-4 w-4 ${isAnyLoading ? 'animate-spin' : ''}`}
            />
            {isAnyLoading ? 'Atualizando...' : 'Atualizar Dados'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <LaunchSection
            title="Próximo Lançamento"
            launches={nextLaunch}
            loading={loading.nextLaunch}
            error={error.nextLaunch}
            showDetails={true}
            emptyMessage="Nenhum lançamento futuro encontrado"
          />

          <LaunchSection
            title="Último Lançamento"
            launches={latestLaunch}
            loading={loading.latestLaunch}
            error={error.latestLaunch}
            showDetails={true}
            emptyMessage="Nenhum lançamento encontrado"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LaunchSection
            title="Próximos Lançamentos"
            launches={upcomingLaunches}
            loading={loading.upcomingLaunches}
            error={error.upcomingLaunches}
            showDetails={false}
            emptyMessage="Nenhum lançamento futuro encontrado"
            isList={true}
          />

          <LaunchSection
            title="Lançamentos Passados"
            launches={pastLaunches}
            loading={loading.pastLaunches}
            error={error.pastLaunches}
            showDetails={false}
            emptyMessage="Nenhum lançamento passado encontrado"
            isList={true}
          />
        </div>
      </div>
    </div>
  )
}

export default App
