import "./ExpenseDate.css";

function ExpenseDate(props) {
  const year = props.date.toLocaleString("zh-CN", { year: "numeric" });
  const month = props.date.toLocaleString("zh-CN", { month: "2-digit" });
  const day = props.date.toLocaleString("zh-CN", { day: "2-digit" });

  return (
    <div className="expense-date">
      <div className="expense-date__year">{year}</div>
      <div className="expense-date__month">{month}</div>
      <div className="expense-date__day">{day}</div>
    </div>
  );
}

export default ExpenseDate;
