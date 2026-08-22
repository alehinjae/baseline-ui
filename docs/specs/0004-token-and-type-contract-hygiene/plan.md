# 0004 — token-and-type-contract-hygiene — Plan

## Abordagem

### Achado prévio importante: os números do `ds-audit` mudaram de escopo

A spec foi escrita contra o audit de 2026-08-11 (70 hardcoded, 20 com
token equivalente, 4 duplicatas). O audit de 2026-08-21 (pós spec 0003)
mostra 93/37/4 — **não é regressão**, é a ferramenta agora escaneando
`docs/*.md` também (117 arquivos vs ~70 antes), incluindo exemplos de
hex/px em prosa (o próprio `AGENTS.md` cita `#e6e6e6` como exemplo).
Este plano trabalha com uma varredura própria, restrita a `src/**/*.{css,tsx}`
(excluindo `src/tokens.css`, gerado) — a fonte real de hardcode em código,
não em texto.

### Varredura real (feita nesta sessão, não estimada)

```bash
grep -rnoE "#[0-9a-fA-F]{3,8}\b" --include="*.css" --include="*.tsx" src/ | grep -v tokens.css
# → ZERO resultados. Cor já é 100% tokenizada em código.

grep -rnoE "[0-9]+px" --include="*.css" src/components/ | grep -v "var("
# → 25 ocorrências, 11 arquivos
```

Triagem de cada uma:

| Valor                                                                        | Onde                  | Decisão                                                                                                                                  |
| ---------------------------------------------------------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `outline-offset: 2px` (Accordion, Button, Field, Switch, Tabs — 5x idêntico) | anel de foco          | **Novo token** `--bl-focus-ring-offset: 2px` — padrão real repetido, não coincidência                                                    |
| `outline-offset: -2px` (Accordion, variante inset)                           | anel de foco inset    | Usa o mesmo token novo, negado: `calc(var(--bl-focus-ring-offset) * -1)`                                                                 |
| `width: min(420px, calc(100vw - 32px))` (Dialog)                             | `32px`                | **Fix mecânico** — bate exato com `space.6` (32px) → `var(--bl-space-6)`                                                                 |
| `420px` (Dialog)                                                             | largura máx. do popup | **Intencional, documentado** — decisão de produto única, sem escala equivalente                                                          |
| `border: 1px solid` (Alert, Badge, Button)                                   | espessura de borda    | **Intencional, documentado** — convenção CSS de "linha fina", não decisão de escala (nenhum componente varia entre 1px/2px/4px de borda) |
| `--_gap: 2px`, `--_hit: 44px` (Switch)                                       | geometria local       | Já documentado (comentário existente + ADR 0010) — sem ação                                                                              |
| `height: 6px` (Progress)                                                     | trilho                | **Intencional, documentado** — uso único, sem padrão repetido ainda                                                                      |
| `border-width: 2px/2px/3px` (Spinner, por tamanho sm/md/lg)                  | anel do spinner       | **Intencional, documentado** — geometria local escalada por tamanho, único consumidor hoje (mesmo padrão já aceito pro Switch)           |

Resultado: **1 token novo** (`focus-ring-offset`), **1 fix mecânico**
(Dialog → `space.6`), **o resto documentado inline** com comentário
explicando o motivo — não fica "hardcoded silencioso", fica "hardcoded
com decisão registrada".

### Duplicatas de token — as 4 que o audit encontrou

Verificadas via script (`node -e` percorrendo `primitives.json` e
`semantic.light.json`):

1. `space.3` / `font-size.xs` — ambos 12px (coincidência entre escalas
   diferentes)
2. `space.4` / `radius.lg` / `font-size.lg` — todos 16px (idem)
3. `space.5` / `font-size.2xl` — ambos 24px (idem)
4. `color.text`/`color.accent` (zinc.800), `color.bg`/`color.accent-text`/
   `color.danger-text` (white), `success-soft-text`/`success-solid`
   (green.700) — aliases semânticos **intencionais**, não redundância:
   dois tokens semânticos podem legitimamente apontar pro mesmo
   primitivo porque compartilham significado visual (ex.: nosso tema é
   monocromático de propósito — ADR 0006 — então `text` e `accent` são
   a mesma cor por decisão de design, não por acidente).

**Nenhuma das 4 é consolidável sem quebrar a separação de
responsabilidade entre escalas** (espaço, tipografia, raio, cor são
eixos independentes — forçar `radius.lg` a virar alias de `space.4`
acoplaria raio de borda a espaçamento, que é exatamente o tipo de
acoplamento acidental que a arquitetura de 2 camadas existe pra evitar).
Decisão: **documentadas como "coincidência aceitável", não
consolidadas** — registrado em `docs/decisions/0011-*.md`.

### Tipos `*Props` nomeados

Os 5 componentes (`Accordion`, `Dialog`, `Field`, `Switch`, `Tabs`)
seguem o mesmo padrão hoje: `type WithClass<P> = Omit<P, 'className'> &
{ className?: string }`, usado inline em cada função sem nomear o tipo
resultante. Fix: extrair e exportar um tipo por subcomponente estilizado
(ex.: `SwitchRootProps`, `SwitchThumbProps`, `DialogPopupProps`...) —
puramente de tipo, zero mudança de runtime.

### Union types em vez de `string` aberta

Auditar as poucas props que hoje aceitam string livre (verificar
`baseline.manifest.json` — a maioria já usa union via `values[]` no
manifest; conferir se o `.tsx` correspondente reflete isso em TS, não
só em runtime).

## Decisões

- **Token novo (`focus-ring-offset`) e fix mecânico (`space.6` no
  Dialog) não geram ADR** — ferramental/token comum, sem alternativa
  rejeitada real.
- **A não-consolidação das 4 duplicatas é uma decisão real, com
  alternativa rejeitada (consolidar/aliasing cross-escala)** → **gera
  ADR** (0011), estendendo ADR 0004.

## Verificação

- `npx tsc --noEmit` limpo.
- `import type { SwitchRootProps } from 'baseline-ui'` compila num
  arquivo de teste ad hoc.
- `npm run check-contrast` e `npm run check-manifest` verdes após o
  fix do Dialog.
- Nova varredura `grep` confirma: zero valor sem justificativa (token
  novo, fix mecânico, ou comentário inline).

## Riscos / rollback

Baixo — mudança de tipo é não-runtime (reversível sem afetar
consumidores). O fix do Dialog (`32px` → `var(--bl-space-6)`) é
visualmente idêntico (mesmo valor), verificável por captura de tela.
