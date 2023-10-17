import React, { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = () => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const expencseData = {
      title: enteredTitle,
      amoumt: enteredAmount,
      date: new Date(enteredDate)
    };
    console.log(expencseData);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="exe-expense__control">
          <label>项目</label>
          <input type="text" onChange={titleChangeHandler} />
        </div>
        <div className="exe-expense__control">
          <label>数额</label>
          <input
            type="number"
            min="0.00"
            step="0.01"
            onChange={amountChangeHandler}
          />
        </div>
        <div className="exe-expense__control">
          <label>日期</label>
          <input type="date" onChange={dateChangeHandler} />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">添加</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
