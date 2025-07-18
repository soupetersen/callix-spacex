export const LoadingState = () => (
  <div className="flex items-center justify-center p-8" data-testid="loading-state">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    <span className="ml-2">Carregando...</span>
  </div>
)
