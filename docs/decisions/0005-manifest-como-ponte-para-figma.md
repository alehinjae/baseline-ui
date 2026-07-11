# 0005 — baseline.manifest.json como contrato código→Figma

Status: aceito | Data: 2026-07-11

## Contexto

Os tokens W3C (ADR 0004) resolvem metade da ponte com o Figma: viram
Variables. A outra metade são os **componentes** — e aí não existe formato
padrão. O código TSX/CSS contém tudo (variantes, partes, estados, tokens
usados), mas espalhado e no formato errado: uma ferramenta que fosse gerar
a biblioteca no Figma teria que *interpretar* código React, o que é frágil
e caro.

## Decisão

Um arquivo na raiz, `baseline.manifest.json`, descreve cada componente de
forma declarativa:

- **kind** — `single` (Button) ou `compound` (Root/Parts, ADR 0002);
- **parts** — cada parte, se ela é estilizada pelo baseline-ui ou
  reexportada pura do Base UI, e sua classe CSS;
- **props** — variantes com valores, default e o data-attribute que as
  carrega (ADR 0003). Mapeiam 1:1 para *component properties* de variante
  no Figma;
- **states** — os estados interativos que o CSS seleciona (`hover`,
  `focus-visible`, `data-checked`...). Viram as variantes de estado dos
  componentes Figma;
- **tokens** — quais tokens o componente consome. Permite gerar no Figma
  já ligando cada estilo à Variable certa, e responde "quem usa este
  token?" antes de qualquer mudança.

### O manifest não pode apodrecer

Manifest desatualizado é pior que nenhum. `scripts/check-manifest.mjs`
roda em todo build e falha se: um componente do manifest não é exportado
em `src/index.ts` (ou vice-versa); um token referenciado não existe em
`tokens/`; uma classe CSS declarada não aparece no CSS do componente.
É verificação estrutural, não semântica — garante que nada foi esquecido,
não que cada detalhe visual esteja descrito.

### Por que manter à mão em vez de extrair do código

Extrair variantes/tokens parseando TSX+CSS automaticamente seria a solução
"esperta", mas: o manifest também carrega **intenção** que não está no
código (qual parte é opinativa vs. reexportada, notas como "Actions não
existe no Base UI"); e o custo de manter 4–15 componentes à mão com o
verificador cobrando é baixo. Se a biblioteca passar de ~20 componentes,
revisitar geração automática.

## Consequências

- Todo componente novo tem três entregas obrigatórias: TSX + CSS + entrada
  no manifest (o build cobra a terceira).
- A fase 3 (ponte Figma de verdade) parte de dois arquivos estáveis —
  `tokens/*.json` e `baseline.manifest.json` — e nenhuma leitura de código.
- O manifest é publicado no pacote npm junto com `tokens/`.
