import { useAuth } from "../../context"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import Input from '../Input'
import styles from "./enter-password.module.scss"
import Button from "../Button"
import Container from "../Container"

export default function EnterPassword(props){

    const identifierRef = useRef()
    const passwordRef = useRef()
    const { user, signIn } = useAuth()
    const [err, setErr] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate()

    const identifierType = props.identifier.includes("@")
        ? "email" : "tel"

    const identifierLabel = identifierType === "email" ? "E-Mail" : "Phone"

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)

        // Get email and password input values
        const email = identifierRef.current.defaultValue
        const password = passwordRef.current.value

        // Calls `signIn` function from the context
        const { error } = await signIn({ email, password })
        
        setLoading(false)

        if (error) {
            console.error('ERR_SIGN_IN', error)
            setErr(error)
        } else {
            // Redirect user to Dashboard
            navigate('/dashboard', {replace: true})
        }
    }

    React.useLayoutEffect(() => {
        passwordRef.current?.focus()
    }, [])

    return (
        <Container loading={loading}>
        <form onSubmit={handleSubmit}>
            <Input
                type={identifierType} 
                ref={identifierRef} 
                disabled 
                defaultValue={props.identifier} 
                placeholder={identifierLabel} />
            <br />
            <Input required ref={passwordRef} type="password" placeholder={`Password`} />
            <div className={styles.message}>{ err && err.message } </div>
            {/* <svg viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-18yzcnr r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-yc9v9c" style="color: rgb(239, 243, 244);"><g><path d="M7.625 12.004c0 .15.03.292.044.438l4.777-4.778c-.147-.018-.294-.036-.447-.036-2.416 0-4.375 1.96-4.375 4.376zm8.752 0c0-.156-.018-.306-.037-.456l-4.786 4.787c.15.015.293.045.446.045 2.418 0 4.377-1.96 4.377-4.376z"></path><path d="M20.806 11.893c.036.064.036.138-.034.274-.025.06-2.592 6.033-8.772 6.033-.745 0-1.433-.088-2.073-.237l-1.284 1.284c.998.333 2.108.543 3.357.543 7.228 0 10.12-6.724 10.205-6.94.29-.536.29-1.175.035-1.64-.057-.136-.747-1.72-2.216-3.346L18.897 8.99c1.246 1.397 1.844 2.755 1.91 2.903zm-17.616.203c-.035-.065-.035-.138.033-.273.104-.246 2.618-6.033 8.772-6.033.748 0 1.44.088 2.082.24l1.283-1.284c-1-.335-2.113-.546-3.365-.546-7.228 0-10.12 6.723-10.205 6.938-.29.537-.29 1.176-.035 1.642.057.136.748 1.722 2.22 3.35l1.128-1.126c-1.25-1.398-1.848-2.76-1.913-2.908zm-.778 10.242c-.192 0-.384-.073-.53-.22-.293-.293-.293-.768 0-1.06L21.058 1.882c.293-.294.768-.294 1.06 0s.294.767 0 1.06L2.942 22.12c-.146.145-.338.22-.53.218z"></path></g></svg> */}
            <br />
            <Button type="submit">Log in</Button>
            <Button route="/forgot-password" role="secondary">Forgot password?</Button>
        </form>
        </Container>
    )
}