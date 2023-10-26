import React from "react";
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const NewExpense = (props) => {
  const [showForm, setShowForm] = React.useState(false);

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString()
    };
    props.onAddExpense(expenseData);
  }

  if (showForm) {
    return (
      <div className="new-expense">
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          onStopEditing={() => setShowForm(false)}
        />
      </div>
    );
  }

  return (
    <div className="new-expense">
      <button onClick={() => setShowForm(true)}>添加</button>
    </div>
  );
};

export default NewExpense;
