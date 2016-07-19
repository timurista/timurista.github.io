import React, { Component } from 'react';
import { connect } from 'react-redux';
// * binds to comment box container
// useful for redux container
import * as actions from '../actions';

export default class CommentBox extends Component {
	constructor(props) {
		super(props);
		this.state = { comment: '' };
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.saveComment(this.state.comment);
		this.setState({comment: ''});

	}

	handleChange(event) {
		this.setState({ comment:event.target.value })
	}

	render() {
		return (
			<form 
			  onSubmit={this.handleSubmit.bind(this)}
			  className="comment-box">
				
				<textarea 
				  value = {this.state.comment}
				  onChange = {this.handleChange.bind(this)} />
				<button action="submit">Submit Comment</button>
			</form>
			)
	}
}

export default connect(null, actions)(CommentBox)