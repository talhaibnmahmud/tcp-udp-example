import dgram from "node:dgram";

const controller = new AbortController();
const server = dgram.createSocket({ type: "udp4", signal: controller.signal });
server.on("message", (msg, rinfo) => {
	console.log(
		`server got: ${msg.toString()} from ${rinfo.address}:${rinfo.port} (${rinfo.family}) on ${rinfo.size} bytes`
	);
});

server.bind(8090);
