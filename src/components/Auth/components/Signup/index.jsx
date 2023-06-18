import { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../Button';
import Container from '../Container';
import { useAuth } from '../../context';
import Input from '../Input';
import styles from "../auth.module.scss";
import isValidEmail from '../../utils/isValidEmail';
import isValidPhone from '../../utils/isValidPhone';
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'
// : <PhoneInput enableSearch country={'de'} ref={phoneRef} />

export default function Signup() {
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const passwordRef = useRef(null);

    const { signUp, user, withPhone } = useAuth();
    const [emailChosen, setEmailChosen] = React.useState(withPhone ? !withPhone : true);
    const [loading, setLoading] = React.useState(false);

    // Get signUp function from the auth context
    const navigate = useNavigate();

    React.useEffect(() => {
        if (user && "aud" in user && user.aud === "authenticated") {
            navigate("/dashboard", { replace: true });
        }
    }, []);

    async function handleSubmit(e) {
        setLoading(true);
        e.preventDefault();
        let phone = null;
        let email = null;
        let validPhone = true;
        let validEmail = true;
        // Get email and password input values
        if (emailChosen) {
            email = emailRef.current.value;
            validEmail = isValidEmail(email);
        } else {
            phone = phoneRef.current.value;
            validPhone = isValidPhone(phone);
        }
        const password = passwordRef.current.value;

        if (!validPhone && !validEmail) {
            console.log("FORMSUBMIT_NOT_VALID", validPhone, validEmail);
            setLoading(false);
            return;
        }

        const { error } = await signUp({ email, password, phone });

        if (error) {
            console.error('ERR_SIGN_UP', error);
        } else {
            // Redirect user to Dashboard
            navigate("/dashboard", { replace: true });
        }
    }

    React.useEffect(() => {
        if (emailRef && emailRef.current) {
            emailRef.current.value = "";
            if (emailChosen) {
                emailRef.current.focus();
            }
        }
        if (withPhone) {
            if (phoneRef && phoneRef.current) {
                phoneRef.current.value = "";
                if (!emailChosen) {
                    phoneRef.current.focus();
                }
            }
        }
    }, [emailChosen]);

    return (
        <Container loading={loading}>
            <form onSubmit={handleSubmit}>
                {emailChosen
                    ? <Input placeholder="E-Mail" type="email" ref={emailRef} />
                    : <Input placeholder="Phone" type="phone" ref={phoneRef} />
                }
                {
                    withPhone ? (
                        <a
                            className={styles.link}
                            onClick={() => setEmailChosen(!emailChosen)}
                            href="javascript:void(0)">Use {emailChosen ? "phone" : "e-mail"} instead</a>
                    ) : <br />
                }
                <Input placeholder="Password" type="password" ref={passwordRef} />
                <br />
                <Button type="submit">Next</Button>
            </form>
            <p>Already have an account? <Link to="/signin">Log In</Link></p>
        </Container>
    );
}
