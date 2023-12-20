const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { toJSON, paginate } = require("./plugins");
const enums = require("../json/enums.json");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    name: { type: String, required: true, trim: true },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      private: true
    },
    services: {
      facebook: String,
      google: String
    },
    // google
    googleId: {
      type: String,
      unique: true,
      sparse: true
    },
    role: {
      type: String,
      enum: [enums.USER_TYPE.ADMIN, enums.USER_TYPE.USER],
      default: "user"
    },
    picture: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
