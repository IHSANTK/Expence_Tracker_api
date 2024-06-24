const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

// Generate JWT tokens
const generateAccessToken = (user) => {
  
   
 return  jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '15m' });

};

const generateRefreshToken = (user) => {
  return jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '7d' });
};
 

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    const accessToken = generateAccessToken(newUser);
  
    const refreshToken = generateRefreshToken(newUser);
   

    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
      })
      .cookie('accessToken', accessToken)
      .status(201)
      .json({ message: 'User signup successful', accessToken });
  } catch (error) {
    res.status(400).send(error);
  }
};


exports.loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
      })
      .cookie('accessToken', accessToken)
      .json({ message: 'Login successful', accessToken });
  } catch (error) {
    res.status(500).send(error);
  }
};



exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) return res.status(404).send();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.addExpense = async (req, res) => {
  try {
    console.log("dfdafdf");
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send();
    user.expenses.push(req.body);
    await user.save();
    res.redirect(`/expensesum/${user._id}`);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send();
    const expense = user.expenses.id(req.params.expenseId);
    if (!expense) return res.status(404).send();
    expense.set(req.body);
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send();
    const expense = user.expenses.id(req.params.expenseId);
    if (!expense) return res.status(404).send();
    expense.remove();
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.addIncome = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send();
    user.income.push(req.body);
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateIncome = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send();
    const income = user.income.id(req.params.incomeId);
    if (!income) return res.status(404).send();
    income.set(req.body);
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteIncome = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send();
    const income = user.income.id(req.params.incomeId);
    if (!income) return res.status(404).send();
    income.remove();
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getExpensesSum = async (req, res) => {
    try {
        console.log("oook");
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).send();
  
      const expensesSum = user.expenses.reduce((sum, expense) => sum + expense.amount, 0);
      const allexpenses = user.expenses
      res.json({ expensesSum,allexpenses});
    } catch (error) {
      res.json(500).send(error);
    }
  };
  
  exports.getIncomeSum = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).send();
  
      const incomeSum = user.income.reduce((sum, income) => sum + income.amount, 0);
      res.send({ incomeSum });
    } catch (error) {
      res.status(500).send(error);
    }
  };



