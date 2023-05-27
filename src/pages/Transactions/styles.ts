import styled from 'styled-components'

import * as RadioGroup from '@radix-ui/react-radio-group'

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 2rem;
  td {
    padding: 1.25rem 2rem;
    background: ${(props) => props.theme['gray-700']};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`

interface PriceHighLightProps {
  variant: 'income' | 'outcome'
}

export const PriceHighLight = styled.span<PriceHighLightProps>`
  color: ${(props) =>
    props.variant === 'income'
      ? props.theme['green-300']
      : props.theme['red-300']};
`

export const RadioGroupRoot = styled(RadioGroup.Root)`
  display: flex;
  width: fit-content;
  gap: 1rem;

  margin-top: 2rem;
`

export const Item = styled.div`
  display: flex;

  align-items: center;
  gap: 0.5rem;

  button {
    &[data-state='checked'] {
      background: ${(props) => props.theme['green-500']};
    }

    border: none;
    background: ${(props) => props.theme['gray-600']};

    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const RadioItem = styled(RadioGroup.Item)`
  background: ${(props) => props.theme.white};
  width: 25px;
  height: 25px;
  border-radius: 8px;
  outline: none;
  cursor: default;
`
