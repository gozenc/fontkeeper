import { useAuth } from '../../context'
import Button from '../Button';

export default function ButtonSignout() {
    // Get current user and signOut function from context
    const { signOut } = useAuth()
    const [loading, setLoading] = React.useState(false)
    async function handleSignOut() {
        await signOut()
    }
    return (
       <Button role="secondary" onClick={handleSignOut}>Sign out</Button>
    )
}