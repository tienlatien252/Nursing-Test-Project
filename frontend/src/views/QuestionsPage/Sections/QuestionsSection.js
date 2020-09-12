import React, { useRef, useState, useEffect } from "react";
// @material-ui/core components
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from "@material-ui/core/styles";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
// core components
import CircularProgress from '@material-ui/core/CircularProgress';
import QuestionCard from "components/QuestionCard/QuestionCard";

import useDataApi from "../../../utils/BackendHook";

const useStyles = makeStyles((theme) => ({
  loading: {
      width: '100%',
      '& > * + *': {
          marginTop: theme.spacing(2),
      },
  }
}));

export default function QuestionsSection(props) {
  const classes = useStyles();
  const theme = useTheme();

  const { testId } = props;

  const [activeStep, setActiveStep] = useState(0);
  const [{ data, isLoading, isError }, setRequest] = useDataApi();
  const userAnswersRef = useRef();

  useEffect(() => {
    setRequest({
      method: 'get',
      path: `/auth/testing/${testId}/questions`
    }
    );
  }, []);

  useEffect(() => {
    if (data.questions) {
      userAnswersRef.current = data.questions.map((question) => {
        return {
          'question_id': question.question_id,
          'answer': '',
        }
      });
    }
  }, [data]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    isLoading || !data.questions ? <div className={classes.loading}>
      <CircularProgress />
    </div> :
      <div>
        {data.questions.map((question, questionIndex) => {
          return (
            questionIndex === activeStep ?
              <Grid item xs={12} key={questionIndex} >
                <QuestionCard
                  userAnswersRef={userAnswersRef}
                  picture_link={question.picture_link}
                  description={question.description}
                  question_id={question.question_id}
                  answers={question.answers}
                  index={questionIndex + 1}>
                </QuestionCard>
              </Grid> : ""
          )
        })}
        <MobileStepper
          steps={data.questions.length}
          position="static"
          variant="text"
          activeStep={activeStep}
          nextButton={
            <Button size="small" onClick={handleNext} disabled={activeStep === data.questions.length - 1}>
              Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
          }
        />
      </div >
  );
}