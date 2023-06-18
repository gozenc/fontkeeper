const webpack = require('webpack');
const chalk = require("chalk");
const crypto = require("crypto");
const buildHash = crypto.randomBytes(3).toString("hex");
process.env["BUILD_HASH"] = process.argv.includes("--hash") ? buildHash : "[contenthash:6]";
const prodConfig = require("../config/webpack.prod");
const prettyBytes = require('pretty-bytes');
const byteWarnThreshold = 4096;
const fg = require('fast-glob');
const { unlink } = require("fs/promises");

process.env["NODE_ENV"] = "production";

const compiler = webpack(prodConfig);

compiler.run(async (err, stats) => {
    if (err) {
        console.error(err.stack || err);
        if (err.details) {
            console.error(err.details);
        }
        process.exit(1);
    }
    const info = stats.toJson();
    if (stats.hasErrors()) {
        info.errors.forEach(err => console.error(chalk.red(err.message)));
        process.exit(1);
    }
    if (stats.hasWarnings()) {
        info.warnings.forEach(warning => console.warn(chalk.yellow(warning.message)));
    }
    console.log(`Compiled modules are:`);
    let modNum = 1;
    info.modules.forEach((module, i) => {
        const sizeWithColor = module.size > byteWarnThreshold
            ? chalk.red(prettyBytes(module.size))
            : chalk.green(prettyBytes(module.size));
        if (module.name.includes("webpack/runtime")) {
            console.log();
        }
        if (module.name.endsWith("dules")) {
            symbol = "•";
        } else {
            symbol = modNum;
            modNum++;
        }
        console.log(`[${symbol}]\t${sizeWithColor}\t${module.name}`);
    });
    console.log(`\nCompiled and ready to be deployed.`);
    stats.compilation.getAssets().forEach((asset, i) => {
        const sizeWithColor = chalk.cyan(prettyBytes(asset.info.size));
        console.log(`[${i + 1}]\t${sizeWithColor}\t${asset.name}`);
    });
    const licenseFiles = await fg(['build/*LICENSE*']);
    if (licenseFiles) {
        await Promise.all(licenseFiles.map(async f => await unlink(f)));
    }
    process.stdout.write(`\n`);
});