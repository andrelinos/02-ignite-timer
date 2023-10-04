import styled from 'styled-components'

export const HistoryContainer = styled.div`
  flex: 1;
  padding: 3.5rem;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }
`

export const HistoryList = styled.div`
  flex: 1;
  overflow-x: auto;
  overflow-y: overlay;
  scrollbar-gutter: stable;
  max-height: 400px;

  margin-top: 2rem;

  position: relative;

  &::-webkit-scrollbar {
    width: 4px;
    scroll-margin-top: 2rem;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme['green-300']};
    border-radius: 6px;
    transition: all 0.5s ease-in-out;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${(props) => props.theme['green-500']};
  }

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background-color: ${(props) => props.theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${(props) => props.theme['gray-700']};
      border-top: 4px solid ${(props) => props.theme['gray-800']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
      }

      div {
        display: flex;
        justify-content: space-between;

        button {
          width: 1.5rem;
          height: 1.5rem;
          padding: 0;
          border: none;
          border-radius: 9999px;
          background-color: transparent;
          opacity: 0.75;
          transition: all 0.5s;

          &:hover {
            background-color: ${(props) => props.theme['red-500']};
            cursor: pointer;
            outline: 0;
          }

          &:focus {
            outline: none;
            box-shadow: none;
          }
        }
      }
    }
  }
`

const STATUS_COLORS = {
  red: 'red-500',
  yellow: 'yellow-500',
  green: 'green-500',
} as const

interface StatusProps {
  statusColor: keyof typeof STATUS_COLORS
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9999px;
    background: ${(props) => props.theme[STATUS_COLORS[props.statusColor]]};
  }
`

export const Status2 = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9999px;
    background: ${(props) => props.theme[STATUS_COLORS[props.statusColor]]};
  }
`
