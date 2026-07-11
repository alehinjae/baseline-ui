# baseline-ui

Design system principal do ecossistema, construído dissecando o
[Base UI](https://base-ui.com) (motor de primitivas headless dos times por
trás do Radix + Floating UI). Nasceu como projeto de estudo; desde
2026-07-11 é a fundação de longo prazo — o caráter de estudo continua, mas
cada decisão agora é tomada como permanente (ver [`docs/roadmap.md`](./docs/roadmap.md)).

Toda decisão de arquitetura tem um ADR em
[`docs/decisions/`](./docs/decisions) explicando contexto, alternativas e
consequências — o projeto é pensado para ser *lido*, não só usado.

## Arquitetura em uma tela

```
tokens/*.json  ──(npm run tokens)──►  src/tokens.css   (gerado, nunca editado)
     │
     └──────────► ponte Figma (fase 3): Variables + modos Light/Dark
baseline.manifest.json ──────────────► ponte Figma: component sets
     ▲
     └──(npm run check-manifest, roda no build)── validado contra src/
```

- **`tokens/`** — fonte única, formato W3C Design Tokens, em duas camadas:
  `primitives.json` (valores brutos, paleta zinc/red) e
  `semantic.light|dark.json` (significado de uso, sempre alias de
  primitivo). O gerador impõe as regras — build falha se violar.
  [ADR 0004](./docs/decisions/0004-tokens-w3c-como-fonte-unica.md)
- **`baseline.manifest.json`** — contrato legível por máquina de cada
  componente (partes, variantes, estados, tokens consumidos), para a ponte
  com o Figma não precisar interpretar código React.
  [ADR 0005](./docs/decisions/0005-manifest-como-ponte-para-figma.md)
- **`src/components/`** — cada componente é "Base UI + tokens + CSS":
  comportamento/acessibilidade 100% do Base UI
  ([ADR 0001](./docs/decisions/0001-por-que-base-ui.md)), composição
  Root/Parts com render prop
  ([ADR 0002](./docs/decisions/0002-padrao-root-parts-e-render-prop.md)),
  estado via data-attributes
  ([ADR 0003](./docs/decisions/0003-estado-via-data-attributes.md)).
  Nenhum CSS de componente contém valor bruto — só `var(--bl-*)`.
- **`docs/figma/`** — [mapeamento](./docs/figma/mapeamento-figma.md) de
  cada conceito do sistema para o conceito Figma equivalente
  (tokens→Variables, manifest→component sets).

## Componentes (fase 1)

- `Button` — variantes `solid | outline | ghost | danger`, tamanhos
  `sm | md | lg`, `focusableWhenDisabled` herdado do Base UI.
- `Dialog` — modal completo (foco preso, Esc, clique fora, ARIA), partes
  lógicas reexportadas puras, casca visual só onde há opinião de design.
- `Field` — label↔controle associados, `aria-describedby`, estados de
  validação (`data-invalid`...) e erro renderizado condicionalmente, tudo
  do Base UI; o baseline-ui veste as partes.
- `Switch` — `<button role="switch">` com teclado/ARIA prontos; o thumb se
  move por CSS puro reagindo a `data-checked`.

## Instalação

```bash
npm install github:alehinjae/baseline-ui
```

O npm clona o repositório e roda o script `prepare` (build) automaticamente
— o pacote chega compilado sem passo manual. Para fixar um commit:
`npm install github:alehinjae/baseline-ui#<sha>`.

No layout raiz da aplicação, uma única vez:

```tsx
import 'baseline-ui/styles.css'
```

## Uso

```tsx
import { Button, Dialog, Field, Switch } from 'baseline-ui'

function Exemplo() {
  return (
    <>
      <Field.Root>
        <Field.Label>E-mail</Field.Label>
        <Field.Control type="email" required placeholder="voce@exemplo.com" />
        <Field.Description>Usado só para o link do calendário.</Field.Description>
        <Field.Error match="valueMissing">Informe um e-mail.</Field.Error>
      </Field.Root>

      <Switch.Root defaultChecked>
        <Switch.Thumb />
      </Switch.Root>

      <Dialog.Root>
        <Dialog.Trigger render={<Button variant="outline" />}>Abrir</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Backdrop />
          <Dialog.Popup>
            <Dialog.Title>Confirmar ação</Dialog.Title>
            <Dialog.Description>Isso não pode ser desfeito.</Dialog.Description>
            <Dialog.Actions>
              <Dialog.Close render={<Button variant="ghost" />}>Cancelar</Dialog.Close>
              <Button variant="danger">Confirmar</Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
```

O `render={<Button variant="outline" />}` é o render prop do Base UI
(ADR 0002) fundindo comportamento e aparência sem código de integração.

## Desenvolvimento

```bash
npm install
npm run tokens          # regenera src/tokens.css a partir de tokens/*.json
npm run check-manifest  # valida baseline.manifest.json contra src/ e tokens/
npm run build           # tokens + check-manifest + tsup → dist/
npm run typecheck
```

Componente novo = **três entregas**: TSX + CSS (só tokens) + entrada no
manifest. O build cobra a terceira automaticamente.
