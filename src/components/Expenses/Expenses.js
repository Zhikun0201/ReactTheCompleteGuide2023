import Card from "../UI/Card";
import ExpenseItem from "./ExpenseItem";
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

  return <Card className="expenses">{items}</Card>;
}
export default Expenses;
