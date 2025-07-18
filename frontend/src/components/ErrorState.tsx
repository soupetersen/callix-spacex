import { Button } from './ui/button'

interface ErrorStateProps {
  message: string
  onRetry?: () => void
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => (
  <div className="text-center p-8">
    <p className="text-red-600 mb-4">Erro: {message}</p>
    {onRetry && (
      <Button onClick={onRetry} variant="outline">
        Tentar novamente
      </Button>
    )}
  </div>
)
