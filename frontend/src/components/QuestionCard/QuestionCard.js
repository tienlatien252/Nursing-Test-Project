import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import radioStyles from "assets/jss/material-kit-react/customCheckboxRadioSwitch";

// core components
const styles = {
  textCenter: {
    textAlign: "center"
  },
  textAlignLeft: {
    textAlign: "left"
  },
  image: {
    maxWidth: "100%",
    height: "auto"
  },
  ...radioStyles
};

const useStyles = makeStyles((theme) => ({
  answer: {
    padding: theme.spacing(1),
  },...styles
}));

export default function QuestionCard(props) {
  const classes = useStyles();
  const { userAnswersRef, question_id, description, picture_link, answers, index } = props;
  const [selectedEnabled, setSelectedEnabled] = useState();

  useEffect(() => {
    if(userAnswersRef.current){
      const currentUserAnswer = userAnswersRef.current.filter((userAnswer) => {
        return userAnswer.question_id === question_id;
      });
      if(currentUserAnswer.length > 0){
        const answerIndex = answers.indexOf(currentUserAnswer[0].answer);
        if(answerIndex>-1){
          setSelectedEnabled(answerIndex);
        }
      }
    }
  }, []);

  const wrapperDiv = classNames(
    classes.checkboxAndRadio,
    classes.checkboxAndRadioHorizontal,
    classes.textAlignLeft
  );

  const onChangeHandler = (event) => {
    const userAnswers = userAnswersRef.current;
    const newUserAnswers = userAnswers.map((answer) => {
      if (question_id === answer.question_id) {
        answer.answer = event.currentTarget.value;
      }
      return answer;
    });
    userAnswersRef.current = newUserAnswers;
  };

  return (
    <Card>
      <CardHeader className={classes.textCenter} color="info">{`Question ${index}`}</CardHeader>
      <CardBody>
        <Grid container spacing={2}>
          <Grid item xs={12}><p>
            {description}
          </p> </Grid>
          <Grid item xs={12}>
            {picture_link !== "URL" && picture_link !== "" && <img
              className={classes.image}
              src={picture_link}
              alt="Card-img-cap"
            />}</Grid>
        </Grid>
        <Grid container alignItems="stretch" spacing={3}>
          <RadioGroup onChange={(event) => onChangeHandler(event)}>
            {answers.map((answer, index) => {
              return <Grid item xs={12} className={wrapperDiv, classes.answer} key={index}>
                <FormControlLabel
                  value={answer}
                  control={
                    <Radio
                      checked={selectedEnabled === index}
                      onChange={() => setSelectedEnabled(index)}
                      icon={
                        <FiberManualRecord
                          className={classes.radioUnchecked}
                        />
                      }
                      checkedIcon={
                        <FiberManualRecord className={classes.radioChecked} />
                      }
                      classes={{
                        checked: classes.radio
                      }}
                    />
                  }
                  classes={{
                    label: classes.label
                  }}
                  label={`${String.fromCharCode(index + 65)}. ${answer}`}
                /></Grid>;
            })}
          </RadioGroup>
        </Grid>
      </CardBody>
    </Card>
  );
}

QuestionCard.propTypes = {
  index: PropTypes.number,
  question_id: PropTypes.string,
  description: PropTypes.string,
  picture_link: PropTypes.string,
  answers: PropTypes.array,
  activeStep: PropTypes.number,
  userAnswersRef: PropTypes.object,
};
