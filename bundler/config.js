const path = require("path");

const __root = path.resolve(__dirname, "../");


const configGenerator = ({
    mode = "production"
}) => {
    const developmentMode = mode === "development";

    console.log("Call: config generator");

    return {
        entryPoints: {
            index: path.resolve(__root, "./src/web/index.js"),
        },
        outdir: path.resolve(__root, "./dist/common"),
        nodePaths: [
            path.resolve(__root, "./src"),
            path.resolve(__root, "./node_modules"),
        ],
        chunkNames: "chunks/[name].bundle.[hash]",

        loader: {
            ".svg": "dataurl",
            ".png": "dataurl",
            ".js": "jsx",
            ".jsx": "jsx",
            ".ts": "tsx",
            ".tsx": "tsx",
        },
        minify: !developmentMode,
        keepNames: true,
        bundle: true,
        splitting: true,
        sourcemap: developmentMode,
        sourcesContent: developmentMode, // The source code is only available in an development environment
        incremental: developmentMode, // watch mode. Please do not use the `watch` config field.
        logLevel: developmentMode ? "info" : "error",
        write: true,

        target: developmentMode ? ["esnext"] : ["es2017"],
        format: "esm",
        platform: "browser",
        // jsxFactory: "jsx", // This allows @emotions/react to work. Do not remove.
        jsxFragment: "Fragment",
        mainFields: ["browser", "module", "main"],
        define: {
            AMD: "false",
        },
    };
}

module.exports = {
    configGenerator,
};