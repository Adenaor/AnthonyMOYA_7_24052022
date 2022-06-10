import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import PostForm from "../components/Post/PostForm";
import Thread from "../components/Thread";

const Home = () => {
  return (
    <div className="home">
      <div className="main">
        <div className="home-header">
          <PostForm />
        </div>
        <Thread />
      </div>
    </div>
  );
};

export default Home;
