import * as Select from '@radix-ui/react-select'
import { SelectItemProps } from '@radix-ui/react-select'
import React, { ReactNode } from 'react'

import { Check } from 'phosphor-react'
import { SelectItemStyle } from './styles'

interface SelectItemComponentProps extends SelectItemProps {
  children: ReactNode
  value: string
}

type RefSelectItem = HTMLDivElement

function SelectItemComponent(
  { children, ...props }: SelectItemComponentProps,
  forwardedRef: React.Ref<RefSelectItem> | undefined,
) {
  return (
    <SelectItemStyle {...props} ref={forwardedRef}>
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator>
        <Check />
      </Select.ItemIndicator>
    </SelectItemStyle>
  )
}

export const SelectItem = React.forwardRef<
  RefSelectItem,
  SelectItemComponentProps
>(SelectItemComponent)
