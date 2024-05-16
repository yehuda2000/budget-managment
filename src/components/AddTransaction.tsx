import React, { useEffect, useState } from 'react'
import type { Transaction } from '../models/transaction';
import Swal from 'sweetalert2'
interface AddTransactionFormProps {
  onAddTodo: (type:'Expense'|'Income',category:string,amount:number,description:string,date:Date)=> void
  updateTransaction:(type:'Expense'|'Income',category:string,amount:number,description:string,date:Date)=> void
  transaction: Transaction | undefined
  reset:()=>void
}

export const AddTransaction = ({onAddTodo,transaction,updateTransaction,reset}: AddTransactionFormProps) => {
  const [selectedType, setSelectedType] = useState<'Expense'|'Income'|'Choose a Type'>('Choose a Type');
  const [category, setCategory] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if(selectedType!='Expense' && selectedType!='Income' ){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You have not selected a type!",
      });
    }else if(!category){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Category cannot be empty!",
      });
    }else if(amount<=0){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Must be a number greater than zero!",
      });
    }else if(!description){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Description cannot be empty!",
      });
    }else if(!date){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Must choose a date!",
      });
    }
    else{
      onAddTodo(selectedType  as 'Expense' | 'Income', category, amount, description, new Date(date));
      setSelectedType('Choose a Type');
      setCategory('');
      setAmount(0);
      setDescription('');
      setDate('');

      Swal.fire({
        title: "Transaction successfully added!",
        text: "You clicked the button!",
        icon: "success"
      });

    }
  }

  function handleUpdate(event: React.FormEvent) {
    event.preventDefault();
    if(selectedType!='Expense' && selectedType!='Income' ){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You have not selected a type!",
      });
    }else if(!category){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Category cannot be empty!",
      });
    }else if(amount<=0){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Must be a number greater than zero!",
      });
    }else if(!description){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Description cannot be empty!",
      });
    }else if(!date){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Must choose a date!",
      });
    }
    else{
      updateTransaction(selectedType  as 'Expense' | 'Income', category, amount, description, new Date(date));
      reset()
      setSelectedType('Choose a Type');
      setCategory('');
      setAmount(0);
      setDescription('');
      setDate('');

      Swal.fire({
        title: "Transaction updated successfully!",
        text: "You clicked the button!",
        icon: "success"
      });

    }
  }

  function dataFilling(){
    if(transaction){
      setSelectedType(transaction.type);
      setCategory(transaction.category);
      setAmount(transaction.amount);
      setDescription(transaction.description);
      setDate(transaction.date.toISOString());
    }
    

  }

  useEffect(()=>{
    dataFilling()
  },[transaction])

  function handleRefresh(event: React.FormEvent){
    event.preventDefault();
    reset()
    setSelectedType('Choose a Type');
    setCategory('');
    setAmount(0);
    setDescription('');
    setDate('');

    Swal.fire({
      title: "The page refreshes successfully!",
      text: "You clicked the button!",
      icon: "success"
    });
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col justify-center gap-3 my-4  px-8 pt-6 pb-8 shadow-md ${transaction ? transaction.type == 'Expense' ? "bg-red-200" : 'bg-green-200' : 'bg-white'}`}>
      <label className='font-bold text-sm' htmlFor="">Type</label>
      <select onChange={e => setSelectedType(e.target.value as 'Expense' | 'Income'|'Choose a Type')} value={selectedType} className='border px-2 mb-1 w-96 h-8 mr-2 shadow-md'>
        <option defaultChecked value="">Choose a Type</option>
        <option value="Expense">Expense</option>
        <option value="Income">Income</option>
      </select>
      <label className='font-bold text-sm' htmlFor="">Category</label>
      <input type="text" value={category} onChange={e => setCategory(e.target.value)} className='border px-2 mb-1 w-96 h-8 mr-2 shadow-md'/>
      <label className='font-bold text-sm' htmlFor="">Amount</label>
      <input type="text" value={amount} onChange={e => setAmount(Number(e.target.value))} className='border px-2 mb-1 w-96 h-8 mr-2 shadow-md'/>
      <label className='font-bold text-sm' htmlFor="">Description</label>
      <input type="text" value={description} onChange={e => setDescription(e.target.value)} className='border px-2 mb-1 w-96 h-8 mr-2 shadow-md'/>
      <label className='font-bold text-sm' htmlFor="">Date</label>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} className='border px-2 mb-1 w-96 text-ms h-8 mr-2 shadow-md'/>
      <div className='flex flex-row gap-2'>
      {transaction ? <button onClick={handleUpdate} className='bg-blue-500 mt-2 text-white w-40 h-10 rounded-md font-bold shadow-lg hover:bg-blue-700'>Update transaction</button> :<button type='submit' className='bg-blue-500 mt-2 text-white w-40 h-10 rounded-md font-bold shadow-lg hover:bg-blue-700'>Add transaction</button>}
      <button onClick={handleRefresh} className='bg-yellow-400 text-white mt-2 w-40 h-10 rounded-md font-bold shadow-lg hover:bg-yellow-500'>Refresh</button>
      </div>
    </form>
  );
};
