import express from "express";
import path from "path";
import { ExpressPeerServer } from "peer";
const app = express();
const port = process.env.PORT || "8000";
const server = app.listen(port);

const peerServer = ExpressPeerServer(server, {
  proxied: true,
  debug: true,
  path: "/myapp",
  port: 8000,
  ssl: {},
});

app.use(peerServer);
const __dirname = new URL(".", import.meta.url).pathname.substring(1);
console.log(__dirname);
app.use(express.static(path.join(__dirname)));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

console.log("Listening on: " + port);
export default app;
