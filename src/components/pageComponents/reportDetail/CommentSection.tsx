import React from 'react';
import Comment from './Comment';

const commentsData = [
  {
    id: 1,
    author: 'John Doe',
    content: 'This is an awesome comment!',
    likes: 5,
  },
  {
    id: 2,
    author: 'Jane Smith',
    content: 'I totally agree with John!',
    likes: 3,
  },
];

const CommentSection = () => {
  return (
    <div>
      <h2>Comments</h2>
      {commentsData.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
};

export default CommentSection;