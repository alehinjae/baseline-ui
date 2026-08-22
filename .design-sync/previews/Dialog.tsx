import { Dialog, Button } from 'baseline-ui'

export function Confirm() {
  return (
    <Dialog.Root defaultOpen modal={false}>
      <Dialog.Trigger render={<Button variant="outline" />}>Abrir dialog</Dialog.Trigger>
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
