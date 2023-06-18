import styles from "./input.module.scss"

export default React.forwardRef(function Input(props, ref) {

    const [focused, setFocused] = React.useState(false)

    function handleFocus(e) {
        console.log(e)
        setFocused(true)
        props.onFocus ? props.onFocus(e) : undefined
    }

    function handleBlur(e) {
        console.log(e)
        if (!e.target.value.length > 0 ) {
            setFocused(false)
        }
        props.onBlur ? props.onBlur(e) : undefined
    }

    React.useEffect(() => {
        if (props.defaultValue) {
            setFocused(true)
        }
    }, [])

    return (
        <label className={classes(
            styles.label, 
            focused ? styles.focused : null, 
            props.disabled ? styles.disabled : null
        )}>
            <span className={styles.placeholder}>{props.placeholder}</span>
            <div className={styles.wrapper}>
                <input
                    ref={ref ? ref : undefined}
                    autoCapitalize="sentences" 
                    autoComplete="username" 
                    autoCorrect="on"
                    dir="auto" 
                    required={props.required ? props.required : undefined}
                    name={props.type ? props.type : undefined}
                    type={props.type ? props.type : "text"}
                    className={styles.input} 
                    disabled={props.disabled ? props.disabled : undefined} 
                    defaultValue={props.defaultValue ? props.defaultValue : undefined} 
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
        </label>
    )
})