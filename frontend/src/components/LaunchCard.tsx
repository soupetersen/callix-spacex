import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { CheckCircle, XCircle, Clock, Rocket, Play } from 'lucide-react'
import type { SpacexLaunch } from '../types/api'

interface LaunchCardProps {
  launch: SpacexLaunch
  showDetails?: boolean
}

export const LaunchCard = ({
  launch,
  showDetails = false,
}: LaunchCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
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
}
