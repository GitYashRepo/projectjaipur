"use client"

import { useContext } from "react"
import * as React from "react"

export type ToastProps = {
  title?: string
  description?: string
}

const ToastContext = React.createContext<{
  toast: (props: ToastProps) => void
} | null>(null)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export function ToastProvider({
  children,
  onToast,
}: {
  children: React.ReactNode
  onToast?: (props: ToastProps) => void
}) {
  const toast = React.useCallback(
    (props: ToastProps) => {
      if (onToast) onToast(props)
    },
    [onToast]
  )

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
    </ToastContext.Provider>
  )
}
