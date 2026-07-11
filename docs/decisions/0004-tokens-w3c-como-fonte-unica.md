# 0004 — Tokens W3C em JSON como fonte única, CSS gerado

Status: aceito | Data: 2026-07-11

## Contexto

Até a fase 0, `src/tokens.css` era escrito à mão — funcionava, mas o CSS é um
**formato de saída**, não uma fonte de verdade. Duas pressões mudaram isso:

1. O baseline-ui deixou de ser só estudo e passou a ser o design system
   principal do ecossistema (decisão do usuário em 2026-07-11).
2. O requisito de levar o sistema para o Figma. Figma Variables têm coleções,
   modos e aliases — conceitos que um `:root { }` plano não carrega. Um CSS
   não diz "isto é semântico apontando pra aquele primitivo"; um JSON
   estruturado diz.

## Decisão

A fonte única dos tokens é JSON no **formato W3C Design Tokens (draft)** em
`tokens/`, e `src/tokens.css` passa a ser **arquivo gerado**
(`npm run tokens`, automático no build). O formato W3C foi escolhido porque
é o mesmo que o ecossistema Figma consome (Tokens Studio, importadores de
Variables, spec-first tooling) — a ponte com o Figma lê a mesma fonte que
gera o CSS, sem tradução intermediária.

### Duas camadas, validadas pelo gerador

- **`primitives.json`** — valores brutos sem significado de uso (paleta zinc
  e red herdadas do Tailwind — os hexes já usados na fase 0 eram exatamente
  zinc-100/200/500/700/800/900 e red-400/600, então a proveniência foi
  assumida e completada, não inventada). Primitivo **não pode** ser alias.
- **`semantic.light.json` / `semantic.dark.json`** — significado de uso
  (`color.bg`, `color.accent`...). Semântico **só pode** ser alias
  `{caminho}` para primitivo, e os dois modos precisam ter chaves idênticas.

O gerador (`scripts/build-tokens.mjs`) **falha o build** se qualquer regra
for violada — a arquitetura de duas camadas é imposta, não combinada.

### Aliases viram `var()` encadeada no CSS

`color.bg → {color.white}` gera `--bl-color-bg: var(--bl-color-white)`, não
`#ffffff`. A cadeia semântico→primitivo fica inspecionável no devtools —
espelho exato da cadeia de aliases nas Variables do Figma.

### Por que gerador próprio e não Style Dictionary

Style Dictionary é o padrão da indústria, mas: (a) só há uma plataforma de
saída (CSS) hoje; (b) o pipeline inteiro cabe em ~100 linhas legíveis;
(c) entender cada passo é objetivo do projeto. Se surgirem mais saídas
(iOS/Android/JS), a fonte já está no formato que o Style Dictionary lê —
trocar o gerador é barato, a fonte não muda.

## Consequências

- `src/tokens.css` tem cabeçalho "ARQUIVO GERADO" e nunca é editado à mão.
- Tokens novos entram pelo JSON; o CSS e o Figma derivam dele.
- Valores tipográficos que estavam hardcoded nos componentes (13/14/16px,
  pesos 500/600) foram promovidos a tokens (`font-size.*`, `font-weight.*`)
  — regra a partir de agora: **componente não conhece valor bruto**, só
  `var(--bl-*)` (exceção documentada: dimensões internas de geometria de um
  componente, como o trilho do Switch, até existirem tokens de componente).
- As sombras foram convertidas de `rgba()` para hex8 (`#00000040`) porque é
  a forma que o formato W3C serializa cor — visualmente idêntico.
- `tokens/` e o manifest são publicados no pacote npm (`files` do
  package.json), então qualquer consumidor — inclusive a ponte Figma —
  acessa a fonte sem clonar o repositório.
