const open = require('open');
const path = require("path");
const { spawn } = require("child_process");
const EventEmitter = require('events');
const express = require("express");

const PORT = 3001;
const LOCAL_BUILD_URL = `http://localhost:${PORT}`;
const startTime = Date.now();

const args = process.argv.slice(2);

const Builder = spawn(process.argv[0], [__dirname + "/build.js", ...args], {
    detached: true,
    stdio: 'inherit'
});

const Events = new EventEmitter();
Builder.on("exit", () => Events.emit("build_end"));

Events.on('build_end', () => {
    const builtTime = Date.now();
    console.log(`Built in in ${(builtTime - startTime) / 1000}ms.`);
    console.log(`Starting server on ${LOCAL_BUILD_URL}`);

    const app = express();
    app.use(express.static("build"));
    app.get('*', (req, res) => res.sendFile(path.resolve('build', 'index.html')));
    app.listen(PORT, () => {
        Events.emit('server_ready');
    });

});

Events.on("server_ready", () => {
    console.log(`Server ready, opening browser...`);
    open(LOCAL_BUILD_URL);
});
