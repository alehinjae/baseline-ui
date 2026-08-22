# AGENTS.md — convenções pra agente de IA

Este arquivo é o mapa pra qualquer agente (Claude, Cursor, Copilot...)
editando ou consumindo este repositório. Se você é um agente lendo isto
antes de qualquer mudança: comece por `docs/positioning.md` (o que o
projeto promete) e `docs/components/README.md` (o catálogo real, gerado
do manifest — não confie em memória de treino sobre o que existe aqui).

## Se você está CONSUMINDO o pacote (num projeto que instalou baseline-ui)

```tsx
import { Button, Dialog, Field, Switch /* ... */ } from 'baseline-ui'
import 'baseline-ui/styles.css' // uma vez, no layout raiz
```

Antes de inventar uma prop ou variante, confira `docs/components/<Nome>.md`
(gerado, sempre atual) — não adivinhe a partir de bibliotecas parecidas.
Nunca sobrescreva estilo com CSS/classes arbitrárias fora do que os
tokens (`var(--bl-*)`) permitem — quebra o contrato do design system.

### Armadilhas reais já descobertas nesta base (não são intuitivas)

- **`Field` + validação nativa**: `valueMissing` (campo obrigatório vazio)
  só marca `data-invalid` se o campo já foi "sujo" pelo usuário (digitou
  e apagou) — um campo nunca tocado não dispara erro, de propósito (Base
  UI reduz ruído). `validationMode` default é `onSubmit`, não `onBlur`.
- **`Grid` com `className` de override**: se você passar
  `className="grid-cols-N ..."` pro `Grid`, o wrapper local do
  consumidor precisa bypassar o `data-bl-cols` do baseline-ui — o
  seletor de atributo tem especificidade maior que uma classe Tailwind
  solta e sempre vence, travando o grid num número fixo de colunas
  independente de breakpoint. Ver `nbd-scheduler/components/core/grid.tsx`
  como referência de fix.
- **`Switch` tem hit-area real de 44×44**, mas o trilho visual continua
  compacto (36×20) — não assuma que o tamanho visual = área clicável ao
  fazer layout ao redor dele (ver ADR 0010).

## Se você está EDITANDO este repositório

Componente novo = 4 entregas, todas cobradas automaticamente pelo build
ou pela suíte de testes:

1. `src/components/<Nome>/<Nome>.tsx` — TSX
2. `src/components/<Nome>/<Nome>.css` — só `var(--bl-*)`, nunca valor
   bruto (cor, px, etc. hardcoded)
3. Entrada em `baseline.manifest.json` — `check-manifest.mjs` falha o
   build se divergir do que `src/index.ts` exporta
4. `src/components/<Nome>/<Nome>.test.tsx` — comportamento + variantes +
   zero violação de acessibilidade (`jest-axe`)

Depois disso, `npm run docs` regenera a documentação automaticamente —
nunca edite `docs/components/*.md` à mão, é sobrescrito no próximo build.

### Antes de abrir PR

```bash
npm run build   # tokens → check-contrast → check-manifest → docs → tsup
npm run test
npm run lint
npm run format:check
```

Todos os quatro rodam no CI (`.github/workflows/ci.yml`) e bloqueiam o
merge se falharem.

### Quando algo é uma "spec" vs uma "ADR"

- **Spec** (`docs/specs/`) — uma iniciativa transversal com critério de
  aceite, ainda por fazer ou em andamento.
- **ADR** (`docs/decisions/`) — uma decisão já tomada, com alternativas
  rejeitadas, permanente. Uma spec só vira ADR se o `plan.md` dela tiver
  um trade-off real considerado — adoção de ferramental padrão sem
  alternativa séria não gera ADR.

Ver `docs/specs/README.md` e `CONTRIBUTING.md` pro processo completo.
