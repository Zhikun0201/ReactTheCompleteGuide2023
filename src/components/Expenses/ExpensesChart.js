import React from "react";
import Chart from "../Chart/Chart";

const ExpensesChart = props => {
    const dataPoints = [
        {label: "1", value:0},
        {label: "2", value:0},
        {label: "3", value:0},
        {label: "4", value:0},
        {label: "5", value:0},
        {label: "6", value:0},
        {label: "7", value:0},
        {label: "8", value:0},
        {label: "9", value:0},
        {label: "10", value:0},
        {label: "11", value:0},
        {label: "12", value:0},
    ];

    for (const expense of props.expenses){
        const monthLabel = expense.date.getMonth().toString();
        dataPoints[monthLabel].value += expense.amount;
    }

    return <Chart dataPoints={dataPoints}/> 
}

export default ExpensesChart;