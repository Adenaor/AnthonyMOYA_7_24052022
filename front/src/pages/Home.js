import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import PostForm from "../components/Post/PostForm";
import Thread from "../components/Thread";
import LogPage from "./LogPage";

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <div className="home">
      {uid ? (
        <div className="main">
          <div className="home-header">
            <PostForm />
          </div>
          <Thread />
        </div>
      ) : (
        <LogPage />
      )}
    </div>
  );
};

export default Home;
