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
        }
        asyncFunction();
    });

    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    );
}