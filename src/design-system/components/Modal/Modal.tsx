import React, { useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../utils/cn'
import { components, radius, spacing, shadows } from '../../tokens'
import { IconButton } from '../IconButton/IconButton'
import { Heading } from '../Heading/Heading'
import { Button } from '../Button/Button'
import { X } from '../../icons'

export interface ModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean
  /**
   * Callback when the modal should close
   */
  onClose: () => void
  /**
   * Modal title displayed in the header
   */
  title: string
  /**
   * Content to render inside the modal body
   */
  children: React.ReactNode
  /**
   * Modal size variant
   * - sm: max-width 448px (28rem)
   * - md: max-width 576px (36rem)
   * @default 'sm'
   */
  size?: 'sm' | 'md'
  /**
   * Primary action button label
   */
  primaryActionLabel?: string
  /**
   * Primary action callback
   */
  onPrimaryAction?: () => void
  /**
   * Secondary action button label
   */
  secondaryActionLabel?: string
  /**
   * Secondary action callback (defaults to onClose if not provided)
   */
  onSecondaryAction?: () => void
  /**
   * Whether primary action is in loading state
   */
  primaryActionLoading?: boolean
  /**
   * Whether primary action is disabled
   */
  primaryActionDisabled?: boolean
  /**
   * Additional class name for the modal container
   */
  className?: string
  /**
   * Whether to close when clicking the backdrop
   * @default true
   */
  closeOnBackdropClick?: boolean
  /**
   * Whether to close when pressing Escape key
   * @default true
   */
  closeOnEscape?: boolean
  /**
   * Accessible label for close button
   * @default "Close modal"
   */
  closeButtonLabel?: string
}

/**
 * Modal component following the design system conventions.
 * 
 * Features:
 * - Uses design system tokens for colors, spacing, and typography
 * - 16px rounded corners (radius.2xl)
 * - IconButton close button in top-right corner
 * - Heading component for title in top-left
 * - Footer with primary and secondary action buttons
 * - Flexible body content via children prop
 * - Keyboard accessible (Escape to close, focus trap)
 * - Dark mode support
 * - Portal rendering for proper stacking
 * 
 * @example
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirm action"
 *   size="sm"
 *   primaryActionLabel="Confirm"
 *   onPrimaryAction={handleConfirm}
 *   secondaryActionLabel="Cancel"
 * >
 *   <Text>Are you sure you want to proceed?</Text>
 * </Modal>
 */
export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      children,
      size = 'sm',
      primaryActionLabel,
      onPrimaryAction,
      secondaryActionLabel,
      onSecondaryAction,
      primaryActionLoading = false,
      primaryActionDisabled = false,
      className,
      closeOnBackdropClick = true,
      closeOnEscape = true,
      closeButtonLabel = 'Close modal',
    },
    ref
  ) => {
    const [isDark, setIsDark] = React.useState(
      () => document.documentElement.classList.contains('dark')
    )
    const modalRef = useRef<HTMLDivElement>(null)
    const previousActiveElement = useRef<HTMLElement | null>(null)

    // Detect dark mode
    useEffect(() => {
      const checkDarkMode = () => {
        const isDarkMode = document.documentElement.classList.contains('dark')
        setIsDark(isDarkMode)
      }

      checkDarkMode()

      const observer = new MutationObserver(checkDarkMode)
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      })

      return () => observer.disconnect()
    }, [])

    // Handle escape key
    const handleKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (closeOnEscape && event.key === 'Escape') {
          onClose()
        }
      },
      [closeOnEscape, onClose]
    )

    // Handle backdrop click
    const handleBackdropClick = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (closeOnBackdropClick && event.target === event.currentTarget) {
          onClose()
        }
      },
      [closeOnBackdropClick, onClose]
    )

    // Focus management and body scroll lock - only run when modal opens/closes
    useEffect(() => {
      if (isOpen) {
        // Store currently focused element
        previousActiveElement.current = document.activeElement as HTMLElement

        // Prevent body scroll
        document.body.style.overflow = 'hidden'

        // Focus the modal only on initial open
        setTimeout(() => {
          modalRef.current?.focus()
        }, 0)

        return () => {
          document.body.style.overflow = ''

          // Restore focus to previously focused element
          previousActiveElement.current?.focus()
        }
      }
    }, [isOpen]) // Only depend on isOpen, not handleKeyDown

    // Escape key handler - separate effect to avoid re-focusing on callback changes
    useEffect(() => {
      if (isOpen) {
        document.addEventListener('keydown', handleKeyDown)
        return () => {
          document.removeEventListener('keydown', handleKeyDown)
        }
      }
    }, [isOpen, handleKeyDown])

    // Handle secondary action
    const handleSecondaryAction = () => {
      if (onSecondaryAction) {
        onSecondaryAction()
      } else {
        onClose()
      }
    }

    if (!isOpen) return null

    const modalContent = (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        onClick={handleBackdropClick}
        role="presentation"
      >
        <div
          ref={(node) => {
            // Handle both refs
            modalRef.current = node
            if (typeof ref === 'function') {
              ref(node)
            } else if (ref) {
              ref.current = node
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          tabIndex={-1}
          className={cn(
            'relative w-full outline-none',
            size === 'sm' && 'max-w-md',
            size === 'md' && 'max-w-xl',
            'animate-in fade-in-0 zoom-in-95 duration-200',
            className
          )}
          style={{
            backgroundColor: isDark
              ? components.background.elevated.dark
              : components.background.elevated.light,
            borderRadius: radius['2xl'], // 16px
            boxShadow: isDark ? shadows.dark.xl : shadows.light.xl,
            border: `1px solid ${
              isDark
                ? components.border.default.dark
                : components.border.default.light
            }`,
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between"
            style={{
              padding: `${spacing[4]} ${spacing[6]}`, // 16px top/bottom, 24px left/right
              borderBottom: `1px solid ${
                isDark
                  ? components.border.default.dark
                  : components.border.default.light
              }`,
            }}
          >
            <Heading as="h2" id="modal-title" className="m-0">
              {title}
            </Heading>
            <IconButton
              icon={<X size={20} />}
              aria-label={closeButtonLabel}
              variant="ghost"
              size="sm"
              onClick={onClose}
              tooltip="Close"
              tooltipPosition="bottom"
            />
          </div>

          {/* Body */}
          <div
            style={{
              padding: spacing[6], // 24px
              color: isDark
                ? components.text.primary.dark
                : components.text.primary.light,
            }}
          >
            {children}
          </div>

          {/* Footer - only render if action buttons are provided */}
          {(primaryActionLabel || secondaryActionLabel) && (
            <div
              className="flex items-center justify-end gap-3"
              style={{
                padding: `${spacing[4]} ${spacing[6]}`, // 16px top/bottom, 24px left/right
                borderTop: `1px solid ${
                  isDark
                    ? components.border.default.dark
                    : components.border.default.light
                }`,
              }}
            >
              {secondaryActionLabel && (
                <Button
                  variant="secondary"
                  onClick={handleSecondaryAction}
                  size="md"
                >
                  {secondaryActionLabel}
                </Button>
              )}
              {primaryActionLabel && (
                <Button
                  variant="primary"
                  onClick={onPrimaryAction}
                  loading={primaryActionLoading}
                  disabled={primaryActionDisabled}
                  size="md"
                >
                  {primaryActionLabel}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    )

    // Render in portal to ensure proper stacking
    return createPortal(modalContent, document.body)
  }
)

Modal.displayName = 'Modal'
