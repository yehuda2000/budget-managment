import type { Transaction } from '../models/transaction'
interface TotalExpensesFormProps {
    transactions: Transaction[]
  }
export const TotalExpenses = ({transactions}:TotalExpensesFormProps) => {
  return (
    <div id='total' className='bg-red-200 mb-8  px-8 pt-6 pb-8 shadow-md rounded-lg'>
        <h1 className='text-3xl text-center font-bold'>Total Expenses</h1>
        <h2 className='text-3xl text-center font-bold mt-4'> - {transactions.filter(e=>e.type ==='Expense').reduce((t,e)=>t+e.amount,0)}</h2>
    </div>
  )
}
