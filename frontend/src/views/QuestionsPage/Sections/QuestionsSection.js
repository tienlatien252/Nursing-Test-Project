import React, { useState, useEffect } from "react";
import { auth } from "firebase.js";
import axios from 'axios';
// @material-ui/core components
import Grid from '@material-ui/core/Grid';
// core components
import QuestionCard from "components/QuestionCard/QuestionCard";

const client = axios.create({
  baseURL: 'http://localhost:5000',
  json: true
})

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

export default function QuestionsSection(props) {
  const { testId } = props;
  const [questions, setQuestions] = useState([]);

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
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchData();
  }, [testId]);

  return (
    <Grid container spacing={3}>
      {questions.map((question, questionIndex) => {
        return <Grid item xs={12} key={questionIndex}>
          <QuestionCard picture_link={question.picture_link} description={question.description} question_id={question.question_id} answers={shuffle(question.answers)} index={questionIndex + 1}></QuestionCard>
        </Grid>
      })}
    </Grid>
  );
}