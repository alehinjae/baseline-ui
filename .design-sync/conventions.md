# baseline-ui — conventions for building with this library

No provider or root wrapper is required — every component reads its styling
straight from CSS custom properties defined on `:root` by `styles.css`. Just
import from `'baseline-ui'` and compose.

## The one rule that isn't obvious: wrap text in `<Text>`

Most components (`Button`, `Badge`, `Alert`) set their own `font-family`, so
their children look right even as raw strings. But plain containers —
`Card`, `Grid`, `Stack` — do **not** set a font. A raw string dropped
straight into a `Card` renders in the browser's default serif font, not the
design system's typeface. Always wrap freeform text in `<Text variant="…">`
before placing it inside `Card`/`Grid`/`Stack`/`Field`:

```jsx
<Card padding="sm">
  <Text variant="body-sm">Grid 1</Text>
</Card>
```

`TextVariant` = `'h1' | 'h2' | 'h3' | 'h4' | 'body-sm' | 'body-md' | 'body-lg' | 'muted-sm' | 'muted-md'`.

## Styling idiom: CSS custom properties, not utility classes

baseline-ui is **not** a Tailwind-style utility system and has no prop-based
theming (no `color="red.500"`-style props). Every component's own CSS reads
design values from `--bl-*` custom properties on `:root` (defined in
`styles.css`, which every rendered design receives). The real families:

| Family | Examples                                                                                                                     |
| ------ | ---------------------------------------------------------------------------------------------------------------------------- |
| Color  | `--bl-color-bg`, `--bl-color-text`, `--bl-color-border`, `--bl-color-accent`, `--bl-color-danger`, `--bl-color-info-soft-bg` |
| Space  | `--bl-space-1` … `--bl-space-7` (drives `Stack`/`Grid` `gap`, `Card` `padding`)                                              |
| Radius | `--bl-radius-md`, `--bl-radius-lg`                                                                                           |
| Shadow | `--bl-shadow-card`, `--bl-shadow-popup`                                                                                      |
| Font   | `--bl-font-sans`, `--bl-font-weight-medium`                                                                                  |

Colors are two-layer tokens (W3C format): a `primitive` scale (`zinc`,
`red`, `blue`, `green`, `orange`, `purple`, `pink`) aliased by a `semantic`
layer (`bg`, `text`, `border`, `danger-soft-bg`, `info-soft-text`, …) that
switches per light/dark theme. Never reach for a primitive color directly in
a composition — use the semantic name, the same way the components
themselves do.

Components never need a `className` override to look right — every visual
variant is a documented prop (`variant`, `size`, `padding`, `cols`, `gap`),
not a CSS class to write by hand.

## Compound components

Six components ship as a **namespace of parts** rather than a single
callable — compose them the way Base UI (their underlying primitive layer)
expects, always via dot access, never by importing a part standalone:

`Accordion.{Root,Item,Header,Trigger,Panel}`, `Dialog.{Root,Trigger,Portal,Backdrop,Popup,Title,Description,Actions,Close}`,
`Field.{Root,Label,Control,Description,Error,Validity}`,
`Progress.{Root,Track,Indicator,Label,Value}`, `Switch.{Root,Thumb}`,
`Tabs.{Root,List,Tab,Panel,Indicator}`.

Example (Dialog):

```jsx
<Dialog.Root>
  <Dialog.Trigger render={<Button variant="outline" />}>Abrir dialog</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Title>Confirmar ação</Dialog.Title>
      <Dialog.Description>Isso não pode ser desfeito.</Dialog.Description>
      <Dialog.Actions>
        <Dialog.Close render={<Button variant="ghost" />}>Cancelar</Dialog.Close>
        <Button variant="danger">Confirmar</Button>
      </Dialog.Actions>
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>
```

`render={<Button .../>}` (Base UI's render-prop pattern) is how these parts
merge their own behavior onto another baseline-ui component instead of
rendering a plain `<button>`.

## Where the truth lives

- `_ds_bundle.css`'s closure (imported by `styles.css`) — the real compiled
  component CSS and every `--bl-*` custom property definition.
- Each component's `<Name>.d.ts` in this project — the exact prop contract
  (`ButtonVariant`, `CardPadding`, `StackGap`, `GridCols`, etc. are closed
  string/number unions, not open strings).

## One idiomatic build snippet

```jsx
<Card>
  <Stack direction="column" gap={2}>
    <Text variant="h4">Novo agendamento</Text>
    <Text variant="muted-sm">Revise antes de confirmar.</Text>
    <Field.Root>
      <Field.Label>Título</Field.Label>
      <Field.Control placeholder="Nome do post" />
    </Field.Root>
    <Stack direction="row" gap={2}>
      <Badge variant="blue">Reel</Badge>
      <Badge variant="gray">Rascunho</Badge>
    </Stack>
    <Button variant="solid">Salvar</Button>
  </Stack>
</Card>
```
