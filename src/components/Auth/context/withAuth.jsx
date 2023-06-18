import { useAuth } from '.'
import { useNavigate } from 'react-router-dom'

export default function WithAuth({route, url = "/signin"}){
    const { user } = useAuth()
    const navigate = useNavigate()
    const [show, setShow] = React.useState(false)
    React.useMemo(() => {
        if (user === null) {
            navigate(url, {replace: true})
        } else {
            setShow(true)
        }
    }, [user])

    return show ? route : null
}
