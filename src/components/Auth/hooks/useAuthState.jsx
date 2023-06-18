/**
 * @typedef
 * @param {*} props 
 */
export default function useAuthState(props){
   
    const [authState, setAuthState] = React.useState(null)

    React.useEffect(() => {
        const session = props.client.auth.session()
        props.onIntialSession && props.onIntialSession(session)

        const { data: listener } = props.client.auth.onAuthStateChange(
            async (event, session) => {
                switch (event) {
                    case "SIGNED_IN": {
                        console.log("SIGNED_IN", event, session)
                        props.onSignedIn && props.onSignedIn(session)
                        setAuthState(event)
                        break
                    }
                    case "SIGNED_OUT": {
                        console.log("SIGNED_OUT", event, session)
                        props.onSignedOut && props.onSignedOut(session)
                        setAuthState(event)
                        break
                    }
                    case "TOKEN_REFRESHED": {
                        console.log("TOKEN_REFRESHED", event, session)
                        setAuthState(event)
                        break
                    }
                    default: {
                        console.log("AUTH_STATE_CHANGE", event, session)
                        setAuthState(event)
                        return null
                    }
                }
            }
        )

        return () => {
            listener?.unsubscribe()
        }
    }, [])

    return authState
}