import { Link } from 'react-router-dom'

export default function DontHaveAccount(props){
    return (
        <p>Don't have an account? <Link to="/login">Sign Up</Link></p>
    )
}