import { Progress } from "antd";
import React from "react";

const Analytics = ({ alltransactions = [] }) => {
  const categories = [
    "salary",
    "tip",
    "project",
    "food",
    "movie",
    "bills",
    "medical",
    "tax",
  ];
  const TotalTransaction = alltransactions.length;
  const TotalIncomeTransaction = alltransactions.filter(
    (alltransactions) => alltransactions.type === "income"
  );
  const TotalExpenseTransaction = alltransactions.filter(
    (alltransactions) => alltransactions.type === "expense"
  );
  const TotalIncomePercent =
    (TotalIncomeTransaction.length / TotalTransaction) * 100;
  const TotalExpensePercent =
    (TotalExpenseTransaction.length / TotalTransaction) * 100;

  //total turnover
  const totalTurnover = alltransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const totalIncomeTurnover = alltransactions
    .filter((alltransactions) => alltransactions.type === "income")
    .reduce((acc, alltransaction) => acc + alltransaction.amount, 0);

  const totalExpenseTurnover = alltransactions
    .filter((alltransactions) => alltransactions.type === "expense")
    .reduce((acc, alltransaction) => acc + alltransaction.amount, 0);

  const TotalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;

  const TotalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <>
      <div className="analytics-page">
        <div className="analytics-summary-grid">
          <div>
          <div className="card analytics-card">
            <div className="card-header">
              Total Transaction = {TotalTransaction}
            </div>
            <div className="card-body">
              <h5 className="text-success">
                Income: {TotalIncomeTransaction.length}
              </h5>
              <h5 className="text-danger">
                Expense: {TotalExpenseTransaction.length}
              </h5>
              <div className="analytics-progress-row">
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={TotalIncomePercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={TotalExpensePercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="card analytics-card">
            <div className="card-header">Total Turnover = {totalTurnover}</div>
            <div className="card-body">
              <h5 className="text-success">
                Income Turnover: {totalIncomeTurnover}
              </h5>
              <h5 className="text-danger">
                Expense Turnover: {totalExpenseTurnover}
              </h5>
              <div className="analytics-progress-row">
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={TotalIncomeTurnoverPercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={TotalExpenseTurnoverPercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className="analytics-category-grid">
          <div className="analytics-category-column">
            <h4>Categorywise income</h4>
            {categories.map((category) => {
              const amount = alltransactions
                .filter(
                  (transaction) =>
                    transaction.type === "income" &&
                    transaction.category === category
                )
                .reduce((acc, transaction) => acc + transaction.amount, 0);
              return (
                amount > 0 && (
                  <div className="card analytics-category-card" key={`income-${category}`}>
                    <div className="card-body">
                      <h5>{category}</h5>
                      <Progress percent={((amount / totalIncomeTurnover) * 100).toFixed(0)} />
                    </div>
                  </div>
                )
              );
            })}
          </div>
          <div className="analytics-category-column">
            <h4>Categorywise Expense</h4>
            {categories.map((category) => {
              const amount = alltransactions
                .filter(
                  (transaction) =>
                    transaction.type === "expense" &&
                    transaction.category === category
                )
                .reduce((acc, transaction) => acc + transaction.amount, 0);
              return (
                amount > 0 && (
                  <div className="card analytics-category-card" key={`expense-${category}`}>
                    <div className="card-body">
                      <h5>{category}</h5>
                      <Progress percent={((amount / totalExpenseTurnover) * 100).toFixed(0)} />
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
