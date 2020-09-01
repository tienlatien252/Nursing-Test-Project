import React, {useEffect, useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import InfoArea from "components/InfoArea/InfoArea";
import {auth} from "../../../firebase"
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle";
import axios from 'axios';

import QuestionCard from "components/QuestionCard/QuestionCard";

const client = axios.create({
  baseURL: 'http://localhost:5000',
  json: true
})

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();

  function shuffle(array) {
    if(array){
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

  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState({});

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      if (auth.currentUser) {
        const idToken = await auth.currentUser.getIdToken(true);
        try {
          const response = await client({
            method: 'get',
            url: '/auth/testing/1/questions',
            headers: {
              'AuthToken': idToken
            }
          });
          const questions = response.data["questions"];
          setQuestion(questions[0]);  
          setLoading(false);
        } catch(error){
          console.log(error);
        }
      }
    }
    fetchData();
  }, []);      

  return (
    <div className={classes.section}>
      {!loading && question && <QuestionCard picture_link={question.picture_link} description={question.description} question_id= {question.question_id} answers={shuffle(question.answers)}></QuestionCard>}
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Let{"'"}s talk product</h2>
          <h5 className={classes.description}>
            Description.
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Feature"
              description="Description."
              icon={Chat}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Feature"
              description="Description."
              icon={VerifiedUser}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Feature"
              description="Description."
              icon={Fingerprint}
              iconColor="danger"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
