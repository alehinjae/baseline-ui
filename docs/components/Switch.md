<!-- ARQUIVO GERADO — não edite à mão.
     Fonte: baseline.manifest.json (scripts/generate-docs.mjs, npm run docs)
     Consistência com src/ garantida por scripts/check-manifest.mjs no build. -->

# Switch

**Tipo:** `compound` — comportamento herdado de `@base-ui/react/switch` (ver [ADR 0001](../decisions/0001-por-que-base-ui.md): Base UI cuida de teclado, foco e ARIA; o baseline-ui só adiciona tokens + CSS).

## Partes

| Parte   | Estilizada pelo baseline-ui | Classe CSS        |
| ------- | --------------------------- | ----------------- |
| `Root`  | sim                         | `bl-switch`       |
| `Thumb` | sim                         | `bl-switch-thumb` |

## Estados

- `checked`
- `unchecked`
- `focus-visible`
- `disabled`

## Tokens consumidos

| Token                 | Origem                                              |
| --------------------- | --------------------------------------------------- |
| `color.border-strong` | `tokens/semantic.light.json (e semantic.dark.json)` |
| `color.accent`        | `tokens/semantic.light.json (e semantic.dark.json)` |
| `color.bg`            | `tokens/semantic.light.json (e semantic.dark.json)` |
| `space.4`             | `tokens/primitives.json`                            |
| `radius.full`         | `tokens/primitives.json`                            |
