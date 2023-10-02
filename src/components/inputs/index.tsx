import { forwardRef, InputHTMLAttributes } from 'react'
import { InputTask, MinutesAmountInput } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  inputType?: string
  id?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, inputType = 'text', ...rest }, ref) => {
    if (inputType === 'number') {
      return (
        <>
          <label htmlFor={id}>{label}</label>
          <MinutesAmountInput type={inputType} id={id} ref={ref} {...rest} />
        </>
      )
    }

    return (
      <>
        <label htmlFor={id}>{label}</label>
        <InputTask type={inputType} ref={ref} {...rest} />
      </>
    )
  },
)

Input.displayName = 'Input'

export { Input }
