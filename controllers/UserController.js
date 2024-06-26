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
    console.log("oook");

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

exports.logout = async (req,res)=>{

    const user = req.user;

    console.log(user);
    if (!user) {
      return res.status(401).send("Unauthorized");
    }
    res
      .clearCookie("refreshToken")
      .clearCookie("accessToken")
      .status(200)
      .send("Logged out successfully");

}




exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
  
    if (!user) return res.status(404).send();
    const name = user.name
    const email = user.email

    res.json({name,email}); 
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


exports.addExpense = async (req, res) => {
    try {
      const { id } = req.params;
      const expense = req.body;
   
      if (!req.user) {
        return res.status(401).send("Unauthorized");
      }
  
      const user = await User.findOneAndUpdate(
        { _id: id },
        { $push: { expenses: expense } },
        { new: true, runValidators: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const expensesSum = user.expenses.reduce((sum, expense) => sum + expense.amount, 0);
      const allexpenses = user.expenses
      res.json({ expensesSum,allexpenses});

    } catch (error) {
      res.status(400).send(error);
    }
  };

exports.updateExpense = async (req, res) => {
    try {
      const { id, expenseId } = req.params;
      const { name, amount, date } = req.body;

      console.log(name, amount, date);
  
      const user = await User.findOneAndUpdate(
        { _id: id, "expenses._id": expenseId },
        {
          $set: {
            "expenses.$.name": name,
            "expenses.$.amount": amount,
            "expenses.$.date": date,
          }
        },
        { new: true } 
      );
  
      if (!user) {
        return res.status(404).json({ message: "User or expense not found" });
      }
  
      res.json({ message: "Expense updated successfully", user });
    } catch (error) {
      res.status(400).send(error);
    }
  };

exports.deleteExpense = async (req, res) => {
    try {
      const { id, expenseId } = req.params;
  
    
      const user = await User.findByIdAndUpdate(
        id,
        {
          $pull: { expenses: { _id: expenseId } }
        },
        { new: true } 
      );
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({ message: "Expense deleted successfully", user });
    } catch (error) {
      res.status(500).send(error);
    }
  };


exports.addIncome = async (req, res) => {
    try {
        const { id } = req.params;
        const income = req.body;
     
        if (!req.user) {
          return res.status(401).send("Unauthorized");
        }
    
        const user = await User.findOneAndUpdate(
          { _id: id },
          { $push: { income: income} },
          { new: true, runValidators: true }
        );
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        const incomeSum = user.income.reduce((sum, income) => sum + income.amount, 0);
        const allincome = user.income
        res.json({ incomeSum,allincome });
      } catch (error) {
        res.status(400).send(error);
      }
};

exports.updateIncome = async (req, res) => {
   try {
      const { id, incomeId} = req.params;
      const { name, amount, date } = req.body;

      console.log(name, amount, date);
  
      const user = await User.findOneAndUpdate(
        { _id: id, "income._id": incomeId },
        {
          $set: {
            "income.$.name": name,
            "income.$.amount": amount,
            "income.$.date": date,
          }
        },
        { new: true } 
      );
  
      if (!user) {
        return res.status(404).json({ message: "User or expense not found" });
      }
  
      res.json({ message: "Income updated successfully", user });
    } catch (error) {
      res.status(400).send(error);
    }
};

exports.deleteIncome = async (req, res) => {
    try {
        const { id, incomeId} = req.params;
    
      
        const user = await User.findByIdAndUpdate(
          id,
          {
            $pull: { income: { _id: incomeId } }
          },
          { new: true } 
        );
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        res.json({ message: "Income deleted successfully", user });
      } catch (error) {
        res.status(500).send(error);
      }
};

exports.getallsummery = async (req, res) => {
    try {
    
  
      if (!req.user) {
        return res.status(401).send("Unauthorized");
      }
  
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const totalExpenses = user.expenses.reduce((total, expense) => total + expense.amount, 0);
  
     
      const totalIncomes = user.income.reduce((total, income) => total + income.amount, 0);
  
      const balance = totalIncomes - totalExpenses;
      const allexpenses = user.expenses
      const allincome = user.income
  
      res.json({
        totalExpenses,
        totalIncomes,
        balance,
        allexpenses,
        allincome

        
      });
    } catch (error) {
      res.status(500).send(error);
    }
  };

  exports.sorting = async (req, res) => {
    try {
      const userId = req.params.id;
      const { sortingtype } = req.body;
  
      if (!req.user) {
        return res.status(401).send("Unauthorized");
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      let sortedExpenses = [...user.expenses];
      let sortedIncome = [...user.income];
  
      if (sortingtype === "Date ascending") {
        sortedExpenses.sort((a, b) => new Date(a.date) - new Date(b.date));
        sortedIncome.sort((a, b) => new Date(a.date) - new Date(b.date));
      } else if (sortingtype === "Date descending") {
        sortedExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));
        sortedIncome.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (sortingtype === "Amount ascending") {
        sortedExpenses.sort((a, b) => a.amount - b.amount);
        sortedIncome.sort((a, b) => a.amount - b.amount);
      } else if (sortingtype === "Amount descending") {
        sortedExpenses.sort((a, b) => b.amount - a.amount);
        sortedIncome.sort((a, b) => b.amount - a.amount);
      } else {
        return res.status(400).send("Invalid sorting type");
      }
  
      res.json({
        sortedExpenses,
        sortedIncome
      });
    } catch (error) {
      res.status(500).send(error);
    }
  };






