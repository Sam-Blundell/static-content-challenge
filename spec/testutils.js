const { readdirSync, readFileSync, } = require('fs');
const marked = require('marked');

const findMarkdown = (dir, endpoints) => {

	// Recursively searches supplied directory and fills an array with
	// any filepaths that terminate in a file with the .md extension.

	endpoints = endpoints || [];

	readdirSync(dir, { withFileTypes: true, })
		.forEach((file) => {
			if (file.isDirectory()) {
				endpoints = findMarkdown(dir + '/' + file.name, endpoints);
			} else if (file.name.endsWith('.md')) {
				endpoints.push(dir);
			}
		});

	return endpoints;
};

const stripTLD = (topDirectory, endpointArray) => {

	// Simply strips the top level directory from the filepath strings
	// so that the tester file can read them. Could have been included
	// in the other function but it felt neater this way.

	return endpointArray.map((ep) => {
		return ep.replace(topDirectory, '');
	});
};

const getValidEndpoints = (directory) => {
	return stripTLD(directory, findMarkdown(directory));
};

const getMarkdownLookup = (filePaths) => {

	// This creates a lookup object with valid endpoints as keys and
	// the main paragraph section of the html-parsed markdown file as
	// the value. It might have been good to add a second parameter
	// in the form of a html tag and then parse the key value using that.

	const markdownLookup = {};

	for (const filePath of filePaths) {

		const file = readFileSync(
			'content' + filePath + '/index.md', 
			{ encoding: 'utf-8', }
		);

		const html = marked.parse(file);
		const paraStart = html.indexOf('<p>');
		const paraEnd = html.indexOf('</p>') + 5;

		markdownLookup[filePath] = html.substring(paraStart, paraEnd);
	}

	return markdownLookup;

};

module.exports = { getValidEndpoints, getMarkdownLookup, };