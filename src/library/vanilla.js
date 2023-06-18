import "../scss/main.scss"
import { 
    getFonts,
    getCache,
    initFonts,
    renderFonts,
    restoreFonts,
    switchTheme,
    setFontsDir } from "./lib"

const fontsContainer = document.getElementById("fontlist")
const dirSelector = document.getElementById("dirselector")

window.addEventListener("load", async (e) => {
    const cache = getCache()
    if ( cache ) {
        console.log(`Found cache.`)
        setFontsDir(cache.dir, dirSelector )
        const fonts = await restoreFonts(cache.fonts)
        console.log(`Restored cache.`)
        await initFonts(fonts)
        console.log(`Initiliazed fonts cache.`)
        renderFonts(fonts, fontsContainer)
        console.log(`Rendered fonts from cache.`)
    }
})

document.getElementById('dirselector')
    .addEventListener('click', async (e) => {
        const fonts = await getFonts(e)
        if (!fonts) return
        await initFonts(fonts)
        renderFonts(fonts, fontsContainer)
    })

document.getElementById('themeswitcher')
    .addEventListener('click', switchTheme )
