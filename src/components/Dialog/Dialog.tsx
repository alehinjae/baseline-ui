import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import type { ReactNode } from 'react'

// Reexporta as partes sem-estilo do Base UI que não precisam de opinião visual
// (Root/Trigger/Portal/Close são só lógica) e adiciona nossa casca visual só
// onde o baseline-ui tem uma opinião de design: Backdrop e Popup.
export const Root = BaseDialog.Root
export const Trigger = BaseDialog.Trigger
export const Portal = BaseDialog.Portal
export const Close = BaseDialog.Close

export function Backdrop(props: React.ComponentProps<typeof BaseDialog.Backdrop>) {
  return <BaseDialog.Backdrop className="bl-dialog-backdrop" {...props} />
}

export function Popup({ children, ...props }: React.ComponentProps<typeof BaseDialog.Popup>) {
  return (
    <BaseDialog.Popup className="bl-dialog-popup" {...props}>
      {children}
    </BaseDialog.Popup>
  )
}

export function Title({ children, ...props }: React.ComponentProps<typeof BaseDialog.Title>) {
  return (
    <BaseDialog.Title className="bl-dialog-title" {...props}>
      {children}
    </BaseDialog.Title>
  )
}

export function Description({ children, ...props }: React.ComponentProps<typeof BaseDialog.Description>) {
  return (
    <BaseDialog.Description className="bl-dialog-description" {...props}>
      {children}
    </BaseDialog.Description>
  )
}

export function Actions({ children }: { children: ReactNode }) {
  return <div className="bl-dialog-actions">{children}</div>
}
