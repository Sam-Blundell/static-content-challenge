const express = require('express');
const { readFile, } = require('fs/promises');

const app = express();

app.use((req, res) => {
	readFile(`./content${req.url}/index.md`)
		.then((data) => {
			res.send(data.toString());
		})
		.catch((err) => {
			res.send('404');
			console.log(err);
		});
});

module.exports = app;