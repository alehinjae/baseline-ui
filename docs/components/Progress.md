<!-- ARQUIVO GERADO — não edite à mão.
     Fonte: baseline.manifest.json (scripts/generate-docs.mjs, npm run docs)
     Consistência com src/ garantida por scripts/check-manifest.mjs no build. -->

# Progress

**Tipo:** `compound` — comportamento herdado de `@base-ui/react/progress` (ver [ADR 0001](../decisions/0001-por-que-base-ui.md): Base UI cuida de teclado, foco e ARIA; o baseline-ui só adiciona tokens + CSS).

## Partes

| Parte       | Estilizada pelo baseline-ui       | Classe CSS              |
| ----------- | --------------------------------- | ----------------------- |
| `Root`      | sim                               | `bl-progress`           |
| `Track`     | sim                               | `bl-progress-track`     |
| `Indicator` | sim                               | `bl-progress-indicator` |
| `Label`     | não (reexportado puro do Base UI) | —                       |
| `Value`     | não (reexportado puro do Base UI) | —                       |

## Props

| Nome                  | Valores                                           | Default   | Data-attribute    |
| --------------------- | ------------------------------------------------- | --------- | ----------------- |
| `variant` (em `Root`) | `default`, `info`, `success`, `warning`, `danger` | `default` | `data-bl-variant` |

## Estados

- `progressing`
- `complete`
- `indeterminate`

## Tokens consumidos

| Token                 | Origem                                              |
| --------------------- | --------------------------------------------------- |
| `color.bg-subtle`     | `tokens/semantic.light.json (e semantic.dark.json)` |
| `color.accent`        | `tokens/semantic.light.json (e semantic.dark.json)` |
| `color.info-solid`    | `tokens/semantic.light.json (e semantic.dark.json)` |
| `color.success-solid` | `tokens/semantic.light.json (e semantic.dark.json)` |
| `color.warning-solid` | `tokens/semantic.light.json (e semantic.dark.json)` |
| `color.danger`        | `tokens/semantic.light.json (e semantic.dark.json)` |
| `radius.full`         | `tokens/primitives.json`                            |
