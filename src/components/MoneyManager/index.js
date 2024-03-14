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

const moneyDetailsList = [
  {
    id: v4(),
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
    title: 'Your Balance',
    alt: 'balance',
    className: 'balance',
  },
  {
    id: v4(),
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
    title: 'Your Income',
    alt: 'income',
    className: 'income',
  },
  {
    id: v4(),
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
    title: 'Your Expenses',
    alt: 'expenses',
    className: 'expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionsList: [],
    titleInput: '',
    amountInput: '',
    typeInput: 'Income',
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state
    this.setState({
      transactionsList: transactionsList.filter(trans => trans.id !== id),
    })
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeType = event => {
    this.setState({typeInput: event.target.value})
  }

  renderTransactionsList = () => {
    const {transactionsList} = this.state
    return transactionsList.map(eachTransaction => (
      <TransactionItem
        key={eachTransaction.id}
        transactionDetails={eachTransaction}
        deleteTransaction={this.deleteTransaction}
      />
    ))
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, typeInput} = this.state
    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: amountInput,
      type: typeInput,
    }

    this.setState(previousState => ({
      transactionsList: [...previousState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      typeInput: 'Income',
    }))
  }

  render() {
    const {titleInput, amountInput, typeInput} = this.state
    return (
      <div className="app-container">
        <div className="header-container">
          <h1 className="heading1">Hi, Richard</h1>
          <p className="main-para">
            Welcome back to your <span className="span">Money Manager</span>
          </p>
        </div>

        <ul className="money-details-list">
          {moneyDetailsList.map(eachMoneyDetail => (
            <MoneyDetails
              key={eachMoneyDetail.id}
              moneyDetails={eachMoneyDetail}
            />
          ))}
        </ul>

        <div className="adding-history-container">
          <form className="form" onSubmit={this.onAddTransaction}>
            <h1 className="heading2">Add Transaction</h1>
            <div className="inputs-containers">
              <label className="label" htmlFor="title">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                placeholder="TITLE"
                className="input"
                onChange={this.onChangeTitle}
                value={titleInput}
              />
            </div>
            <div className="inputs-containers">
              <label className="label" htmlFor="amount">
                AMOUNT
              </label>
              <input
                type="text"
                id="amount"
                placeholder="AMOUNT"
                className="input"
                onChange={this.onChangeAmount}
                value={amountInput}
              />
            </div>
            <div className="inputs-containers">
              <label className="label" htmlFor="selectType">
                TYPE
              </label>
              <select
                className="input"
                id="selectType"
                onChange={this.onChangeType}
              >
                {transactionTypeOptions.map(eachType => (
                  <option className="option" key={eachType.optionId}>
                    {eachType.displayText}
                  </option>
                ))}
              </select>
            </div>

            <button className="add-btn" type="submit">
              Add
            </button>
          </form>

          <div className="form">
            <h1 className="heading2">History</h1>
            <ul className="history-container">
              <li className="each-list-item">
                <h1 className="history-titles">Title</h1>
                <h1 className="history-titles">Amount</h1>
                <h1 className="history-titles">Type</h1>
              </li>
              {this.renderTransactionsList()}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
