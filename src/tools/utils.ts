import { Format, getFilenameSuffix } from './format';
import { convertOnWorker } from './convertworker';

export async function fileToUint8Array(file: File): Promise<Uint8Array> {
    const fileReader = new FileReader();
    const promise = new Promise<Uint8Array>((resolve, reject) => {
        fileReader.addEventListener('load', () => {
            const result = fileReader.result;
            if (result instanceof ArrayBuffer) {
                resolve(new Uint8Array(result));
            } else {
                throw new Error('readAsArrayBuffer() returns non ArrayBuffer result');
            }
        });
        fileReader.addEventListener('error', (e) => reject(e));
    });
    fileReader.readAsArrayBuffer(file);
    return promise;
}

export async function convertSingleFile(file: File, format: Format) {
    const data = await fileToUint8Array(file);
    const originalByteLength = data.byteLength;
    const result = await convertOnWorker(data, format);
    const output = result.output;

    const originalFileSize = formatFilesize(originalByteLength);
    const convertedFileSize = formatFilesize(output.byteLength);
    const processTime = formatProcessTime(result.processTime);
    const ratio = formatConversionRatio(originalByteLength, output.byteLength) + "%"; 

    const basename = getBasename(file.name);
    const {url, fileName} = createDownloadLink(basename, output);
    
    const summary = {
        originalFileSize,
        convertedFileSize,
        processTime,
        ratio,
        url,
        fileName,
        output
    }
    return summary
}

export function createDownloadLink(basename: string, data: Uint8Array): {url: string, fileName: string} {
    const blob = new Blob([data]);
    const url = URL.createObjectURL(blob);
    const suffix = getFilenameSuffix(data);
    const fileName = `${basename}.${suffix}`;
    return { url, fileName };
}

export function getBasename(filename: string): string {
    const suffixPos = filename.lastIndexOf('.');
    if (suffixPos === -1) return filename;
    return filename.substr(0, suffixPos);
}

const BYTE_SUFFIXES = [' B', ' kB', ' MB'];
const BYTE_MARGIN = 1024;

export function formatFilesize(amount: number): string {
    let index = 0;
    while (amount > 1000 + BYTE_MARGIN && index < BYTE_SUFFIXES.length) {
        amount /= 1000;
        index += 1;
    }
    const suffix = BYTE_SUFFIXES[index];
    if (amount > 100) {
        return amount.toFixed(0) + suffix;
    } else {
        return amount.toFixed(1) + suffix;
    }
}

export function formatProcessTime(t: number): string {
    if (t < 1000) {
        return t.toFixed(0) + 'ms';
    }
    const sec = t / 1000;
    return sec.toFixed(1) + 's';
}

export function formatConversionRatio(before: number, after: number): string {
    let ratio: number = (after / before) * 100;
    let result: string;
    if (ratio < 100) {
        result = ratio.toFixed(2);
        result = `-${result}`;
    } else if (ratio > 100) {
        result = ratio.toFixed(2);
        result = `+${result}`;
    }
    return result;
}
