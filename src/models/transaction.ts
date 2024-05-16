export type Transaction = {
    id:number
    type:'Expense'|'Income'
    category:string
    amount:number
    description:string
    date:Date
}