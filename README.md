![Fontkeeper Logo](/logo.png)

## A Simple Font Explorer

Fontkeeper is a lightweight font explorer that collects all your fonts from selected folder and shows them in your browser. No font permissions or font activations like other programs. Just for showing fonts and testing them with different text content and font sizes.

### Usage

I haven't created an installer yet but you can download the latest release of executable from [here](https://github.com/fatihgozenc/fontkeeper/releases/tag/0.1.0) then run the program in your custom folder of fonts. It will generate `fontkeeper.html` in the same folder for you and open it in your default browser. In MacOSX or Linux you need to place the downloaded executable in your font folder then run it from terminal. For example `cd /Users/username/Documents/fonts` to navigate then run `./fontkeeper-*`.

### Supported Formats

It supports `.otf`, `.ttf`, `.woff`, `.woff2` and `.eot`.

### Dependencies

It uses [`walkdir`](https://docs.rs/walkdir/), [`open`](https://docs.rs/open/) and standard Rust library at the moment. There are no more planned dependencies at the moment.

### Thank you

For your interest. I am still developing it but you can download and use it on Windows for now. Linux and MacOSX versions soon to be released.
