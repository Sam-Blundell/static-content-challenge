const { expect, } = require('chai');
const request = require('supertest');
const app = require('../index.js');
const { getValidEndpoints, getMarkdownLookup, } = require('./testutils.js');
// these are some utility functions necessary for the testing to not
// rely on hardcoded files and directories within the content folder

const viewsDirectory = 'content';
const invalidEndpoint = '/CyGbQXdAOADRvJwuailV';
//It didn't seem worth ensuring that this endpoint was definitely invalid.

const validEndpoints = getValidEndpoints(viewsDirectory);
const markdownLookupObj = getMarkdownLookup(validEndpoints);


describe('CMS endpoint testing:', () => {
	describe('Valid endpoint testing:', () => {
		for (const url of validEndpoints) {
			it(`GET:200 respond with status 200 at ${url} endpoint`, () => {
				return request(app)
					.get(url)
					.expect(200);
			});
			// The tests above and below could easily be combined but it seemed 
			// worthwhile to separate them to get a better idea of what the 
			// problem is if they do end up failing.
			it(`${url} response should match parsed markdown file`, () => {
				return request(app)
					.get(url)
					.then(res => {
						// looks up main paragraph tag content in the markdown
						// and checks that the returned html includes it.
						expect(res.text).to.include(markdownLookupObj[url]);
					});
			});
		}
	});
	describe('Invalid endpoint testing:', () => {
		it('STATUS:404 respond with 404 when folder doesn\'t exist', () => {
			return request(app)
				.get(invalidEndpoint)
				.expect(404);
		});
		it('STATUS:404 respond with 404 when endpoint is missing', () => {
			return request(app)
				.get('')
				.expect(404);
		});
	});
});