import React, { useState } from "react";
import { Header } from "./components/Header";
import { AddTransaction } from "./components/AddTransaction";
import { Transaction} from "./models/transaction";
import { Footer } from "./components/Footer";
import { TodoList } from "./components/TodoList";
import { Expenses } from "./components/Expenses";
import { TotalExpenses } from "./components/TotalExpenses";
import { TotalSavings } from "./components/TotalSavings";
import Swal from 'sweetalert2'


export const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transaction, setTransaction] = useState<Transaction>();
  
  const addTransaction = (type:'Expense'|'Income',category:string,amount:number,description:string,date:Date) => {
    const newTransaction = { id: Date.now(), type, category,amount,description,date};
    setTransactions([...transactions, newTransaction]);
  };

  const updateTransaction = (type:'Expense'|'Income',category:string,amount:number,description:string,date:Date) => {
    if(transaction){
      const index=transactions.findIndex(e=>e.id==transaction.id)
      transactions[index] = { id:transaction.id, type, category,amount,description,date}
      setTransactions([...transactions]);
    }
  };

  
  const deleteTransaction = (id:number) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your transaction has been deleted.",
          icon: "success"
        });
        setTransactions(transactions.filter(e=>e.id!==id))
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary transaction is safe :)",
          icon: "error"
        });
      }
    });
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const EditTransaction = (transaction:Transaction) => {
    setTransaction(transaction)
    scrollToTop();
  }
const reset = () =>{
  setTransaction(undefined);
}
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex flex-col items-center grow">
      <AddTransaction onAddTodo={addTransaction} transaction={transaction} updateTransaction={updateTransaction} reset={reset}/>
      { transactions.length!=0 && <div>
        <TodoList transactions={transactions} EditTransaction={EditTransaction} deleteTransaction={deleteTransaction} />
        <Expenses transactions={transactions}/>
        <div className="flex flex-row justify-around gap-4">
        <TotalExpenses transactions={transactions}/>
        <TotalSavings transactions={transactions}/>
        </div>
      </div>}
      </main>
      <Footer/>
    </div>
  );
};
