import axios from "axios";
import React from "react";
import cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  deletePost,
  unlikePost,
} from "../../actions/post.actions";
import { isEmpty } from "../Utils";

const DeleteUser = ({ uid }) => {
  const posts = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();

  const findPost = posts.filter((post) => post.userId === uid);
  const allComments = posts.map((post) => post.comments);
  const allLikes = posts.map((post) => post.likers);

  const findPostComment = () => {
    for (let i = 0; i < allComments.length; i++) {
      if (!isEmpty(allComments[i])) {
        for (let j = 0; j < allComments[i].length; j++) {
          if (uid === allComments[i][j].commenterId) {
            dispatch(deleteComment(posts[i]._id, allComments[i][j]._id));
          }
        }
      }
    }
  };

  const findPostLikers = () => {
    for (let i = 0; i < allLikes.length; i++) {
      if (!isEmpty(allLikes[i])) {
        for (let j = 0; j < allLikes[i].length; j++) {
          if (uid === allLikes[i][j]) {
            dispatch(unlikePost(posts[i]._id, allLikes[i][j]));
          }
        }
      }
    }
  };

  const deleteUser = () => {
    const removeCookie = (key) => {
      if (window !== "undefined") {
        cookie.remove(key, { expires: 1 });
      }
    };

    findPostLikers();

    findPostComment();

    findPost.map((post) => dispatch(deletePost(post._id)));

    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));

    window.location = "/";
  };

  return (
    <div>
      <button
        className="delete-btn"
        onClick={() => {
          if (window.confirm("Voulez-vous supprimer ce compte ?")) {
            deleteUser();
          }
        }}
      >
        Supprimer le compte
      </button>
    </div>
  );
};

export default DeleteUser;
