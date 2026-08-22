import { Text } from 'baseline-ui'

export function Headings() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="h4">Heading 4</Text>
    </div>
  )
}

export function Body() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 360 }}>
      <Text variant="body-lg">Corpo de texto grande (body-lg), para introduções e destaques.</Text>
      <Text variant="body-md">Corpo de texto padrão (body-md).</Text>
      <Text variant="body-sm">Corpo de texto pequeno (body-sm).</Text>
      <Text variant="muted-sm">Texto secundário/legenda (muted-sm).</Text>
      <Text variant="muted-md">Texto secundário médio (muted-md).</Text>
    </div>
  )
}
