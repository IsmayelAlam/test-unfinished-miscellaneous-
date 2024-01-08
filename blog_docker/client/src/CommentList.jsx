/* eslint-disable react/prop-types */

const CommentList = ({ comments = [] }) => {
  const renderedComments = comments.map((comment) => {
    let content;
    switch (comment.status) {
      case "approved":
        content = comment.content;
        break;
      case "rejected":
        content = "this comment was rejected";
        break;
      case "pending":
        content = "this comment pending moderation";
        break;

      default:
        break;
    }
    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
