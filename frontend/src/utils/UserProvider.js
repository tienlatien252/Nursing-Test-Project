import React, { useState, useEffect, createContext } from "react";
import { auth, generateUserDocument } from "firebase.js";

export const UserContext = createContext({ user: null });

export default function UserProvider(props) {
    const [user, setUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged( async userAuth => {
            const currentUser = await generateUserDocument(userAuth);
            setUser(currentUser);
            setPending(false);
        });
    }, []);

    if (pending) {
        return <div>Loading ...</div>
    }

    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    );
}