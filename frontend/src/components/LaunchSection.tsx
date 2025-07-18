import { LoadingState } from './LoadingState'
import { ErrorState } from './ErrorState'
import { Empty } from './Empty'
import { LaunchCard } from './LaunchCard'
import type { SpacexLaunch } from '../types/api'

interface LaunchSectionProps {
  title: string
  launches: SpacexLaunch | SpacexLaunch[] | null
  loading: boolean
  error: string | null
  onRetry?: () => void
  showDetails?: boolean
  emptyMessage: string
  isList?: boolean
}

export const LaunchSection = ({
  title,
  launches,
  loading,
  error,
  showDetails = false,
  emptyMessage,
  isList = false,
}: LaunchSectionProps) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      </div>

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} />
      ) : isList ? (
        Array.isArray(launches) && launches.length > 0 ? (
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {launches.map((launch) => (
              <LaunchCard
                key={launch.id}
                launch={launch}
                showDetails={showDetails}
              />
            ))}
          </div>
        ) : (
          <Empty message={emptyMessage} />
        )
      ) : launches ? (
        <LaunchCard
          launch={launches as SpacexLaunch}
          showDetails={showDetails}
        />
      ) : (
        <Empty message={emptyMessage} />
      )}
    </section>
  )
}
