
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       409:
 *         description: Email already exists
 *       400:
 *         description: Bad request
 */


/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /updateuser:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 * 
 *           schema:
 *             type: object
 *             required:
 *              - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string  
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: updated succesfull
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /addexpenses/{userId}:
 *   post:
 *     summary: Add expenses
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - amount
 *             properties:
 *               name:
 *                 type: string  
 *               amount:
 *                 type: string
 *     responses:
 *       200:
 *         description: Expense added successfully
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /updateexpense/{userId}/{expenseId}:
 *   put:
 *     summary: Update expense
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *       - in: path
 *         name: expenseId
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - amount
 *               - date
 *             properties:
 *               name:
 *                 type: string  
 *               amount:
 *                 type: string
 *               date:
 *                 type: string
 *     responses:
 *       200:
 *         description: Expense updated successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /deleteexpense/{userId}/{expenseId}:
 *   delete:
 *     summary: Delete expense
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *       - in: path
 *         name: expenseId
 *         required: true
 *     responses:
 *       200:
 *         description: Expense updated successfully
 *       500:
 *         description: Server error
 */



/**
 * @swagger
 * /addincome/{userId}:
 *   post:
 *     summary: Add income
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - amount
 *             properties:
 *               name:
 *                 type: string  
 *               amount:
 *                 type: string
 *     responses:
 *       200:
 *         description: Income added successfully
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /updateincome/{userId}/{expenseId}:
 *   put:
 *     summary: Update income
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *       - in: path
 *         name: expenseId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the income
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - amount
 *               - date
 *             properties:
 *               name:
 *                 type: string  
 *               amount:
 *                 type: string
 *               date:
 *                 type: string
 *     responses:
 *       200:
 *         description: Income updated successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /deleteincome/{userId}/{expenseId}:
 *   delete:
 *     summary: Delete income
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *       - in: path
 *         name: expenseId
 *         required: true
 *     responses:
 *       200:
 *         description: Income updated successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /getuser/{userId}:
 *   get:
 *     summary: get user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *       
 *     responses:
 *       200:
 *         description: Get user
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /allsummery/{userId}:
 *   get:
 *     summary: get all summery
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *       
 *     responses:
 *       200:
 *         description: Get user
 *       500:
 *         description: Server error
 */



/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         expenses:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               amount:
 *                 type: number
 *               date:
 *                 type: string
 *                 format: date-time
 *         income:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               amount:
 *                 type: number
 *               date:
 *                 type: string
 *                 format: date-time
 *       example:
 *         id: d5fE_asz
 *         name: John Doe
 *         email: johndoe@example.com
 *         password: $2b$10$2b$10$8dJZlFETW4XgkQ8
 *         expenses: []
 *         income: []
 */