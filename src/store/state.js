import getRandomPangram from '../library/pangram'

export default {
    dir: null,
    fonts: [{name: "sans-serif"}, { name: "serif"}, {name: "monospace"}],
    globalFontSize: 40,
    globalText: getRandomPangram(),
    rows: 25,
    currentPage: 1
}