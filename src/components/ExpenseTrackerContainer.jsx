import { useEffect, useState } from "react";
import History from "./History";
import ExpenseForm from "./ExpenseForm";
import BalanceConatiner from "./BalanceContainer";
//import {v4 as uuidv4} from 'uuid';

function ExpenseTrackerContainer(){
    const [expense,setExpense]=useState([]);
    const [itemToEdit,setItemToEdit]=useState(null);
    
    const fetchExpense=async()=>{
        try{
            const response=await fetch('http://localhost:3000/expense');
            const data = await response.json();
            setExpense(data);
        }catch(err){
            console.log("failed to fetch",err);
        }
    }
    console.log(expense);
    useEffect(()=>{
        fetchExpense();
    },[])

    async function addExpense(title,amount){
        /*setExpense([...expense,{id:uuidv4(),title:title,amount:amount}]) // uuidv4 it generates unique number if both key and value have same value we can give ir has */
        try{
            const response = await fetch('http://localhost:3000/expense',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({title,amount})
            });
            fetchExpense(); //alternative to below code
            /*if(response.ok){
                const newItem=await response.json();
                setExpense((prev)=>[...prev,newItem]);
            }else{
                console.error("Failed to add expense");
            }*/
        }catch(err){
            console.error('Error adding expense',err);
        }
    }

    async function deleteExpense(id) {
        /*setExpense(expense.filter((exp)=> exp.id!=id));*/
        try{
            const response = await fetch(`http://localhost:3000/expense/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(response.ok){
                await fetchExpense();
            }else{
                console.error('Failed to delete expense')
            }
        }catch(err){
            console.error('Error deleting expense', err);
        }

    }

     async function editExpense(id, title, amount){
        try{
            const response = await fetch(`http://localhost:3000/expense/${id}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, amount })
            });
            if(response.ok){
                await fetchExpense();
            }else{
                console.error('Failed to edit expense');
            }
        }catch(err){
            console.error('Error editing expense', err);
        }
    }

    /*function editExpense(id,title,amt){
        setExpense(expense.map((exp)=> {
            if(exp.id==id){
                return {id,title,amount: amt}; //Object like key : value if both are same only then like title
            }else{
                return exp;
            }
        }));
        setItemToEdit(null);
    }*/
    console.log("After edit:",expense);

    return (
        <>
            <div className="expense-container">
                <h1>Expense Tracker</h1>
                <BalanceConatiner expenses={expense}/>
                <ExpenseForm itemToEdit={itemToEdit} setItemToEdit={setItemToEdit} editExpense={editExpense} addExpense={addExpense}/>
                <History expenses={expense} itemToEdit={itemToEdit} deleteExpense={deleteExpense} setItemToEdit={setItemToEdit}/>
            </div>
        </>
    )
}
export default ExpenseTrackerContainer;