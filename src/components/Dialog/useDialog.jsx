import styles from "./dialog.module.scss"

export default function useDialog(ref, trigger) {

    React.useEffect(() => {
        if (ref && ref.current && trigger) {
            showDialog(true, 3000, 
            () => {
                ref.current.classList.add(styles.opened)
            },
            () => {
                ref.current.classList.remove(styles.opened)
            }
            )
        }
    }, [trigger] )
}

var dialogTiming
var dialogBounce = 0
export function showDialog(boolean, timeout, showCallback, hideCallback) {
    if ( boolean === false ) {
        return false
    }
    dialogBounce++
    // return true callback
    showCallback && showCallback()
    if (dialogBounce > 1) {
        clearTimeout(dialogTiming)
    }
    dialogTiming = setTimeout(() => {
        // return false callbak
        hideCallback && hideCallback()
        dialogTiming = null
        dialogBounce = 0
    }, timeout )
}