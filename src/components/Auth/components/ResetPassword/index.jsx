import { useAuth } from "../../context"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import Input from '../Input'
import styles from "./reset-password.module.scss"
import Button from "../Button"
import Container from "../Container"
import {MdOutlinePassword} from "react-icons/md"

export default function ResetPassword(){

    const newPasswordRef = useRef()
    const { client, session } = useAuth()
    const [err, setErr] = React.useState(null)
    const [passwordChanged, setPasswordChanged] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate()

    async function handleResetPassword(e) {
        e.preventDefault()
        setLoading(true)
        const new_password = newPasswordRef.current.value
        const { error, data } = await client.auth.api
            .updateUser(session.access_token, { password : new_password })

        if ( !error ) {
            setLoading(false)
            setPasswordChanged(true)
        } else {
            console.error(error)
        }
        console.log(data)
    }

    React.useEffect(() => {
        if (!session) {
            navigate("/login", {replace: true})
        }
    }, [session])
    

    return (
        <Container loading={loading}> {
            passwordChanged ? <PasswordChanged/> : (
                <form onSubmit={handleResetPassword}>
                { !passwordChanged && <Input type="password" ref={newPasswordRef} placeholder="Enter a new password" />}
                <br/>
                { passwordChanged ? <PasswordChanged/> : <Button type="submit">Next</Button> }
                </form>
            )
        }
        </Container>
    )
}

 export function PasswordChanged(props){
   
    const navigate = useNavigate()

    return (
        <div className={styles.message}>
            <MdOutlinePassword/>
            <span>Your password changed successfully.</span>
            <br/>
            <Button role="secondary" onClick={() => navigate("/dashboard", {replace: true})}>Go to dashboard</Button>
        </div>
    )
 }