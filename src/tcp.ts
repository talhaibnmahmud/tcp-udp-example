import net from "node:net";

const PORT = process.env.PORT ?? 8080;

const server = net.createServer((connection) => {
	// 'connection' listener
	console.log("client connected");

	connection.setEncoding("utf8");
	connection.setKeepAlive(true, 15000);
	connection.setTimeout(15000);
	connection.setNoDelay(true);

	connection.on("connect", () => {
		console.log("client connected");
	});

	connection.on("ready", () => {
		console.log("connection is ready to be used");
	});

	connection.on("data", (data) => {
		console.log(`client says: ${data.toString()}`);
		connection.write(`server received your message: ${data.toString()}`);
	});

	connection.on("timeout", () => {
		console.log("client connection timeout");
		connection.end();
	});

	connection.on("end", () => {
		console.log("client disconnected");
	});

	connection.on("close", () => {
		console.log("client closed connection");
	});

	connection.on("error", (err) => {
		console.error(err);
	});

	connection.write("Hello from server!\r\n");
});

server.on("drop", () => {
	console.log(`client dropped connection`);
});

server.on("error", (err) => {
	console.error(err);
});

server.listen(PORT, () => {
	console.log(`server listening on port ${PORT}`);
});
