const { build } = require("esbuild");
const { configGenerator } = require("../config");


async function runBundler({
	mode = "production",
} = {})
{
	console.log("Call: run bundler");

	const config = configGenerator({ mode });

	const builder = await build(config).catch((error) => {
		console.error(error.message);

		if (mode !== "development")
		{
			process.exit(1);
		}

		return undefined;
	});

	console.log("Update: bundling finished succesfully");


	if (builder && typeof builder.stop === "function")
	{
		builder.stop();
	}
}


module.exports = {
	runBundler,
};
