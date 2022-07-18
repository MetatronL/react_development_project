const Koa = require("koa");
const path = require("path");
const serve = require("koa-static");
// const https = require("https");
const http = require("node:http");
const fs = require("fs");

const app = new Koa();

const indexHTML = fs.readFileSync((path.resolve(__dirname, "..", "..", "index.html")));

async function startServer({
	port = 120,
	address = "127.0.0.5",
} = {})
{
	app.use(serve(path.resolve(__dirname, "..", "..", "dist")));

	app.use(async (ctx) => {
		ctx.response.type = "html";
		ctx.response.body = indexHTML;
		// console.log(ctx);
	});


	http.createServer(
		{ key: null, cert: null },
		app.callback(),
	).listen(
		port,
		address,
		() => console.log(`Started listening on port ${port}.`),
	);
}


try
{
	startServer();
}
catch (error)
{
	console.log("Server crashed...");
	console.error(error);
}
