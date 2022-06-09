import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { dateParser, isEmpty } from "../Utils";
import CardComments from "./CardComments";
import LikeButton from "./LikeButton";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img src="./img/default-avatar.jpg" alt="avatar" />
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
            <p>{post.message}</p>
            {post.picture && (
              <img src={post.picture} alt="post" className="card-pic" />
            )}
            <div className="card-footer">
              <div className="comment-icon">
                <img src="./img/icons/message1.svg" alt="comment icon" />
                <span>{post.comments.length}</span>
              </div>
              <LikeButton post={post} />
            </div>
            {showComments && <CardComments />}
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
