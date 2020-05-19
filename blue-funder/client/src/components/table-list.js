import React, { useEffect } from 'react';
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

function createData(name, capital, size, term, geofocus, industry, id) {
  return { name, capital, size, term, geofocus, industry, id};
}

const mockData = [
  createData('PSE Grant Association', 'Grant', '100k', '1yr', 'Washington', 'Energy'),
  createData('Wells Fargo Bank', 'Debt', '20k', '4yr', 'West Coast', 'Workforce'),
  createData('Ferry ASC NW', 'Equity (Private)', '500k', '2yr', 'Pacific Northwest', 'Boating'),
  createData('World Bank', 'Venture Capital', '100M', '5yr', 'Nationwide', 'Transportation'),
  createData('University of WA', 'Equity (Public)', '10k', '0yr', 'Washington', 'Education'),
  createData('Query Investors', 'Angel', '300k', '3yr', 'Washington', 'Maritime Tech'),
  createData('Antarctic Research Grant', 'Grant', '10k', '1yr', 'Washington', 'Research'),
  createData('National Institutes of Health', 'Grant', '20k', '4yr', 'West Coast', 'Public Health'),
  createData('PNW Commerce Associates', 'Loan', '1k', '2yr', 'Pacific Northwest', 'Conservation'),
  createData('Capital Bank', 'Venture Capital', '100k', '5yr', 'Nationwide', 'Biological Tech'),
  createData('University of WA', 'Grant', '10k', '0yr', 'Washington', 'Research'),
  createData('Maritime Investor Group', 'Angel', '30k', '3yr', 'Washington', 'Renewable Tech'),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const TableList = (props) =>{
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const updateRows = (oppList) => {
    let results = []
    for (let i = 0; i < oppList.length; i++) {
      let entry = oppList[i];
      results.push(createData(entry['opportunityName'], entry['capitalType'], entry['investmentSize'], entry['investmentTerm'], entry['geographicFocus'], entry['industryFocus'], entry['id']));
    }
    return results;

  }
  const [rows, setRows] = React.useState(updateRows(props.oppList));
  useEffect(() => { setRows(updateRows(props.oppList)) }, [props.oppList]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
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
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index} onClick={() => props.viewDetail(row['id'])}>
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
