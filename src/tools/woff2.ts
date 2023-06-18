// @ts-ignore
import * as Module from '../dist/ffi.js';

// TODO: More error handling?

export class Woff2 {
  private mod: any; // |mod| is an Emscripten Module.

  constructor(mod: any) {
    this.mod = mod;
  }

  compress(data: Uint8Array): Uint8Array {
    const inSize = data.byteLength;
    const inOffset = this.mod._malloc(inSize);
    this.mod.HEAPU8.set(data, inOffset);

    const maxOutSize = this.mod.ccall(
      'get_max_compressed_size',
      'number',
      ['number, number'],
      [inOffset, inSize]
    );

    const output = new Uint8Array(maxOutSize);
    const outOffset = this.mod._malloc(maxOutSize);
    this.mod.HEAPU8.set(output, outOffset);
    const outSize = this.mod.ccall(
      'ttf_to_woff2',
      'number',
      ['number', 'number', 'number', 'number'],
      [inOffset, inSize, outOffset, maxOutSize]
    );

    if (outSize === 0) {
      throw new Error('woff2: Failed to compress');
    }
    const res = this.mod.HEAPU8.subarray(outOffset, outOffset + outSize).slice(0);

    this.mod._free(inOffset);
    this.mod._free(outOffset);
    return res;
  }

  uncompress(data: Uint8Array): Uint8Array {
    const inSize = data.byteLength;
    const inOffset = this.mod._malloc(inSize);
    this.mod.HEAPU8.set(data, inOffset);

    const uncompressSize = this.mod.ccall(
      'get_uncompressed_size',
      'number',
      ['number, number'],
      [inOffset, inSize]
    );
    const output = new Uint8Array(uncompressSize);
    const outOffset = this.mod._malloc(uncompressSize);
    this.mod.HEAPU8.set(output, outOffset);
    const outSize = this.mod.ccall(
      'woff2_to_ttf',
      'number',
      ['number', 'number', 'number', 'number'],
      [outOffset, uncompressSize, inOffset, inSize]
    );

    if (outSize === 0) {
      throw new Error('woff2: Failed to uncompress');
    }
    const res = this.mod.HEAPU8.subarray(outOffset, outOffset + outSize).slice(0);

    this.mod._free(inOffset);
    this.mod._free(outOffset);
    return res;
  }
}

export function createWoff2(wasmBinary: Uint8Array): Promise<Woff2> {
  return new Promise((resolve, reject) => {
    let mod: any = null;
    const args = {
      wasmBinary: wasmBinary,
      onRuntimeInitialized: () => {
        resolve(new Woff2(mod));
      }
    };
    mod = new Module(args);
  });
}
