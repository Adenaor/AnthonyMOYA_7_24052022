const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      maxlength: 500,
    },
    picture: {
      type: String,
    },
    video: {
      type: String,
    },

    likers: {
      type: [String],
      required: true,
    },

    comments: {
      // création d'un sous base de donnée pour stocker les commentaires des posts
      type: [
        {
          commenterId: String,
          commenterPseudo: String,
          text: String,
          timestamp: Number,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
