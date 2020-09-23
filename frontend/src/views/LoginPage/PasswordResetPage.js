import React, { useState } from "react";
import { auth } from "firebase.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import Header from "components/Header/Header";
import HeaderLinks from "components/Header/HeaderLinks";
import Footer from "components/Footer/Footer";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button";

import styles from "assets/jss/material-kit-react/views/loginPage";

import image from "assets/img/blue_gradient.jpg";

const useStyles = makeStyles(styles);

export default function PasswordResetPage(props) {
    const classes = useStyles();
    const { ...rest } = props;

    const [email, setEmail] = useState("");
    const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
    const [error, setError] = useState(null);

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "userEmail") {
            setEmail(value);
        }
    };

    const sendResetEmail = event => {
        event.preventDefault();
        auth
            .sendPasswordResetEmail(email)
            .then(() => {
                setEmailHasBeenSent(true);
                setTimeout(() => { setEmailHasBeenSent(false) }, 3000);
            })
            .catch(() => {
                setError("Error resetting password");
            });
    };

    return (
        <div>
            <Header
                absolute
                color="transparent"
                brand="It's Code Blue"
                rightLinks={<HeaderLinks />}
                {...rest}
            />
            <div
                className={classes.pageHeader}
                style={{
                    backgroundImage: "url(" + image + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "top center"
                }}
            >
                <div className={classes.container}>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={4}>
                            <Card>
                                <form className={classes.form}>
                                    <CardHeader color="primary" className={classes.cardHeader}>
                                        <h4>Reset Your Password</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <div style={{ textAlign: "center" }}>
                                            {emailHasBeenSent && (
                                                <div>
                                                    An email has been sent to you!
                                                </div>
                                            )}
                                            {error !== null && (
                                                <div>
                                                    {error}
                                                </div>
                                            )}
                                            <CustomInput
                                                labelText="Email"
                                                id="email"
                                                name="userEmail"
                                                value={email}
                                                onChange={onChangeHandler}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    type: "email",
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <Email className={classes.inputIconsColor} />
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                            <Button simple color="primary" size="lg" onClick={event => {
                                                sendResetEmail(event);
                                            }}>
                                                Send me a reset link
                    </Button>
                                        </div>
                                    </CardBody>
                                </form>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
                <Footer whiteFont />
            </div>
        </div>
    );
}
