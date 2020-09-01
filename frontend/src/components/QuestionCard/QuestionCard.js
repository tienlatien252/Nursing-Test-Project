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

import { makeStyles } from '@material-ui/core/styles';
import radoStyles from "assets/jss/material-kit-react/customCheckboxRadioSwitch.js";

// core components
const styles = {
  textCenter: {
    textAlign: "center"
  },
  textAlignLeft: {
    textAlign: "left"
  },
  ...radoStyles
};

const useStyles = makeStyles(styles);

export default function QuestionCard(props) {
  const classes = useStyles();
  const { className, question_id, description, picture_link, answers, ...rest } = props;
  const [selectedEnabled, setSelectedEnabled] = useState();

  const wrapperDiv = classNames(
    classes.checkboxAndRadio,
    classes.checkboxAndRadioHorizontal,
    classes.textAlignLeft
  );

  return (
    <Card>
      <CardHeader className={classes.textCenter} color="info">Question 1</CardHeader>
      <CardBody>
        <p>
          {description}
        </p>
        <div>
          {answers.map((answer, index) => {
            return <div className={wrapperDiv} key={index}>
              <FormControlLabel
                control={
                  <Radio
                    checked={selectedEnabled === answer}
                    onChange={() => setSelectedEnabled(answer)}
                    value={answer}
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
              /></div>;
          })}
        </div>
      </CardBody>
    </Card>
  );
}

QuestionCard.propTypes = {
  className: PropTypes.string,
  question_id: PropTypes.string,
  description: PropTypes.string,
  picture_link: PropTypes.string,
  answers: PropTypes.array,
};
