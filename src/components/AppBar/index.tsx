import Logo from "../Logo";
import Icon from "../Icon";
import FontPicker from "../FontPicker";
import { Link } from "react-router-dom";
import ThemeSwitcher from "../ThemeSwitcher/index";
import styles from "./appbar.module.scss";

export default function AppBar() {
  return (
    <header className={styles.appbar}>
      <Link className={styles.logo} to={"/"}>
        <Logo />
      </Link>
      <FontPicker />
      <nav className={styles.nav}>
        <ThemeSwitcher />
        {/* <Icon type="button" onClick={toggleTheme} name="brightness_medium" /> */}
        <Link to="/login">
          <Icon type="button" name="account_circle" />
        </Link>
        {/* <Icon type="button" name="menu" /> */}
      </nav>
    </header>
  );
}
