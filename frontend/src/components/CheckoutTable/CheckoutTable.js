import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const TAX_RATE = 0.07;

function ccyFormat(num) {
    return `$${num.toFixed(2)}`;
}

function calculateTotal(purchasingTests) {
    return purchasingTests.reduce((total, test) => total + Number(test.test_price), 0);
}

const useStyles = makeStyles((theme) => ({
    total: {
        ...theme.typography.h6,
        color: 'red',
    },
    testName: {
        ...theme.typography.h6,
    },
    table: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
}));

export default function CheckoutTable(props) {
    const classes = useStyles();
    const { purchasingTests } = props;

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2} >Test Name</TableCell>
                        <TableCell align="right">Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {purchasingTests.map((test) =>
                        <TableRow key={test.test_id}>
                            <TableCell colSpan={2} className={classes.testName}>{test.test_name}</TableCell>
                            <TableCell align="right">{ccyFormat(Number(test.test_price))}</TableCell>
                        </TableRow>)}
                    <TableRow>
                        <TableCell rowSpan={3}></TableCell>
                        <TableCell>Subtotal</TableCell>
                        <TableCell align="right">{ccyFormat(calculateTotal(purchasingTests))}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>{`Tax (${(TAX_RATE * 100).toFixed(0)} %)`}</TableCell>
                        <TableCell align="right">{ccyFormat(TAX_RATE * calculateTotal(purchasingTests))}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell align="right" className={classes.total}>{ccyFormat((TAX_RATE + 1) * calculateTotal(purchasingTests))}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>);
}