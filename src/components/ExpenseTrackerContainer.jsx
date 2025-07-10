import { useEffect, useState } from "react";
import History from "./History";
import ExpenseForm from "./ExpenseForm";
import BalanceConatiner from "./BalanceContainer";

function ExpenseTrackerContainer({ token }) {
  const [expense, setExpense] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);

  const fetchExpense = async () => {
    try {
      const response = await fetch('https://expense-tracker-backend-oi0v.onrender.com/expense', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setExpense(data);
    } catch (err) {
      console.log("failed to fetch", err);
    }
  };

  useEffect(() => {
    fetchExpense();
    // eslint-disable-next-line
  }, []);

  async function addExpense(title, amount) {
    try {
      await fetch('https://expense-tracker-backend-oi0v.onrender.com/expense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, amount })
      });
      fetchExpense();
    } catch (err) {
      console.error('Error adding expense', err);
    }
  }

  async function deleteExpense(id) {
    try {
      const response = await fetch(`https://expense-tracker-backend-oi0v.onrender.com/expense/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        await fetchExpense();
      } else {
        console.error('Failed to delete expense');
      }
    } catch (err) {
      console.error('Error deleting expense', err);
    }
  }

  async function editExpense(id, title, amount) {
    try {
      const response = await fetch(`https://expense-tracker-backend-oi0v.onrender.com/expense/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, amount })
      });
      if (response.ok) {
        await fetchExpense();
      } else {
        console.error('Failed to edit expense');
      }
    } catch (err) {
      console.error('Error editing expense', err);
    }
  }

  return (
    <>
      <div className="expense-container">
        <h1>Expense Tracker</h1>
        <BalanceConatiner expense={expense} />
        <ExpenseForm itemToEdit={itemToEdit} setItemToEdit={setItemToEdit} editExpense={editExpense} addExpense={addExpense} />
        <History expenses={expense} itemToEdit={itemToEdit} deleteExpense={deleteExpense} setItemToEdit={setItemToEdit} />
      </div>
    </>
  );
}
export default ExpenseTrackerContainer;
