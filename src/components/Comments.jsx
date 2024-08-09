import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseApi from "../../api";
import { ArticleContext } from "../App";

export default function Comments() {
  const { articleId } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [submitErr, setSubmitErr] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const currentUser = "tickle122";
  const [buttonText, setButtonText] = useState("Send Comment");

  useEffect(() => {
    setIsLoading(true);
    baseApi
      .get(`/articles/${articleId}/comments`)
      .then((res) => {
        setComments(res.data.comments);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [articleId]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") {
      setSubmitErr("Comment is empty...");
      return;
    }
    setIsSubmit(true);
    setButtonText("Sending...");

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
        setButtonText("Send Comment");
      })
      .catch((err) => {
        setSubmitErr("Sending comment failed. Please try again!", err);
        setIsSubmit(false);
        setButtonText("Send Comment");
      });
  };

  const handleDeleteComent = (commentId) => {
    const userConfirm = window.confirm("Do you want to delete your comment?");
    if (!userConfirm || isDeleting) return;
    setIsDeleting(true);
    baseApi
      .delete(`/comments/${commentId}`)
      .then(() => {
        setComments((currentComments) =>
          currentComments.filter((comment) => comment.comment_id !== commentId)
        );
        setIsDeleting(false);
      })
      .catch((err) => {
        console.log("deleting comment failed", err);
        setIsDeleting(false);
      });
  };

  if (isLoading) {
    return <h1>Loading comments...</h1>;
  }

  return (
    <>
      <div>
        {comments.length === 0 ? (
          <p>No comments</p>
        ) : (
          <ul className="text-slate-300 flex flex-col">
            <div className="flex  justify-between ">
              <h4 className="mt-8 text-xl text-slate-300">Comments:</h4>
              <a
                href="#addComment"
                className="text-blue-500 underline mb-3 text-l relative top-8"
              >
                Add Your Comment
              </a>
            </div>
            {comments.map((comment) => (
              <li
                key={comment.comment_id}
                style={{
                  border: "1px solid white",
                  // marginBottom: "10px",
                  padding: "10px",
                }}
              >
                <p className="text-rose-500">
                  <strong>Name: {comment.author}</strong>
                </p>

                <p className="text-justify mt-2 mb-2">{comment.body}</p>
                <p>Votes: {comment.votes}</p>
                <p>Date: {comment.created_at}</p>
                {comment.author === currentUser && (
                  <button
                    onClick={() => {
                      handleDeleteComent(comment.comment_id);
                    }}
                    disabled={isDeleting}
                    style={{ backgroundColor: "red" }}
                  >
                    {isDeleting ? "Comment deleting..." : "Delete"}
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4" id="addComment">
        <h3 className="text-xl text-slate-300 border-t-2 border-slate-500 mt-10">
          Add a Comment
        </h3>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            className="placeholder-slate-400 text-slate-600 mt-2"
            style={{ height: "150px", width: "100%" }}
            value={newComment}
            placeholder="Write a new Comment..."
            onChange={(e) => setNewComment(e.target.value)}
            disabled={isSubmit}
          ></textarea>
          <div className="flex flex-col items-center mt-4">
            <button
              type="submit"
              className="py-1 px-2 bg-green-600 rounded-2xl"
            >
              {buttonText}
            </button>
          </div>

          {isSubmit && (
            <p style={{ color: "green" }}>Comment sent successfully!</p>
          )}
          {submitErr && <p style={{ color: "red" }}>{submitErr}</p>}
        </form>
      </div>
    </>
  );
}
