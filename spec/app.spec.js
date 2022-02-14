const { expect } = require('chai');
const request = require('supertest');
const app = require('../index.js');
const getValidEndpoints = require('./testutils.js');

const viewsDirectory = 'content';

const validEndpoints = getValidEndpoints(viewsDirectory);

const invalidEndpoint = '/CyGbQXdAOADRvJwuailV';

describe('CMS endpoint testing:', () => {
	describe('Valid endpoint testing:', () => {
		for (const url of validEndpoints) {
			it(`GET:200 respond with status 200 at ${url} endpoint`, () => {
				return request(app)
					.get(url)
					.expect(200);
			});
		}
	});
	describe('Invalid endpoint testing', () => {
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