import React from 'react';
import UserComment from './UserComment';


// Comment section for posts
const PostComments = ({ comments, _id }) => {
    const commentElements = [];
    
    // Create comment element for each comment
    for (let i = 0; i < comments.length; i++) {
        commentElements.push(<UserComment key={comments[i][2]} comment={comments[i]} _id={_id} />);
    }

    return (
        <>
            {commentElements}
        </>
    );
};

export default PostComments;