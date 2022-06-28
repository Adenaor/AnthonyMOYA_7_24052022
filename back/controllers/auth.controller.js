const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signUpErrors } = require("../utils/errors.utils");

// Création d'un profil Utilisateur

exports.signUp = (req, res) => {
  // Cryptage password
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      pseudo: req.body.pseudo,
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((user) =>
        res.status(201).json({
          user: user._id,
          message: "Utilisateur créé",
        })
      )
      .catch((err) => {
        const errors = signUpErrors(err);
        res.status(200).send({ errors });
      });
  });
};

// Connexion au profil Utilisateur

exports.logIn = (req, res) => {
  User.findOne({ email: req.body.email })

    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé" });
      }
      // Comparaison des password pour validation
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          const maxAge = 24 * 60 * 60 * 1000;
          const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, {
            expiresIn: maxAge,
          });

          if (!valid) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
          }
          // création d'un token pour l'utilisateur
          res.cookie("jwt", token, { httpOnly: true, secure: true, maxAge });
          res.status(200).json({
            userId: user._id,
            message: " Connexion réussie",
          });
        })
        .catch((err) => res.status(401).json(err));
    })
    .catch((err) => {
      res.status(500).send({ err });
    });
};

// Déconnexion de l'utilisateur

exports.logOut = (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
};
