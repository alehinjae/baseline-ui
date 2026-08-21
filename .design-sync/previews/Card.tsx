import { Card, Text } from 'baseline-ui'

export function Default() {
  return (
    <Card style={{ maxWidth: 320 }}>
      <Text variant="h4">Card padrão</Text>
      <Text variant="muted-sm">Com sombra sutil e borda.</Text>
    </Card>
  )
}

export function Padding() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Card padding="sm" style={{ width: 140 }}>
        <Text variant="body-sm">Padding sm</Text>
      </Card>
      <Card padding="md" style={{ width: 140 }}>
        <Text variant="body-sm">Padding md</Text>
      </Card>
      <Card padding="lg" style={{ width: 140 }}>
        <Text variant="body-sm">Padding lg</Text>
      </Card>
    </div>
  )
}
