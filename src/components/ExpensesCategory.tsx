import type { Transaction } from '../models/transaction'
interface AddTransactionFormProps {
    transactionsExpense: Transaction[]
    category:string
  }
export const ExpensesCategory = ({transactionsExpense,category}: AddTransactionFormProps) => {
  return (
    <div className='flex flex-row justify-between px-2 py-1'>
        <p className=''>{category}</p>
        <p>₪ {transactionsExpense.reduce((t,e)=>t+e.amount,0).toFixed(2)}</p>
    </div>
  )
}
