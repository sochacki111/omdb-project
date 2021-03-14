import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.3',
    info: {
      version: '1.0.0',
      title: 'omdb-project API',
      description: 'omdb-project API Information',
      contact: {
        name: 'sochacki111',
        url: 'https://github.com/sochacki111'
      },
      servers: ['http://localhost:8080']
    }
  },
  apis: ['**/*.ts']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
