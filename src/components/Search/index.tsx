import { SearchFormContainer } from './styles'

import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

const searchSchemaForm = z.object({
  query: z.string(),
})

type SearchFormInput = z.infer<typeof searchSchemaForm>

export function SearchForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInput>({
    resolver: zodResolver(searchSchemaForm),
  })

  function handleSearchTransitions(data: SearchFormInput) {
    console.log(data)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransitions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}
