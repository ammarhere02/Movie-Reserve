const express = require('express');
const app = express();
const port = 3000;
const router = require('./routes/main_route')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Admin accessing user API Documentation',
      version: '1.0.0',
      description: 'API for managing users by admin',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local development server',
      },
    ],
  },
  apis: ['./routes/**/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
module.exports = swaggerDocs;

const specs = swaggerJSDoc(swaggerOptions);
app.use('/swag', swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json())

app.use('/api' , router);

app.listen(port , ()=>
{
  console.log(`server running at http://localhost:${port}/`)
})