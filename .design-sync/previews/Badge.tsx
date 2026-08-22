import { Badge } from 'baseline-ui'

export function Variants() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Badge variant="gray">Gray</Badge>
      <Badge variant="blue">Blue</Badge>
      <Badge variant="green">Green</Badge>
      <Badge variant="orange">Orange</Badge>
      <Badge variant="red">Red</Badge>
      <Badge variant="purple">Purple</Badge>
      <Badge variant="pink">Pink</Badge>
    </div>
  )
}
