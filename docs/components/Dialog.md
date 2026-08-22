<!-- ARQUIVO GERADO — não edite à mão.
     Fonte: baseline.manifest.json (scripts/generate-docs.mjs, npm run docs)
     Consistência com src/ garantida por scripts/check-manifest.mjs no build. -->

# Dialog

**Tipo:** `compound` — comportamento herdado de `@base-ui/react/dialog` (ver [ADR 0001](../decisions/0001-por-que-base-ui.md): Base UI cuida de teclado, foco e ARIA; o baseline-ui só adiciona tokens + CSS).

## Partes

| Parte         | Estilizada pelo baseline-ui       | Classe CSS                                                                |
| ------------- | --------------------------------- | ------------------------------------------------------------------------- |
| `Root`        | não (reexportado puro do Base UI) | —                                                                         |
| `Trigger`     | não (reexportado puro do Base UI) | —                                                                         |
| `Portal`      | não (reexportado puro do Base UI) | —                                                                         |
| `Close`       | não (reexportado puro do Base UI) | —                                                                         |
| `Backdrop`    | sim                               | `bl-dialog-backdrop`                                                      |
| `Popup`       | sim                               | `bl-dialog-popup`                                                         |
| `Title`       | sim                               | `bl-dialog-title`                                                         |
| `Description` | sim                               | `bl-dialog-description`                                                   |
| `Actions`     | sim                               | `bl-dialog-actions` — parte própria do baseline-ui, não existe no Base UI |

## Estados

- `open`
- `starting-style`
- `ending-style`

## Tokens consumidos

| Token                  | Origem                                              |
| ---------------------- | --------------------------------------------------- |
| `color.bg`             | `tokens/semantic.light.json (e semantic.dark.json)` |
| `color.text`           | `tokens/semantic.light.json (e semantic.dark.json)` |
| `color.text-muted`     | `tokens/semantic.light.json (e semantic.dark.json)` |
| `color.border`         | `tokens/semantic.light.json (e semantic.dark.json)` |
| `radius.lg`            | `tokens/primitives.json`                            |
| `shadow.popup`         | `tokens/primitives.json`                            |
| `space.2`              | `tokens/primitives.json`                            |
| `space.4`              | `tokens/primitives.json`                            |
| `space.5`              | `tokens/primitives.json`                            |
| `font.sans`            | `tokens/primitives.json`                            |
| `font-size.md`         | `tokens/primitives.json`                            |
| `font-size.lg`         | `tokens/primitives.json`                            |
| `font-weight.semibold` | `tokens/primitives.json`                            |
