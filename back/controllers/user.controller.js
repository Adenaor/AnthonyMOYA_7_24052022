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
        ...req.body.user,
        imageUrl: `${req.protocol}://${req.get("host")}/images/users/${
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

exports.deleteUser = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }
      const filename = user.imageUrl.split("/images/users/")[1];
      fs.unlink(`images/users/${filename}`, () => {
        User.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).send("Utilisateur supprimé"))
          .catch((err) => res.status(400).send(err));
      });
    })
    .catch((err) => res.status(500).send({ err }));
};
