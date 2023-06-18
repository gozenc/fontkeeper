import Loading from "../LoadingCircle"
import styles from "./container.module.scss"
import {GrFormClose} from "react-icons/gr"
import { useLocation, useMatch } from "react-router-dom"
import Button from "../Button"


export default function Container(props) {

    const {pathname} = useLocation()
    const togglerHiddenPages = ["login", "dashboard", "reset-password"]
    const matches = togglerHiddenPages.some( url => pathname.includes(url) )

    return (
        <div className={styles.container}>
            <Button route="/login" className={classes(styles.ender, !matches ? styles.visible : styles.unvisible)} icon={<GrFormClose/>}/>
            { props.loading ? <Loading/> : props.children }
        </div>
    )
}