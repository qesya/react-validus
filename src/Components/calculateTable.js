import React, { useState, useContext } from 'react'
import { CallContext, Data_fund_investment, commitFund, data_fund } from '../App'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import TableCommponent from './Table'

function CalculateTable () {
  const callsContext = useContext(CallContext)
  const usedFundsContext = useContext(Data_fund_investment)
  const data_fund_investment = usedFundsContext.investedFunds

  const willUseFunds = []
  const calculatedTable = []
  const finalCalculated = []
  let confirmBtn = true
  const [callAmount, setCallAmount] = useState(Number(0))
  const [investName, setinvestName] = useState('Investment')
  const todayDate = new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear()

  const temp = [{ id: 'aaaaaaaaaaaa' }]
  for (let i = 0; i < data_fund_investment.length; i++) {
    temp.push(data_fund_investment[i])
  }
  for (let i = 0; i < commitFund.length; i++) {
    let beforeAmount = Number(0)
    let total = Number(0)
    for (let j = 0; j < data_fund_investment.length; j++) {
      if (data_fund_investment[j].fund_id === commitFund[i].fund_id) {
        total = (Number(total) + Number(data_fund_investment[j].investment_amount))
      }
    }
    if (total !== 0) {
      beforeAmount = Number(commitFund[i].amount - total)
    } else {
      beforeAmount = Number(commitFund[i].amount)
    }
    calculatedTable.push({ ...commitFund[i], beforeAmount: beforeAmount, fund_name: data_fund[i].fund_name })
  }

  let reAmount = Number(callAmount) // props.amount
  const targetAmount = reAmount
  let collectedFund = 0

  let totalAvailableFund = 0
  for (let i = 0; i < calculatedTable.length; i++) {
    totalAvailableFund = totalAvailableFund + calculatedTable[i].beforeAmount
  }
  if (totalAvailableFund >= targetAmount) {
    for (let i = 0; i < calculatedTable.length; i++) {
      if (reAmount <= calculatedTable[i].beforeAmount && i === 0) {
        if (reAmount === calculatedTable[i].beforeAmount) {
          collectedFund = calculatedTable[i].beforeAmount
          willUseFunds.push({ fundId: calculatedTable[i].id, amount: calculatedTable[i].beforeAmount, m: 'if' })
        } else {
          collectedFund = reAmount
          willUseFunds.push({ fundId: calculatedTable[i].fund_id, amount: reAmount, m: 'else' })
        }
      } else {
        if (reAmount === calculatedTable[i].beforeAmount) {
          collectedFund = collectedFund + calculatedTable[i].beforeAmount
          willUseFunds.push({ fundId: calculatedTable[i].id, amount: calculatedTable[i].beforeAmount, m: 'else if' })
        } else if (reAmount < calculatedTable[i].beforeAmount) {
          collectedFund = collectedFund + (reAmount)
          willUseFunds.push({ fundId: calculatedTable[i].id, amount: reAmount, m: 'else else' })
        } else if (reAmount > calculatedTable[i].beforeAmount) {
          collectedFund = Number(collectedFund + (calculatedTable[i].beforeAmount))
          if (collectedFund !== 0) { willUseFunds.push({ fundId: calculatedTable[i].fund_id, amount: calculatedTable[i].beforeAmount, m: 'last else else' }) }
        }
      }
      if (Number(collectedFund) === Number(targetAmount)) {
        break
      } else {
        reAmount = (targetAmount - collectedFund)
      }
    }
  } else {
    alert('fund not available for this call')
  }
  for (let i = 0; i < calculatedTable.length; i++) {
    // finalCalculated
    let total = Number(0)
    let afterAmount = Number(0)
    for (let j = 0; j < willUseFunds.length; j++) {
      if (calculatedTable[i].fund_id === willUseFunds[j].fundId) {
        total = willUseFunds[j].amount
      }
    }
    if (totalAvailableFund >= targetAmount && callAmount > Number(0)) {
      if (total !== 0) {
        afterAmount = Number(calculatedTable[i].beforeAmount - total)
      } else {
        afterAmount = Number(calculatedTable[i].beforeAmount)
      }
      confirmBtn = false
    } else {
      afterAmount = 0
      confirmBtn = true
    }

    finalCalculated.push({ ...calculatedTable[i], totalNotice: total, afterAmount: afterAmount })
  }
  const confirmCall = () => {
    const usedFunds = []
    for (let i = 0; i < commitFund.length; i++) {
      let amount = Number(0)
      for (let j = 0; j < willUseFunds.length; j++) {
        if (commitFund[i].fund_id === willUseFunds[j].fundId) {
          amount = willUseFunds[j].amount
        }
      }
      usedFunds.push({ fund_id: commitFund[i].fund_id, amount: amount })
    }
    const data = {
      id: (callsContext.Call.length + 1),
      call_id: (callsContext.Call.length + 1),
      date: Date(),
      investment_name: 'a',
      Capital_Requirement: 100,
      usedFunds: usedFunds
    }
    for (let i = 0; i < willUseFunds.length; i++) {
      const usedData = {
        id: (usedFundsContext.investedFunds.length + 1),
        call_id: (callsContext.Call.length + 1),
        fund_id: willUseFunds[i].fundId,
        investment_amount: willUseFunds[i].amount
      }
      usedFundsContext.SetinvestedFunds({ type: 'add', value: usedData })
    }
    callsContext.setCall({ type: 'add', value: data })
    setTimeout(() => {
      alert('Call Created Successfully')
      setCallAmount(Number(0))
    }, 500)
  }
  return (
    <div>
      <div className='calculation-div'>
        <h4>Realtime Calculation</h4>
        <TextField
          id='standard-basic'
          label='Date'
          margin='normal'
          variant='filled'
          InputProps={{
            readOnly: true
          }}
          value={todayDate}
        /> <br />
        <TextField
          id='standard-basic'
          label='Rules'
          margin='normal'
          variant='filled'
          InputProps={{
            readOnly: true
          }}
          value='First In First Out (FIFO)'
        /> <br />
        <TextField
          id='standard-basic'
          label='Investment Name'
          margin='normal'
          variant='filled'
          value={investName}
          onChange={(e) => { setinvestName(e.target.value) }}
        /> <br />
        <TextField
          id='standard-basic'
          type='number'
          label='Capital for Investment'
          margin='normal'
          variant='filled'
          value={callAmount}
          onChange={(e) => { setCallAmount(e.target.value) }}
        />
        <Button variant='contained' color='primary' disabled={confirmBtn} onClick={() => { confirmCall() }}>Confirm Call</Button>
      </div>
      <div className='calculate-tab-div'>
        <TableCommponent finalCalculated={finalCalculated} />
      </div>
    </div>
  )
}

export default CalculateTable
