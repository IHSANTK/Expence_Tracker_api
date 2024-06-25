const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const {authenticate} = require('../middlewear/jwt')

router.post('/signup', UserController.createUser);
router.post('/login',UserController.loginuser)
router.get('/getuser/:id', UserController.getUserById);
router.put('/updateuser/:id', UserController.updateUser);

router.post('/logout',authenticate,UserController.logout)


router.post('/addexpenses/:id',authenticate,UserController.addExpense);
router.put('/updateexpense/:id/:expenseId',authenticate,UserController.updateExpense);
router.delete('/deleteexpense/:id/:expenseId',authenticate, UserController.deleteExpense);


router.post('/addincome/:id',authenticate,UserController.addIncome);
router.put('/updateincome/:id/:incomeId',authenticate,UserController.updateIncome);
router.delete('/deleteincome/:id/:incomeId',authenticate,UserController.deleteIncome); 

router.get('/expensesum/:id',authenticate,UserController.getExpensesSum);
router.get('/:id/income/sum',authenticate,UserController.getIncomeSum);




module.exports = router;
