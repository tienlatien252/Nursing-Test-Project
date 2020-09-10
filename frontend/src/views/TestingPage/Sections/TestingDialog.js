import React, { useState, useEffect } from "react";
import { auth } from "firebase.js";
import axios from 'axios';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import useDataApi from "../../../utils/BackendHook";

// core components
import Button from "components/CustomButtons/Button";
import QuestionCard from "components/QuestionCard/QuestionCard";
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  }, ...styles
}));

function shuffle(array) {
  if (array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  }

  return array;
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TestingDialog(props) {
  const classes = useStyles();
  const { open, handleClose, testId } = props;
  const [{ data, isLoading, isError }, setRequest] = useDataApi();

  useEffect(() => {
    setRequest({
        method: 'get',
        path: `/auth/testing/${testId}/questions`
      }
    );
  }, []);

  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3}>
        {data.questions && data.questions.map((question, questionIndex) => {
          return <Grid item xs={12} key={questionIndex}>
            <QuestionCard picture_link={question.picture_link} description={question.description} question_id={question.question_id} answers={shuffle(question.answers)} index={questionIndex + 1}></QuestionCard>
          </Grid>
        })}
      </Grid>
    </Dialog>);
}

TestingDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  testId: PropTypes.string
};