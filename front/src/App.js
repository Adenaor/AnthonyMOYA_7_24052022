import React, { useState, useEffect } from "react";
import Routes from "./components/Routes";
import { AdminContext, UidContext } from "./components/AppContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

const App = () => {
  const [admin, setAdmin] = useState();
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => console.log(err));
    };

    fetchToken();

    if (uid) {
      dispatch(getUser(uid));
    }
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <AdminContext.Provider value={admin}>
        <Routes />
      </AdminContext.Provider>
    </UidContext.Provider>
  );
};

export default App;
