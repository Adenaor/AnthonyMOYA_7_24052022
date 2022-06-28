import React, { useRef, useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const selectedPseudo = useRef();
  const selectedEmail = useRef();
  const selectedPassword = useRef();
  const selectedControlPassword = useRef();

  const handleRegister = (e) => {
    e.preventDefault();

    const error = document.querySelector(".password.error");
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");

    error.innerHTML = "";

    if (password !== controlPassword) {
      error.innerHTML = "Les mots de passe ne sont pas identiques";
    } else {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/signup`,
        data: { pseudo, email, password },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            pseudoError.innerHTML = res.data.errors.pseudo;
            emailError.innerHTML = res.data.errors.email;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <br />
          <h4 className="success">
            Enregistrement réussi, veuillez vous connecter
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="pseudo">Pseudo</label>
          <br />
          <input
            type="text"
            name="pseudo"
            ref={selectedPseudo}
            id="pseudo"
            onChange={() => setPseudo(selectedPseudo.current.value)}
            value={pseudo}
          />
          <br />
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
            minLength="6"
          />
          <br />
          <label htmlFor="password-conf">Confirmer mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password-conf"
            ref={selectedControlPassword}
            onChange={() =>
              setControlPassword(selectedControlPassword.current.value)
            }
            value={controlPassword}
          />
          <div className="pseudo error"></div>
          <div className=" email error"></div>
          <div className="password error"></div>
          <br />
          <input type="submit" value="Valider inscription" />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
