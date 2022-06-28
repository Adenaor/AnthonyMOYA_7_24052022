import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../actions/post.actions";
import { dateParser, isEmpty } from "../Utils";
import CardComments from "./CardComments";
import DeleteCard from "./DeleteCard";
import LikeButton from "./LikeButton";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [textUpdate, setTextUpdate] = useState("");
  const [isAuthor, setIsAuthor] = useState(false);
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate));
      setIsUpdating(false);
    }
  };

  const checkAuthor = () => {
    if (userData.isAdmin || userData._id === post.userId) {
      setIsAuthor(true);
    }
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
    checkAuthor();
  }, [usersData, userData.isAdmin, userData._id]);

  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user._id === post.userId) return user.imageUrl;
                  })
                  .join("")
              }
              alt="avatar"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData.map((user) => {
                      if (user._id === post.userId) return user.pseudo;
                    })}
                </h3>
              </div>
              <span>{dateParser(post.createdAt)}</span>
            </div>
            {isUpdating === false && <p>{post.message}</p>}
            {isUpdating && (
              <div className="update-post">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button-container">
                  <div className="btn" onClick={updateItem}>
                    Valider modifications
                  </div>
                </div>
              </div>
            )}
            {post.picture && (
              <img src={post.picture} alt="post" className="card-pic" />
            )}
            {isAuthor && (
              <div className="button-container">
                <div onClick={() => setIsUpdating(!isUpdating)}>
                  <img src="./img/icons/edit.svg" alt="edit" />
                </div>
                <DeleteCard id={post._id} />
              </div>
            )}
            <div className="card-footer">
              <div
                className="comment-icon"
                onClick={() => {
                  setShowComments(!showComments);
                }}
              >
                <img src="./img/icons/message.svg" alt="comment icon" />
                <span>{post.comments.length}</span>
              </div>
              <LikeButton post={post} />
            </div>
            {showComments && <CardComments post={post} />}
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
