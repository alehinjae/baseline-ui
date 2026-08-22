# 0005 — baseline-ui-mcp

Status: done
Owner: alehinjae
Related: ADR 0005 (manifest como ponte), spec 0003 (generated-documentation)

## Problema

`baseline.manifest.json` e `tokens/*.json` já contêm toda a informação
estruturada que um agente de IA precisaria pra consumir corretamente o
design system — mas hoje o único jeito de um agente acessar isso é ler
arquivos direto do `node_modules` ou do código-fonte, sem nenhuma
interface própria pra consulta. Referências de mercado já validam esse
padrão (o MCP oficial do shadcn/ui, o `design-systems-mcp` e o
`figma-console-mcp` da Southleft — este último já instalado e conectado
neste mesmo ambiente) — mas o baseline-ui não tem o seu.

## Objetivos

- Servidor MCP próprio (pacote Node, SDK oficial
  `@modelcontextprotocol/sdk`) expondo:
  - `list_components` — lista os 14 componentes com resumo de cada um.
  - `get_component(name)` — detalhe completo de um componente a partir
    do manifest (partes, variantes, estados, tokens consumidos).
  - `get_tokens()` — os tokens primitivos e semânticos, ambos os modos.
  - `get_guarantees(component?)` — as garantias de acessibilidade por
    componente (nome acessível, foco, área de toque, contraste,
    reduced-motion), assumindo que a Spec 0002 já formalizou isso.
- Reaproveita a lógica de leitura de manifest/tokens que a Spec 0003 já
  escreveu pro gerador de docs — não duplica o parser.
- Documentado em `AGENTS.md`/`llms.txt` (da Spec 0003) como forma
  preferida de um agente consultar o projeto.

## Não-objetivos

- Não expõe capacidade de escrita (criar/editar componente via MCP) —
  só leitura/consulta, nesta primeira versão.
- Não é uma ponte com o Figma (isso é a Fase 3 do `docs/roadmap.md`,
  possivelmente usando o `figma-console-mcp` já disponível em vez de
  construir do zero — decisão separada, fora desta spec).
- Não inclui publicação num registro público de MCP servers — roda local
  (`.mcp.json` do consumidor), mesmo modelo que o `figma-console-mcp`
  já usa neste ambiente.

## Critério de aceite

- [x] Servidor sobe local via `node` e responde às 4 tools listadas
      acima — verificado por `mcp-server/smoke-test.mjs`, que usa o
      `Client` real do `@modelcontextprotocol/sdk` conectando via stdio
      no `index.mjs` real (não é chamada direta de função, é protocolo
      MCP de ponta a ponta).
- [x] `list_components` retorna os 14 componentes corretos, batendo com
      `baseline.manifest.json` — `mcp-server/tools/list-components.test.mjs`
      compara contra o manifest real do repo.
- [x] `get_component("Field")` retorna dado idêntico ao que está no
      manifest pra esse componente — `mcp-server/tools/get-component.test.mjs`
      faz `assert.deepEqual` campo a campo.
- [x] `get_guarantees("Switch")` retorna a área de toque real (44×44,
      pós Spec 0002) — `mcp-server/tools/get-guarantees.test.mjs` e o
      smoke-test confirmam o texto exato, citando ADR 0010.
- [~] Registrado em `.mcp.json` deste repositório
  (`mcp-server/index.mjs`, ver README do subpacote). A verificação
  via protocolo MCP real (SDK `Client`/`Server` sobre stdio, não
  mock) está feita e documentada acima; a confirmação via um agente
  de IA consultando pela própria UI de tools fica pendente de uma
  sessão nova (agentes carregam `.mcp.json` na inicialização, não
  em quente) — não bloqueia o merge, ver "Riscos / rollback" do
  `plan.md`.

## Por que essa ordem

Quinta e última: quer o estado final e estável do manifest e das
garantias (pós Specs 0002 e 0004) pra expor dado real, não aspiracional
— um MCP respondendo "44×44" antes disso ser verdade seria pior que não
existir. Também é a peça mais nova/exploratória do lote (nenhuma das
outras 4 specs constrói infraestrutura nova do zero, todas ajustam o que
já existe) — faz sentido vir depois do resto estar sólido.
