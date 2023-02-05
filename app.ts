import * as dotenv from 'dotenv';
import { exit } from "process";
import TestApp from "src/testApp";

console.log('starting the application')
process.on('uncaughtException', (err, origin) => {
    console.log('unhandled happened. stopping the server...' + err);
    exit(1);
});

dotenv.config()
const port = Number(process.env.PORT) || 7070;

const app = new TestApp();
app.init().then(_ => app.start(isNaN(port) ? 7070 : port))