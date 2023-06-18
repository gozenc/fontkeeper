import styles from "./button.module.scss";
import { useMemo } from "react";
import { Link } from "react-router-dom";

export default function Button(props) {
    const Tag = props.route ? Link : props.tag ? props.tag : "button";
    const iconOnly = props.icon && !props.children;
    const customProps = useMemo(() => getCustomHTMLProps(props), [props]);
    return (
        <Tag
            to={Tag === Link ? props.route : undefined}
            type={props.type}
            onClick={props.onClick}
            {...customProps}
            className={classes(
                iconOnly ? styles.iconOnly : styles.button,
                props.className,
                props.role ? styles[props.role] : styles.primary
            )}>
            {props.icon && <div className={styles.icon}>{props.icon}</div>}
            {props.children}
        </Tag>
    );
}

function getCustomHTMLProps(props) {
    return Object.keys(props)
        .filter(prop => prop.startsWith("data") || prop.startsWith("aria"))
        .reduce((acc, cur) => ({...acc, [cur]: props[cur]}), {});
}