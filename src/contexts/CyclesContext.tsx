import {
  addNewCycleAction,
  deleteCycleItemAction,
  interruptCycleAction,
  markCurrentCycleAsFinishedAction,
} from '@/reducers/cycles/actions'
import { CycleProps, cyclesReducer } from '@/reducers/cycles/reducer'
import { differenceInSeconds } from 'date-fns'
import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: CycleProps[]
  activeCycle: CycleProps | undefined
  activeCycleId: string | null
  cycleIdToDelete: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  deleteCycleItem: (cycleId: string) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycleIdToDelete, setCycleIdToDelete] = useState('')
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
      amountSecondsPassed: 0,
    },
    (initialState) => {
      try {
        const storedStateAsJSON = localStorage.getItem(
          '@andrelinos-ignite-timer:cycles-state-1.0.0',
        )

        if (storedStateAsJSON) {
          return JSON.parse(storedStateAsJSON)
        }
        return initialState
      } catch (error) {
        return []
      }
    },
  )

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const newCyclesList = cycles.filter((cycle) => cycle.id !== cycleIdToDelete)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  async function deleteCycleItem(cycleId: string) {
    setCycleIdToDelete(cycleId)
    dispatch(deleteCycleItemAction())

    const data = {
      cycles: newCyclesList || [],
      activeCycleId: null,
      amountSecondsPassed: 0,
    }
    const cyclesJSON = JSON.stringify(data)

    localStorage.setItem(
      '@andrelinos-ignite-timer:cycles-state-1.0.0',
      cyclesJSON,
    )
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())

    setAmountSecondsPassed(0)
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: CycleProps = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))

    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCycleAction())
  }

  useEffect(() => {
    const cyclesJSON = JSON.stringify(cyclesState)

    localStorage.setItem(
      '@andrelinos-ignite-timer:cycles-state-1.0.0',
      cyclesJSON,
    )
  }, [cyclesState])

  return (
    <CyclesContext.Provider
      value={{
        cycleIdToDelete,
        cycles,
        deleteCycleItem,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
