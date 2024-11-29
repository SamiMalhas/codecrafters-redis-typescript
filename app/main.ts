import * as net from "net";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

const server: net.Server = net.createServer((connection: net.Socket) => {
  connection.on("data", (data) => {
    console.log("data ", data.toString());

    const command = data.toString().split("\r\n");
    if (command[2].toUpperCase() === "ECHO") {
      let response: string[] = [];
      command.forEach((value, index) => {
        if (index % 2 === 1 && index > 2) {
          response.push(value);
        }
      });
      connection.write(`+${response.join(" ")}\r\n`);
    } else if (command[2].toUpperCase() == "PING") {
      connection.write("+PONG\r\n");
    }
  });
});

server.listen(6379, "127.0.0.1");
