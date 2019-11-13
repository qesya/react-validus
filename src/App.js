import React, { useReducer } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import WelcomePage from './Components/Welcome.js'
import CallListPage from './Components/CallList'
import NewCallPage from './Components/NewCall'
import { CallReducer } from './Reducer/CallReducer'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

export const commitFund = [
  {
    id: 1,
    fund_id: 1,
    date: '31-12-2017',
    amount: 10000000
  },
  {
    id: 2,
    fund_id: 2,
    date: '31-12-2017',
    amount: 15000000
  },
  {
    id: 3,
    fund_id: 3,
    date: '31-12-2017',
    amount: 10000000
  },
  {
    id: 4,
    fund_id: 4,
    date: '31-12-2017',
    amount: 15000000
  },
  {
    id: 5,
    fund_id: 5,
    date: '31-12-2017',
    amount: 10000000
  }
]
export const data_fund = [
  {
    fund_id: 1,
    fund_name: 'Fund 1'
  },
  {
    fund_id: 2,
    fund_name: 'Fund 2'
  },
  {
    fund_id: 3,
    fund_name: 'Fund 3'
  },
  {
    fund_id: 4,
    fund_name: 'Fund 4'
  },
  {
    fund_id: 5,
    fund_name: 'Fund 5'
  }
]

export const CallContext = React.createContext()
export const Data_fund_investment = React.createContext()
const initialState = []
const Datafundinvestment = Data_fund_investment

function App () {
  const [Call, setCall] = useReducer(CallReducer, initialState)
  const [data_fund_investment, setCalls] = useReducer(CallReducer, initialState)
  const classes = useStyles()

  return (
    <CallContext.Provider value={{ Call: Call, setCall: setCall }}>
      <Datafundinvestment.Provider value={{ investedFunds: data_fund_investment, SetinvestedFunds: setCalls }}>
        <div>
          <Router>
            <AppBar color='primary' position='static'>
              <Toolbar>
                <Typography variant='h6' className={classes.title}>
                      Validus
                </Typography>
                <div className='nav'>
                  <Link to='/'><Button color='inherit'>Dashboard</Button></Link>
                  <Link to='/new-call'><Button color='inherit'>New Call</Button></Link>
                  <Link to='/call-list'><Button color='inherit'>Call List</Button></Link>
                </div>
              </Toolbar>
            </AppBar>
            <Switch>
              <Route exact path='/' component={WelcomePage} />
              <Route exact path='/call-list' component={CallListPage} />
              <Route exact path='/new-call' component={NewCallPage} />
            </Switch>
          </Router>
        </div>
      </Datafundinvestment.Provider>
    </CallContext.Provider>
  )
}

export default App
