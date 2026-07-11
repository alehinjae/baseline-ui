# 0001 — Por que Base UI como fundação

Status: aceito | Data: 2026-07-10

## Contexto

Este é um projeto de **estudo**, não o design system principal. O objetivo é
dissecar como um dos motores de primitivas headless mais refinados do mercado
(Base UI, dos times por trás do Radix + Floating UI) resolve comportamento e
acessibilidade — construindo em cima dele, não só lendo a respeito.

## O que é "headless" de verdade

Base UI não envia CSS nenhum. Ele resolve três problemas difíceis de UI —
comportamento de teclado, gerenciamento de foco, semântica ARIA — e devolve
o resultado como **atributos em elementos DOM comuns** (`data-open`,
`data-checked`, `aria-*`) mais um punhado de hooks. A aparência é 100%
responsabilidade de quem consome.

Isso é uma ruptura real, não cosmética, com a maioria dos "design systems":
a maioria empacota comportamento + visual juntos, então herdar a correção
técnica significa herdar também a estética. Separando as duas coisas, o
baseline-ui pode ser visualmente livre sem reimplementar foco/ARIA do zero.

## Decisão

`@base-ui/react` (v1.6.0) é a fundação de comportamento de todo componente do
baseline-ui. O baseline-ui nunca reimplementa lógica de acessibilidade — só
adiciona opinião visual (tokens, variantes) por cima.

## Consequência

O baseline-ui fica pequeno de propósito: cada componente aqui é, na
prática, "Base UI + tokens + CSS". Isso é intencional — o valor do projeto
não é reescrever o motor, é aprender e documentar como um motor desse nível
é desenhado, enquanto entrega componentes reais e usáveis.
