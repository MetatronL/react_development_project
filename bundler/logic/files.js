/* eslint-disable no-bitwise */
const fs = require("fs-extra");
const path = require("path");

function resetDistFolder(outputDir, {
	importIndexHtml = true,
} = {})
{

	const removeDirFunction = fs.rmSync || fs.rmdirSync;
	removeDirFunction(outputDir, { recursive: true, force: true });

	fs.mkdirSync(outputDir, {
		recursive: true,
	});
	console.log("The output folder has been reset.");

	const htmlFileSource = path.resolve(__dirname, "../../", "index.html");
	const htmlFileDestination = path.resolve(outputDir, "index.html");

	if (importIndexHtml)
	{
		// Warning: also change this line if you modify the output folder
		fs.copySync(htmlFileSource, htmlFileDestination);
		if (!fs.existsSync(htmlFileDestination))
		{
			console.log("Error: failed to copy index.html");
		}
	}

	console.log(" ");
}

module.exports = {
	resetDistFolder,
};
