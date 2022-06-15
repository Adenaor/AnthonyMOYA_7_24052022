import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";

const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("pseudo", userData.pseudo);
    data.append("id", userData._id);
    data.append("name", file);

    await dispatch(uploadPicture(data, userData._id));
    window.location.reload();
  };

  return (
    <div>
      <form
        action=""
        onSubmit={handlePicture}
        className="upload-pic"
        encType=" multipart/form-data "
      >
        <label htmlFor="file">Changer d'image</label>
        <input
          encType=" multipart/form-data "
          type="file"
          id="file"
          name="name"
          accept=".jpg,.jpeg,.png"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <br />
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
};

export default UploadImg;
