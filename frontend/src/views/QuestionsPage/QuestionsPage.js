import React from "react";
// @material-ui/core components
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
// core components
import QuestionsSection from "./Sections/QuestionsSection";

import styles from "assets/jss/material-kit-react/views/aboutPage";

const useStyles = makeStyles(styles);

export default function TestPage({ match }) {
    const classes = useStyles();
    const testId = match.params.testId;

    return (
        <div>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography className={classes.typographyStyles}>
                        Test {testId}
        </Typography>
                </Toolbar>
            </AppBar>
            <div>
                <QuestionsSection testId={testId}></QuestionsSection>
            </div>
        </div>
    );
}
