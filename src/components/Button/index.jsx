import "./style.scss"

export default function (props) {

    const [rippleOpts, setRippleOpts] = React.useState({})
    const [rippleShown, showRipple] = React.useState(false)

    function createRipple(event) {
        const button = event.currentTarget
        const diameter = Math.max(button.clientWidth, button.clientHeight)
        const radius = diameter / 2
        setRippleOpts({
            diameter: diameter,
            radius: radius,
            offsetLeft: button.offsetLeft,
            offsetTop: button.offsetTop,
            clientX: event.clientX,
            clientY: event.clientY
        })
        showRipple(true)
    }

    React.useEffect(() => {
        const timer = setTimeout(() => {
            showRipple(false)
        }, 350)
        return () => clearTimeout(timer)
    }, [ rippleOpts ])

    return (
        <button
            onClick={createRipple}
            className={props.className ? `button ${props.className}` :"button" }>
            {props.value}{rippleShown && <Ripple {...rippleOpts} />}
        </button>
    )
}

function Ripple(props) {
    return (
        <span className={props.className + " button__ripple"} style={{
            width: `${props.diameter}px`,
            height: `${props.diameter}px`,
            left: `${props.clientX - (props.offsetLeft + props.radius)}px`,
            top: `${props.clientY - (props.offsetTop + props.radius)}px`
        }} />
    )
}