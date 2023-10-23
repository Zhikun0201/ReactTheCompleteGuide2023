import React, { useState } from "react";
import Card from "../UI/Card";
import ExpenseDate from "./ExpenseDate";

import "./ExpenseItem.css";

function ExpenseItem(props) {
  const [title, setTitle] = useState(props.title);
  const clickHandler = () => {
    setTitle("Updated!");
  };

  const expenseAmount = props.amount;
  return (
    // root begin
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__price"> ￥{expenseAmount}</div>
      </div>
      <button onClick={clickHandler}> 修改名称 </button>
    </Card>
    // root end
  );
}

export default ExpenseItem;
