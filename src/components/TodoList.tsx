import {useEffect,useState } from 'react'
import { Transaction } from '../models/transaction'
import { TodoItem } from './TodoItem'
interface TodoListProps{
  transactions: Transaction[]
  deleteTransaction:(id:number)=>void
  EditTransaction:(transaction:Transaction)=>void
}

export const TodoList = ({transactions,deleteTransaction,EditTransaction}:TodoListProps) => {
  const [sortBy, setSortBy] = useState<'The latest date'|'The earliest date'|'The highest amount'|'The lowest amount'>('The latest date');
  const [sortTransactions, setSortTransactions] = useState<Transaction[]>([...transactions]);
  function sort(){
    if (sortBy === 'The latest date') {
      const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setSortTransactions(sortedTransactions);
    }else if(sortBy === 'The earliest date'){
      const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setSortTransactions(sortedTransactions);
    }else if(sortBy === 'The highest amount'){
      const sortedTransactions = [...transactions].sort((a, b) => b.amount-a.amount);
      setSortTransactions(sortedTransactions);
    }else if(sortBy === 'The lowest amount'){
      const sortedTransactions = [...transactions].sort((a, b) => a.amount-b.amount);
      setSortTransactions(sortedTransactions);
    }
  }

  useEffect(()=>{
    setSortTransactions([...transactions])
    sort()
  },[sortBy,transactions])

  return (
    <div className='my-10'>
      <div className='flex flex-row justify-between'>
        <h1 className='pl-1 font-bold mb-3 text-xl'>transactions</h1>
        <div>
          <label className='font-bold text-l' htmlFor="">Sort by</label>
          <select id='sort' onChange={e => setSortBy(e.target.value as 'The latest date'|'The earliest date'|'The highest amount'|'The lowest amount')} value={sortBy} className='border ml-3 px-2 mb-1 w-48 h-7 shadow-md'>
          <option defaultChecked value="The latest date">The latest date</option>
          <option value="The earliest date">The earliest date</option>
          <option value="The highest amount">The highest amount</option>
          <option value="The lowest amount">The lowest amount</option>
        </select>
        </div>
      </div>
      {sortTransactions.map(transaction => (
        <TodoItem key={transaction.id} transaction={transaction} EditTransaction={EditTransaction} deleteTransaction={deleteTransaction}/>
      ))}
    </div>
  )
}
