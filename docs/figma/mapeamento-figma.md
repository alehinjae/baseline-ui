# Mapeamento baseline-ui → Figma

Este documento define **como** cada conceito do baseline-ui vira um conceito
do Figma quando a ponte for executada (fase 3 do roadmap). A regra geral:
código é a fonte, Figma é uma *saída* — igual ao CSS.

## Tokens → Variables

| baseline-ui | Figma |
|---|---|
| `tokens/primitives.json` | Coleção **Primitives**, modo único |
| `tokens/semantic.light.json` + `semantic.dark.json` | Coleção **Semantic**, modos **Light** e **Dark** |
| alias `{color.zinc.900}` | Variable alias apontando para a Variable de Primitives |
| `$type: color` | Variable de cor |
| `$type: dimension` (space, radius, font-size) | Variable numérica (px) |
| `$type: fontWeight` | Variable numérica |
| `$type: fontFamily` | Sem Variable nativa — vira Text Style |
| `$type: shadow` | Sem Variable nativa — vira Effect Style |

Nomes: caminho do token com `/` como separador de grupo — `color.zinc.900`
→ `color/zinc/900`. Isso agrupa visualmente no painel de Variables do Figma
do mesmo jeito que o JSON agrupa.

A restrição validada pelo gerador (semântico é sempre alias de primitivo)
existe também no Figma: as Variables da coleção Semantic **nunca** têm valor
bruto, sempre alias. Mudar o tema inteiro = trocar aliases num modo só.

## Manifest → Componentes

| baseline.manifest.json | Figma |
|---|---|
| componente `kind: single` | Component set com properties de variante |
| `props.variant.values` × `props.size.values` | Variantes do component set (ex.: Button = 4×3 = 12, × estados) |
| `states` | Property adicional `state` (default, hover, focus, disabled...) |
| componente `kind: compound` | Um componente por parte estilizada (`Dialog/Popup`, `Field/Control`...), compostos num exemplo montado |
| `parts[].styled: false` | Não vira nada no Figma — é só lógica |
| `tokens` do componente | Cada fill/stroke/radius/text do componente Figma ligado à Variable correspondente, nunca valor solto |

## Como a ponte executa (fase 3)

Duas rotas possíveis, nesta ordem de preferência:

1. **MCP do Figma** (`generate_figma_design` / `figma_execute` via Plugin
   API): um script lê `tokens/*.json` + `baseline.manifest.json` e cria
   Variables e component sets programaticamente. Vantagem: repetível,
   roda de novo quando os tokens mudarem.
2. **Tokens Studio (plugin)**: importa os JSON W3C direto como Variables;
   componentes ficam manuais. Rota de fallback — menos automação, zero
   código.

Em ambas, **nada é desenhado "de memória" no Figma**: se está no Figma e
não está no JSON/manifest, está errado.

## O que ainda não está coberto

- Tipografia composta (Text Styles completos: família+tamanho+peso+altura
  de linha) — hoje os tokens são atômicos; compor em `$type: typography`
  quando houver mais de um contexto tipográfico.
- Tokens de componente (ex.: dimensões do trilho do Switch) — hoje são
  variáveis CSS locais (`--_thumb`); promover quando ganharem variação.
- Grid/breakpoints — não existem ainda no sistema.
