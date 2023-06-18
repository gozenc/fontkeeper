import "./style.scss"

export default function (props) {
    const className = `icon ${props.name ? ` icon-${props.name}` : ""}${props.className ? ` ${props.className}` : ""}`
    return props.type === "button" 
            ? <button {...props} className={`icon__button ${className}`} />
            : <span {...props} className={className} />
    
}