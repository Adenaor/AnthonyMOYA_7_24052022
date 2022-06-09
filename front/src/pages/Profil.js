import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "../actions/user.actions";
import UploadImg from "../components/Profil/UploadImg";
import { dateParser } from "../components/Utils";

const Profil = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
  };

  return (
    <div className="profil-page">
      <div className="profil-container">
        <h1>Profil de {userData.pseudo}</h1>
        <div className="update-container">
          <div className="left-part">
            <h3>Photo de profil</h3>
            <img src="./img/default-avatar.jpg" alt="user" />
            <UploadImg />
          </div>
          <div className="right-part">
            <h3>Bio</h3>
            {updateForm === false && (
              <>
                <p>{userData.bio}</p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  modifier la bio
                </button>
              </>
            )}
            {updateForm && (
              <>
                <textarea
                  type="text"
                  defaultValue={userData.bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>
                  Valider les modifications
                </button>
              </>
            )}
            <div className="create-date">
              <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
