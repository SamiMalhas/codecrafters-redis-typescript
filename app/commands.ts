import * as net from "net";

type CommandFunction = (connection: net.Socket) => void;

interface Commands {
  holder: string[];
  Data: (data: string) => string;
  PING: CommandFunction;
  ECHO: CommandFunction;
  [key: string]: CommandFunction | string[] | ((data: string) => string);
}

const commands: Commands = {
  holder: [],
  Data(data) {
    const commandLine = data.split("\r\n");
    commandLine.forEach((value, index) => {
      if (index % 2 === 0 && index > 2) {
        commands.holder.push(value);
      }
    });

    return commandLine[2].toUpperCase();
  },
  PING(connection) {
    connection.write("+PONG\r\n");
  },
  ECHO(connection) {
    connection.write(`+${commands.holder.join(" ")}\r\n`);
  },
};

export default commands;
