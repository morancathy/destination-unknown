import React from 'react';
import CommentForm from './CommentForm';

const Comments = ({ props }) => {
	return (
		<div className="">
			<CommentForm props={props} />
		</div>
	);
};

export default Comments;
// <button onClick={toggleCommentForm}>Add a Comment</button>
