# Posicionamento

> **baseline-ui é o design system onde acessibilidade não é revisada —
> é compilada: toda garantia (contraste, motion, estrutura) é um
> contrato verificado no build, não uma diretriz em documentação, num
> projeto pequeno o bastante pra uma pessoa entender cada linha.**

Escrito em 2026-08-12, depois que os dois últimos gaps que impediam essa
frase de ser 100% verdadeira fecharam (spec
[0002](./specs/0002-accessibility-contract-completion/spec.md), ADR
[0010](./decisions/0010-switch-44x44-via-pseudo-elemento.md)).

## Por que essa diferenciação é real, não marketing

Comparado com o que o mercado faz hoje (pesquisado e verificado, não
assumido — ver `docs/decisions/0009-*.md` e a spec 0001):

| Referência                                  | O que tem                                                          | O que falta pra ser isto                                                                                                                                                                                       |
| ------------------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Radix / Base UI                             | Comportamento e ARIA impecáveis                                    | Zero opinião sobre tokens, contraste ou contrato — é só a camada de baixo                                                                                                                                      |
| shadcn/ui                                   | "Copie e seja dono do código"                                      | Nenhuma verificação embutida — contraste, motion, hit-area ficam por conta de quem copia                                                                                                                       |
| `ds-audit` (Southleft)                      | Audita 6 categorias, inclusive a11y                                | A própria ferramenta admite: _"reflects tooling adoption and static JSX checks only... requires runtime testing... that this tool does not perform"_ — auditoria externa, opcional, não trava build de ninguém |
| `ds-contracts-poc` (Southleft)              | Contrato único gera código+Figma, com differ provando consistência | Release-candidate, só 8% dos componentes testados com fidelidade alta, nunca cobre lógica de runtime — decisão de design permanente deles                                                                      |
| `Guardian` (liquid-interface-design-system) | A ideia certa: contrato verificado em DOM vivo                     | Pesquisa/protótipo — roda manual em `file://`, nunca integrado a um pipeline de build real                                                                                                                     |
| Material / Carbon / Polaris                 | Cobertura enorme, maduro                                           | Grande demais pra uma pessoa dominar; garantia vive em guideline de documentação, não em script que falha o build                                                                                              |

## As garantias, e onde cada uma é verificada de verdade

| Garantia                                                              | Onde é verificada                                                                              | Falha o build?                                                                                                    |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Contraste WCAG AA (texto e não-textual)                               | `scripts/check-contrast.mjs`                                                                   | Sim — `npm run build`                                                                                             |
| Estrutura do componente (props/variantes/tokens batem com o manifest) | `scripts/check-manifest.mjs`                                                                   | Sim — `npm run build`                                                                                             |
| Acessibilidade estrutural (nome acessível, ARIA, foco)                | `jest-axe` na suíte de testes                                                                  | Sim — `npm run test`                                                                                              |
| Área de toque ≥ 44×44 (AAA/Apple HIG)                                 | Medida ao vivo, registrada na [ADR 0010](./decisions/0010-switch-44x44-via-pseudo-elemento.md) | Verificação manual até hoje — não há gate automatizado de layout real (jsdom não calcula `getBoundingClientRect`) |
| `prefers-reduced-motion` tratado em todo componente                   | `src/reduced-motion.test.ts` (estrutural — confirma que a regra existe e está correta)         | Sim — `npm run test`                                                                                              |
| Lint, formatação, tipos                                               | ESLint, Prettier, `tsc`                                                                        | Sim — CI (`.github/workflows/ci.yml`)                                                                             |

## O que ainda não está 100% automatizado, com honestidade

- **Área de toque** não tem um gate automatizado que rode em todo build
  — hoje é medição manual, documentada em ADR quando muda. Rodar layout
  real (não jsdom) exigiria um navegador de verdade no CI (Playwright ou
  similar) — avaliado, não adotado ainda (ver spec 0001, não-objetivo
  de E2E).
- **`prefers-reduced-motion`** tem teste estrutural (a regra existe e
  está correta), não comportamental (não confirma que o navegador de
  fato respeita a regra em runtime) — essa parte já foi verificada
  manualmente uma vez (ADR 0008), não é re-verificada a cada build.

Essas duas ressalvas ficam registradas de propósito — a promessa da
frase de pitch é sobre **ter um contrato verificável**, não sobre nunca
ter limitação nenhuma. Uma alegação sem ressalva, aqui, seria a mesma
falha que os concorrentes pesquisados cometem.
