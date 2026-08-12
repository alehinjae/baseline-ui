# 0009 — Base UI mantido sobre Radix Primitives e vendorização

Status: aceito | Data: 2026-08-12

## Contexto

Estende a [ADR 0001](./0001-por-que-base-ui.md), que já justificou adotar
Base UI como fundação — mas sem comparar diretamente com Radix Primitives
nem considerar vendorização (copiar o código-fonte do primitivo pro
próprio repositório, cortando o vínculo de `npm install` — o modelo do
shadcn/ui). Este ADR faz essa comparação de verdade, com números
levantados ao vivo, depois de o usuário perguntar se trocar de motor ou
"ficar totalmente independente" seria o caminho certo.

Importante separar: "Radix" não é uma coisa só. **Radix Primitives**
(pacote `radix-ui`) é o equivalente direto do Base UI — comportamento sem
estilo. **Radix Themes** é um design system inteiro, já estilizado — não
é comparável como "motor", seria substituir o baseline-ui por outro
produto. **Radix Colors** é só uma paleta avulsa. Este ADR compara Base
UI contra Radix **Primitives**, que é a alternativa real.

## Os números (levantados nesta conversa, verificados, não de memória)

| | Radix Primitives | Base UI |
|---|---|---|
| Lançamento | 2022 | v1.0 estável em dezembro/2025 |
| Mantenedor | WorkOS (comprou o projeto) | MUI (Material UI — 95 mil+ estrelas GitHub, 5,8 milhões de downloads/semana do próprio MUI) |
| Ritmo de manutenção | Desacelerou em vários componentes desde a aquisição | Investimento ativo — parte de quem construiu o Radix original migrou pra lá |
| Componentes | 30+ | 35 |
| Adoção histórica | Enorme — `@radix-ui/react-slot` sozinho: ~131 milhões de downloads/semana | shadcn/ui trocou o padrão pra Base UI em projetos novos desde julho/2026 |
| Empacotamento hoje | Pacote unificado `radix-ui` v1.6.7, MIT, reexportando ~20 sub-pacotes (`@radix-ui/react-dialog`, `@radix-ui/react-tabs`...) | Pacote unificado `@base-ui/react` v1.6.0, MIT, 40 famílias de componentes |

Verificação direta no pacote já instalado (`node_modules/@base-ui/react`,
16MB):

```bash
find node_modules/@base-ui/react -iname "*.css"          # → nenhum resultado
grep -rlE "#[0-9a-fA-F]{3,6}" node_modules/@base-ui/react --include="*.js"
# → único match: um número de issue do GitHub (#2604) dentro de comentário
```

**Confirmado, não presumido: zero CSS, zero cor, em todo o pacote.** O
mesmo vale estruturalmente para Radix Primitives — é a mesma filosofia
headless. Isso importa pra decisão: trocar de motor **não muda nada** na
camada de tokens/cor/tipografia, porque nenhum dos dois motores tem
opinião ali. Tudo isso já é 100% nosso (`tokens/*.json`), independente de
qual motor de comportamento a gente usa por baixo.

## Decisão

Continuar no Base UI. Não trocar para Radix Primitives. Não vendorizar
código-fonte agora.

### Por que não trocar para Radix

Seria trocar o motor mais novo e mais ativamente investido (Base UI, MUI)
pelo motor mais antigo e com ritmo de manutenção em desaceleração
(Radix, pós-aquisição WorkOS) — o oposto da direção que o próprio mercado
está tomando (shadcn/ui, referência do setor, migrou o padrão pra Base UI
em 2026-07). Não há ganho técnico identificado — nenhuma funcionalidade
que o Radix tenha e o Base UI não, relevante aos 7 componentes que
usamos (`Button`, `Dialog`, `Field`, `Progress`, `Switch`, `Tabs`,
`Accordion`).

### Por que não vendorizar agora

Vendorização (copiar o código-fonte dos primitivos usados pro nosso
próprio repositório, como o shadcn/ui faz) é uma opção real e de risco
bem menor que reimplementar do zero — o código já viria testado e
funcionando, só cortaria o vínculo com `npm install`. Mas troca
correções de bug gratuitas (que hoje vêm de graça a cada
`npm update`, mantidas por um time full-time) por manutenção própria de
código que não escrevemos e não conhecemos linha a linha — o oposto do
princípio de "projeto pequeno o bastante pra uma pessoa entender cada
linha" que guia o resto do baseline-ui (ver `docs/positioning.md`,
quando escrito). Só faria sentido se "propriedade total do
comportamento" virasse requisito de verdade — não é hoje.

### Sobre reimplementar do zero (opção mais radical, também descartada)

Já avaliada em conversa anterior a este ADR: dos 7 componentes que usam
Base UI, a dificuldade varia muito — `Progress`/`Button` seriam baratos
de reimplementar; `Dialog` e `Field` são genuinamente difíceis (focus
trap correto, integração com a Constraint Validation API nativa) e é
exatamente onde bibliotecas como Base UI/Radix existem porque esses
padrões são fáceis de errar de um jeito que só afeta quem usa teclado ou
leitor de tela. Reimplementar os 7 com o mesmo rigor já aplicado ao
resto do projeto seria, plausivelmente, mais trabalho que as specs
0001–0005 combinadas (ver `docs/specs/`).

## Consequências

- `@base-ui/react` continua como `dependency` real em `package.json`,
  versionada, atualizada via `npm update` — não uma cópia estática.
- Vendorização fica registrada como opção futura, não descartada
  permanentemente — revisitar se "propriedade total" virar requisito
  real (ex.: se o Base UI for descontinuado, ou se a MUI for adquirida e
  o ritmo de manutenção desacelerar como aconteceu com o Radix pós-
  WorkOS — o mesmo padrão de risco existe aqui, só que hoje mitigado).
- Nenhuma mudança de código decorre deste ADR — é registro de uma
  decisão já em vigor, não uma migração.
