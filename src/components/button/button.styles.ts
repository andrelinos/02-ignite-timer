import styled from 'styled-components'

interface ButtonProps {
  variant?: string
}

export const ButtonContainer = styled.button<ButtonProps>`
  width: 100%;
  border-radius: 8px;
  border: 0;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: bold;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }

  transition: background-color ease-in-out 0.3s;

  background-color: ${(props) =>
    props.variant === 'start'
      ? props.theme['green-500']
      : props.theme['red-500']};
  color: ${(props) => props.theme['gray-100']};

  &:not(:disabled):hover {
    background-color: ${(props) =>
      props.variant === 'start'
        ? props.theme['green-700']
        : props.theme['red-700']};
  }
`
