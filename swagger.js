const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Expense Tracker API',
    version: '1.0.0',
    description: 'API documentation for the Expense Tracker application',
  },
  servers: [
    {
      url: 'http://localhost:5001',
      description: 'Development server',
    },
  ],
};


const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], 
};


const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };