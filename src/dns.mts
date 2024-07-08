import chalk from "chalk";
import { resolve4, reverse } from "node:dns/promises";
import { createInterface } from "node:readline/promises";

const log = console.log;

// Take domain name as an input from the user
const rl = createInterface({
	// eslint-disable-next-line no-undef
	input: process.stdin,
	// eslint-disable-next-line no-undef
	output: process.stdout,
	terminal: false,
});

const input = await rl.question(
	`Enter the domain you want to resolve IP for: `
);
log(chalk.blue(`You entered: ${input}`));
rl.close();

const addresses = await resolve4(input);
log(chalk.green(`addresses: ${JSON.stringify(addresses)}`));

for (const address of addresses) {
	const hostname = await reverse(address);
	log(chalk.magenta(`hostname: ${JSON.stringify(hostname)}`));
}

log(chalk.green("done"));
