import { useAuth } from "../../context"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import Input from '../Input'
import styles from "./forgot-password.module.scss"
import Button from "../Button"
import Container from "../Container"
import {MdOutlineMarkEmailRead} from "react-icons/md"

export default function ForgotPassword(){

    const inputRef = useRef()
    const { user, signIn, client } = useAuth()
    const [err, setErr] = React.useState(null)
    const [mailSent, setMailSent] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate()

    async function handleForgotPassword(e) {
        e.preventDefault()
        setLoading(true)
        // Get email and password input values
        const email = inputRef.current.value
        const { data, error } = await client.auth.api
            .resetPasswordForEmail(email, {
                redirectTo: window.location.origin + "/reset-password"
            })

        if ( !error ) {
            setLoading(false)
            setMailSent(true)
        }

        console.error(error)
        console.log(data)

    //         const { error, data } = await client.auth.api
    //   .updateUser(access_token, { password : new_password })

        // // Calls `signIn` function from the context
        // const { error } = await signIn({ email, password })

        // if (error) {
        //     console.error('ERR_SIGN_IN', error)
        //     setErr(error)
        // } else {
        //     // Redirect user to Dashboard
        //     navigate('/dashboard', {replace: true})
        // }
    }

    return (
        <Container loading={loading}>
            <form onSubmit={handleForgotPassword}>
            { !mailSent && <Input disabled={mailSent} required type="email" ref={inputRef} placeholder={`Enter your email`} />}
            <br />
            { mailSent ? <MailSent/> : <Button type="submit">Next</Button> }
            </form>
        </Container>
    )
}

export function MailSent(props){
   
   return (
       <div className={styles.message}>
           <MdOutlineMarkEmailRead/>
           <span>Please check your e-mail to continue.</span>
       </div>
   )
}