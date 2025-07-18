import { Card, CardContent } from './ui/card'

interface EmptyProps {
  message: string
}

export const Empty = ({ message }: EmptyProps) => (
  <Card>
    <CardContent className="p-8 text-center text-gray-500">
      {message}
    </CardContent>
  </Card>
)
