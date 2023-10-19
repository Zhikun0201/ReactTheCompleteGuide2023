import Card from "../UI/Card";
import ExpenseItem from "./ExpenseItem";
import ExpensesFilter from "../ExpensesFilter/ExpensesFilter";
import "./Expenses.css";

function Expenses(props) {
  const items = props.list.map((item) => (
    <ExpenseItem
      key={item.id}
      title={item.title}
      date={item.date}
      amount={item.amount}
    />
  ));

  return <Card className="expenses">
    <ExpensesFilter onChangeFilter={(value)=>{console.log(value)}}/>
    {items}
  </Card>;
}
export default Expenses;
