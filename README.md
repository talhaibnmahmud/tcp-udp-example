# TCP & UDP example with Node.js

This is a simple example of a TCP and UDP server and client written in Node.js.

## How to run

First, you need to install the dependencies:

```bash
npm install
```

Then, you can run the server for TCP and UDP:

```bash
npm run start:tcp
npm run start:udp
```

## How to test the TCP server

First you have to have telnet installed, if you don't have it, you can install it with the following command:

```bash
sudo apt-get install telnet
```

or

```bash
brew install telnet
```

Then, you test the TCP server with the following command:

```bash
telnet 127.0.0.1 8080
```

you can write anything and press enter, you will see the message in the server console.
For example:

```bash
Hello, I'm a client
```

## How to test the UDP server

You have to use netcat to test the UDP server, if you don't have it, you can install it with the following command:

```bash
sudo apt-get install netcat
```

or

```bash
brew install netcat
```

Then, you test the UDP server with the following command:

```bash
echo "Hello, I'm a client" | nc -u -w1 127.0.0.1 8090
```
