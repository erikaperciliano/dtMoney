import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { PriceHighlight, TransactionContainer, TransactionsTable } from "./styles";

export function Transactions () {
    return (
        <div>
            <Header />
            <Summary />

            <TransactionContainer>
                <TransactionsTable>
                    <tbody>
                        <tr>
                            <td width="50%">Website development</td>
                            <td>
                                <PriceHighlight variant="income">
                                    $12.000,00
                                </PriceHighlight>    
                            </td>
                              
                            <td>Sale</td>
                            <td>13/04/2024</td>
                        </tr>

                        <tr>
                            <td width="50%">Hamburger</td>
                            <td>
                                <PriceHighlight variant="outcome">
                                    - $59.000
                                </PriceHighlight>    
                            </td>
                            <td>Food</td>
                            <td>09/04/2024</td>
                        </tr>
                    </tbody>
                </TransactionsTable>
            </TransactionContainer>
        </div>
    )
}