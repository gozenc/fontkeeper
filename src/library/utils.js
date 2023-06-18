import { convert } from "./woff2ttf"
import { Buffer } from "buffer"

export function debuggy(...params){
    const err = new Error
    const location = err.stack.split("\n")[2].trim()
    console.log(`%cDEBUG ${location}\n\r`, 'color: cyan;', ...params)
}

export function camelToSentence(str) {
    const spaced = str.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1")
    const result = spaced.charAt(0).toUpperCase() + spaced.slice(1);
    return result
}

export function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

export async function convertWoff2(font, cb) {
    const arrayBuffer = await font.file.arrayBuffer()
    const unint8buffer = Buffer.from(arrayBuffer)
    const converted = await convert(unint8buffer)
    return cb ? cb(converted.buffer) : converted.buffer;
}

export function slugify(str, d = "-") {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
  
    // remove accents, swap ñ for n, etc
    const from = "àáäâèéëêìíïîòóöôùúüûñçşğ·/_,:;";
    const to   = `aaaaeeeeiiiioooouuuuncsg${d}${d}${d}${d}${d}${d}`;
    for ( let i = 0, l = from.length; i < l ; i++ ) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, d) // collapse whitespace and replace by -
        .replace(/-+/g, d); // collapse dashes

    return str;
}

export async function readdirRecursive(dirHandle, filterCallback ) {
    const files = []
    for await (let [name, handle] of dirHandle) {
        const {kind} = handle
        if (handle.kind === 'directory') {
            files.push({name, handle, kind})
            files.push(...await readdirRecursive(handle))
        } else {
            files.push({name, handle, kind})
        }
    }
    if ( typeof filterCallback === "function") {
        return files.filter(filterCallback)
    }
    return files
}

export function uuid4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

export const uniq = a => [...new Set(a)];

export async function readdirHandler(filterCallback) {
    try {
        const directoryHandle = await window.showDirectoryPicker()
        console.log(directoryHandle)
        return {
            files: await readdirRecursive(directoryHandle, filterCallback),
            dir: directoryHandle.name
        }
    } catch(err) {
        console.log(err);
        return undefined
    }
}
