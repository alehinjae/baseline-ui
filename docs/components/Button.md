<!-- ARQUIVO GERADO — não edite à mão.
     Fonte: baseline.manifest.json (scripts/generate-docs.mjs, npm run docs)
     Consistência com src/ garantida por scripts/check-manifest.mjs no build. -->

# Button

**Tipo:** `single` — comportamento herdado de `@base-ui/react/button` (ver [ADR 0001](../decisions/0001-por-que-base-ui.md): Base UI cuida de teclado, foco e ARIA; o baseline-ui só adiciona tokens + CSS).

**Classe CSS:** `bl-button`

## Props

| Nome      | Valores                               | Default | Data-attribute    |
| --------- | ------------------------------------- | ------- | ----------------- |
| `variant` | `solid`, `outline`, `ghost`, `danger` | `solid` | `data-bl-variant` |
| `size`    | `sm`, `md`, `lg`                      | `md`    | `data-bl-size`    |

## Estados

- `hover`
- `focus-visible`
- `disabled`

## Tokens consumidos

| Token                 | Origem                                              |
| --------------------- | --------------------------------------------------- |
| `color.accent`        | `tokens/semantic.light.json (e semantic.dark.json)` |
| `color.accent-text`   | `tokens/semantic.light.json (e semantic.dark.json)` |
| `color.text`          | `tokens/semantic.light.json (e semantic.dark.json)` |
| `color.border-strong` | `tokens/semantic.light.json (e semantic.dark.json)` |
| `color.bg-subtle`     | `tokens/semantic.light.json (e semantic.dark.json)` |
| `color.danger`        | `tokens/semantic.light.json (e semantic.dark.json)` |
| `color.danger-text`   | `tokens/semantic.light.json (e semantic.dark.json)` |
| `space.1`             | `tokens/primitives.json`                            |
| `space.2`             | `tokens/primitives.json`                            |
| `space.3`             | `tokens/primitives.json`                            |
| `space.4`             | `tokens/primitives.json`                            |
| `space.5`             | `tokens/primitives.json`                            |
| `radius.md`           | `tokens/primitives.json`                            |
| `font.sans`           | `tokens/primitives.json`                            |
| `font-size.sm`        | `tokens/primitives.json`                            |
| `font-size.md`        | `tokens/primitives.json`                            |
| `font-size.lg`        | `tokens/primitives.json`                            |
| `font-weight.medium`  | `tokens/primitives.json`                            |
