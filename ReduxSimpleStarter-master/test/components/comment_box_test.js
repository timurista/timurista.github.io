import { renderComponent, expect } from '../test_helper';

import CommentBox from '../../src/components/comment_box';

describe('CommentBox', () => {
	let component;
	// setup
	beforeEach( () => {
		component = renderComponent(CommentBox);
	});


	it('has the correct class', () => {
		expect(component).to.have.class('comment-box');
	});

	it('has a textarea', () => {
		expect(component.find('textarea')).to.exist; 
	});

	it('has a button', () => {
		expect(component.find('button')).to.exist;


	});

	//closely related
	describe('entering text', () => {
		let text = 'new comment';

		beforeEach( () => {
			component.find('textarea').simulate('change', text);
		});


		it('shows text in textarea', () => {
			expect(component.find('textarea')).to.have.value(text);

		});

		it('clears text when submitted', () => {

			component.simulate('submit');

			expect(component.find('textarea')).to.have.value('');
		});

		
		
	})

});
