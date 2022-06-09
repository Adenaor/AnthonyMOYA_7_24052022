const Post = require("../models/post.model");
const User = require("../models/user.model");

// CRUD post
// récupération des posts
exports.getPost = (req, res) => {
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(400).json({ err }));
};
// Création d'un post
exports.createPost = (req, res) => {
  const post = new Post({ ...req.body });
  post
    .save()
    .then(() => res.status(201).json({ message: "Post créé" }))
    .catch((err) => res.status(400).json({ err }));
};

//Modification d'un post
exports.updatePost = (req, res) => {
  const postObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/post/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
    .then(() => {
      if ((post.userId = req.auth.userId || isAdmin === true))
        return res.status(200).json({ message: "Post modifié" });
    })
    .catch((err) => res.status(404).json({ err }));
};
//Suppression d'un post
exports.deletePost = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: "Post non trouvé" });
      }
      if (post.userId !== req.auth.userId || isAdmin === false) {
        return res.status(401).json({ error: "Requête non autorisée" });
      }
      const filename = post.imageUrl.split("/post/")[1];
      fstat.unlink(`images/post/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Post supprimé" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })

    .catch((err) => {
      res.status(500).json({ err });
    });
};

// Ajout d'un like et enregistrement de l'utilisateur dans [likers]
exports.likePost = (req, res) => {
  try {
    Post.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    User.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true },
      (err) => {
        if (!err) res.status(200).send("Post liké");
        else {
          return res.status(400).send(err);
        }
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

// Retrait du like et retrait de l'utilisateur du tableau [likers]

exports.unlikePost = (req, res) => {
  try {
    Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true },
      (err) => {
        return res.status(err);
      }
    );
    User.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true },
      (err) => {
        if (!err) res.status(200).send("Like retiré");
        else {
          return res.status(400).send(err);
        }
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

// gestion commentaire

exports.commentPost = (req, res) => {
  try {
    return Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send({ docs });
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.editCommentPost = (req, res) => {
  try {
    return Post.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!theComment)
        return res.status(404).json({ message: "Commentaire non trouvé" });
      theComment.text = req.body.text;

      return docs.save((err) => {
        if (!err) return res.status(200).json({ docs });
        return res.status(500).json({ err });
      });
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.deleteCommentPost = (req, res) => {
  try {
    return Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        return res.status(400).json({ err });
      }
    );
  } catch (err) {
    res.status(400).json({ err });
  }
};
