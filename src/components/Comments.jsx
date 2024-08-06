import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseApi from "../../api";
import { ArticleContext } from "../App";

export default function Comments() {
  const { articleId } = useParams();
  const [comments, setComments] = useState([]);
  const { isLoading } = useContext(ArticleContext);
  useEffect(() => {
    baseApi
      .get(`/articles/${articleId}/comments`)
      .then((res) => {
        setComments(res.data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <div>
      {comments.length === 0 ? (
        <p>No comments</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li
              key="comment.comment_id"
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
  );
}
