import React, { useState, useEffect } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import useDataApi from "utils/BackendHook";

// core components
import CheckoutTable from "components/CheckoutTable/CheckoutTable"
import { cardTitle } from "assets/jss/material-kit-react.js";

const styles = {
  cardTitle,
};

const useStyles = makeStyles(styles);

export default function CheckoutSection(props) {
  const classes = useStyles();
  const { testId } = props;
  const [{ data, isLoading, isError }, setRequest] = useDataApi();
  const [tests, setTests] = useState();
  const [clientSecret, setClientSecret] = useState();

  useEffect(() => {
    setRequest({
      method: 'get',
      path: '/tests'
    });
  }, []);

  useEffect(() => {
    if (tests) {
      const postBody = {"tests": [{"testId": testId}]};
      setRequest({
        method: 'post',
        path: '/auth/paymentIntent',
        postBody: postBody
      });
    }
  }, [tests]);

  useEffect(() => {
    if (data && data.tests) {
      setTests(data.tests);
    }
    if (data && data.client_secret) {
      setClientSecret(data.client_secret);
    }
  }, [data]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {!tests ? <div className={classes.loading}>
          <CircularProgress />
        </div> :
          <CheckoutTable purchasingTests={tests.filter(test => test.test_id === testId)}> </CheckoutTable>}
      </Grid>
      <Grid item xs={12}><p>
        Here is the payment session
    </p> </Grid>
    </Grid>
  );
}