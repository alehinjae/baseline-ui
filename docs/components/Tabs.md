<!-- ARQUIVO GERADO — não edite à mão.
     Fonte: baseline.manifest.json (scripts/generate-docs.mjs, npm run docs)
     Consistência com src/ garantida por scripts/check-manifest.mjs no build. -->

# Tabs

**Tipo:** `compound` — comportamento herdado de `@base-ui/react/tabs` (ver [ADR 0001](../decisions/0001-por-que-base-ui.md): Base UI cuida de teclado, foco e ARIA; o baseline-ui só adiciona tokens + CSS).

## Partes

| Parte       | Estilizada pelo baseline-ui       | Classe CSS      |
| ----------- | --------------------------------- | --------------- |
| `Root`      | sim                               | `bl-tabs`       |
| `List`      | sim                               | `bl-tabs-list`  |
| `Tab`       | sim                               | `bl-tabs-tab`   |
| `Panel`     | sim                               | `bl-tabs-panel` |
| `Indicator` | não (reexportado puro do Base UI) | —               |

## Estados

- `active`
- `hover`
- `focus-visible`
- `disabled`

## Tokens consumidos

| Token                  | Origem                                              |
| ---------------------- | --------------------------------------------------- |
| `color.bg`             | `tokens/semantic.light.json (e semantic.dark.json)` |
| `color.bg-subtle`      | `tokens/semantic.light.json (e semantic.dark.json)` |
| `color.text`           | `tokens/semantic.light.json (e semantic.dark.json)` |
| `color.text-muted`     | `tokens/semantic.light.json (e semantic.dark.json)` |
| `color.accent`         | `tokens/semantic.light.json (e semantic.dark.json)` |
| `space.1`              | `tokens/primitives.json`                            |
| `space.3`              | `tokens/primitives.json`                            |
| `radius.sm`            | `tokens/primitives.json`                            |
| `radius.md`            | `tokens/primitives.json`                            |
| `shadow.card`          | `tokens/primitives.json`                            |
| `font.sans`            | `tokens/primitives.json`                            |
| `font-size.sm`         | `tokens/primitives.json`                            |
| `font-weight.semibold` | `tokens/primitives.json`                            |
| `focus-ring.width`     | `tokens/primitives.json`                            |
| `focus-ring.offset`    | `tokens/primitives.json`                            |
