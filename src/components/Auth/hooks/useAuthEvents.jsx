import { useAuth } from "../context"

export default function suseAuthEvents(callback){
    const { authState } = useAuth()

    React.useEffect(() => {
        if ( callback && typeof callback === "function") {
            callback(authState)
        } else {
            switch (authState) {
                case "SIGNED_IN": return callback.onSignedIn && callback.onSignedIn()
                case "SIGNED_OUT": return callback.onSignedOut && callback.onSignedOut()
                case "TOKEN_REFRESHED": return callback.onTokenRefreshed && callback.onTokenRefreshed()
                default: return null
            }
        }
    }, [authState])

    return authState
}