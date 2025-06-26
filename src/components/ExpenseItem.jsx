function ExpenseItem(props){
    const {expense, itemToEdit}=props;
    var type="";
    if(expense.amount>0){
        type="income";
    }else{
        type="expense";
    }
    function handleEdit(){
        props.setItemToEdit(expense);
    }

    const isEditing = itemToEdit && expense._id === itemToEdit._id;

    return(
        <>
            <div className={`expense-item ${type} ${isEditing ? "editing" : ""}`}>
                <div className="expense-title">{expense.title}</div>
                <button className="edit_btn" onClick={handleEdit}>Edit</button>
                <button className="delte_btn" onClick={()=> props.deleteExpense(expense._id)}>Delete</button>
                <div className="expense-amount">{expense.amount} $</div>
                
            </div>
        </>
    )
}
export default ExpenseItem;