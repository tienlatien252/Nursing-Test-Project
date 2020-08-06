import React, { useState } from "react";
import { auth, signInWithGoogle } from "../../../firebase";
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

export default function SignIn() {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const signInWithEmailAndPasswordHandler = (event, email, password) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).catch(error => {
            setError("Error signing in with password and email.");
            console.error("Error signing in with password and email", error);
        });
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.currentTarget;

        if (name === 'userEmail') {
            setEmail(value);
        }
        else if (name === 'userPassword') {
            setPassword(value);
        }
    };

    return (
        <>
            {error !== null && <div>{error}</div>}
            <Button color="primary" size="lg" simple onClick = {signInWithGoogle}>
                Sign in with Google
                          </Button>
            <p className={classes.divider}>Or</p>
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
            <Button simple color="primary" size="lg" onClick={(event) => { signInWithEmailAndPasswordHandler(event, email, password) }}>
                Log In
                    </Button>
            <div>
                <Button color="primary" simple href="/password-reset-page">
                    Don't remember your password?
                          </Button>
            </div>
        </>
    )
}