import dgram from "node:dgram";

const PORT = parseInt(process.env.PORT ?? "8090");
const controller = new AbortController();
controller.signal.addEventListener("abort", () => {
	console.log("server aborted");
	server.close();
});

const server = dgram.createSocket({ type: "udp4", signal: controller.signal });
server.on("message", (msg, rinfo) => {
	console.log(
		`server got: ${msg.toString()} from ${rinfo.address}:${rinfo.port} (${rinfo.family}) on ${rinfo.size} bytes`
	);
	server.send(
		`server received your message: ${msg.toString()}`,
		rinfo.port,
		rinfo.address
	);
});

server.bind(PORT, () => {
	console.log(`server listening on port ${PORT}`);
});
