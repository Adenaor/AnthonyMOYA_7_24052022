import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getPosts } from "../../actions/post.actions";
import { isEmpty, timeStampParser } from "../Utils";

const PostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [picture, setPicture] = useState(null);
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handlePicture = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };
  const handlePost = async () => {
    if (message || picture) {
      await dispatch(addPost(userData._id, message, picture, file));
      dispatch(getPosts());
      cancelPost();
    }
  };

  const cancelPost = () => {
    setMessage("");
    setPicture("");
    setFile("");
  };

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
  }, [userData]);

  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="user-info">
            <img src="./img/default-avatar.jpg" alt="avatar" />
          </div>
          <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="Quoi de neuf ?"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />

            {message || picture ? (
              <li className="card-container">
                <div className="card-left">
                  <img src="./img/default-avatar.jpg" alt="avatar" />
                </div>
                <div className="card-right">
                  <div className="card-header">
                    <h3>{userData.pseudo}</h3>
                    <span>{timeStampParser(Date.now())}</span>
                  </div>
                  <div className="content">
                    <p>{message}</p>
                    <img src={picture} alt="" />
                  </div>
                </div>
              </li>
            ) : null}
            <div className="footer-form">
              <div className="icon">
                <img src="./img/icons/picture.svg" alt="pic-acces" />
                <input
                  type="file"
                  id="file-upload"
                  name="file"
                  accept=".jpg, .png, .jpeg, .gif"
                  onChange={(e) => handlePicture(e)}
                />
              </div>
              <div className="btn-send">
                {message || picture ? (
                  <button className="cancel" onClick={cancelPost}>
                    Annuler message
                  </button>
                ) : null}
                <button className="send" onClick={handlePost}>
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PostForm;
