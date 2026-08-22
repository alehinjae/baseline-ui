<!-- ARQUIVO GERADO — não edite à mão.
     Fonte: baseline.manifest.json (scripts/generate-docs.mjs, npm run docs)
     Consistência com src/ garantida por scripts/check-manifest.mjs no build. -->

# Field

**Tipo:** `compound` — comportamento herdado de `@base-ui/react/field` (ver [ADR 0001](../decisions/0001-por-que-base-ui.md): Base UI cuida de teclado, foco e ARIA; o baseline-ui só adiciona tokens + CSS).

## Partes

| Parte         | Estilizada pelo baseline-ui       | Classe CSS             |
| ------------- | --------------------------------- | ---------------------- |
| `Root`        | sim                               | `bl-field`             |
| `Label`       | sim                               | `bl-field-label`       |
| `Control`     | sim                               | `bl-field-control`     |
| `Description` | sim                               | `bl-field-description` |
| `Error`       | sim                               | `bl-field-error`       |
| `Validity`    | não (reexportado puro do Base UI) | —                      |

## Estados

- `focus-visible`
- `invalid`
- `disabled`

## Tokens consumidos

| Token                 | Origem                                              |
| --------------------- | --------------------------------------------------- |
| `color.bg`            | `tokens/semantic.light.json (e semantic.dark.json)` |
| `color.bg-subtle`     | `tokens/semantic.light.json (e semantic.dark.json)` |
| `color.text`          | `tokens/semantic.light.json (e semantic.dark.json)` |
| `color.text-muted`    | `tokens/semantic.light.json (e semantic.dark.json)` |
| `color.border-strong` | `tokens/semantic.light.json (e semantic.dark.json)` |
| `color.accent`        | `tokens/semantic.light.json (e semantic.dark.json)` |
| `color.danger`        | `tokens/semantic.light.json (e semantic.dark.json)` |
| `space.2`             | `tokens/primitives.json`                            |
| `space.3`             | `tokens/primitives.json`                            |
| `radius.md`           | `tokens/primitives.json`                            |
| `font.sans`           | `tokens/primitives.json`                            |
| `font-size.sm`        | `tokens/primitives.json`                            |
| `font-size.md`        | `tokens/primitives.json`                            |
| `font-weight.medium`  | `tokens/primitives.json`                            |
| `focus-ring.width`    | `tokens/primitives.json`                            |
| `focus-ring.offset`   | `tokens/primitives.json`                            |
