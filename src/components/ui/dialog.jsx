"use client"

import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

export const Dialog = DialogPrimitive.Root
export const DialogTitle = DialogPrimitive.Title
export const DialogDescription = DialogPrimitive.Description

export function DialogHeader({ style, ...props }) {
  return <div style={{ display: "flex", flexDirection: "column", gap: 8, ...style }} {...props} />
}

export function DialogContent({ children, style, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1000,
          background: "rgba(0, 0, 0, 0.58)",
          backdropFilter: "blur(4px)",
        }}
      />
      <DialogPrimitive.Content
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          zIndex: 1001,
          width: "min(calc(100% - 32px), 896px)",
          maxHeight: "90vh",
          overflowY: "auto",
          transform: "translate(-50%, -50%)",
          border: 0,
          outline: "none",
          boxShadow: "0 28px 80px rgba(0, 0, 0, 0.28)",
          ...style,
        }}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          aria-label="Close booking dialog"
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            display: "grid",
            placeItems: "center",
            width: 36,
            height: 36,
            padding: 0,
            border: 0,
            borderRadius: "50%",
            background: "rgba(102, 0, 51, 0.08)",
            color: "#660033",
            cursor: "pointer",
          }}
        >
          <XIcon size={18} />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}
