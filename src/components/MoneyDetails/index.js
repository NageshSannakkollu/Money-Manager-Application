// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {balanceAmount, incomeAmount, expensesAmount} = props
  console.log(balanceAmount, incomeAmount, expensesAmount)
  return (
    <div className="money-details-container">
      <div className="balance-container" data-testid="balanceAmount">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="image"
        />
        <div className="amount-container">
          <p>Your Balance</p>
          <p>Rs {balanceAmount}</p>
        </div>
      </div>
      <div className="income-container" data-testid="incomeAmount">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="image"
        />
        <div className="amount-container">
          <p>Your Income</p>
          <p>Rs {incomeAmount}</p>
        </div>
      </div>
      <div className="expenses-container" data-testid="expensesAmount">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="image"
        />
        <div className="amount-container">
          <p>Your Expenses</p>
          <p>Rs {expensesAmount}</p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
