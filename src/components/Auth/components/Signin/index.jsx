import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context'
import isValidEmail from '../../utils/isValidEmail';
import isValidPhone from '../../utils/isValidPhone';
import EnterPassword from '../EnterPassword'
import Container from '../Container'
import Socials from '../Socials'
import Seperator from '../Seperator'
import Input from '../Input'
import Button from '../Button'
import DontHaveAccount from '../DontHaveAccount'


export default function Signin() {
    // Get signUp function from the auth context
    const { user, withPhone } = useAuth()
    const navigate = useNavigate()

    console.log("USER_IS", user)

    React.useEffect(() => {
        if (user && "aud" in user && user.aud === "authenticated") {
            navigate("/dashboard")
        }
    }, [])
  
    const [identifier, setIdentifier] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [enterPasswordShown, setEnterPasswordShown] = React.useState(false)

    function identifyUser(e) {
        e.preventDefault()
        setLoading(true)
        const currentIdentifier = identifierRef.current.value
        const validPhone = isValidPhone(currentIdentifier)
        const validEmail = isValidEmail(currentIdentifier)
        if ( !validPhone && !validEmail ) {
            console.log("FORMSUBMIT_NOT_VALID", e.target, currentIdentifier)
            setLoading(false)
            return
        }
        console.log("FORMSUBMIT_VALID", e.target, currentIdentifier)
        // If validations done 
        setEnterPasswordShown(true)
        setIdentifier(currentIdentifier)
        setLoading(false)
    }
  
    const identifierRef = React.useRef(null)

    return (
            enterPasswordShown
            ? <EnterPassword identifier={identifier}/>
            : ( <Container loading={loading}>
                    <form onSubmit={identifyUser}>
                        <Socials/>
                        <Seperator/>
                        <Input required ref={identifierRef} placeholder={withPhone ? `Phone or email` : `E-Mail`} />
                        <br />
                        <Button type="submit">Next</Button>
                        <Button route="/forgot-password" role="secondary">Forgot password?</Button>
                        <br />
                        <DontHaveAccount/>
                    </form>
                </Container>
            )
    )
}
