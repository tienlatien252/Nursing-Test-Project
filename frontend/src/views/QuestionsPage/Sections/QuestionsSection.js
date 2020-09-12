import React, { useRef, useState, useEffect } from "react";
import { auth } from "firebase.js";
import axios from 'axios';
// @material-ui/core components
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
// core components
import QuestionCard from "components/QuestionCard/QuestionCard";

const client = axios.create({
  baseURL: 'http://localhost:5000',
  json: true
});

export default function QuestionsSection(props) {
  const theme = useTheme();
  const { testId } = props;
  const [questions, setQuestions] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const userAnswersRef = useRef();
  const maxSteps = questions.length;

  useEffect(() => {
    async function fetchData() {
      if (auth.currentUser) {
        const idToken = await auth.currentUser.getIdToken(true);
        try {
          const response = await client({
            method: 'get',
            url: `/auth/testing/${testId}/questions`,
            headers: {
              'AuthToken': idToken
            }
          });
          const questions = response.data["questions"];
          setQuestions(questions);
          userAnswersRef.current = questions.map((question) => {
            return {
              'question_id': question.question_id,
              'answer': '',
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchData();
  }, [testId]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      {questions.map((question, questionIndex) => {
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
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
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