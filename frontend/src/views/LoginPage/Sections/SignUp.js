import React, { useState } from "react";
import { auth, generateUserDocument, signInWithGoogle } from "../../../firebase";
import history from "../../../utils/history";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

const useStyles = makeStyles(styles);

export default function SignUp() {
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState(null);

    const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
        event.preventDefault();
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            generateUserDocument(user, { displayName });
        }
        catch (error) {
            setError('Error signing up with email and password.');
        }

        setEmail("");
        setPassword("");
        setDisplayName("");
    };

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "userEmail") {
            setEmail(value);
        } else if (name === "userPassword") {
            setPassword(value);
        } else if (name === "displayName") {
            setDisplayName(value);
        }
    };

    auth.onAuthStateChanged(function (user) {
        if (user) {
            history.push('/about');
        }
    });

    return (
        <>
            {error !== null && <div>{error}</div>}
            <Button color="primary" size="lg" simple onClick={signInWithGoogle}>
                Sign up with Google
                          </Button>
            <p className={classes.divider}>Or</p>
            <CustomInput
                labelText="Display Name"
                id="displayName"
                name="displayName"
                value={displayName}
                onChange={(event) => onChangeHandler(event)}
                formControlProps={{
                    fullWidth: true
                }}
                inputProps={{
                    type: "text",
                    endAdornment: (
                        <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                        </InputAdornment>
                    )
                }}
            />
            <CustomInput
                labelText="Email"
                id="email"
                name="userEmail"
                value={email}
                onChange={(event) => onChangeHandler(event)}
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
            <CustomInput
                labelText="Password"
                id="pass"
                name="userPassword"
                value={password}
                onChange={(event) => onChangeHandler(event)}
                formControlProps={{
                    fullWidth: true
                }}
                inputProps={{
                    type: "password",
                    endAdornment: (
                        <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                                lock_outline
                            </Icon>
                        </InputAdornment>
                    ),
                    autoComplete: "off"
                }}
            />
            <p>By signing up, you agree to our terms of service and privacy policy.</p>
            <Button simple color="primary" size="lg" onClick={event => {
                createUserWithEmailAndPasswordHandler(event, email, password);
            }}>
                Sign Up
                    </Button>
        </>
    )
}