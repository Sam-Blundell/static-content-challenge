const express = require('express');
const { readFile, } = require('fs/promises');
const { marked, } = require('marked');
const Mustache = require('mustache');

const fileOptions = { encoding: 'utf-8', };

const app = express();

// The size of the task made proper routing and attempting MVC feel silly.
app.get('/*', (req, res) => {

	const markDownFile = readFile(`./content${req.url}/index.md`, fileOptions);
	const templateFile = readFile('./template.html', fileOptions);
	const openAllFiles = Promise.all([markDownFile, templateFile,]);

	openAllFiles.then(([markDown, template,]) => {

		const content  = { content: marked.parse(markDown), };

		res.send(Mustache.render(template, content));

	})
		.catch((err) => {
			res.status(404).send(`404 No such filepath: ${err.path}`);
		});
});

module.exports = app;