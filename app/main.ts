import * as net from "net";
import commands from "./commands";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

const server: net.Server = net.createServer((connection: net.Socket) => {
  connection.on("data", (data) => {
    const command = commands.Data(data.toString());
    (commands as any)[command](connection);
  });
});

server.listen(6379, "127.0.0.1");
