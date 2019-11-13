import React, { useContext } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { CallContext, data_fund } from '../App'

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow)

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
}))

export default function CallList () {
  const classes = useStyles()
  const tableRows = []
  const callsContext = useContext(CallContext)
  for (let i = 0; i < callsContext.Call.length; i++) {
    const theDate = new Date(callsContext.Call[i].date)
    const dateStirng = theDate.getDate() + '-' + theDate.getMonth() + '-' + theDate.getFullYear()

    tableRows.push({ id: i, date: dateStirng, callId: callsContext.Call[i].call_id, usedFunds: callsContext.Call[i].usedFunds })
  }

  return (
    <div style={{ padding: '10px' }}>
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align='right'>Call</StyledTableCell>
              {
                data_fund.map(data => (
                  <StyledTableCell key={data.fund_id} align='right'>{data.fund_name}</StyledTableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows.map(row => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component='th' scope='row'>
                  {row.date}
                </StyledTableCell>
                <StyledTableCell align='right'>{row.callId}</StyledTableCell>
                {
                  row.usedFunds.map(data => (
                    <StyledTableCell key={data.fund_id} align='right'>{data.amount}</StyledTableCell>
                  ))
                }
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  )
}
