import { React, useState } from "react";
import ExpensesFilter from "../ExpensesFilter/ExpensesFilter";
import Card from "../UI/Card";
import ExpenseItem from "./ExpenseItem";
import "./Expenses.css";

function Expenses(props) {
  const [filteredYear, setFilteredYear] = useState("None");

  const filteredExpenses = props.expenses.filter((expense) => {
    if (filteredYear === "None") return props.expenses;
    return expense.date.getFullYear().toString() === filteredYear.toString();
  });

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  return <Card className="expenses">
    <ExpensesFilter
      onChangeFilter={filterChangeHandler}
    />
    {filteredExpenses.length === 0 && (<p>没有数据</p>)}
    {filteredExpenses.length > 0 && (
      filteredExpenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          title={expense.title}
          date={expense.date}
          amount={expense.amount}
        />
      )))}
    {

    };
  </Card>;
}
export default Expenses;
