import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseApi from "../../api";
import { ArticleContext } from "../App";

export default function Comments() {
  const { articleId } = useParams();
  const [comments, setComments] = useState([]);
  const { isLoading } = useContext(ArticleContext);
  const [newComment, setNewComment] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [submitErr, setSubmitErr] = useState(null);

  useEffect(() => {
    baseApi
      .get(`/articles/${articleId}/comments`)
      .then((res) => {
        setComments(res.data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [articleId]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") {
      setSubmitErr("Comment is empty...");
      return;
    }
    setIsSubmit(true);

    const comment = {
      username: "tickle122",
      body: newComment,
    };
    baseApi
      .post(`/articles/${articleId}/comments`, comment)
      .then((res) => {
        setNewComment("");
        setSubmitErr(null);
        setComments((showComments) => [res.data.comment, ...showComments]);
        setIsSubmit(false);
      })
      .catch((err) => {
        setSubmitErr("Sending comment failed. Please try again!", err);
        setIsSubmit(false);
      });
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <div>
        {comments.length === 0 ? (
          <p>No comments</p>
        ) : (
          <ul>
            {comments.map((comment) => (
              <li
                key={comment.comment_id}
                style={{
                  border: "1px solid white",
                  // marginBottom: "10px",
                  padding: "10px",
                }}
              >
                <p>
                  <strong>Name: {comment.author}</strong>
                </p>
                <p>{comment.body}</p>
                <p>Votes: {comment.votes}</p>
                <p>Date: {comment.created_at}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3>Add a Comment</h3>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            style={{ height: "150px", width: "100%" }}
            value={newComment}
            placeholder="Write a new Comment..."
            onChange={(e) => setNewComment(e.target.value)}
            disabled={isSubmit}
          ></textarea>
          <button type="submit" style={{ backgroundColor: "grey" }}>
            {isSubmit ? "Comment sent successfully!" : "Send Comment"}
          </button>
          {submitErr && <p style={{ color: "red" }}>{submitErr}</p>}
        </form>
      </div>
    </>
  );
}
