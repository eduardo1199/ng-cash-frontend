import { Header } from '../../components/Header'
import { SearchForm } from '../../components/Search'
import { Summary } from '../../components/Summary'
import {
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'

export function Transactions() {
  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            <tr>
              <td width="30%">Desenvolvimento de site</td>

              <td>
                <PriceHighLight variant="income">R$ 12.000,00</PriceHighLight>
              </td>

              <td>Venda</td>

              <td>13/04/2022</td>

              <td>Eduardo Soares</td>
            </tr>
            <tr>
              <td width="30%">Desenvolvimento de site</td>

              <td>
                <PriceHighLight variant="income">R$ 12.000,00</PriceHighLight>
              </td>

              <td>Venda</td>

              <td>13/04/2022</td>

              <td>Eduardo Soares</td>
            </tr>
            <tr>
              <td width="30%">Desenvolvimento de site</td>

              <td>
                <PriceHighLight variant="outcome">
                  - R$ 12.000,00
                </PriceHighLight>
              </td>

              <td>Venda</td>

              <td>13/04/2022</td>

              <td>Eduardo Soares</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
