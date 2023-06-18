import styles from "./loading.module.scss"

export default function Loading(props) {
    return (
        <div className={styles.container}>
            <TypeTwo />
            <span>{props.text}</span>
        </div>
    )
}

function TypeFour() {
    return (
        <svg className={styles.svg} version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
            <circle fill="#fff" stroke="none" cx={6} cy={50} r={6}>
                <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1" />
            </circle>
            <circle fill="#fff" stroke="none" cx={26} cy={50} r={6}>
                <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2" />
            </circle>
            <circle fill="#fff" stroke="none" cx={46} cy={50} r={6}>
                <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3" />
            </circle>
        </svg>
    )
}

function TypeThree() {
    return (
        <svg className={styles.svg} version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
            <circle fill="none" stroke="#fff" strokeWidth={4} cx={50} cy={50} r={44} style={{ opacity: '0.5' }} />
            <circle fill="#fff" stroke="#e74c3c" strokeWidth={3} cx={8} cy={54} r={6}>
                <animateTransform attributeName="transform" dur="2s" type="rotate" from="0 50 48" to="360 50 52" repeatCount="indefinite" />
            </circle>
        </svg>
    )
}

function TypeTwo() {
    return (
        <svg className={styles.svg} version="1.1" id="L2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100" xmlSpace="preserve">
            <circle fill="none" stroke="#fff" strokeWidth={4} strokeMiterlimit={10} cx={50} cy={50} r={48} />
            <line fill="none" strokeLinecap="round" stroke="#fff" strokeWidth={4} strokeMiterlimit={10} x1={50} y1={50} x2={85} y2="50.5">
                <animateTransform attributeName="transform" dur="2s" type="rotate" from="0 50 50" to="360 50 50" repeatCount="indefinite" />
            </line>
            <line fill="none" strokeLinecap="round" stroke="#fff" strokeWidth={4} strokeMiterlimit={10} x1={50} y1={50} x2="49.5" y2={74}>
                <animateTransform attributeName="transform" dur="15s" type="rotate" from="0 50 50" to="360 50 50" repeatCount="indefinite" />
            </line>
        </svg>
    )
}

function TypeOne() {
    return (
        <svg className={styles.svg} version="1.1" id="L1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100" xmlSpace="preserve">
            <circle fill="none" stroke="#fff" strokeWidth={6} strokeMiterlimit={15} strokeDasharray="14.2472,14.2472" cx={50} cy={50} r={47}>
                <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="5s" from="0 50 50" to="360 50 50" repeatCount="indefinite" />
            </circle>
            <circle fill="none" stroke="#fff" strokeWidth={1} strokeMiterlimit={10} strokeDasharray="10,10" cx={50} cy={50} r={39}>
                <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="5s" from="0 50 50" to="-360 50 50" repeatCount="indefinite" />
            </circle>
            <g fill="#fff">
                <rect x={30} y={35} width={5} height={30}>
                    <animateTransform attributeName="transform" dur="1s" type="translate" values="0 5 ; 0 -5; 0 5" repeatCount="indefinite" begin="0.1" />
                </rect>
                <rect x={40} y={35} width={5} height={30}>
                    <animateTransform attributeName="transform" dur="1s" type="translate" values="0 5 ; 0 -5; 0 5" repeatCount="indefinite" begin="0.2" />
                </rect>
                <rect x={50} y={35} width={5} height={30}>
                    <animateTransform attributeName="transform" dur="1s" type="translate" values="0 5 ; 0 -5; 0 5" repeatCount="indefinite" begin="0.3" />
                </rect>
                <rect x={60} y={35} width={5} height={30}>
                    <animateTransform attributeName="transform" dur="1s" type="translate" values="0 5 ; 0 -5; 0 5" repeatCount="indefinite" begin="0.4" />
                </rect>
                <rect x={70} y={35} width={5} height={30}>
                    <animateTransform attributeName="transform" dur="1s" type="translate" values="0 5 ; 0 -5; 0 5" repeatCount="indefinite" begin="0.5" />
                </rect>
            </g>
        </svg>
    )
}