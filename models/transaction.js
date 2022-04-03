const { Schema, model } = require('mongoose');
// const Joi = require('joi');

const transactionSchema = Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    typeOfTransaction: {
      type: Boolean,
      default: false,
      // true - deposite, false - withdraw
    },
    category: {
      type: String,
      required: [true, 'Should be a category'],
    },
    comment: {
      type: String,
      default: '',
    },
    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },
    balance: {
      type: Number,
      default: 0,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
);

const Transaction = model('transaction', transactionSchema);

module.exports = {
  Transaction,
};
