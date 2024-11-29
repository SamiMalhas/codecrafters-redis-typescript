import * as net from "net";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.error("Logs from your program will appear here!");

const server: net.Server = net.createServer((connection: net.Socket) => {
  connection.on("data", (data) => {
    console.log("data ", data.toString());

    const command = data.toString().trim();
    const parts = command.split(/\s+/);

    if (parts[0] == "echo") {
      connection.write(`+${parts.slice(1).join(" ")}\r\n`);
    } else if (parts[0] == "ping") {
      connection.write("+PONG\r\n");
    }
  });
});

server.listen(6379, "127.0.0.1");
