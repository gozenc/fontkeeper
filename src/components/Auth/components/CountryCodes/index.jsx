import countries from './countries.json';
import styles from "./country-codes.module.scss";
import flags from "./flags.module.scss";

export default function CountryCodeSelector(props) {

    const [renderedData, setRenderedData] = React.useState(countries);
    const [shown, setShown] = React.useState(true);

    function handleSelect(e) {
        let elem = e.target;
        // The equivalent of parent.children.indexOf(child)
        if (e.target.tagName !== "LI") {
            elem = e.target.parentElement;
        }
        const index = Array.prototype.indexOf.call(listRef.current.children, elem);
        props.onSelect && props.onSelect(countries[index]);
    }

    React.useEffect(() => {
        props.onShown && props.onShown();
    }, [shown]);

    const searchRef = React.useRef(null);
    const listRef = React.useRef(null);

    function handleSearch(e) {
        e.preventDefault();
        return setRenderedData(() => {
            const newData = countries.filter((item) => {
                const searched = searchRef.current.value.toLocaleLowerCase();
                return item.name.toLocaleLowerCase().includes(searched);
            });
            return newData;
        });
    }

    if (shown) {
        return (
            <div className={styles.dropdown}>
                <input ref={searchRef} onChange={handleSearch} type="search" />
                <div className="menu__content">
                    <ul onClick={handleSelect} ref={listRef} className={styles.list}>
                        <CountryList data={renderedData} />
                    </ul>
                </div>
            </div>
        );
    } else return null;
}

function CountryList(props) {
    return (
        props.data.map((item, i) => {
            const telCode = item.tel.includes("-") ? item.tel.split("-").shift() : item.tel;
            const countryCode = item.code.split("/")[0].trim().toLocaleLowerCase();
            return (
                <li key={i}
                    className={styles.item}>
                    <span className={`${styles.flagItem} ${styles.flag} ${flags[`flag_${countryCode}`]}`} />
                    <span>{item.name} {`+${telCode}`}</span>
                </li>
            );
        })
    );
}