import React, { useState } from "react";
import { Link } from "@reach/router";
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

export default function SignIn(props) {
    const classes = useStyles();
    const { ...rest } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const signInWithEmailAndPasswordHandler =
        (event, email, password) => {
            event.preventDefault();
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
            <Button color="primary" size="lg" simple>
                Sign in with Google
                          </Button>
            <p className={classes.divider}>Or</p>
            <CustomInput
                labelText="Email"
                id="email"
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
                <Link to="passwordReset">
                    Don't remember your password?
          </Link>
            </div>
        </>
    )
}