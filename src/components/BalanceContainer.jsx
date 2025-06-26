function BalanceConatiner(props){
    const incomeArr=props.expenses.filter((expense)=> expense.amount>0);
    const expenseArr=props.expenses.filter((expense)=> expense.amount<0);
    let income=0;
    let expense=0;

    incomeArr.forEach(expenseobj => income+=parseInt(expenseobj.amount));
    expenseArr.forEach(expenseobj => expense+=parseInt(expenseobj.amount));
    var total=income+expense;
    expense*=-1;
    if(total<0){
        total=0;
    }
    console.log("income:",income,"expenses:",expense,"total:",total);
    return (
        <>
            <div className="balance-container">
                <div className="currency-item">
                    <div className="title">Income</div>
                    <div className="amount" id="income">${income}</div>
                </div>
                <div className="currency-item">
                    <div className="title">Expense</div>
                    <div className="amount" id="expense">${expense}</div>
                </div>
                <div className="currency-item">
                    <div className="title">Balance</div>
                    <div className="amount" >${total}</div>
                </div>
            </div>
        </>
    )
}
export default BalanceConatiner;