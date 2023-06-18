import styles from "./seperator.module.scss"

export default function Seperator({text = "or"}) {
    return (
        <div className={styles.container}>
            <span className={styles.text}>{text}</span>
        </div>
    )
}