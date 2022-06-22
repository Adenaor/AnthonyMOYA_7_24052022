import axios from "axios";
import React from "react";
import cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../actions/post.actions";

const DeleteUser = ({ uid }) => {
  const posts = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();

  const findPost = posts.filter((post) => post.userId === uid);

  const deleteUser = () => {
    const removeCookie = (key) => {
      if (window !== "undefined") {
        cookie.remove(key, { expires: 1 });
      }
    };

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
