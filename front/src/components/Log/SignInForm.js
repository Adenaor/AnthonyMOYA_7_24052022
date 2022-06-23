import React, { useRef, useState } from "react";
import axios from "axios";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const selectedEmail = useRef();
  const selectedPassword = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    const error = document.querySelector(".error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      data: { email, password },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        window.location = "/home";
      })
      .catch((err) => {
        error.innerHTML = err.response.data.message;
      });
  };

  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        ref={selectedEmail}
        onChange={() => setEmail(selectedEmail.current.value)}
        value={email}
      />

      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        ref={selectedPassword}
        onChange={() => setPassword(selectedPassword.current.value)}
        value={password}
      />
      <br />
      <div className="error"></div>
      <br />
      <input type="submit" value="Se connecter" />
    </form>
  );
};

export default SignInForm;
