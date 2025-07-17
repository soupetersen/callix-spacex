import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { CheckCircle, XCircle, Clock, Rocket, Play } from 'lucide-react'
import type { SpacexLaunch } from './types/api'
import './App.css'
import { API_BASE_URL } from './lib/api'

function App() {
  const [nextLaunch, setNextLaunch] = useState<SpacexLaunch | null>(null)
  const [latestLaunch, setLatestLaunch] = useState<SpacexLaunch | null>(null)
  const [upcomingLaunches, setUpcomingLaunches] = useState<SpacexLaunch[]>([])
  const [pastLaunches, setPastLaunches] = useState<SpacexLaunch[]>([])
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [error, setError] = useState<Record<string, string | null>>({})

  const fetchData = async <T,>(
    endpoint: string,
    setter: (data: T) => void,
    key: string
  ) => {
    setLoading((prev) => ({ ...prev, [key]: true }))
    setError((prev) => ({ ...prev, [key]: null }))

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = (await response.json()) as { data: T }
      setter(result.data)
    } catch (err) {
      setError((prev) => ({
        ...prev,
        [key]: err instanceof Error ? err.message : 'Erro desconhecido',
      }))
    } finally {
      setLoading((prev) => ({ ...prev, [key]: false }))
    }
  }

  const loadNextLaunch = useCallback(
    () => fetchData<SpacexLaunch>('/next-launch', setNextLaunch, 'nextLaunch'),
    []
  )
  const loadLatestLaunch = useCallback(
    () =>
      fetchData<SpacexLaunch>(
        '/latest-launch',
        setLatestLaunch,
        'latestLaunch'
      ),
    []
  )
  const loadUpcomingLaunches = useCallback(
    () =>
      fetchData<SpacexLaunch[]>(
        '/upcoming-launches',
        setUpcomingLaunches,
        'upcomingLaunches'
      ),
    []
  )
  const loadPastLaunches = useCallback(
    () =>
      fetchData<SpacexLaunch[]>(
        '/past-launches',
        setPastLaunches,
        'pastLaunches'
      ),
    []
  )

  useEffect(() => {
    loadNextLaunch()
    loadLatestLaunch()
    loadUpcomingLaunches()
    loadPastLaunches()
  }, [loadNextLaunch, loadLatestLaunch, loadUpcomingLaunches, loadPastLaunches])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const LaunchCard = ({
    launch,
    showDetails = false,
  }: {
    launch: SpacexLaunch
    showDetails?: boolean
  }) => (
    <Card className="mb-4 hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              <Rocket className="h-5 w-5 text-primary" />
              {launch.name}
            </CardTitle>
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {formatDate(launch.date_local)}
            </div>
            {launch.links?.webcast && (
              <div className="flex mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-blue-500 hover:text-white hover:border-blue-600 transition-all duration-200 cursor-pointer transform hover:scale-105"
                  onClick={() =>
                    launch.links?.webcast &&
                    window.open(launch.links.webcast, '_blank')
                  }
                >
                  <Play className="h-4 w-4 mr-1" />
                  Assistir
                </Button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {launch.success !== null && (
              <div className="flex items-center">
                {launch.success ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-500" />
                )}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      {showDetails && launch.details && (
        <CardContent>
          <div className="text-sm text-muted-foreground">
            <p>{launch.details}</p>
          </div>
        </CardContent>
      )}
    </Card>
  )

  const LoadingState = () => (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <span className="ml-2">Carregando...</span>
    </div>
  )

  const ErrorState = ({
    message,
    onRetry,
  }: {
    message: string
    onRetry: () => void
  }) => (
    <div className="text-center p-8">
      <p className="text-red-600 mb-4">Erro: {message}</p>
      <Button onClick={onRetry} variant="outline">
        Tentar novamente
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">SpaceX</h1>
          <p className="text-xl text-muted-foreground">
            Explore os lançamentos da SpaceX
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">
                Próximo Lançamento
              </h2>
              <Button
                onClick={loadNextLaunch}
                disabled={loading.nextLaunch}
                size="sm"
                variant="outline"
              >
                Atualizar
              </Button>
            </div>
            {loading.nextLaunch ? (
              <LoadingState />
            ) : error.nextLaunch ? (
              <ErrorState message={error.nextLaunch} onRetry={loadNextLaunch} />
            ) : nextLaunch ? (
              <LaunchCard launch={nextLaunch} showDetails={true} />
            ) : (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  Nenhum lançamento futuro encontrado
                </CardContent>
              </Card>
            )}
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">
                Último Lançamento
              </h2>
              <Button
                onClick={loadLatestLaunch}
                disabled={loading.latestLaunch}
                size="sm"
                variant="outline"
              >
                Atualizar
              </Button>
            </div>
            {loading.latestLaunch ? (
              <LoadingState />
            ) : error.latestLaunch ? (
              <ErrorState
                message={error.latestLaunch}
                onRetry={loadLatestLaunch}
              />
            ) : latestLaunch ? (
              <LaunchCard launch={latestLaunch} showDetails={true} />
            ) : (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  Nenhum lançamento encontrado
                </CardContent>
              </Card>
            )}
          </section>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">
                Próximos Lançamentos
              </h2>
              <Button
                onClick={loadUpcomingLaunches}
                disabled={loading.upcomingLaunches}
                size="sm"
                variant="outline"
              >
                Atualizar
              </Button>
            </div>
            {loading.upcomingLaunches ? (
              <LoadingState />
            ) : error.upcomingLaunches ? (
              <ErrorState
                message={error.upcomingLaunches}
                onRetry={loadUpcomingLaunches}
              />
            ) : upcomingLaunches.length > 0 ? (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {upcomingLaunches.map((launch) => (
                  <LaunchCard key={launch.id} launch={launch} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  Nenhum lançamento futuro encontrado
                </CardContent>
              </Card>
            )}
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">
                Lançamentos Passados
              </h2>
              <Button
                onClick={loadPastLaunches}
                disabled={loading.pastLaunches}
                size="sm"
                variant="outline"
              >
                Atualizar
              </Button>
            </div>
            {loading.pastLaunches ? (
              <LoadingState />
            ) : error.pastLaunches ? (
              <ErrorState
                message={error.pastLaunches}
                onRetry={loadPastLaunches}
              />
            ) : pastLaunches.length > 0 ? (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {pastLaunches.map((launch) => (
                  <LaunchCard key={launch.id} launch={launch} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  Nenhum lançamento passado encontrado
                </CardContent>
              </Card>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default App
