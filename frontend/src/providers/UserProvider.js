import React, { useState, useEffect, createContext } from "react";
import { auth, generateUserDocument } from "../firebase";

export const UserContext = createContext({ user: null });

export default function UserProvider(props) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function asyncFunction() {
            auth.onAuthStateChanged(async userAuth => {
                const user = await generateUserDocument(userAuth);
                setUser(user);
            });
            // console.log("user is "+user)
            // console.log("user is undefined: "+(user === undefined))
            // console.log("user is null: "+(user === null))
            // console.log("user is either undefined or null: "+(user === undefined || user === null))
        }
        asyncFunction();
    });

    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    );
}