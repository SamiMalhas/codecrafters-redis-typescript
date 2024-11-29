import * as net from "net";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

const server: net.Server = net.createServer((connection: net.Socket) => {
  connection.on("data", (data) => {
    console.log("data ", data.toString());

    const command = data.toString().split("\r\n");
    console.log(command + " ----- " + command[1] + " ----- " + command[2]);

    if (command[1] == "echo") {
      connection.write(`+${command.slice(1).join(" ")}\r\n`);
    } else if (command[0] == "ping") {
      connection.write("+PONG\r\n");
    }
  });
});

server.listen(6379, "127.0.0.1");
