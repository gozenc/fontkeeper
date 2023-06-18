import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context'
import styles from "./auth.module.scss"
import Button from './Button'
import Container from './Container'
import Seperator from './Seperator'
import Socials from './Socials'

export default function Auth() {
    // Get signUp function from the auth contex
    const { user, withPhone } = useAuth()
    const navigate = useNavigate()

    React.useEffect(() => {
        if (user && "aud" in user && user.aud === "authenticated") {
            navigate("/dashboard")
        }
    }, [])
 
    return (
        <Container>
            <Socials signUp/>
            <Seperator/>
            <div className={styles.row}>
                <Button route="/signup" >Sign up with {withPhone ? "phone or email" : "email"}</Button>
                <div className={styles.terms}>By signing up, you agree to the
                    <Link to="/terms-of-service"> Terms of Service </Link>
                     and <Link to="/privacy"> Privacy Policy</Link>, including 
                    <Link to="/cookies"> Cookie Use</Link>.
                </div>
            </div>

            <div className={styles.row}>
                <h3 className={styles.title}>Already have an account?</h3>
                <Button role="secondary" route="/signin" >Sign In</Button>
            </div>

        </Container>
    )
}