import * as net from "net";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.error("Logs from your program will appear here!");

const server: net.Server = net.createServer((connection: net.Socket) => {
  connection.on("data", (data) => {
    console.log("data ", data);
    connection.write("+PONG\r\n");
    connection.end();
  });
  connection.on("close", () => {
    connection.end();
    server.close();
  });
});

server.listen(6379, "127.0.0.1");
