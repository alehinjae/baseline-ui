# Contribuindo

Este projeto é pensado pra ser lido, não só usado — toda decisão de
arquitetura tem um porquê registrado. Antes de propor mudança, vale
entender onde ela se encaixa.

## Antes de começar

1. Leia `docs/positioning.md` — o que o projeto promete.
2. Leia `AGENTS.md` — convenções técnicas (import, tokens, armadilhas
   conhecidas).
3. Confira `docs/components/README.md` (gerado) pra saber o que já
   existe, e `docs/roadmap.md` pra saber o que está planejado.

## Componente novo

Ver a seção "Se você está EDITANDO" do `AGENTS.md` — 4 entregas
(TSX + CSS + manifest + teste), todas cobradas pelo build/CI.

## Mudança de token

Editar `tokens/primitives.json` ou `tokens/semantic.*.json`, nunca
`src/tokens.css` diretamente (é gerado, sobrescrito no próximo build).
`npm run check-contrast` valida contraste WCAG automaticamente.

## Quando abrir uma spec, quando escrever uma ADR

- **Uma iniciativa transversal, com escopo e critério de aceite
  definíveis, que vai levar mais de um PR ou tocar vários arquivos por
  um motivo comum** (ex.: "adicionar CI", "fechar um gap de
  acessibilidade") → abra uma spec em `docs/specs/NNNN-nome/spec.md`,
  seguindo o template em `docs/specs/_template/`.
- **Uma decisão de arquitetura já tomada, com alternativas
  consideradas e rejeitadas, que alguém no futuro vai se perguntar "por
  que não X?"** → escreva uma ADR em `docs/decisions/NNNN-nome.md`.
  Uma spec só produz ADR se o `plan.md` dela tiver esse tipo de decisão
  — adoção de ferramental padrão sem trade-off real não precisa.

## Antes de abrir PR

```bash
npm run build          # tokens → check-contrast → check-manifest → docs → tsup
npm run test
npm run lint
npm run format:check
```

O CI (`.github/workflows/ci.yml`) roda os quatro em todo push/PR e
bloqueia o merge se algum falhar. Um hook de pre-commit (Husky +
lint-staged) já corrige lint/formatação nos arquivos staged
automaticamente.

## Processo de PR usado neste repositório

Cada spec/mudança maior vira uma branch (`specs/NNNN-nome` ou
descritiva), PR aberto contra `main`, CI verificado verde de verdade
antes do merge (não só leitura do YAML) — squash merge, branch
deletada.
