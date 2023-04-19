import styled from 'styled-components'

import * as Select from '@radix-ui/react-select'

export const SelectItemStyle = styled(Select.Item)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1rem;

  background: ${(props) => props.theme['gray-900']};
  color: ${(props) => props.theme['gray-300']};

  svg {
    color: ${(props) => props.theme['green-300']};
  }
`
