import styles from "../auth.module.scss";
import Button from "../Button";
import { useAuth } from "../../context";

async function loadIcons(providers) {
    return import("react-icons/fa").then(mod => {
        const iconModules = providers.map(provider => mod[`Fa${toFirstUpperCase(provider)}`]);
        return iconModules;
    });
}

function toFirstUpperCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Socials(props) {
    const { signIn, providers } = useAuth();
    const [loadedIcons, setLoadedIcons] = React.useState(null);

    async function handleProviderAuth(e) {
        const provider = e.target.getAttribute("data-provider");
        if (!provider) return;
        const { user, session, error } = await signIn({ provider: provider });
        if (error) {
            console.error(error);
        }
        console.log(user, session);
    }

    React.useMemo(async () => {
        const modules = await loadIcons(providers);
        setLoadedIcons(modules);
    }, [providers]);

    return (
        <div className={styles.row}>
            {loadedIcons && (providers.map((prov, i) => {
                return (
                    <Button
                        data-provider={prov}
                        tag="a"
                        role="secondary"
                        icon={typeof loadedIcons[i] !== "function" ? undefined : loadedIcons[i]()}
                        onClick={handleProviderAuth}>
                        Sign {props.signUp ? "up" : "in"} with {toFirstUpperCase(prov)}
                    </Button>
                );
            }))}
        </div>
    );
}

