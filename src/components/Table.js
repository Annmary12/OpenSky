import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableHead, TablePagination, TableRow} from '@material-ui/core';

const columns = [
  { id: 'name', label: 'ICAO number', minWidth: 200 },
  { id: 'code', label: 'Departure Airport', minWidth: 100 },
  {
    id: 'population',
    label: 'Arrival Airport',
    minWidth: 120,
  },
  {
    id: 'size',
    label: 'Call Sign',
    minWidth: 120,
  },
  {
    id: 'density',
    label: 'Number Of Airport Arrivals',
    minWidth: 120,
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  tableWrapper: {
    maxHeight: 407,
    overflow: 'auto',
  },
});

const TableComponent = ({ flights }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {flights.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(flight => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={flight.icao24}>
                  <TableCell key="" align="">
                    {flight.icao24}
                  </TableCell>
                  <TableCell key="" align="">
                    {flight.estDepartureAirport}
                  </TableCell>
                  <TableCell key="" align="">
                    {flight.estArrivalAirport}
                  </TableCell>
                  <TableCell key="" align="">
                    {flight.callsign}
                  </TableCell>
                  <TableCell key="" align="">
                    {flight.arrivalAirportCandidatesCount}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default TableComponent;
