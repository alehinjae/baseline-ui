import { Stack, Badge } from 'baseline-ui'

export function Row() {
  return (
    <Stack direction="row" gap={3}>
      <Badge variant="gray">Stack</Badge>
      <Badge variant="gray">row</Badge>
      <Badge variant="gray">gap 3</Badge>
    </Stack>
  )
}

export function Column() {
  return (
    <Stack direction="column" gap={2} style={{ maxWidth: 160 }}>
      <Badge variant="blue">Item 1</Badge>
      <Badge variant="blue">Item 2</Badge>
      <Badge variant="blue">Item 3</Badge>
    </Stack>
  )
}
