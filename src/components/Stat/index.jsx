import "./style.scss"

export default function (props) {
    const className = `stat ${props.name ? ` stat-${props.name}` : ""}${props.className ? ` ${props.className}` : ""}`
    return (
        <span className={className}>
            <i>{props.value}</i>{props.unit}
        </span>
    )
}