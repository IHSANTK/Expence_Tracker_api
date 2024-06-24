const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/signin', UserController.createUser);
router.post('/login',UserController.loginuser)
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);


router.post('/:id/expenses', UserController.addExpense);
router.put('/:id/expenses/:expenseId', UserController.updateExpense);
router.delete('/:id/expenses/:expenseId', UserController.deleteExpense);


router.post('/:id/income', UserController.addIncome);
router.put('/:id/income/:incomeId', UserController.updateIncome);
router.delete('/:id/income/:incomeId', UserController.deleteIncome); 

router.get('/expensesum/:id', UserController.getExpensesSum);
router.get('/:id/income/sum', UserController.getIncomeSum);

module.exports = router;
