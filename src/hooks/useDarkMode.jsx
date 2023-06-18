export default function useDarkMode() {
    React.useEffect(detectScheme, [])
    return { toggleTheme, switchTheme }
}

function toggleTheme() {
    if ( localStorage.getItem("theme") == "dark" ) {
        localStorage.setItem('theme', 'light');
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
        document.documentElement.setAttribute('data-theme', 'dark');
    }    
}

function switchTheme(boolean) {
    if (boolean) {
        localStorage.setItem('theme', 'dark');
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
        document.documentElement.setAttribute('data-theme', 'light');
    }    
}

function detectScheme() {
    let theme = "light";    //default to light

    if (localStorage.getItem("theme")) {
        if (localStorage.getItem("theme") == "dark") {
            theme = "dark";
        }
    } else if (!window.matchMedia) {
        //matchMedia method not supported
        return false;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        //OS theme setting detected as dark
        theme = "dark";
    }

    if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
    }
}