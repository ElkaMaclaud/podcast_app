const path = require("path")
module.exports = {
	entry: "src/app.js",
	output: {
		filename: "boundle.js",
		path: path.resolve(__dirname, "public")
	},
	devServer: {
		port: 3000
	}
}