import { execFile } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const CURRENT_DIR = process.cwd();
const PARENT_DIR = path.dirname(CURRENT_DIR);
const CONFIG_DIR = path.join(PARENT_DIR, "build-openvpn3");
const CLI_PATH = path.join(CONFIG_DIR, "test", "ovpncli", "ovpncli");
const CONFIG_PATH = path.join(CURRENT_DIR, "config.ovpn");

function start() {
	console.log(
		"Starting the OpenVPN3 CLI with the config file at",
		CONFIG_PATH
	);
	const process = execFile(
		CLI_PATH,
		[CONFIG_PATH, "-t", "shark-vpn"],
		(error, stdout, stderr) => {
			if (error !== null) {
				console.error("Error starting the OpenVPN3 CLI", error);
				return;
			}
			console.log("OpenVPN3 CLI started successfully", stdout);

			if (stderr !== null) {
				console.error("OpenVPN3 CLI stderr", stderr);
			}
			if (stdout !== null) {
				console.log("OpenVPN3 CLI stdout", stdout);
			}
		}
	);

	process.stdout?.on("data", (data) => {
		console.log("OpenVPN3 CLI stdout", data);
	});

	process.stderr?.on("data", (data) => {
		console.error("OpenVPN3 CLI stderr", data);
	});

	process.on("close", (code) => {
		console.log("OpenVPN3 CLI process exited with code", code);
	});

	process.on("exit", (code) => {
		console.log("OpenVPN3 CLI process exited with code", code);
	});
}

function main() {
	console.log(`Current directory: ${CURRENT_DIR}`);
	console.log(`Parent directory: ${PARENT_DIR}`);
	console.log(`Config directory: ${CONFIG_DIR}`);
	console.log(`CLI path: ${CLI_PATH}`);

	// Check if the CLI and config file exist
	if (!fs.existsSync(CLI_PATH)) {
		console.error("OpenVPN3 CLI does not exist at", CLI_PATH);
		return;
	}
	if (!fs.existsSync(CONFIG_PATH)) {
		console.error("OpenVPN3 config file does not exist at", CONFIG_PATH);
		return;
	}

	start();
}

main();
