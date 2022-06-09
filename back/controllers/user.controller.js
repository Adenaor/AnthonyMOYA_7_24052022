const User = require("../models/user.model");
const fs = require("fs");

// CRUD Utilisateur
// récupération des info de tous les utilisateurs
exports.getAllUsers = (req, res) => {
  User.find()
    .select("-password")
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(400).json({ err }));
};

// récupération des info d'un utilisateur
exports.userInfo = (req, res) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => res.status(200).json(user))
    .catch((err) =>
      res.status(400).json({ message: "Cet utilisateur n'existe pas", err })
    );
};

// mise à jour des informations d'un utilisateur
exports.updateUser = (req, res) => {
  const userObject = req.file
    ? {
        ...JSON.parse(req.body.user),
        imageUrl: `${req.protocol}://${req.get("host")}/images/user/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  User.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: "Informations utilisateur modifiées" });
    })
    .catch((err) => res.status(404).json({ err }));
};

// Suppression d'un utilisateur

exports.deleteUser = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "Post non trouvé" });
      }
      if (user.userId !== req.auth.userId || isAdmin === false) {
        return res.status(401).json({ error: "Requête non autorisée" });
      }
      const filename = user.imageUrl.split("/user/")[1];
      fs.unlink(`images/user/${filename}`, () => {
        User.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: "Utilisateur supprimé" });
            res.clearCookie("jwt");
          })
          .catch((err) => res.status(400).json({ err }));
      });
    })
    .catch((err) => res.status(500).json({ err }));
};
