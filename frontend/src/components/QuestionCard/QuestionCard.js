import React, { useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import radioStyles from "assets/jss/material-kit-react/customCheckboxRadioSwitch.js";

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

const useStyles = makeStyles(styles);

export default function QuestionCard(props) {
  const classes = useStyles();
  const { description, picture_link, answers, index } = props;
  const [selectedEnabled, setSelectedEnabled] = useState();

  const wrapperDiv = classNames(
    classes.checkboxAndRadio,
    classes.checkboxAndRadioHorizontal,
    classes.textAlignLeft
  );

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
        <Grid container spacing={3}>
          {answers.map((answer, index) => {
            return <Grid item xs={12} className={wrapperDiv} key={index}>
              <FormControlLabel
                control={
                  <Radio
                    checked={selectedEnabled === index}
                    onChange={() => setSelectedEnabled(index)}
                    value={index}
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
};
