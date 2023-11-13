import { React, useState } from "react";
import ExpensesFilter from "../ExpensesFilter/ExpensesFilter";
import Card from "../UI/Card";
import ExpenseItem from "./ExpenseItem";
import "./Expenses.css";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";

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
    <ExpensesChart
      expenses={filteredExpenses}
    />
    <ExpensesList items={filteredExpenses} />
  </Card>;
}
export default Expenses;
