import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { makeStyles, withStyles } from '@material-ui/core'

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

function TableC (props) {
  const classes = useStyles()
  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Commitment ID</StyledTableCell>
            <StyledTableCell align='right'>Fund ID</StyledTableCell>
            <StyledTableCell align='right'>Date</StyledTableCell>
            <StyledTableCell align='right'>Fund</StyledTableCell>
            <StyledTableCell align='right'>Commited Amounts</StyledTableCell>
            <StyledTableCell align='right' style={{ width: '210px' }}>Undrawn Capital Commitment before Current Drawdown Notice</StyledTableCell>
            <StyledTableCell align='right'>Total Drawdown Notice</StyledTableCell>
            <StyledTableCell align='right' style={{ width: '210px' }}>Undrawn Capital Commitment after Current Drawdown</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            props.finalCalculated.map(data => (
              <StyledTableRow key={data.id}>
                <StyledTableCell align='right'>{data.id}</StyledTableCell>
                <StyledTableCell align='right'>{data.fund_id}</StyledTableCell>
                <StyledTableCell align='right'>{data.date}</StyledTableCell>
                <StyledTableCell align='right'>{data.fund_name}</StyledTableCell>
                <StyledTableCell align='right'>{data.amount}</StyledTableCell>
                <StyledTableCell align='right'>{data.beforeAmount}</StyledTableCell>
                <StyledTableCell align='right' style={{ backgroundColor: 'pink' }}>{data.totalNotice}</StyledTableCell>
                <StyledTableCell align='right' style={{ backgroundColor: 'pink' }}>{data.afterAmount}</StyledTableCell>
              </StyledTableRow>
            ))
          }
        </TableBody>
      </Table>
    </Paper>
  )
}

export default TableC
