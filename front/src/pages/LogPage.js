import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import Home from "./Home";

const LogPage = () => {
  const uid = useContext(UidContext);

  return (
    <div>
      <div className="log-page">
        {uid ? (
          <Home />
        ) : (
          <div className="log-container">
            <Log signin={false} signup={true} />
            <div className="img-container">
              <img src="./img/log.svg" alt="img log" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogPage;
