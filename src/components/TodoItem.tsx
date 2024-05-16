import { Transaction } from "../models/transaction";

interface TodoItemProps {
  transaction: Transaction;
  deleteTransaction:(id:number)=>void
  EditTransaction:(transaction:Transaction)=>void
}

export const TodoItem = ({ transaction,deleteTransaction,EditTransaction }: TodoItemProps) => {
  return (
    <div
     id="transaction" className={` border-gray-400 shadow-md relative block p-4 ${transaction.type == 'Expense' ? "bg-red-200" : 'bg-green-200'}`}
    >
      <p>{transaction.description}</p>
      <p>{transaction.category +' - '+ transaction.date.toDateString()}</p>
      <p className="absolute top-8 right-40 font-bold">₪ {transaction.amount}</p>
      <button onClick={()=>EditTransaction(transaction)} className='bg-blue-500 absolute top-5 right-20 mt-2 text-white w-14 h-8 rounded-md font-bold shadow-lg hover:bg-blue-700'>Edit</button>
      <button onClick={()=>deleteTransaction(transaction.id)} className='bg-red-500 absolute top-5 right-4 mt-2 text-white w-14 h-8 rounded-md font-bold shadow-lg hover:bg-red-700'>Delete</button>    
      </div>
  );
};
