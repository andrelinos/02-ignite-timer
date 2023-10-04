import { produce } from 'immer'
import { ActionTypes } from './actions'

export interface CycleProps {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesState {
  cycles: CycleProps[]
  activeCycleId: string | null
  cycleIdToDelete: string | null
  amountSecondsPassed: number
}

interface ActionTypeProps {
  type: ActionTypes
  payload?: {
    newCycle: CycleProps
  }
}

export function cyclesReducer(state: CyclesState, action: ActionTypeProps) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        if (action.payload) {
          draft.cycles.push(action.payload.newCycle)
          draft.activeCycleId = action.payload.newCycle.id
        }
      })

    case ActionTypes.DELETE_CYCLE_ITEM:
      return produce(state, (draft) => {
        if (action.payload) {
          draft.cycles.filter((cycle) => cycle.id !== state.cycleIdToDelete)
        }
      })

    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
      })
    }

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.amountSecondsPassed = 0
        draft.cycles[currentCycleIndex].finishedDate = new Date()
      })
    }

    default:
      return state
  }
}
