import { useAuth } from '../../context'
import Container from '../Container';
import ButtonSignout from "../ButtonSignout"
import ButtonChangePassword from "../ButtonChangePassword"

export default function Dashboard() {
    // Get current user and signOut function from context
    const { user, signOut } = useAuth()

    return (
        <Container>
            <h1>Dashboard</h1>
            {/* Change it to display the user ID too 👇*/}
            <p>Welcome, {user?.id}!</p>
            <ButtonSignout/>
            <ButtonChangePassword/>
        </Container>
    )
}