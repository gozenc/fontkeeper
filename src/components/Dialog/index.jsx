import Portal from "./Portal"
import styles from "./dialog.module.scss"
import useDialog from "./useDialog"

export default function Dialog(props) {

    const dialogRef = React.useRef(null)
    useDialog(dialogRef, props.trigger)

    return (
        <Portal>
            <div ref={dialogRef} className={styles.container}>
                <div>{props.text}</div>
            </div>
        </Portal>
    )
} 

