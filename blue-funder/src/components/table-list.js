import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'capital', label: 'Capital Type', minWidth: 100 },
  { id: 'size', label: 'Invesment Size', minWidth: 100 },
  {
    id: 'term',
    label: 'Investment Term',
    minWidth: 170,
  },
  {
    id: 'geofocus',
    label: 'Geographic Focus',
    minWidth: 170,
  },
  {
    id: 'industry',
    label: 'Industry Focus',
    minWidth: 170,
  },
];

function createData(name, capital, size, term, geofocus, industry) {
  return { name, capital, size, term, geofocus, industry };
}

const rows = [
  createData('PSE Grants', 'Grant', '100k', '1yr', 'Washington', 'Energy'),
  createData('Wells Fargo', 'Debt', '20k', '4yr', 'West Coast', 'Workforce'),
  createData('Ferry ASC NW', 'Equity (Private)', '500k', '2yr', 'Pacific Northwest', 'Boating'),
  createData('World Bank', 'Venture Capital', '100M', '5yr', 'Nationwide', 'Transportation'),
  createData('University of WA', 'Equity (Public)', '10k', '0yr', 'Washington', 'Education'),
  createData('Query Investors', 'Angel', '300k', '3yr', 'Washington', 'Maritime Tech'),
  createData('PSE Grants', 'Grant', '100k', '1yr', 'Washington', 'Energy'),
  createData('Wells Fargo', 'Debt', '20k', '4yr', 'West Coast', 'Workforce'),
  createData('Ferry ASC NW', 'Equity (Private)', '500k', '2yr', 'Pacific Northwest', 'Boating'),
  createData('World Bank', 'Venture Capital', '100M', '5yr', 'Nationwide', 'Transportation'),
  createData('University of WA', 'Equity (Public)', '10k', '0yr', 'Washington', 'Education'),
  createData('Query Investors', 'Angel', '300k', '3yr', 'Washington', 'Maritime Tech'),
  createData('PSE Grants', 'Grant', '100k', '1yr', 'Washington', 'Energy'),
  createData('Wells Fargo', 'Debt', '20k', '4yr', 'West Coast', 'Workforce'),
  createData('Ferry ASC NW', 'Equity (Private)', '500k', '2yr', 'Pacific Northwest', 'Boating'),
  createData('World Bank', 'Venture Capital', '100M', '5yr', 'Nationwide', 'Transportation'),
  createData('University of WA', 'Equity (Public)', '10k', '0yr', 'Washington', 'Education'),
  createData('Query Investors', 'Angel', '300k', '3yr', 'Washington', 'Maritime Tech'),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const TableList = () =>{
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, color: '#043464', border: '1px solid #e0e0e0', fontWeight: 'bold'}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default TableList;
