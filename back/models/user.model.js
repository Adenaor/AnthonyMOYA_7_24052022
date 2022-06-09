const mongoose = require("mongoose");
const { isEmail } = require("validator");
const uniqueValidator = require("mongoose-unique-validator");
const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      requiered: true,
      unique: true,
      minlength: 3,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      validate: [isEmail],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    imageUrl: {
      type: String,
      default: "./images/default/default-avatar.jpg",
    },
    bio: {
      type: String,
      max: 500,
    },

    likes: {
      type: [String],
    },

    isAdmin: {
      type: Boolean,
      defaultValue: false,
    },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
