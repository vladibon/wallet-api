const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const { SECRET_KEY } = process.env;

// eslint-disable-next-line no-useless-escape
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    token: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    balance: {
      type: Number,
      default: 0,
    },
    totalTransactions: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  return this;
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.setName = function (name) {
  this.name = name;
  return this;
};

userSchema.methods.setToken = function () {
  this.token = jwt.sign({ id: this._id }, SECRET_KEY, { expiresIn: '1d' });
  return this;
};

userSchema.methods.setBalance = function (balance) {
  this.balance = balance;
  return this;
};

userSchema.methods.incrementTotalTransactions = function () {
  this.totalTransactions += 1;
  return this;
};

const signupJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(3).max(10).required(),
});

const loginJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const emailJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const subscriptionJoiSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

const User = model('user', userSchema);

module.exports = {
  User,
  signupJoiSchema,
  loginJoiSchema,
  emailJoiSchema,
  subscriptionJoiSchema,
};
