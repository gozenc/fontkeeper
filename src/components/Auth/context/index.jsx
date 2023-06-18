import React, { useContext, useState } from 'react';
import useAuthState from "../hooks/useAuthState";

const AuthContext = React.createContext();

/**
 * @typedef AuthProps
 * @property {any} client
 * @property {React.ReactChildren} children
 * 
 * @param {AuthProps} props
 * @returns {React.ChildContextProvider}
 */
export function AuthProvider(props) {
    const [user, setUser] = useState();

    const authState = useAuthState({
        client: props.client,
        onSignedOut: () => {
            setUser(null);
            props.onSignedOut ? props.onSignedOut() : undefined;
        },
        onSignedIn: (session) => {
            setUser(session?.user ?? null);
            props.onSignedIn ? props.onSignedIn() : undefined;
        },
        onIntialSession: (session) => {
            setUser(session?.user ?? null);
            props.onIntialSession ? props.onIntialSession() : undefined;
        }
    });

    // Will be passed down to Signup, Login and Dashboard components
    const value = {
        signUp: (data) => props.client.auth.signUp(data),
        signIn: (data) => props.client.auth.signIn(data),
        signOut: () => props.client.auth.signOut(),
        session: props.client.auth.session(),
        user, client: props.client,
        authState, withPhone: props.withPhone, providers: props.providers
    };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
