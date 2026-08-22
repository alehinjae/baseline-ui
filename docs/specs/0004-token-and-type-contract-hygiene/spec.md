# 0004 — token-and-type-contract-hygiene

Status: done
Owner: alehinjae
Related: ADR 0004 (tokens como fonte única), ADR 0005 (manifest), audit gaps: Design Tokens 72/C e "5 of 14 components do not declare a Props interface/type" (`audit/report.md`)

## Problema

Duas categorias de gap, ambas ligadas ao contrato de tipo/token:

1. **Tipos**: 5 de 14 componentes (`Accordion`, `Dialog`, `Field`,
   `Switch`, `Tabs`) não exportam um tipo `*Props` nomeado — inlineiam
   `WithClass<ComponentProps<typeof Base...>>` direto na assinatura de
   cada subcomponente. Um consumidor (humano ou agente) não consegue
   importar `SwitchRootProps`, por exemplo, pra tipar um wrapper próprio.
2. **Tokens**: 20 valores hardcoded no código-fonte já têm token
   equivalente e deveriam usá-lo (`#000` → `var(--bl-color-black)`, `14px`
   → `var(--bl-font-size-md)`, etc — lista completa em
   `audit/report.md`); 70 valores hardcoded no total, sendo 50 sem
   nenhum token equivalente hoje; 4 pares de tokens com valor visualmente
   idêntico/duplicado.

## Objetivos

- Os 5 componentes sem tipo nomeado passam a exportar `*Props` (ex.:
  `SwitchRootProps`, `DialogPopupProps`) — sem mudar o comportamento em
  runtime, só a superfície de tipo.
- Onde fizer sentido, props de variante que hoje aceitam `string` aberta
  passam a usar union type restrito (`'primary' | 'secondary'`, não
  `string`) — auditar caso a caso, nem toda prop precisa disso.
- Os 20 valores hardcoded com token equivalente: substituídos
  mecanicamente, verificado por `check-contrast.mjs` que nada quebra.
- Os 50 valores sem token equivalente: **triados e documentados**, não
  resolvidos silenciosamente — cada um vira (a) um token novo, se
  representar um padrão real reutilizável, ou (b) uma anotação explícita
  de "intencionalmente não tokenizado" com o motivo, inline no código.
- Os 4 pares de tokens duplicados: resolvidos (um dos dois vira alias do
  outro, ou os dois são consolidados em um só, dependendo do caso).

## Não-objetivos

- **Não é "resolver os 70 hardcoded silenciosamente".** O critério de
  aceite exige triagem documentada dos 50 sem token — decisão de design
  (o que vira token novo) não pode ser automática. Se a triagem não
  couber no tempo desta spec, o critério de aceite aceita "triado e
  documentado", não "resolvido".
- Não adiciona uma terceira camada de tokens (tokens por componente,
  tipo `button.bg.hover`) — isso é uma mudança arquitetural maior,
  mencionada como gap conhecido em conversas anteriores, fora do escopo
  desta spec de higiene.
- Não migra o formato dos tokens pra spec W3C finalizada (objeto
  estruturado `{value, unit}` em vez de string `"16px"`) — achado
  separado (via Terrazzo, em conversa anterior), não faz parte desta
  spec.

## Critério de aceite

- [x] `import type { SwitchRootProps } from 'baseline-ui'` funciona (e
      equivalente pros outros 4 componentes) sem erro de tipo. Verificado
      via `npx tsc --noEmit` num arquivo ad-hoc importando os 10 tipos
      novos (`*RootProps`/`*Props` de Accordion, Dialog, Field, Switch,
      Tabs).
- [x] `npm run typecheck` continua limpo depois da mudança.
- [x] Os valores hardcoded com token equivalente real (varredura em
      `src/**/*.{css,tsx}`, não na contagem inflada do audit que inclui
      `docs/*.md`) foram migrados: `outline`/`outline-offset` do anel de
      foco (5 componentes) e a margem de viewport do Dialog. Ver ADR 0011.
- [x] Existe documento de triagem: ADR 0011
      (`docs/decisions/0011-triagem-hardcode-e-duplicatas-de-token.md`)
      lista os 25 px hardcoded reais em `src/`, com decisão pra cada um
      (token novo / fix mecânico / intencional documentado inline).
- [x] Os 4 pares de tokens "duplicados": investigados e documentados na
      ADR 0011 como falsos positivos (coincidência numérica entre escalas
      independentes, ou alias semântico intencional) — decisão: nenhuma
      consolidação, com o porquê registrado.
- [x] `npm run build` e `npm run test` verdes.

## Por que essa ordem

Quarta da fila: mexe em `baseline.manifest.json` e nos componentes de
tipo mais delicado — inclusive o mesmo `Switch` que a Spec 0002 já
tocou (redimensionamento). Rodar depois de 0001 (CI já protegendo contra
regressão) e 0003 (documentação-alvo já existindo, pra descrever o
estado final e não um aspiracional) reduz o risco de erro silencioso
nesta spec, que é a mais próxima de tocar a fonte de verdade do
manifest.
