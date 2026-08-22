import { Grid, Card, Text } from 'baseline-ui'

export function ThreeColumns() {
  return (
    <Grid cols={3} gap={3} style={{ maxWidth: 480 }}>
      <Card padding="sm">
        <Text variant="body-sm">Grid 1</Text>
      </Card>
      <Card padding="sm">
        <Text variant="body-sm">Grid 2</Text>
      </Card>
      <Card padding="sm">
        <Text variant="body-sm">Grid 3</Text>
      </Card>
    </Grid>
  )
}
