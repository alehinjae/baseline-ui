# 0011 — Triagem de valores hardcoded e duplicatas de token

Status: aceito | Data: 2026-08-22

## Contexto

O `ds-audit` (Southleft) apontou, na rodada mais recente: 93 valores
hardcoded distintos (37 com token equivalente), 4 conjuntos de tokens
"visualmente idênticos ou duplicados". Esses números incluem
`docs/*.md` no escopo (117 arquivos escaneados — a spec 0003 gerou
docs/components/ e AGENTS.md, ambos com exemplos de hex/px em prosa,
contados como "hardcoded" pela ferramenta). Este ADR documenta a
triagem feita sobre a fonte real — `src/**/*.{css,tsx}`, excluindo
`src/tokens.css` (gerado) — não sobre a contagem inflada.

## Varredura real (2026-08-22)

```bash
grep -rnoE "#[0-9a-fA-F]{3,8}\b" --include="*.css" --include="*.tsx" src/ | grep -v tokens.css
# → zero resultados. Cor já é 100% tokenizada em código.

grep -rnoE "[0-9]+px" --include="*.css" src/components/ | grep -v "var("
# → 25 ocorrências, 11 arquivos
```

## Decisão sobre os valores em px

| Valor                                                    | Onde                  | Resolução                                                                                                            |
| -------------------------------------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `outline-offset: 2px` / `-2px` (5 componentes, idêntico) | anel de foco          | **Token novo**: `--bl-focus-ring-offset`                                                                             |
| `outline: 2px solid` (mesmos 5 componentes)              | anel de foco          | **Token novo**: `--bl-focus-ring-width`                                                                              |
| `calc(100vw - 32px)` (Dialog)                            | margem de viewport    | **Fix mecânico**: bate exato com `space.6` → `var(--bl-space-6)`                                                     |
| `min(420px, ...)` (Dialog)                               | largura máx. do popup | Intencional — decisão de produto única, comentário inline                                                            |
| `border: 1px solid` (Alert, Badge, Button, Card)         | espessura de borda    | Intencional — convenção CSS de linha fina, comentário inline                                                         |
| `height: 6px` (Progress)                                 | trilho                | Intencional — uso único, comentário inline                                                                           |
| `border-width: 2px/2px/3px` por tamanho (Spinner)        | anel do spinner       | Intencional — geometria local escalada, mesmo critério já aceito pro Switch (`--_thumb`/`--_gap`), comentário inline |
| `--_gap`, `--_hit` (Switch)                              | geometria local       | Já documentado (ADR 0010) — sem ação nova                                                                            |

Critério usado pra "novo token" vs "documentado intencional": **um
valor repetido de forma idêntica em ≥3 componentes por um motivo
semântico único** (o anel de foco) vira token; um valor usado uma ou
duas vezes, ou que representa uma convenção CSS (não uma escala de
design), fica documentado inline em vez de forçado a um token
artificial.

## Decisão sobre as 4 duplicatas de token

Verificadas programaticamente (`primitives.json` e `semantic.light.json`
percorridos por script):

1. `space.3` (12px) = `font-size.xs` (12px)
2. `space.4` (16px) = `radius.lg` (16px) = `font-size.lg` (16px)
3. `space.5` (24px) = `font-size.2xl` (24px)
4. Múltiplos aliases semânticos apontando pro mesmo primitivo por
   design: `color.bg`/`color.accent-text`/`color.danger-text` → white;
   `color.text`/`color.accent` → zinc.800 (tema monocromático — ADR
   0006); `success-soft-text`/`success-solid` → green.700

**Decisão: nenhuma consolidada.** Os itens 1-3 são coincidências
numéricas entre escalas semanticamente independentes (espaço,
tipografia, raio) — consolidá-las (ex.: `radius.lg` virar alias de
`space.4`) acoplaria conceitos que devem poder evoluir separadamente;
se o type scale mudar amanhã, o raio de borda não deveria mudar junto
só porque hoje compartilham valor numérico por acaso. O item 4 não é
duplicata — é o comportamento correto e esperado de alias semântico
(ADR 0004): dois tokens semânticos podem legitimamente resolver pro
mesmo primitivo quando compartilham significado visual de propósito.

## Sobre union types (objetivo relacionado da spec 0004)

Verificado via grep em todo `src/components/*.tsx`: **nenhuma prop de
variante (variant/size/padding/direction/align/justify) usa `string`
aberta** — todas já são union type restrito. O achado do audit ("11%
das props contracts usam union types") não reflete o código-fonte real;
provavelmente conta outro artefato (o JSON do manifest, ou algo nos
docs gerados). Nenhuma mudança de código necessária aqui — verificado,
não corrigido porque não havia o que corrigir.

## Consequências

- Tokens novos `focus-ring.width`/`focus-ring.offset` em
  `tokens/primitives.json`, aplicados nos 5 componentes com anel de
  foco.
- `Dialog.css` usa `var(--bl-space-6)` em vez de `32px` solto.
- 6 valores em px continuam literais no CSS, cada um com comentário
  inline explicando o motivo — não é "esquecido", é decidido.
- Nenhuma mudança em `tokens/*.json` de consolidação de duplicata.
