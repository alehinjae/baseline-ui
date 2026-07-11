# Roadmap do baseline-ui

Decisão de 2026-07-11: o baseline-ui deixa de ser só projeto de estudo e
passa a ser **o design system principal** do ecossistema. O caráter de
estudo continua (cada padrão do Base UI dissecado vira ADR), mas as
decisões agora são tomadas como fundação de longo prazo.

## Fase 1 — Fundação (atual, entregue em 2026-07-11)

- [x] Tokens como fonte W3C JSON em duas camadas (primitivos + semânticos
      light/dark), CSS gerado — ADR 0004
- [x] `baseline.manifest.json`: contrato de componentes para a ponte
      Figma, verificado em todo build — ADR 0005
- [x] Vocabulário inicial: Button, Dialog, **Field** (label/input/erro),
      **Switch**
- [x] Tipografia tokenizada (font-size/font-weight); nenhum valor bruto
      em CSS de componente
- [ ] Verificação interativa no navegador (Dialog no nbd-scheduler +
      Field/Switch em página de demonstração) — pendente da fase 0

## Fase 2 — Vocabulário core

Ordem de construção guiada por: (a) demanda real dos projetos consumidores
(nbd-scheduler primeiro), (b) valor de estudo do padrão que o componente
ensina. Candidatos confirmados no pacote:

1. **Select** — ensina posicionamento flutuante + tipagem genérica
2. **Tabs** — ensina roving tabindex
3. **Checkbox** — completa o trio de formulário com Field
4. **Tooltip / Popover** — ensinam a camada floating-ui-react
5. **Menu** — composição de popup + itens tipados
6. **Form** — integração Field×validação em nível de formulário
7. **Toast** — a primeira API imperativa (manager), padrão diferente de tudo acima

Cada um entra com: TSX + CSS (só tokens) + entrada no manifest + ADR se o
padrão dissecado for novo.

## Fase 3 — Ponte Figma

- Script que lê `tokens/*.json` + `baseline.manifest.json` e cria
  Variables/coleções/modos e component sets via MCP do Figma
  (ver docs/figma/mapeamento-figma.md)
- Critério de pronto: mudar um token no JSON e reexecutar atualiza o
  Figma sem retrabalho manual

## Fase 4 — Distribuição e maturidade

- Decidir: repositório público? GitHub Packages em vez de install via git?
- Página de documentação viva (demo de cada componente — também serve de
  alvo de verificação interativa)
- Tokens de componente e tipografia composta (`$type: typography`)
- Tema forçado por atributo (`[data-bl-theme]`) além do
  `prefers-color-scheme`

## Perguntas abertas (herdadas do handoff de 2026-07-11)

- ~~Quando o baseline-ui vira o design system principal?~~ → virou, hoje.
- Repositório público ou privado? → fase 4
- Registro npm privado? → fase 4
- Camada generativa (estilo openui) por cima? → deliberadamente fora do
  escopo; se um dia entrar, é *outra* camada consumindo o manifest, não
  parte da biblioteca.
