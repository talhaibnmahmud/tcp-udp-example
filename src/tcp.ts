import net from "node:net";

const server = net.createServer((socket) => {
	socket.write("Hello, world!\n");
	socket.on("data", (data) => {
		console.log(data.toString());
	});
});

server.listen(8080);
