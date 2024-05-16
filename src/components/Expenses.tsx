import type { Transaction } from '../models/transaction'
import { ExpensesCategory } from './ExpensesCategory'
interface AddTransactionFormProps {
    transactions: Transaction[]
  }
export const Expenses = ({transactions}: AddTransactionFormProps) => {
    const uniqueExpenseCategories = [...new Set(transactions.filter(e => e.type === 'Expense').map(e => e.category))];
    return (
    <div id='expenses' className='mb-8  px-8 pt-6 pb-8 shadow-md bg-white rounded-lg'>
        <h1 className='font-bold mb-2 text-2xl'>Expenses by Category</h1>
        <div>
        {uniqueExpenseCategories.map((category, index) => (
      <ExpensesCategory key={index} category={category} transactionsExpense={transactions.filter(e => e.type === 'Expense' && e.category === category)} />
    ))}
        </div>
    </div>
  )
}
