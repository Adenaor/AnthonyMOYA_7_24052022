import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../actions/post.actions";
import { UidContext } from "../AppContext";

const DeleteComment = ({ comment, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const uid = useContext(UidContext);

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commenterId || userData.isAdmin) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [uid, comment.commenterId]);

  const handleDelete = () => {
    dispatch(deleteComment(postId, comment._id));
  };

  return (
    <div className="delete-btn">
      {isAuthor && (
        <div className="btn">
          <span
            onClick={() => {
              if (window.confirm("Voulez-vous supprimer le commentaire ?")) {
                handleDelete();
              }
            }}
          >
            <img src="./img/icons/trash.svg" alt="corbeille" />
          </span>
        </div>
      )}
    </div>
  );
};

export default DeleteComment;
