import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import type { ComponentProps, ReactNode } from 'react'

// Reexporta as partes sem-estilo do Base UI que não precisam de opinião visual
// (Root/Trigger/Portal/Close são só lógica) e adiciona nossa casca visual só
// onde o baseline-ui tem uma opinião de design: Backdrop e Popup.
export const Root = BaseDialog.Root
export const Trigger = BaseDialog.Trigger
export const Portal = BaseDialog.Portal
export const Close = BaseDialog.Close

export type DialogBackdropProps = ComponentProps<typeof BaseDialog.Backdrop>
export type DialogPopupProps = ComponentProps<typeof BaseDialog.Popup>
export type DialogTitleProps = ComponentProps<typeof BaseDialog.Title>
export type DialogDescriptionProps = ComponentProps<typeof BaseDialog.Description>
export interface DialogActionsProps {
  children: ReactNode
}

export function Backdrop(props: DialogBackdropProps) {
  return <BaseDialog.Backdrop className="bl-dialog-backdrop" {...props} />
}

export function Popup({ children, ...props }: DialogPopupProps) {
  return (
    <BaseDialog.Popup className="bl-dialog-popup" {...props}>
      {children}
    </BaseDialog.Popup>
  )
}

export function Title({ children, ...props }: DialogTitleProps) {
  return (
    <BaseDialog.Title className="bl-dialog-title" {...props}>
      {children}
    </BaseDialog.Title>
  )
}

export function Description({ children, ...props }: DialogDescriptionProps) {
  return (
    <BaseDialog.Description className="bl-dialog-description" {...props}>
      {children}
    </BaseDialog.Description>
  )
}

export function Actions({ children }: DialogActionsProps) {
  return <div className="bl-dialog-actions">{children}</div>
}
