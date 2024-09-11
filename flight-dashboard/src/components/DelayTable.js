// src/components/DelayTable.js
import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
} from "@mui/material";

function DelayTable({ delays }) {
  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderDirection, setOrderDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  // Change page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Change rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to zero when changing rows per page
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - delays.length) : 0;

  return (
    <div className="centeredTableContainer">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {[
                { id: "AIRLINE", label: "Airline" },
                { id: "FLIGHT_NUMBER", label: "Flight Number" },
                { id: "ORIGIN_AIRPORT", label: "Departure Airport" },
                { id: "DESTINATION_AIRPORT", label: "Arrival Airport" },
                { id: "DEPARTURE_TIME", label: "Departure Time" },
                { id: "ARRIVAL_DELAY", label: "Arrival Delay (min)" },
              ].map((headCell) => (
                <TableCell key={headCell.id}>
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? orderDirection : "asc"}
                    onClick={() => handleSortRequest(headCell.id)}
                  >
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(delays, getComparator(orderDirection, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.AIRLINE}
                  </TableCell>
                  <TableCell>{row.FLIGHT_NUMBER}</TableCell>
                  <TableCell>{row.ORIGIN_AIRPORT}</TableCell>
                  <TableCell>{row.DESTINATION_AIRPORT}</TableCell>
                  <TableCell>{row.DEPARTURE_TIME}</TableCell>
                  <TableCell align="right">{row.ARRIVAL_DELAY}</TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={delays.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default DelayTable;
