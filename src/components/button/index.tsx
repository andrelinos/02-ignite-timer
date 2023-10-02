import { ButtonHTMLAttributes, ReactNode } from 'react'
import { ButtonContainer } from './button.styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  type?: 'button' | 'submit'
  variant?: 'start' | 'stop' | string
  disabled?: boolean
  onClick?: () => void
}

export function Button({
  children,
  type = 'button',
  disabled,
  variant,
  onClick,
}: ButtonProps) {
  return (
    <ButtonContainer
      type={type}
      disabled={disabled}
      variant={variant}
      onClick={onClick}
    >
      {children}
    </ButtonContainer>
  )
}
