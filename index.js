const express = require('express');
const { readFile, } = require('fs/promises');
const { marked, } = require('marked');
const Mustache = require('mustache');

const app = express();

app.get('/*', (req, res) => {

	const mD = readFile(`./content${req.url}/index.md`, { encoding: 'utf-8', });
	const template = readFile('./template.html', { encoding: 'utf-8', });
	const allFiles = Promise.all([mD, template,]);

	allFiles.then((data) => {
		res.send(Mustache.render(data[1], { content: marked.parse(data[0]), }));

	})
		.catch((err) => {
			res.status(404).send('404');
			console.log(err);
		});
});

module.exports = app;