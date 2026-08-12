# 0002 — accessibility-contract-completion

Status: done
Owner: alehinjae
Related: ADR 0008 (papel > estado > expressão), audit gap: Accessibility 53/F (`audit/report.md`), `docs/positioning.md` (frase de pitch)

## Problema

Dois achados reais e verificados, ainda abertos:

1. `Switch` mede 20px de altura na demo — abaixo até do piso WCAG 2.2 AA
   de área de toque (24×24), decidido em conversa que o alvo é **44×44
   (AAA / Apple HIG)**, o mesmo valor que o contrato `confirm-action` do
   `liquid-interface-design-system` usa.
2. `prefers-reduced-motion` foi corrigido globalmente
   (`src/reduced-motion.css`, regra catch-all `[class*="bl-"]`), mas
   **nenhum teste automatizado protege essa regra de regressão** — foi
   verificado só estruturalmente (presença da regra no CSS gerado), nunca
   por um teste que falharia se alguém remover ou quebrar a regra.

Isso também é a lacuna concreta entre o que `docs/positioning.md`
promete ("toda garantia é um contrato verificado no build") e o que é
verdade hoje — a frase é só ~90% verdadeira até esta spec fechar.

## Objetivos

- `Switch` redimensionado pra área de toque real ≥ 44×44px (Root e/ou
  hit-box, mantendo o trilho visual proporcional — decisão de design de
  como fazer isso fica pro `plan.md`).
- Teste automatizado (Vitest) garantindo que `prefers-reduced-motion:
reduce` zera duração de transição/animação em pelo menos um componente
  representativo de cada categoria (um com transição de hover — Button;
  um com transição de estado — Switch/Dialog).
- `docs/positioning.md` escrito (ou atualizado, se já existir por outra
  via) só depois que os dois itens acima estiverem verdes — a frase de
  pitch não pode ser publicada antes de ser 100% verdadeira.

## Não-objetivos

- **Não é perseguir a nota "53/F" do ds-audit em si.** O próprio
  relatório da ferramenta admite: "reflects tooling adoption and static
  JSX checks only... requires runtime testing... that this tool does not
  perform." O alvo desta spec são os dois achados reais e nomeados acima,
  não subir um número de terceiros que audita de forma estática.
- Não cobre um painel de verificação de garantias na demo (a ideia do
  `Guardian` do liquid-interface, medindo no DOM vivo) — mencionado em
  `docs/roadmap.md` como possibilidade futura, não faz parte do critério
  de aceite desta spec.
- Não redefine o limiar de hit-area pra componentes que ainda não
  existem (Fase 2 do roadmap) — só resolve o que já está construído.

## Critério de aceite

- [x] `Switch` medido ao vivo (Browser pane) com hit-area ≥ 44×44px, nos
      dois modos (light/dark) e nos três estados
      (unchecked/checked/disabled) — todos confirmados 44×44 exato.
- [x] Suíte de teste nova cobrindo `prefers-reduced-motion` falha se a
      regra em `src/reduced-motion.css` for removida ou alterada pra não
      zerar a duração — `src/reduced-motion.test.ts`, testado quebrando
      de propósito (removendo `!important` de `transition-duration`) e
      confirmando que o teste pega, antes de restaurar.
- [x] `npm run test` e `npm run build` continuam verdes depois da
      mudança (62/62 testes, incluindo os 4 novos).
- [x] ADR nova (estendendo ADR 0008) registrando a escolha de 44×44 sobre
      24×24 — [ADR 0010](../../decisions/0010-switch-44x44-via-pseudo-elemento.md).
- [x] `docs/positioning.md` existe e toda alegação nele aponta pra um
      arquivo/script real do repositório.

## Por que essa ordem

Segunda da fila, isolada de propósito. É a única spec que muda
comportamento visual/runtime já publicado (a Spec 1 é só ferramental, as
specs 3-5 são majoritariamente aditivas) — mantida pequena e sozinha pra
ser revisável e reversível independente das outras. Também é a
spec de maior peso simbólico em relação à frase de posicionamento — vale
não deixá-la no fim da fila atrás de trabalho de documentação de risco
mais baixo.
