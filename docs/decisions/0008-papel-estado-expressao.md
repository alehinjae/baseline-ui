# 0008 — Hierarquia papel > estado > expressão, e garantias verificáveis

Status: aceito | Data: 2026-08-11

## Contexto

Este ADR não nasce de um problema novo do baseline-ui — nasce de consultar
`G:\Dev\liquid-interface-design-system`, um projeto de pesquisa do usuário
sobre a tese de "Solid–Liquid Design System": cada capacidade de interface
tem um **contrato sólido** (garantias comportamentais verificáveis) e uma
**expressão líquida** (aparência, livre para variar) — o contrato nunca
muda com a expressão. A hierarquia deles (`foundations/hierarchy.md`):
**papel > estado > expressão**, em ordem de precedência — vem originalmente
de Thevenin & Coutaz (INTERACT'99) e do CAMELEON Reference Framework.

A maior parte daquele projeto é pesquisa de fronteira fora do escopo do
baseline-ui (UI-IR de 8 dimensões, compilador multi-alvo pra WebGPU/SDF/
XR, governança de contrato via object-capability security e proveniência
assinada). Este ADR importa deliberadamente só a parte que já é verdade no
código existente, e formaliza como princípio — não é uma reescrita.

## O mapeamento (já era verdade, agora tem nome)

| Camada líquida                        | No baseline-ui, hoje                                                                                                      |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Papel** — o que o objeto É          | Comportamento do Base UI (ADR 0001): semântica ARIA, foco, teclado. Imutável — o baseline-ui nunca reimplementa isso.     |
| **Estado** — onde o objeto ESTÁ       | `data-attributes` do próprio Base UI (`data-open`, `data-checked`...) e do baseline-ui (`data-bl-variant`...) — ADR 0003. |
| **Expressão** — como o objeto APARECE | Tokens + CSS (ADR 0004). Totalmente livre — é o que muda entre tema white, um tema futuro, ou qualquer marca.             |

**Regra de precedência**: em conflito, a camada de cima vence. Uma
expressão nunca pode fazer o componente deixar de cumprir seu papel ou
mentir sobre seu estado — ex.: um botão nunca pode _parecer_ focável sem
_estar_ focável.

## Decisão: garantias viram checagem, não só documentação

O contrato `confirm-action` do liquid-interface (`spec/capability/
confirm-action.contract.yaml`) declara garantias mínimas para qualquer
controle de ação: nome acessível, foco alcançável com indicador visível,
ativação nativa por teclado, **área de toque ≥ 44×44px**, contraste ≥
4.5:1, e **tratamento de `prefers-reduced-motion`**. O validador deles
(`guardian/validate.js`) mede isso no DOM vivo, não confia em code review.

O baseline-ui já faz isso pra contraste (`check-contrast.mjs`, ADR 0006) e
pra acessibilidade estrutural (`jest-axe` nos testes, ver suíte 0.4.0).
Duas garantias do contrato ainda não eram verificadas aqui:

1. **`prefers-reduced-motion`** — zero componente tratava. Corrigido nesta
   mesma leva: `src/reduced-motion.css`, uma regra catch-all via
   `[class*="bl-"]` (aproveita a convenção de prefixo já documentada no
   manifest) que zera duração de transição/animação quando o usuário pede,
   sem exigir que cada componente novo lembre de tratar isso.
2. **Área de toque mínima** — medida ao vivo na demo em 2026-08-11:
   `Switch` tem 20px de altura (abaixo até do mínimo WCAG 2.2 AA de 24×24,
   SC 2.5.8); `Button` md é 66×37 (passa 24×24, não passa 44×44 AAA/Apple
   HIG). **Não corrigido neste ADR** — redimensionar o Switch é decisão
   visual, não só técnica; registrado como pendência aberta, aguardando
   decisão do usuário sobre o limiar (24×24 AA, consistente com o padrão
   de contraste já adotado no projeto, vs. 44×44 AAA/HIG).

## O que foi deliberadamente deixado de fora

- **UI-IR de 8 dimensões e compilador multi-alvo** — o baseline-ui tem um
  alvo (React/CSS web), não precisa de uma representação intermediária
  agnóstica de plataforma.
- **Contratos declarativos em YAML versionados por componente** — o
  `baseline.manifest.json` já cumpre esse papel (contrato legível por
  máquina); duplicar num formato novo seria a mesma informação em dois
  lugares.
- **Governança de extensão via object-capability + proveniência assinada**
  — resolve "quem autoriza um agente de IA a estender um contrato em
  produção"; o baseline-ui não tem geração autônoma de componente em
  runtime, então o problema não existe aqui ainda.
- **`Guardian` como runtime separado (`file://`, zero build)** — o
  baseline-ui já tem Vitest+jsdom+Testing Library rodando; recriar um
  segundo validador duplicaria máquina. Se algum dia for necessário medir
  layout real (jsdom não calcula `getBoundingClientRect` de verdade), a
  ideia do Guardian — validar no DOM vivo, não confiar em code review — é
  o padrão a seguir, possivelmente como painel na própria demo.

## Consequências

- Todo componente **interativo** novo (não os puros como Card/Text)
  precisa considerar as 5 garantias do contrato `confirm-action` como
  checklist mínimo: nome acessível, foco+indicador, teclado nativo, área
  de toque, contraste — mesmo que a verificação automática ainda não
  cubra todas.
- `reduced-motion` está resolvido estruturalmente (catch-all), não precisa
  de ação por componente daqui pra frente.
- Área de toque fica como item aberto no roadmap até decisão do usuário.
