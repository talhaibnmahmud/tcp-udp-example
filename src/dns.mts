import chalk from "chalk";
import { resolve, resolve4, resolve6, reverse } from "node:dns/promises";
import { createInterface } from "node:readline/promises";

const log = console.log;
const error = console.error;

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

const rrtypes = [
	"A",
	"AAAA",
	"ANY",
	"CAA",
	"CNAME",
	"MX",
	"NAPTR",
	"NS",
	"PTR",
	"SOA",
	"SRV",
	"TXT",
];
for (const type of rrtypes) {
	try {
		const addresses = await resolve(input, type);
		log(
			chalk.green(
				`type: ${type}, addresses: ${JSON.stringify(addresses)}`
			)
		);
	} catch (e) {
		error(chalk.red(`Failed to resolve domain with type: ${type}`));
	}
}

try {
	const v4Addresses = await resolve4(input);
	log(chalk.green(`addresses: ${JSON.stringify(v4Addresses)}`));

	for (const address of v4Addresses) {
		const hostname = await reverse(address);
		log(chalk.magenta(`hostname: ${JSON.stringify(hostname)}`));
	}
} catch (e) {
	error(chalk.red("Failed to resolve domain"));
}

try {
	const v6Addresses = await resolve6(input);
	log(chalk.green(`addresses: ${JSON.stringify(v6Addresses)}`));

	for (const address of v6Addresses) {
		const hostname = await reverse(address);
		log(chalk.magenta(`hostname: ${JSON.stringify(hostname)}`));
	}
} catch (e) {
	error(chalk.red("Failed to resolve domain"));
}

log(chalk.green("done"));
