const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  date: { type: Date, default: Date.now }
});

const incomeSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  date: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password:String,
  expenses: [expenseSchema],
  income: [incomeSchema]
});



module.exports = mongoose.model('User', userSchema);
