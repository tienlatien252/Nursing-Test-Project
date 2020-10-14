import React, { useEffect, useState } from "react";
// @material-ui/core components
import { AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// core components
import Button from "components/CustomButtons/Button";
import QuestionsSection from "./Sections/QuestionsSection";

import styles from "assets/jss/material-kit-react/views/aboutPage";

const useStyles = makeStyles(styles);

export default function TestPage({ match }) {
    const LIMIT_TIME = 305  //s
    const classes = useStyles();
    const testId = match.params.testId;
    const [timeLeft, setTimeLeft] = useState(LIMIT_TIME);
    const [isTesting, setIsTesting] = useState(true)
    let timeTextColor=0
    useEffect(() => {
        let timer;
        if(timeLeft !=0  && isTesting) {
            timer = setTimeout(() => {
                setTimeLeft( timeLeft-1)
            }, 1000);
        } else {
            // show modal
            alert('hello')
        }
        if( timeLeft == 300) {
            alert('warning')
            timeTextColor=1
        }
        return ()=>{
            clearTimeout(timer)
        }
    }, [timeLeft, isTesting]);

    const submit = ()=> {
        setIsTesting(false)
    }
    const renderTimeLeft = ()=>{
        let minute = Math.floor(timeLeft / 60);
        let second = timeLeft % 60; // 01:5
        if (minute < 10) {
            minute = '0'+ minute; 
        }
        if (second < 10) {
            second = '0' + second;
        }
        return (<h4 class={}> {minute}:{second}  </h4>)
    }
    return (
        <>
            <AppBar className={classes.appBar} style={{ position: "sticky" }}>
                <Toolbar style={{ display: "flex" }}>
                    {renderTimeLeft()}
                    <Button simple size="lg" style={{ marginLeft: "auto" }} onClick = {submit}>
                        Submit
                    </Button>
                </Toolbar>
            </AppBar>
            <QuestionsSection testId={testId}></QuestionsSection>
        </>
    );

}
