import { React, useState } from "react";
import ExpensesFilter from "../ExpensesFilter/ExpensesFilter";
import Card from "../UI/Card";
import ExpenseItem from "./ExpenseItem";
import "./Expenses.css";

function Expenses(props) {
  const [filteredYear, setFilteredYear] = useState('2020');

  let filterInfoText = '2019, 2021 & 2022';

  if (filteredYear === '2020') {
    filterInfoText = '2019, 2021 & 2022'
  } else if (filteredYear === '2019') {
    filterInfoText = '2020, 2021 & 2022'
  } else if (filteredYear === '2021') {
    filterInfoText = '2019, 2020 & 2022'
  } else if (filteredYear === '2022') {
    filterInfoText = '2019, 2020 & 2021'
  }

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };


  const items = props.list.map((item) => (
    <ExpenseItem
      key={item.id}
      title={item.title}
      date={item.date}
      amount={item.amount}
    />
  ));

  return <Card className="expenses">
    <p>Data for years {filterInfoText} is hidden.</p>
    <ExpensesFilter selectedYear={filteredYear} onChangeFilter={filterChangeHandler} />
    {items}
  </Card>;
}
export default Expenses;
