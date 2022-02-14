const { readdirSync, } = require('fs');

const findMarkdown = (dir, endpoints) => {

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
	return endpointArray.map((ep) => {
		return ep.replace(topDirectory, '');
	});
};

const getValidEndpoints = (directory) => {
	return stripTLD(directory, findMarkdown(directory));
};

module.exports = getValidEndpoints;