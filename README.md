# baseline-ui

Design system de **estudo**: dissecando como o [Base UI](https://base-ui.com)
(motor de primitivas headless dos times por trás do Radix + Floating UI)
resolve comportamento, foco e acessibilidade — construindo componentes reais
em cima dele. Não é o design system principal do ecossistema ainda; é o
laboratório antes dele.

As decisões e o que foi aprendido no processo ficam documentados em
[`docs/decisions/`](./docs/decisions), no mesmo espírito de ADR usado no
[atlas](https://github.com/alehinjae/atlas).

## O que tem aqui

- `Button` — variantes (`solid`, `outline`, `ghost`, `danger`) e tamanhos,
  com toda a acessibilidade herdada do `@base-ui/react` Button (inclusive
  `focusableWhenDisabled`, que resolve o clássico problema de leitor de
  tela não conseguir descobrir por que um botão desabilitado existe).
- `Dialog` — modal completo (foco preso, Esc fecha, clique fora fecha,
  ARIA automático), com casca visual do baseline-ui por cima das partes
  sem-estilo do Base UI.

## Como funciona "instalar como um pacote npm"

Um pacote npm nada mais é que um `package.json` descrevendo nome, versão e
onde estão os arquivos publicados, mais o próprio código. Normalmente você
publica num registro (o npmjs.com público, ou um privado) e instala com
`npm install nome-do-pacote`.

Este projeto pula a etapa de publicação num registro por enquanto — é só um
repositório Git normal — e é instalado **direto do GitHub**:

```bash
npm install github:alehinjae/baseline-ui
```

O npm sabe lidar com isso nativamente: ele clona o repositório, instala as
dependências dele, e roda o script `prepare` (definido no `package.json`
como `npm run build`) automaticamente — então o pacote chega já compilado
(`dist/`) no seu `node_modules`, sem você precisar rodar nada manual. É
basicamente o mesmo resultado de instalar de um registro, só que a "fonte
da verdade" é o commit do GitHub, não uma versão publicada.

Isso significa: qualquer mudança que a gente fizer aqui e enviar (`git
push`) pode ser puxada de novo em qualquer projeto com
`npm install github:alehinjae/baseline-ui` (ou fixando um commit específico:
`npm install github:alehinjae/baseline-ui#<sha>`, pra não quebrar um projeto
por uma mudança feita depois aqui).

## Uso

```bash
npm install github:alehinjae/baseline-ui
```

No layout raiz da aplicação, uma única vez:

```tsx
import 'baseline-ui/styles.css'
```

Em qualquer componente:

```tsx
import { Button, Dialog } from 'baseline-ui'

function Exemplo() {
  return (
    <Dialog.Root>
      <Dialog.Trigger render={<Button variant="outline" />}>
        Abrir
      </Dialog.Trigger>
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
  )
}
```

Repare no `Dialog.Trigger render={<Button variant="outline" />}` — é o
`render` prop do Base UI (ver [ADR 0002](./docs/decisions/0002-padrao-root-parts-e-render-prop.md))
fundindo o comportamento de abrir o dialog com a aparência do nosso Button,
sem nenhum código de integração extra.

## Desenvolvimento

```bash
npm install
npm run build      # gera dist/
npm run dev        # build em watch mode
npm run typecheck
```
