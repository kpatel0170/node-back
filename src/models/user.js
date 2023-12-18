const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// eslint-disable-next-line import/no-extraneous-dependencies
// const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
// const { join } = require('path');

const { Schema } = mongoose;
const roles = ["user", "admin"];

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
      enum: roles,
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

userSchema.pre("save", async function (next) {
  const user = this;

  const saltWorkFactor = parseInt(process.env.SALT_WORK_FACTOR, 10);
  const salt = await bcrypt.genSalt(saltWorkFactor);

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;
  return bcrypt.compare(candidatePassword, user.password).catch(() => false);
};

userSchema.methods.toJSON = function () {
  // const absoluteAvatarFilePath = `${join(__dirname, '../..', IMAGES_FOLDER_PATH)}${this.avatar}`;
  // const avatar = isValidUrl(this.avatar)
  //   ? this.avatar
  //   : fs.existsSync(absoluteAvatarFilePath)
  //   ? `${IMAGES_FOLDER_PATH}${this.avatar}`
  //   : `${IMAGES_FOLDER_PATH}avatar2.jpg`;

  // return {
  //   id: this._id,
  //   provider: this.provider,
  //   email: this.email,
  //   username: this.username,
  //   avatar: avatar,
  //   name: this.name,
  //   role: this.role,
  //   createdAt: this.createdAt,
  //   updatedAt: this.updatedAt,
  // };
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const isProduction = process.env.NODE_ENV === "production";
const secretOrKey = isProduction
  ? process.env.JWT_SECRET_PROD
  : process.env.JWT_SECRET_DEV;

userSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    {
      expiresIn: "12h",
      id: this._id,
      provider: this.provider,
      email: this.email
    },
    secretOrKey
  );
  return token;
};

// userSchema.statics = {
//   roles,

//   async oAuthLogin({ service, id, email, name, picture }) {
//     const user = await this.findOne({ $or: [{ [`services.${service}`]: id }, { email }] });
//     if (user) {
//       user.services[service] = id;
//       if (!user.name) user.name = name;
//       return user.save();
//     }
//     const password = uuidv4();
//     return this.create({
//       services: { [service]: id },
//       email,
//       password,
//       name,
//     });
//   },
// };

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
