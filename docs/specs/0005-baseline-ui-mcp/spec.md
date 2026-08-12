# 0005 — baseline-ui-mcp

Status: draft
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

- [ ] Servidor sobe local via `node` (ou `npx`) e responde às 4 tools
      listadas acima.
- [ ] `list_components` retorna os 14 componentes corretos, batendo com
      `baseline.manifest.json`.
- [ ] `get_component("Field")` retorna dado idêntico ao que está no
      manifest pra esse componente — sem informação inventada,
      sem divergência.
- [ ] `get_guarantees("Switch")` retorna a área de toque real (44×44,
      pós Spec 0002) — prova de que o MCP expõe estado real, não
      aspiracional.
- [ ] Testado registrando o servidor num `.mcp.json` de um projeto
      consumidor (ex.: nbd-scheduler) e consultando via um agente de IA
      de verdade, não só via chamada direta da tool.

## Por que essa ordem

Quinta e última: quer o estado final e estável do manifest e das
garantias (pós Specs 0002 e 0004) pra expor dado real, não aspiracional
— um MCP respondendo "44×44" antes disso ser verdade seria pior que não
existir. Também é a peça mais nova/exploratória do lote (nenhuma das
outras 4 specs constrói infraestrutura nova do zero, todas ajustam o que
já existe) — faz sentido vir depois do resto estar sólido.
