import { useState,useEffect } from "react";
function ExpenseForm(props){
    const [title,setTitle]=useState(props.itemToEdit?.title || "");
    const [amount,setAmount]=useState(props.itemToEdit?.amount || "");
    const [title_err,setTitleError]=useState("");
    const [amount_err,setAmountError]=useState("");

    const isEdit = props.itemToEdit;

    // Update form fields when editing a new item
    useEffect(() => {
        if(isEdit){
            setTitle(props.itemToEdit.title);
            setAmount(props.itemToEdit.amount);
        }
    }, [props.itemToEdit]);

    function handlechangeTitle(event){
        setTitle(event.target.value);
    }

    function handlechangeAmount(event){
        setAmount(event.target.value);
    }

    function handleSubmit(event){
        event.preventDefault();
        if(!title){
            setTitleError("Enter Title");
            return;
        }
        if(!amount || isNaN(amount)){
            setAmountError("Enter Amount");
            return;
        }
        if(isEdit){
            props.editExpense(props.itemToEdit._id,title,amount)
        }else{
            props.addExpense(title,amount);
        }
        setTitle("");
        setAmount("");
        setAmountError("");
        setTitleError("")

    }

    function clearEdit(){
        props.setItemToEdit(null);
        setTitle("");
        setAmount(0);
    }
    return(
        <div className="expenses-form">
            <h3>
                {isEdit?"Edit Expense":"Add Expense"}
                {isEdit && <button className="small-button" onClick={clearEdit}>Clear</button>}
            </h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" value={title} onChange={handlechangeTitle}/>
                    {title_err && <span>{title_err}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount ($)</label>
                    <input type="number" id="amount" name="amount" value={amount} onChange={handlechangeAmount}/>
                    {amount_err && <span>{amount_err}</span>}
                </div>
                <button type="submit">{isEdit?"Edit Expense":"Add Expense"}</button>
            </form>
        </div>
    )
}
export default ExpenseForm;