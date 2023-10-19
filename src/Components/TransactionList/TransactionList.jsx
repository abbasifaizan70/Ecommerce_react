import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  makeStyles,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
  },
}));

const TransactionList = () => {
  const classes = useStyles();
  const transaction_rows = useSelector((state) => state.user.transactions);
  const products = useSelector((state) => state.app.items);

  const getProductName = (productId) => {
    const product = products.find((item) => item.id === productId);
    return product ? product.name : "Unknown Product";
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (transaction_rows && transaction_rows.length > 0) {
    return (
      <Grid className={classes.container} container item xs={12} lg={10}>
        <Paper style={{ width: "100%" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Product</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transaction_rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.quantity}</TableCell>
                    <TableCell>{transaction.total_price}</TableCell>
                    <TableCell>{transaction.transaction_date}</TableCell>
                    <TableCell>{getProductName(transaction.product)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={transaction_rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    );
  } else {
    return <Typography variant="h6">No Transaction History</Typography>;
  }
};

export default TransactionList;
