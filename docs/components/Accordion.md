<!-- ARQUIVO GERADO — não edite à mão.
     Fonte: baseline.manifest.json (scripts/generate-docs.mjs, npm run docs)
     Consistência com src/ garantida por scripts/check-manifest.mjs no build. -->

# Accordion

**Tipo:** `compound` — comportamento herdado de `@base-ui/react/accordion` (ver [ADR 0001](../decisions/0001-por-que-base-ui.md): Base UI cuida de teclado, foco e ARIA; o baseline-ui só adiciona tokens + CSS).

## Partes

| Parte     | Estilizada pelo baseline-ui | Classe CSS             |
| --------- | --------------------------- | ---------------------- |
| `Root`    | sim                         | `bl-accordion`         |
| `Item`    | sim                         | `bl-accordion-item`    |
| `Header`  | sim                         | `bl-accordion-header`  |
| `Trigger` | sim                         | `bl-accordion-trigger` |
| `Panel`   | sim                         | `bl-accordion-panel`   |

## Estados

- `open`
- `hover`
- `focus-visible`
- `disabled`
- `starting-style`
- `ending-style`

## Tokens consumidos

| Token                  | Origem                                              |
| ---------------------- | --------------------------------------------------- |
| `color.bg-subtle`      | `tokens/semantic.light.json (e semantic.dark.json)` |
| `color.text`           | `tokens/semantic.light.json (e semantic.dark.json)` |
| `color.text-muted`     | `tokens/semantic.light.json (e semantic.dark.json)` |
| `color.border`         | `tokens/semantic.light.json (e semantic.dark.json)` |
| `color.accent`         | `tokens/semantic.light.json (e semantic.dark.json)` |
| `space.2`              | `tokens/primitives.json`                            |
| `space.3`              | `tokens/primitives.json`                            |
| `space.4`              | `tokens/primitives.json`                            |
| `font.sans`            | `tokens/primitives.json`                            |
| `font-size.md`         | `tokens/primitives.json`                            |
| `font-weight.semibold` | `tokens/primitives.json`                            |
| `focus-ring.width`     | `tokens/primitives.json`                            |
| `focus-ring.offset`    | `tokens/primitives.json`                            |
