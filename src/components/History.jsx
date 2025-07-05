import ExpenseItem from "./ExpenseItem";
function History(props){
    // Ensure expenses is always an array
    const expenses = Array.isArray(props.expenses) ? props.expenses : [];
    const { itemToEdit, deleteExpense, setItemToEdit } = props;
    return(
        <>
            <div className="history"> 
                <h3>History</h3>
                {
                    expenses.map((expense)=>(
                        <ExpenseItem key={expense._id}
                            expense={expense}
                            itemToEdit={itemToEdit}
                            deleteExpense={deleteExpense}
                            setItemToEdit={setItemToEdit}/>
                    ))
                }
            </div>
        </>
    )
}
export default History;