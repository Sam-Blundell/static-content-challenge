const express = require('express');
const { readFile, } = require('fs/promises');
const { marked, } = require('marked');

const app = express();

app.use((req, res) => {
	readFile(`./content${req.url}/index.md`, { encoding: 'utf-8', })
		.then((data) => {
			res.send(marked.parse(data));
		})
		.catch((err) => {
			res.send('404');
			console.log(err);
		});
});

module.exports = app;