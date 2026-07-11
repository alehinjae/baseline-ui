# 0002 — Dissecando: padrão Root/Parts + `render` prop

Status: nota de estudo | Data: 2026-07-10

## O padrão Root/Parts

Todo componente composto do Base UI se divide em partes nomeadas, cada uma
um componente React próprio, não uma prop de configuração:

```tsx
<Dialog.Root>
  <Dialog.Trigger>Abrir</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Title>Título</Dialog.Title>
      <Dialog.Description>Descrição</Dialog.Description>
      <Dialog.Close>Fechar</Dialog.Close>
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>
```

`Root` guarda o estado (aberto/fechado, valor selecionado...) via Context e o
distribui pras partes filhas. Cada parte sabe renderizar sua função (gatilho,
portal, conteúdo) sem que o consumidor precise passar callbacks manualmente.

**Por que isso importa pro baseline-ui**: dá pra reexportar as partes que são
"puramente lógicas" sem tocar nelas (`Root`, `Trigger`, `Portal`, `Close` no
nosso `Dialog.tsx`) e só embrulhar com opinião visual as partes que
realmente precisam de estilo (`Backdrop`, `Popup`, `Title`). Granularidade
por peça, não por componente inteiro.

## O `render` prop — o mecanismo de composição central

Em vez de uma prop `as="a"` (comum em outras libs) que só troca a tag, o
Base UI aceita um **elemento inteiro**:

```tsx
<Menu.Item render={<a href="/pagina" />}>Ir para a página</Menu.Item>
```

O Menu.Item funde suas próprias props (handlers de teclado, ARIA, ref) nesse
elemento via `mergeProps` internamente — o `<a>` vira, na prática, o próprio
Menu.Item, só que renderizado como link em vez de `<div>`.

Também aceita uma **função** quando se precisa do estado do componente:

```tsx
<Switch.Thumb render={(props, state) => (
  <span {...props}>{state.checked ? '✓' : ''}</span>
)} />
```

Isso resolve um problema real de bibliotecas de componente: como deixar o
consumidor plugar SEU componente (ex.: um `<Link>` do Next.js) sem que a
biblioteca precise conhecer esse componente de antemão. `render` é
fundamentalmente mais flexível que herança ou HOC.

## Aplicação no baseline-ui

O `Button` do baseline-ui não reimplementa essa flexibilidade — ela já vem
de graça via `ComponentProps<typeof BaseButton>`, que inclui `render`. Ou
seja: `<Button render={<a href="/x" />}>` já funciona no nosso componente
sem nenhum código extra. Essa é a prova prática de que "wrapper fino sobre
Base UI" preserva os superpoderes da fundação.
