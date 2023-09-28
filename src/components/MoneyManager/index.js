import {Component} from 'react'
import {v4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    optionId: transactionTypeOptions[0].optionId,
    titleInput: '',
    amountInput: '',
    transactionsList: [],
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  changeInType = event => {
    this.setState({optionId: event.target.value})
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state
    const finalTransactionsList = transactionsList.filter(
      eachTransactions => eachTransactions.id !== id,
    )
    this.setState({transactionsList: finalTransactionsList})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {amountInput, titleInput, optionId} = this.state
    const typeOptions = transactionTypeOptions.find(
      eachType => eachType.optionId === optionId,
    )
    const {displayText} = typeOptions

    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
    console.log(displayText)
    console.log(amountInput, titleInput)
  }

  renderTitleContainer = () => {
    const {titleInput} = this.state
    return (
      <div className="inputs-container">
        <label htmlFor="title" className="input-name">
          TITLE
        </label>
        <input
          placeholder="Title"
          className="inputs"
          id="title"
          onChange={this.onChangeTitle}
          value={titleInput}
        />
      </div>
    )
  }

  renderAmountContainer = () => {
    const {amountInput} = this.state

    return (
      <div className="inputs-container">
        <label htmlFor="amount" className="input-name">
          AMOUNT
        </label>
        <input
          placeholder="Amount"
          className="inputs"
          id="amount"
          value={amountInput}
          onChange={this.onChangeAmount}
        />
      </div>
    )
  }

  renderTypeContainer = () => {
    const {optionId} = this.state
    return (
      <div className="inputs-container">
        <label htmlFor="type" className="input-name">
          TYPE
        </label>
        <br />
        <select
          id="type"
          className="inputs"
          value={optionId}
          onChange={this.changeInType}
        >
          {transactionTypeOptions.map(eachType => (
            <option key={eachType.optionId} value={eachType.optionId}>
              {eachType.displayText}
            </option>
          ))}
        </select>
      </div>
    )
  }

  getExpensesAmount = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0
    transactionsList.forEach(eachTransactions => {
      if (eachTransactions.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransactions.amount
      }
    })
    return expensesAmount
  }

  getIncome = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0
    transactionsList.forEach(eachTransactions => {
      if (eachTransactions.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransactions.amount
      }
    })
    return incomeAmount
  }

  getBalance = () => {
    const {transactionsList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0
    transactionsList.forEach(eachTransactions => {
      if (eachTransactions.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransactions.amount
      } else {
        expensesAmount += eachTransactions.amount
      }
    })
    balanceAmount += incomeAmount - expensesAmount
    return balanceAmount
  }

  render() {
    const {transactionsList} = this.state
    const balanceAmount = this.getBalance()
    console.log(`BalanceAmount:${balanceAmount}`)
    const incomeAmount = this.getIncome()
    console.log(`IncomeAmount:${incomeAmount}`)
    const expensesAmount = this.getExpensesAmount()
    console.log(`ExpensesAMount:${expensesAmount}`)
    console.log(transactionsList)
    return (
      <div className="app-container">
        <div className="account-holder-container">
          <h1 className="account-holder">Hi, Sanjay</h1>
          <p className="welcome-back">
            Welcome back to your
            <span className="money-manager">Money Manager</span>
          </p>
        </div>
        <MoneyDetails
          balanceAmount={balanceAmount}
          incomeAmount={incomeAmount}
          expensesAmount={expensesAmount}
        />
        <div className="transactions-history-container">
          <form className="transactions-add" onSubmit={this.onSubmitForm}>
            <h1 className="add-transactions-heading">Add Transactions</h1>
            {this.renderTitleContainer()}
            {this.renderAmountContainer()}
            {this.renderTypeContainer()}
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
          <div className="history-container">
            <h1 className="add-transactions-heading">History</h1>
            <div className="values-container">
              <p className="value">Title</p>
              <p className="value">Amount</p>
              <p className="value">Type</p>
            </div>
            <ul className="transactions-list">
              {transactionsList.map(eachTransactions => (
                <TransactionItem
                  transactionDetails={eachTransactions}
                  key={eachTransactions.id}
                  deleteTransaction={this.deleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
