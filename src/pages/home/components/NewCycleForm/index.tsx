import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'

import { CyclesContext } from '@/contexts/CyclesContext'
import { Input } from '../../../../components/inputs'
import { FormContainer } from './styles'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <Input
        id="task"
        list="task-input"
        label="Vou trabalhar em"
        disabled={!!activeCycle}
        placeholder="Dê um nome para seu projeto..."
        {...register('task')}
      />
      <datalist id="task-input">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
      </datalist>
      <Input
        id="minutesAmount"
        inputType="number"
        label="durante"
        step={5}
        min={1}
        max={60}
        disabled={!!activeCycle}
        placeholder="00"
        {...register('minutesAmount', {
          valueAsNumber: true,
        })}
      />
    </FormContainer>
  )
}
