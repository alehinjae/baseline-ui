import { Button } from 'baseline-ui'

export function Variants() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  )
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button variant="solid" size="sm">
        Small
      </Button>
      <Button variant="solid" size="md">
        Medium
      </Button>
      <Button variant="solid" size="lg">
        Large
      </Button>
    </div>
  )
}

export function Disabled() {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button variant="solid" disabled>
        Solid
      </Button>
      <Button variant="outline" disabled>
        Outline
      </Button>
    </div>
  )
}
