import { renderComponent, expect } from '../test_helper';

var assert = require('chai').assert;
import CommentList from '../../src/components/comment_list';

describe('CommentList', () => {
	let component;

	beforeEach( () => {
		const props = { 
			comments:[
				'new comment', 
				'other new comment'
			] 
		};
		component = renderComponent(CommentList, 
			null, 
			props);
	});

	it('has the correct class', () => {
		expect(component).to.have.class('comment-list');
	});


	it('shows LI for each comment', () => {
		expect(component.find('li').length).to.equal(2);
	});

	it('shows each comment provided', () => {
		expect(component).to.contain('new comment');
		expect(component).to.contain('other new comment');
	});

});
